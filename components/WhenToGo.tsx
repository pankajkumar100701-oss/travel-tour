"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { destinations, monthNames, months, startingPrice } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { ArrowUpRight, Sun } from "./icons";

const noop = () => () => {};

export function WhenToGo() {
  // The current month is only known in the browser; the prerendered page starts on November.
  const thisMonth = useSyncExternalStore(noop, () => new Date().getMonth() + 1, () => 11);
  const [picked, setPicked] = useState<number | null>(null);
  const month = picked ?? thisMonth;

  const ideal = destinations.filter((d) => d.bestMonths.includes(month));
  const later = destinations.filter((d) => !d.bestMonths.includes(month));

  return (
    <>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {months.map((m, i) => (
          <button
            key={m}
            type="button"
            aria-pressed={month === i + 1}
            onClick={() => setPicked(i + 1)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${month === i + 1 ? "bg-ink text-white" : "bg-card ring-1 ring-line hover:ring-ink/30"}`}
          >
            {m}
            {i + 1 === thisMonth && <span className="ml-1.5 text-[10px] font-medium opacity-70">now</span>}
          </button>
        ))}
      </div>

      <h2 className="mt-10 flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Sun className="size-6 text-accent" /> Perfect in {monthNames[month - 1]}
        <span className="ml-1 rounded-full bg-sea-soft px-3 py-1 text-sm font-semibold text-sea">{ideal.length}</span>
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ideal.map((d) => (
          <Link key={d.slug} href={`/destinations/${d.slug}`} className="group flex gap-4 rounded-3xl bg-card p-3 ring-1 ring-line transition hover:ring-ink/30">
            <span className="relative size-24 shrink-0 overflow-hidden rounded-2xl">
              <Image src={d.image} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col py-1">
              <span className="flex items-center justify-between gap-2 font-bold">
                {d.name} <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-accent" />
              </span>
              <span className="text-xs text-muted">{d.region === "India" || d.place === d.name ? d.region : d.place}</span>
              <MonthBar best={d.bestMonths} current={month} />
              <span className="mt-auto text-sm">from <b>{formatPrice(startingPrice(d.slug))}</b></span>
            </span>
          </Link>
        ))}
      </div>

      {later.length > 0 && (
        <>
          <h3 className="mt-14 text-lg font-bold">Better another time</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {later.map((d) => (
              <li key={d.slug} className="flex items-center justify-between gap-4 border-b border-line pb-3 text-sm">
                <Link href={`/destinations/${d.slug}`} className="font-semibold hover:text-accent">{d.name}</Link>
                <span className="text-muted">best {d.bestTime.split(",")[0]}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

/** Twelve ticks with the best months filled in. */
export function MonthBar({ best, current }: { best: number[]; current?: number }) {
  return (
    <span className="mt-2 mb-2 flex gap-0.5" aria-label={`Best months: ${best.map((m) => months[m - 1]).join(", ")}`}>
      {months.map((m, i) => (
        <span key={m} title={m} className={`h-1.5 flex-1 rounded-full ${best.includes(i + 1) ? (current === i + 1 ? "bg-accent" : "bg-sea") : "bg-line"}`} />
      ))}
    </span>
  );
}
