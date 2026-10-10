import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand } from "@/components/CtaBand";
import { PackageCard } from "@/components/PackageCard";
import { PackageExplorer } from "@/components/PackageExplorer";
import { RecentlyViewed } from "@/components/SavedTrips";
import { Accent, PageHero } from "@/components/ui";
import { packages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tour packages",
  description: "Browse handcrafted holiday packages across India and abroad — filter by destination, trip style and duration.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow={`${packages.length} handcrafted trips`}
        title={<>Find a trip that <Accent>fits you</Accent></>}
        intro="All-in prices per person on twin sharing. Every itinerary can be stretched, shortened or made private."
      />
      <section className="container-x">
        {/* The filters read the URL, so the static shell shows every trip until they hydrate. */}
        <Suspense
          fallback={
            <div className="grid gap-6 pt-[124px] sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          }
        >
          <PackageExplorer />
        </Suspense>
      </section>
      <RecentlyViewed />
      <CtaBand />
    </>
  );
}
