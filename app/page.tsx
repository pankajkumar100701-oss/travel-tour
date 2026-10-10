import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { DestinationCard } from "@/components/DestinationCard";
import { Faq } from "@/components/Faq";
import { HeroSearch } from "@/components/HeroSearch";
import { ArrowRight, Chat, Columns, Headset, Leaf, Shield, Sparkles, Star, Sun, Wallet } from "@/components/icons";
import { PackageCard } from "@/components/PackageCard";
import { RecentlyViewed } from "@/components/SavedTrips";
import { Testimonials } from "@/components/Testimonials";
import { Accent, Eyebrow, SectionHeading } from "@/components/ui";
import { categories, getDestination, getPackage, img, packages } from "@/lib/data";
import { formatPrice, site } from "@/lib/site";

const stats = [
  { value: "12k+", label: "Happy travellers" },
  { value: "120+", label: "Tested itineraries" },
  { value: "4.9★", label: "Average rating" },
  { value: "24×7", label: "On-trip support" },
];

const reasons = [
  { icon: Wallet, title: "Honest, all-in pricing", body: "The quote you get is the price you pay. Taxes, transfers and permits are already in it." },
  { icon: Headset, title: "A real person on call", body: "One trip manager on WhatsApp from your first question to your last drop." },
  { icon: Shield, title: "Verified stays & drivers", body: "Every hotel and driver is personally checked by our team at least once a year." },
  { icon: Leaf, title: "Local, responsible travel", body: "We work with local guides and homestays so your money stays in the places you visit." },
];

const tools = [
  { href: "/trip-finder", icon: Sparkles, title: "60-second trip finder", body: "Five quick taps about who, budget and vibe — get your three best-matched trips.", cta: "Take the quiz" },
  { href: "/when-to-go", icon: Sun, title: "When to go planner", body: "Pick a month and see which places are at their best, with a season bar for each.", cta: "Find by month" },
  { href: "/compare", icon: Columns, title: "Compare packages", body: "Tap compare on any 3 trips to see price per day, inclusions and ratings side by side.", cta: "Start comparing" },
];

const steps = [
  { title: "Tell us your plan", body: "Share dates, budget and who's travelling — on a call, form or WhatsApp." },
  { title: "Get your itinerary", body: "A trip designer sends a day-by-day plan and an all-in quote within 24 hours." },
  { title: "Tweak, book, pack", body: "Change anything until it feels right. Confirm with 25% and we handle the rest." },
];

export default function Home() {
  const featured = packages.filter((p) => p.featured);
  const spotlight = getPackage("ladakh-bike-expedition")!;
  const bento = ["ladakh", "kerala", "maldives", "rajasthan", "bali"].map((s) => getDestination(s)!);

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-6 md:pt-12">
        <div className="rise grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Tours &amp; holidays since 2014</Eyebrow>
            <h1 className="mt-4 text-[2.75rem] leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Travel more. <Accent>Worry less.</Accent>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-muted">{site.description}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["AK", "RS", "MP", "NJ"].map((x, i) => (
                  <span
                    key={x}
                    className={`grid size-9 place-items-center rounded-full text-xs font-bold ring-2 ring-paper ${
                      ["bg-accent-soft text-accent-deep", "bg-sea-soft text-sea", "bg-amber-100 text-amber-800", "bg-ink text-white"][i]
                    }`}
                  >
                    {x}
                  </span>
                ))}
              </div>
              <p className="text-sm">
                <span className="flex items-center gap-1 font-semibold">
                  <Star className="size-4 text-amber-500" /> 4.9 / 5
                </span>
                <span className="text-muted">from 3,200+ reviews</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image src={img.lakeBoat} alt="Wooden boat on a turquoise mountain lake" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <Link
              href={`/packages/${spotlight.slug}`}
              className="absolute top-4 left-4 hidden items-center gap-3 rounded-2xl bg-white/90 p-2 pr-5 backdrop-blur transition-colors hover:bg-white sm:flex"
            >
              <span className="relative size-12 overflow-hidden rounded-xl">
                <Image src={spotlight.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="text-sm">
                <span className="block text-xs text-muted">Trending this month</span>
                <span className="font-semibold">{spotlight.title}</span> · {formatPrice(spotlight.price)}
              </span>
            </Link>
          </div>
          <div className="relative z-10 mx-auto -mt-28 max-w-5xl px-3 sm:-mt-14 sm:px-8">
            <HeroSearch />
          </div>
        </div>

        <dl className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-y-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Destinations */}
      <section className="container-x mt-24 md:mt-32">
        <SectionHeading
          eyebrow="Popular right now"
          title={<>Places our travellers <Accent>keep coming back</Accent> to</>}
          action={{ href: "/destinations", label: "All destinations" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <DestinationCard dest={bento[0]} tall className="sm:col-span-2 lg:row-span-2" />
          {bento.slice(1).map((d) => (
            <DestinationCard key={d.slug} dest={d} />
          ))}
        </div>
      </section>

      {/* Trip styles */}
      <section className="mt-24 md:mt-32">
        <div className="container-x">
          <SectionHeading eyebrow="Travel your way" title={<>Pick a <Accent>style</Accent>, we&apos;ll do the rest</>} />
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-6 lg:overflow-visible lg:px-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/packages?type=${c.slug}`}
              className="group relative isolate flex aspect-[3/4] w-44 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl p-4 text-white sm:w-52 lg:w-auto"
            >
              <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 16vw, 208px" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="text-lg font-bold">{c.label}</span>
              <span className="text-xs text-white/80">{c.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured packages */}
      <section className="container-x mt-24 md:mt-32">
        <SectionHeading
          eyebrow="Handpicked packages"
          title={<>Trips we&apos;d <Accent>book ourselves</Accent></>}
          intro="Fully planned itineraries with stays, transfers and sightseeing sorted. Every one can be customised."
          action={{ href: "/packages", label: "View all packages" }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </section>

      {/* Planning tools */}
      <section className="container-x mt-24 md:mt-32">
        <SectionHeading eyebrow="Plan smarter" title={<>Tools that make <Accent>deciding easy</Accent></>} intro="Free planners our travellers use before they ever call us." />
        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              className={`group flex flex-col rounded-3xl p-7 ring-1 transition hover:-translate-y-1 ${i === 0 ? "bg-accent text-white ring-accent" : "bg-card ring-line hover:ring-ink/30"}`}
            >
              <span className={`grid size-12 place-items-center rounded-2xl ${i === 0 ? "bg-white/15" : "bg-accent-soft text-accent"}`}>
                <t.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold">{t.title}</h3>
              <p className={`mt-2 flex-1 leading-relaxed ${i === 0 ? "text-white/85" : "text-muted"}`}>{t.body}</p>
              <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
                {t.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <RecentlyViewed />

      {/* Why us */}
      <section className="container-x mt-24 md:mt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={img.roadTrip} alt="Vintage van on a desert road trip" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-2 bottom-6 max-w-[15rem] rounded-3xl bg-white p-5 shadow-xl ring-1 ring-line sm:-right-6">
              <Chat className="size-6 text-accent" />
              <p className="mt-3 text-sm leading-relaxed">
                &ldquo;Our driver in Jaisalmer was booked, so they had a backup at our hotel in 20 minutes.&rdquo;
              </p>
              <p className="mt-2 text-xs text-muted">— Priya, Hyderabad</p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Why travel with us"
              title={<>Like travelling with a friend who <Accent>knows everyone</Accent></>}
              intro="We're a small team of travellers who got tired of hidden charges and call-centre support. So we built the travel company we wanted to book with."
            />
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {reasons.map((r) => (
                <div key={r.title}>
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <r.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-bold">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-x mt-24 md:mt-32">
        <div className="rounded-[2rem] bg-sea-soft px-6 py-14 sm:px-12 md:py-20">
          <SectionHeading eyebrow="How it works" title={<>From idea to itinerary in <Accent>24 hours</Accent></>} />
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="font-serif text-6xl text-sea italic">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section className="container-x mt-24 md:mt-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Good to know" title={<>Questions, <Accent>answered</Accent></>} intro="Still unsure about something? Ask us on WhatsApp — we reply within minutes during office hours." />
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
