import type { Metadata } from "next";
import { ComparePage } from "@/components/ComparePage";
import { Accent, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Compare packages",
  description: "Line up to three packages side by side — price, duration, rating and inclusions.",
};

export default function Compare() {
  return (
    <>
      <PageHero eyebrow="Compare" title={<>Side by side, <Accent>no guesswork</Accent></>} intro="Price, price per day, rating and what's included — the best value in each row is highlighted." />
      <section className="container-x">
        <ComparePage />
      </section>
    </>
  );
}
