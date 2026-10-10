import Image from "next/image";
import Link from "next/link";
import { categoryLabel, getDestination, type TourPackage } from "@/lib/data";
import { formatPrice } from "@/lib/site";
import { CompareButton, WishlistButton } from "./CardActions";
import { Clock, MapPin, Star } from "./icons";

export function PackageCard({ pkg, priority = false }: { pkg: TourPackage; priority?: boolean }) {
  const dest = getDestination(pkg.destination);
  const off = pkg.originalPrice ? Math.round((1 - pkg.price / pkg.originalPrice) * 100) : 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(18,32,46,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">{categoryLabel(pkg.categories[0])}</span>
          {off > 0 && <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">{off}% off</span>}
        </div>
        {/* Actions sit above the title's stretched link so they stay separately clickable. */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton slug={pkg.slug} title={pkg.title} />
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <CompareButton slug={pkg.slug} title={pkg.title} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {dest?.name}
            {dest && dest.region === "International" && !dest.place.includes(dest.name) && ` · ${dest.place}`}
          </span>
          <span className="flex items-center gap-1 font-semibold text-ink">
            <Star className="size-3.5 text-amber-500" /> {pkg.rating.toFixed(1)}
            <span className="font-normal text-muted">({pkg.reviews})</span>
          </span>
        </div>
        <h3 className="mt-2 text-lg font-bold tracking-tight">
          <Link href={`/packages/${pkg.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-1 mb-5 text-sm text-muted">{pkg.route}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Clock className="size-4 text-muted" /> {pkg.days}D / {pkg.days - 1}N
          </span>
          <span className="text-right">
            {pkg.originalPrice && <span className="mr-1.5 text-xs text-muted line-through">{formatPrice(pkg.originalPrice)}</span>}
            <span className="text-lg font-bold">{formatPrice(pkg.price)}</span>
            <span className="block text-[11px] text-muted">per person · EMI from {formatPrice(Math.ceil(pkg.price / 12))}/mo</span>
          </span>
        </div>
      </div>
    </article>
  );
}
