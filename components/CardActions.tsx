"use client";

import { compare, wishlist } from "@/lib/store";
import { Columns, Heart } from "./icons";

export function WishlistButton({ slug, title, className = "" }: { slug: string; title: string; className?: string }) {
  const saved = wishlist.use().includes(slug);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved trips` : `Save ${title}`}
      onClick={() => wishlist.toggle(slug)}
      className={`grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105 ${saved ? "text-accent" : "text-ink"} ${className}`}
    >
      <Heart filled={saved} className="size-[18px]" />
    </button>
  );
}

export function CompareButton({ slug, title }: { slug: string; title: string }) {
  const list = compare.use();
  const on = list.includes(slug);
  const full = !on && list.length >= compare.max;
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={full}
      title={full ? `You can compare up to ${compare.max} trips` : undefined}
      aria-label={on ? `Remove ${title} from compare` : `Add ${title} to compare`}
      onClick={() => compare.toggle(slug)}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur transition disabled:cursor-not-allowed disabled:opacity-60 ${
        on ? "bg-ink text-white" : "bg-white/90 text-ink hover:bg-white"
      }`}
    >
      <Columns className="size-3.5" /> {on ? "Comparing" : "Compare"}
    </button>
  );
}
