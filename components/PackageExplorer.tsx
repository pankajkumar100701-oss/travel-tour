"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, destinations, durations, packages, type Category } from "@/lib/data";
import { Compass, X } from "./icons";
import { PackageCard } from "./PackageCard";

const sorts = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "days", label: "Shortest first" },
];

/** Filters live in the URL so searches from the home page and shared links land on the same results. */
export function PackageExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const dest = params.get("dest") ?? "";
  const type = params.get("type") ?? "";
  const days = params.get("days") ?? "";
  const region = params.get("region") ?? "";
  const sort = params.get("sort") ?? "popular";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "region") next.delete("dest");
    const s = next.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const duration = durations.find((d) => d.value === days);
  const results = packages
    .filter((p) => !dest || p.destination === dest)
    .filter((p) => !type || p.categories.includes(type as Category))
    .filter((p) => !duration || duration.test(p.days))
    .filter((p) => !region || destinations.find((d) => d.slug === p.destination)?.region === region)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "days") return a.days - b.days;
      return b.reviews * b.rating - a.reviews * a.rating;
    });

  const active = [dest, type, days, region].filter(Boolean).length;
  const destOptions = destinations.filter((d) => !region || d.region === region);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-4 border-y border-line bg-paper/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 md:top-[72px] lg:-mx-8 lg:px-8">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
          {[
            { value: "", label: "All" },
            { value: "India", label: "India" },
            { value: "International", label: "International" },
          ].map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => set("region", r.value)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                region === r.value ? "bg-ink text-white" : "bg-card ring-1 ring-line hover:ring-ink/30"
              }`}
            >
              {r.label}
            </button>
          ))}
          <span className="mx-1 h-6 w-px shrink-0 bg-line" />
          <Select label="Destination" value={dest} onChange={(v) => set("dest", v)} options={destOptions.map((d) => ({ value: d.slug, label: d.name }))} />
          <Select label="Trip type" value={type} onChange={(v) => set("type", v)} options={categories.map((c) => ({ value: c.slug, label: c.label }))} />
          <Select label="Duration" value={days} onChange={(v) => set("days", v)} options={durations.map((d) => ({ value: d.value, label: d.label }))} />
          <div className="ml-auto flex shrink-0 items-center gap-2 pl-2">
            <label htmlFor="sort" className="hidden text-sm text-muted lg:block">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => set("sort", e.target.value === "popular" ? "" : e.target.value)}
              className="cursor-pointer rounded-full bg-card px-4 py-2 text-sm font-semibold ring-1 ring-line focus:outline-none focus-visible:ring-ink"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-6 flex items-center justify-between gap-4 text-sm">
        <p className="text-muted">
          <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "trip" : "trips"} found
        </p>
        {active > 0 && (
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="flex items-center gap-1 font-semibold text-accent hover:text-accent-deep">
            <X className="size-4" /> Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <PackageCard key={p.slug} pkg={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-card px-6 py-16 text-center ring-1 ring-line">
          <Compass className="mx-auto size-10 text-accent" />
          <h3 className="mt-4 text-xl font-bold">No trips match those filters</h3>
          <p className="mx-auto mt-2 max-w-md text-muted">Try widening the duration or trip type — or ask us and we&apos;ll design one around your plan.</p>
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
            Show all trips
          </button>
        </div>
      )}
    </>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 focus:outline-none focus-visible:ring-ink ${
        value ? "bg-accent-soft text-accent-deep ring-accent/30" : "bg-card ring-line"
      }`}
    >
      <option value="">{label}: Any</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
