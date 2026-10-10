"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed list stores (wishlist, compare, recently viewed).
 * They live only in this browser and fall back to empty when storage is blocked.
 */
function createListStore(key: string, max: number) {
  const listeners = new Set<() => void>();
  const empty: string[] = [];
  let cacheRaw: string | null = null;
  let cache: string[] = empty;

  const read = (): string[] => {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(key);
    } catch {}
    if (raw === cacheRaw) return cache;
    cacheRaw = raw;
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      cache = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : empty;
    } catch {
      cache = empty;
    }
    return cache;
  };

  const write = (next: string[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(next.slice(0, max)));
    } catch {}
    listeners.forEach((l) => l());
  };

  const subscribe = (l: () => void) => {
    listeners.add(l);
    const onStorage = (e: StorageEvent) => e.key === key && l();
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  };

  return {
    use: () => useSyncExternalStore(subscribe, read, () => empty),
    has: (id: string) => read().includes(id),
    toggle: (id: string) => {
      const list = read();
      if (list.includes(id)) write(list.filter((x) => x !== id));
      else if (list.length < max) write([...list, id]);
      else return false;
      return true;
    },
    remove: (id: string) => write(read().filter((x) => x !== id)),
    /** Moves the id to the front, for "recently viewed". */
    touch: (id: string) => {
      const list = read();
      if (list[0] !== id) write([id, ...list.filter((x) => x !== id)]);
    },
    clear: () => write([]),
    max,
  };
}

export const wishlist = createListStore("gh:wishlist", 50);
export const compare = createListStore("gh:compare", 3);
export const recent = createListStore("gh:recent", 8);

const packingStores = new Map<string, ReturnType<typeof createListStore>>();
/** Ticked packing-list items, one store per destination. */
export const packingStore = (slug: string) => {
  if (!packingStores.has(slug)) packingStores.set(slug, createListStore(`gh:packing:${slug}`, 100));
  return packingStores.get(slug)!;
};
