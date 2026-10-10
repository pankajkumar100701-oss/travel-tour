import type { Metadata } from "next";
import { SavedTrips } from "@/components/SavedTrips";
import { Accent, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Saved trips",
  description: "Your shortlisted packages, saved on this device.",
};

export default function WishlistPage() {
  return (
    <>
      <PageHero eyebrow="Your shortlist" title={<>Saved <Accent>trips</Accent></>} intro="Everything you've hearted, in one place. Share the shortlist with us and we'll help you choose." />
      <section className="container-x">
        <SavedTrips />
      </section>
    </>
  );
}
