"use client";

import { packingStore } from "@/lib/store";
import { Check, Luggage } from "./icons";

export function PackingList({ slug, items }: { slug: string; items: string[] }) {
  const store = packingStore(slug);
  const ticked = store.use();
  const done = items.filter((i) => ticked.includes(i)).length;

  return (
    <div className="rounded-3xl bg-card p-6 ring-1 ring-line sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Luggage className="size-5 text-accent" /> Packing checklist
        </h3>
        <span className="text-sm text-muted">{done}/{items.length} packed</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper">
        <div className="h-full rounded-full bg-sea transition-[width] duration-300" style={{ width: `${(done / items.length) * 100}%` }} />
      </div>
      <ul className="mt-4 space-y-1">
        {items.map((item) => {
          const on = ticked.includes(item);
          return (
            <li key={item}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 hover:bg-paper has-focus-visible:ring-2 has-focus-visible:ring-accent">
                <input type="checkbox" checked={on} onChange={() => store.toggle(item)} className="peer sr-only" />
                <span className={`grid size-5 shrink-0 place-items-center rounded-md ring-1 transition ${on ? "bg-sea text-white ring-sea" : "ring-line"}`}>
                  {on && <Check className="size-3.5" strokeWidth={3} />}
                </span>
                <span className={`text-sm ${on ? "text-muted line-through" : ""}`}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted">Ticks are saved on this device.</p>
    </div>
  );
}
