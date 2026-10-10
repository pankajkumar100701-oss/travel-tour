import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { DestinationCard } from "@/components/DestinationCard";
import { Accent, PageHero, SectionHeading } from "@/components/ui";
import { destinations, type Region } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations",
  description: "From Ladakh and Kerala to Bali and Switzerland — explore the places we know best.",
};

const groups: { region: Region; title: React.ReactNode; intro: string }[] = [
  { region: "India", title: <>Incredible <Accent>India</Accent></>, intro: "Mountains, backwaters, deserts and islands — no passport required." },
  { region: "International", title: <>Across the <Accent>border</Accent></>, intro: "Short-haul favourites and once-in-a-lifetime trips, visas handled." },
];

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${destinations.length} destinations`}
        title={<>Where do you want to <Accent>wake up</Accent> next?</>}
        intro="Every destination here is one we've travelled ourselves, with partners we trust on the ground."
      />
      {groups.map((g) => (
        <section key={g.region} className="container-x mt-8 mb-20">
          <SectionHeading eyebrow={g.region} title={g.title} intro={g.intro} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations
              .filter((d) => d.region === g.region)
              .map((d) => (
                <DestinationCard key={d.slug} dest={d} className="min-h-[340px]" />
              ))}
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
