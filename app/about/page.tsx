import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { Testimonials } from "@/components/Testimonials";
import { Accent, PageHero, SectionHeading } from "@/components/ui";
import { img } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `The story and the people behind ${site.name} ${site.suffix}.`,
};

const values = [
  { title: "We go first", body: "No destination goes on the site until someone from the team has travelled it, stayed in the hotels and eaten at the dhabas." },
  { title: "Price it like a friend", body: "One all-in number, broken down line by line. If a cheaper flight shows up, we tell you." },
  { title: "Small is a feature", body: "Group departures cap at 14 people. Private trips get one trip manager, start to finish." },
  { title: "Leave it better", body: "Local guides, homestays and plastic-free camps wherever we can — and a tree planted for every booking." },
];

const team = [
  { name: "Aarav Sharma", role: "Founder · Mountains", initials: "AS" },
  { name: "Meera Nair", role: "Head of trip design", initials: "MN" },
  { name: "Kabir Singh", role: "Adventure lead · Ladakh", initials: "KS" },
  { name: "Zoya Khan", role: "International holidays", initials: "ZK" },
];

const timeline = [
  { year: "2014", text: "Started in Shimla with one Tempo Traveller and weekend trips to Spiti." },
  { year: "2017", text: "First Ladakh bike expedition — 9 riders, 0 breakdowns we couldn't fix." },
  { year: "2020", text: "Rebuilt around private, flexible trips with free date changes." },
  { year: "2023", text: "Launched international holidays to Bali, Dubai and Switzerland." },
  { year: "2026", text: "12,000+ travellers, 120+ itineraries, still answering WhatsApp ourselves." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={<>A small team that <Accent>loves the road</Accent></>}
        intro={`${site.name} started in 2014 as a weekend side project between friends in Shimla. Today we plan trips across India and abroad — but the idea hasn't changed: plan every trip the way we'd plan it for a friend.`}
      />

      <section className="container-x">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:col-span-2 sm:aspect-auto sm:min-h-[420px]">
            <Image src={img.himalayaDusk} alt="Snow peaks at dusk" fill priority sizes="(min-width: 640px) 66vw, 100vw" className="object-cover" />
          </div>
          <div className="grid gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={img.planning} alt="Map, camera and notebook laid out for trip planning" fill sizes="33vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-accent p-6 text-white">
              <p className="text-5xl font-bold tracking-tight">12k+</p>
              <p className="mt-1 text-white/85">travellers since 2014, and most of them came back.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-24">
        <SectionHeading eyebrow="What we believe" title={<>Four promises we <Accent>actually keep</Accent></>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className="rounded-3xl bg-card p-6 ring-1 ring-line">
              <span className="font-serif text-4xl text-accent italic">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="The journey so far" title={<>Twelve years, <Accent>one road</Accent></>} />
          <ol className="space-y-6 border-l border-line pl-6">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-accent ring-4 ring-paper" />
                <p className="font-bold">{t.year}</p>
                <p className="mt-1 text-muted">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHeading eyebrow="The people" title={<>Say hello to the <Accent>team</Accent></>} />
          <ul className="grid grid-cols-2 gap-4">
            {team.map((m, i) => (
              <li key={m.name} className="rounded-3xl bg-card p-5 ring-1 ring-line">
                <span
                  className={`grid size-14 place-items-center rounded-2xl text-lg font-bold ${
                    ["bg-accent-soft text-accent-deep", "bg-sea-soft text-sea", "bg-amber-100 text-amber-800", "bg-ink text-white"][i]
                  }`}
                >
                  {m.initials}
                </span>
                <p className="mt-4 font-bold">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  );
}
