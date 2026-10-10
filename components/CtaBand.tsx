import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";
import { ArrowRight, WhatsApp } from "./icons";

export function CtaBand() {
  return (
    <section className="container-x mt-24 md:mt-32">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-white sm:px-12 md:py-20">
        <Image src={img.seaOfClouds} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
            Don&apos;t see your dream trip? <em className="font-serif font-normal text-accent">We&apos;ll build it.</em>
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Tell us where, when and who&apos;s coming. A trip designer sends a free, no-obligation itinerary within 24 hours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold transition-colors hover:bg-accent-deep">
              Get a free itinerary <ArrowRight className="size-4" />
            </Link>
            {site.whatsapp && (
            <a
              href={whatsappLink("Hi! I'd like help planning a trip.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 font-semibold backdrop-blur transition-colors hover:bg-white/20"
            >
              <WhatsApp className="size-5" /> Chat on WhatsApp
            </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
