import type { Metadata } from "next";
import { TripFinder } from "@/components/TripFinder";
import { Accent, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Trip finder quiz",
  description: "Answer five quick questions and get your three best-matched holiday packages.",
};

export default function TripFinderPage() {
  return (
    <>
      <PageHero eyebrow="60-second trip finder" title={<>Not sure where to go? <Accent>Let&apos;s find out.</Accent></>} intro="Five quick taps — who, what, budget, days and passport — and we'll match you with the trips that fit best." />
      <section className="container-x">
        <TripFinder />
      </section>
    </>
  );
}
