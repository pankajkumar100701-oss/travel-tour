import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { DestinationCard } from "@/components/DestinationCard";
import { Calendar, Check, Clock, Coins, Language, MapPin, Passport, Plane } from "@/components/icons";
import { PackingList } from "@/components/PackingList";
import { PackageCard } from "@/components/PackageCard";
import { SectionHeading } from "@/components/ui";
import { MonthBar } from "@/components/WhenToGo";
import { destinations, getDestination, months, packagesFor } from "@/lib/data";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const dest = getDestination((await params).slug);
  if (!dest) return {};
  return { title: `${dest.name} tour packages`, description: dest.about };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const dest = getDestination((await params).slug);
  if (!dest) notFound();
  const trips = packagesFor(dest.slug);
  const more = destinations.filter((d) => d.region === dest.region && d.slug !== dest.slug).slice(0, 3);

  return (
    <>
      <section className="container-x pt-6 md:pt-8">
        <div className="relative isolate flex min-h-[460px] items-end overflow-hidden rounded-[2rem] md:min-h-[540px]">
          <Image src={dest.image} alt={dest.name} fill priority sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="rise p-6 text-white sm:p-10 md:p-14">
            <nav aria-label="Breadcrumb" className="text-sm text-white/75">
              <Link href="/destinations" className="hover:text-white">Destinations</Link>
              <span className="mx-2">/</span>
              {dest.region}
            </nav>
            <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">{dest.name}</h1>
            <p className="mt-3 max-w-xl text-lg text-white/85">{dest.tagline}</p>
          </div>
        </div>
      </section>

      <section className="container-x mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold tracking-tight">About {dest.name}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{dest.about}</p>
          <h3 className="mt-10 text-lg font-bold">Don&apos;t miss</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {dest.thingsToDo.map((t) => (
              <li key={t} className="flex gap-3 rounded-2xl bg-card p-4 text-sm font-medium ring-1 ring-line">
                <Check className="mt-0.5 size-4 shrink-0 text-sea" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 lg:col-span-5">
          <dl className="space-y-5 rounded-3xl bg-ink p-7 text-white">
            {[
              { icon: MapPin, label: "Location", value: dest.place },
              { icon: Clock, label: "Ideal trip length", value: dest.idealDays },
              { icon: Passport, label: "Visa & permits", value: dest.facts.visa },
              { icon: Plane, label: "Getting there", value: dest.facts.flight },
              { icon: Coins, label: "Currency", value: dest.facts.currency },
              { icon: Language, label: "Language", value: dest.facts.language },
            ].map((f) => (
              <div key={f.label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-accent">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <dt className="text-sm text-white/60">{f.label}</dt>
                  <dd className="font-semibold">{f.value}</dd>
                </div>
              </div>
            ))}
            <div className="border-t border-white/10 pt-5">
              <dt className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="size-4 text-accent" /> Best time · {dest.bestTime}
              </dt>
              <dd>
                <MonthBar best={dest.bestMonths} />
                <span className="flex justify-between text-[10px] text-white/50">
                  {months.map((m) => (
                    <span key={m}>{m[0]}</span>
                  ))}
                </span>
              </dd>
            </div>
          </dl>
          <PackingList slug={dest.slug} items={dest.packing} />
        </div>
      </section>

      <section className="container-x mt-20">
        <SectionHeading eyebrow={`${trips.length} ${trips.length === 1 ? "package" : "packages"}`} title={`${dest.name} trips`} action={{ href: `/packages?dest=${dest.slug}`, label: "Filter & compare" }} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </section>

      <section className="container-x mt-20">
        <SectionHeading eyebrow="Keep exploring" title={`More in ${dest.region === "India" ? "India" : "the world"}`} action={{ href: "/destinations", label: "All destinations" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((d) => (
            <DestinationCard key={d.slug} dest={d} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
