import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, Star, Users, X } from "@/components/icons";
import { PackageCard } from "@/components/PackageCard";
import { RecentlyViewed } from "@/components/SavedTrips";
import { BookingCard, CostCalculator, Departures, TripPlanner } from "@/components/TripPlanner";
import { SectionHeading } from "@/components/ui";
import { categoryLabel, getDestination, getPackage, packages } from "@/lib/data";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const pkg = getPackage((await params).slug);
  if (!pkg) return {};
  return { title: pkg.title, description: pkg.summary };
}

export default async function PackagePage({ params }: PageProps<"/packages/[slug]">) {
  const pkg = getPackage((await params).slug);
  if (!pkg) notFound();
  const dest = getDestination(pkg.destination)!;
  const related = packages.filter((p) => p.slug !== pkg.slug && (p.destination === pkg.destination || p.categories.some((c) => pkg.categories.includes(c)))).slice(0, 3);
  const [main, ...rest] = pkg.gallery;

  return (
    <>
      <div className="container-x pt-6 md:pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/packages" className="hover:text-ink">Packages</Link>
          <span className="mx-2">/</span>
          <Link href={`/destinations/${dest.slug}`} className="hover:text-ink">{dest.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{pkg.title}</span>
        </nav>

        <div className="rise mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              {pkg.categories.map((c) => (
                <Link key={c} href={`/packages?type=${c}`} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-deep">
                  {categoryLabel(c)}
                </Link>
              ))}
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{pkg.title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted">
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {pkg.route}</span>
              <span className="flex items-center gap-1.5 text-ink">
                <Star className="size-4 text-amber-500" /> <b>{pkg.rating.toFixed(1)}</b>
                <span className="text-muted">({pkg.reviews} reviews)</span>
              </span>
            </p>
          </div>
        </div>

        <div className={`mt-6 grid gap-3 ${rest.length ? "md:grid-cols-3 md:grid-rows-2" : ""}`}>
          <div className={`relative aspect-[16/10] overflow-hidden rounded-3xl ${rest.length ? "md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[460px]" : "md:aspect-[21/9]"}`}>
            <Image src={main} alt={pkg.title} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
          </div>
          {rest.map((src, i) => (
            <div key={src} className={`relative hidden aspect-[16/10] overflow-hidden rounded-3xl md:block md:aspect-auto ${rest.length === 1 ? "md:row-span-2" : ""}`}>
              <Image src={src} alt={`${dest.name} — photo ${i + 2}`} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <TripPlanner pkg={pkg}>
        <div className="container-x mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Clock, label: "Duration", value: `${pkg.days} days / ${pkg.days - 1} nights` },
                { icon: Users, label: "Group", value: pkg.groupSize },
                { icon: MapPin, label: "Starts in", value: pkg.route.split(" · ")[0] },
                { icon: Star, label: "Best time", value: dest.bestTime.split(",")[0] },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl bg-card p-4 ring-1 ring-line">
                  <f.icon className="size-5 text-accent" />
                  <dt className="mt-2 text-xs text-muted">{f.label}</dt>
                  <dd className="text-sm font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{pkg.summary}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex gap-3 rounded-2xl bg-sea-soft p-4 text-sm font-medium">
                    <Check className="mt-0.5 size-4 shrink-0 text-sea" /> {h}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight">Day-by-day itinerary</h2>
              <ol className="mt-6">
                {pkg.itinerary.map((d, i) => (
                  <li key={d.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {i < pkg.itinerary.length - 1 && <span className="absolute top-11 bottom-1 left-[21px] w-px bg-line" />}
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white">{i + 1}</span>
                    <div className="pt-1">
                      <p className="text-xs font-semibold tracking-wider text-accent uppercase">Day {i + 1}</p>
                      <h3 className="mt-0.5 text-lg font-bold">{d.title}</h3>
                      <p className="mt-1 leading-relaxed text-muted">{d.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <Departures />

            <section className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-card p-6 ring-1 ring-line">
                <h2 className="text-lg font-bold">What&apos;s included</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {pkg.inclusions.map((x) => (
                    <li key={x} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-sea" /> {x}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-card p-6 ring-1 ring-line">
                <h2 className="text-lg font-bold">Not included</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {pkg.exclusions.map((x) => (
                    <li key={x} className="flex gap-3"><X className="mt-0.5 size-4 shrink-0 text-accent" /> {x}</li>
                  ))}
                </ul>
              </div>
            </section>

            <CostCalculator />
          </div>

          <aside className="lg:col-span-4">
            <BookingCard />
          </aside>
        </div>

      </TripPlanner>

      {related.length > 0 && (
        <section className="container-x mt-24">
          <SectionHeading eyebrow="You may also like" title="Similar trips" action={{ href: "/packages", label: "All packages" }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed exclude={pkg.slug} />
    </>
  );
}
