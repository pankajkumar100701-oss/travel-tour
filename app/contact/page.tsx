import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq } from "@/components/Faq";
import { Clock, Mail, MapPin, Phone, WhatsApp } from "@/components/icons";
import { Accent, PageHero, SectionHeading } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan your trip",
  description: "Tell us where you want to go and get a free, no-obligation itinerary within 24 hours.",
};

export default function ContactPage() {
  const channels = [
    { icon: WhatsApp, label: "WhatsApp", value: "Fastest reply", href: whatsappLink("Hi! I'd like to plan a trip.") },
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Plan your trip"
        title={<>Let&apos;s plan something <Accent>great</Accent></>}
        intro="Share a few details and a trip designer will send a day-by-day itinerary with an all-in quote — usually within a few hours, always within 24."
      />

      <section className="container-x grid gap-8 lg:grid-cols-12">
        <div className="rounded-[2rem] bg-card p-6 ring-1 ring-line sm:p-10 lg:col-span-7">
          <h2 className="text-2xl font-bold tracking-tight">Tell us about your trip</h2>
          <p className="mt-1 mb-6 text-muted">Takes under a minute. No payment needed.</p>
          <EnquiryForm />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-3xl bg-card p-5 ring-1 ring-line transition hover:ring-ink/30"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <c.icon className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">{c.label}</span>
                <span className="block truncate font-semibold">{c.value}</span>
              </span>
            </a>
          ))}
          <div className="rounded-3xl bg-ink p-6 text-white">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold">Visit our office</span>
                <span className="text-sm text-white/70">{site.address}</span>
              </span>
            </p>
            <p className="mt-4 flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>
                <span className="block font-semibold">Office hours</span>
                <span className="text-sm text-white/70">{site.hours} · 24×7 support on trip</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title={<>Before you <Accent>ask</Accent></>} />
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
