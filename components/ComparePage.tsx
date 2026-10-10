"use client";

import Image from "next/image";
import Link from "next/link";
import { categoryLabel, departuresFor, formatDate, getDestination, getPackage, type TourPackage } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { compare } from "@/lib/store";
import { Check, Columns, Star, X } from "./icons";

type Row = { label: string; render: (p: TourPackage) => React.ReactNode; best?: (ps: TourPackage[]) => string[] };

/** Every package tied for the best value of `metric` (lowest when `low`, else highest). */
const pick = (metric: (p: TourPackage) => number, low = false) => (ps: TourPackage[]) => {
  const values = ps.map(metric);
  const target = low ? Math.min(...values) : Math.max(...values);
  return values.every((v) => v === target) ? [] : ps.filter((_, i) => values[i] === target).map((p) => p.slug);
};

const rows: Row[] = [
  {
    label: "Price per person",
    render: (p) => <span className="text-lg font-bold">{formatPrice(p.price)}</span>,
    best: pick((p) => p.price, true),
  },
  { label: "Price per day", render: (p) => formatPrice(Math.round(p.price / p.days)), best: pick((p) => Math.round(p.price / p.days), true) },
  { label: "Duration", render: (p) => `${p.days} days / ${p.days - 1} nights`, best: pick((p) => p.days) },
  {
    label: "Rating",
    render: (p) => (
      <span className="flex items-center gap-1">
        <Star className="size-4 text-amber-500" /> {p.rating.toFixed(1)} <span className="text-muted">({p.reviews})</span>
      </span>
    ),
    best: pick((p) => p.rating),
  },
  { label: "Destination", render: (p) => getDestination(p.destination)?.name },
  { label: "Route", render: (p) => p.route },
  { label: "Trip style", render: (p) => p.categories.map(categoryLabel).join(", ") },
  { label: "Group", render: (p) => p.groupSize },
  { label: "Next departure", render: (p) => formatDate(departuresFor(p)[0]?.date ?? "") },
  {
    label: "Included",
    render: (p) => (
      <ul className="space-y-1.5">
        {p.inclusions.map((x) => (
          <li key={x} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-sea" /> {x}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Not included",
    render: (p) => (
      <ul className="space-y-1.5 text-muted">
        {p.exclusions.map((x) => (
          <li key={x} className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-accent" /> {x}</li>
        ))}
      </ul>
    ),
  },
];

export function ComparePage() {
  const items = compare.use().map(getPackage).filter((p) => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-card px-6 py-16 text-center ring-1 ring-line">
        <Columns className="mx-auto size-10 text-accent" />
        <h2 className="mt-4 text-xl font-bold">Nothing to compare yet</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">Tap “Compare” on up to {compare.max} package cards and they&apos;ll line up here side by side.</p>
        <Link href="/packages" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">Browse packages</Link>
      </div>
    );
  }

  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[720px] table-fixed border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="w-40 align-bottom" />
            {items.map((p) => (
              <th key={p.slug} className="px-2 pb-4 text-left align-top font-normal">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={p.image} alt={p.title} fill sizes="300px" className="object-cover" />
                  <button
                    type="button"
                    onClick={() => compare.remove(p.slug)}
                    aria-label={`Remove ${p.title}`}
                    className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-white/90 text-ink hover:bg-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <Link href={`/packages/${p.slug}`} className="mt-3 block text-base font-bold hover:text-accent">{p.title}</Link>
              </th>
            ))}
            {Array.from({ length: compare.max - items.length }, (_, i) => (
              <th key={i} className="px-2 pb-4 align-top">
                <Link href="/packages" className="grid aspect-[4/3] place-items-center rounded-2xl border-2 border-dashed border-line text-sm font-semibold text-muted hover:border-ink/30 hover:text-ink">
                  + Add a trip
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const best = items.length > 1 ? (r.best?.(items) ?? []) : [];
            return (
              <tr key={r.label}>
                <th scope="row" className="border-t border-line py-4 pr-4 text-left align-top font-semibold text-muted">{r.label}</th>
                {items.map((p) => (
                  <td key={p.slug} className="border-t border-line px-2 py-4 align-top">
                    <div className={best.includes(p.slug) ? "-m-2 rounded-xl bg-sea-soft p-2" : ""}>
                      {r.render(p)}
                      {best.includes(p.slug) && <span className="mt-1 block text-xs font-semibold text-sea">Best</span>}
                    </div>
                  </td>
                ))}
                {Array.from({ length: compare.max - items.length }, (_, i) => (
                  <td key={i} className="border-t border-line" />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
