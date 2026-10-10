"use client";

import Link from "next/link";
import { getPackage } from "@/lib/data";
import { recent, wishlist } from "@/lib/store";
import { whatsappLink } from "@/lib/site";
import { Heart, Trash, WhatsApp } from "./icons";
import { PackageCard } from "./PackageCard";
import { SectionHeading } from "./ui";

export function SavedTrips() {
  const items = wishlist.use().map(getPackage).filter((p) => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-card px-6 py-16 text-center ring-1 ring-line">
        <Heart className="mx-auto size-10 text-accent" />
        <h2 className="mt-4 text-xl font-bold">No saved trips yet</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">Tap the heart on any package to save it here. Your list stays on this device.</p>
        <Link href="/packages" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">Browse packages</Link>
      </div>
    );
  }

  const message = `Hi! I've shortlisted these trips — can you help me pick?\n${items.map((p) => `• ${p.title}`).join("\n")}`;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted"><span className="font-semibold text-ink">{items.length}</span> saved {items.length === 1 ? "trip" : "trips"}</p>
        <div className="flex gap-2">
          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
            <WhatsApp className="size-4" /> Ask about my shortlist
          </a>
          <button type="button" onClick={wishlist.clear} className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 ring-line hover:bg-card">
            <Trash className="size-4" /> Clear
          </button>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <PackageCard key={p.slug} pkg={p} />
        ))}
      </div>
    </>
  );
}

/** "Pick up where you left off" row; renders nothing until the visitor has viewed a package. */
export function RecentlyViewed({ exclude }: { exclude?: string }) {
  const items = recent
    .use()
    .filter((s) => s !== exclude)
    .map(getPackage)
    .filter((p) => p !== undefined)
    .slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section className="container-x mt-24">
      <SectionHeading eyebrow="Recently viewed" title="Pick up where you left off" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <PackageCard key={p.slug} pkg={p} />
        ))}
      </div>
    </section>
  );
}
