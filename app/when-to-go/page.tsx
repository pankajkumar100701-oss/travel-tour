import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Accent, PageHero } from "@/components/ui";
import { WhenToGo } from "@/components/WhenToGo";

export const metadata: Metadata = {
  title: "When to go — month-by-month travel planner",
  description: "Pick a month and see which destinations are at their best — weather, crowds and prices considered.",
};

export default function WhenToGoPage() {
  return (
    <>
      <PageHero eyebrow="Month-by-month planner" title={<>Right place, <Accent>right season</Accent></>} intro="Weather makes or breaks a trip. Pick your travel month and see where it's perfect — and where to save for later." />
      <section className="container-x">
        <WhenToGo />
      </section>
      <CtaBand />
    </>
  );
}
