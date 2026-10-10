"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPackage } from "@/lib/data";
import { compare } from "@/lib/store";
import { ArrowRight, X } from "./icons";

export function CompareTray() {
  const pathname = usePathname();
  const items = compare.use().map(getPackage).filter((p) => p !== undefined);
  if (items.length === 0 || pathname === "/compare") return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mr-16 sm:inset-x-auto sm:left-1/2 sm:mr-0 sm:-translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full bg-ink p-2 pl-3 text-white shadow-2xl shadow-black/30">
        <div className="flex -space-x-2">
          {items.map((p) => (
            <span key={p.slug} className="relative size-9 overflow-hidden rounded-full ring-2 ring-ink">
              <Image src={p.image} alt={p.title} fill sizes="36px" className="object-cover" />
            </span>
          ))}
          {Array.from({ length: compare.max - items.length }, (_, i) => (
            <span key={i} className="size-9 rounded-full border border-dashed border-white/30 bg-ink" />
          ))}
        </div>
        <span className="hidden text-sm sm:block">
          {items.length} of {compare.max} selected
        </span>
        <button type="button" onClick={compare.clear} aria-label="Clear compare" className="grid size-8 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
          <X className="size-4" />
        </button>
        <Link
          href="/compare"
          className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
            items.length > 1 ? "bg-accent hover:bg-accent-deep" : "pointer-events-none bg-white/10 text-white/50"
          }`}
          aria-disabled={items.length < 2}
        >
          Compare <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
