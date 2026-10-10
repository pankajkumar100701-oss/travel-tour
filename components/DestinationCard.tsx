import Image from "next/image";
import Link from "next/link";
import { startingPrice, type Destination } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { ArrowUpRight } from "./icons";

export function DestinationCard({ dest, className = "", tall = false }: { dest: Destination; className?: string; tall?: boolean }) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className={`group relative isolate flex overflow-hidden rounded-3xl bg-ink ${tall ? "min-h-[420px]" : "min-h-[260px]"} ${className}`}
    >
      <Image
        src={dest.image}
        alt={dest.name}
        fill
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>
      <div className="mt-auto w-full p-5 text-white sm:p-6">
        <p className="text-xs font-medium text-white/75">{dest.place}</p>
        <h3 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{dest.name}</h3>
        <div className="mt-2 flex items-center justify-between gap-3 text-sm text-white/85">
          <span className="line-clamp-1">{dest.tagline}</span>
          <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">from {formatPrice(startingPrice(dest.slug))}</span>
        </div>
      </div>
    </Link>
  );
}
