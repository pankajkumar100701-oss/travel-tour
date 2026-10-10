"use client";

import { useState } from "react";
import { destinations } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";
import { Check, WhatsApp } from "./icons";

const input =
  "w-full rounded-2xl bg-paper px-4 py-3 text-[15px] ring-1 ring-line transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-accent focus:outline-none";

/** Demo form: there is no backend, so a submission turns into a pre-filled WhatsApp message. */
export function EnquiryForm({
  packageTitle,
  compact = false,
  details = [],
  travellers,
  hideDate = false,
}: {
  packageTitle?: string;
  compact?: boolean;
  /** Extra lines (chosen departure, add-ons…) appended to the message. */
  details?: string[];
  travellers?: string;
  hideDate?: boolean;
}) {
  const [sent, setSent] = useState<string | null>(null);

  if (sent) {
    return (
      <div className="py-4 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-sea-soft text-sea">
          <Check className="size-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold">Request received!</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">A trip designer will call you within a few working hours.{site.whatsapp && " Want a faster reply?"}</p>
        {site.whatsapp && (
        <a
          href={whatsappLink(sent)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
        >
          <WhatsApp className="size-5" /> Send on WhatsApp
        </a>
        )}
        <button type="button" onClick={() => setSent(null)} className="mt-3 block w-full text-sm text-muted underline-offset-4 hover:underline">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const v = (k: string) => String(f.get(k) ?? "").trim();
        const lines = [
          `Hi! I'd like a quote${packageTitle ? ` for "${packageTitle}"` : ""}.`,
          `Name: ${v("name")}`,
          `Phone: ${v("phone")}`,
          v("destination") && `Destination: ${v("destination")}`,
          v("month") && `Travel month: ${v("month")}`,
          `Travellers: ${v("travellers")}`,
          ...details,
          v("message") && `Notes: ${v("message")}`,
        ].filter(Boolean);
        setSent(lines.join("\n"));
      }}
    >
      <label className="sr-only" htmlFor="e-name">Full name</label>
      <input id="e-name" name="name" required autoComplete="name" placeholder="Full name" className={input} />
      <label className="sr-only" htmlFor="e-phone">Phone number</label>
      <input id="e-phone" name="phone" required type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+\s-]{10,15}" placeholder="Phone / WhatsApp" className={input} />
      {!packageTitle && (
        <>
          <label className="sr-only" htmlFor="e-dest">Destination</label>
          <select id="e-dest" name="destination" defaultValue="" className={`${input} cursor-pointer`}>
            <option value="">Where would you like to go?</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>{d.name}</option>
            ))}
            <option value="Not sure yet">Not sure yet — suggest something</option>
          </select>
        </>
      )}
      <div className={`grid gap-3 ${hideDate ? "" : "grid-cols-2"}`}>
        <div className={hideDate ? "hidden" : ""}>
          <label className="mb-1 block pl-1 text-xs font-medium text-muted" htmlFor="e-month">Travel month</label>
          <input id="e-month" name="month" type="month" className={input} />
        </div>
        <div>
          <label className="mb-1 block pl-1 text-xs font-medium text-muted" htmlFor="e-trav">Travellers</label>
          <select id="e-trav" name="travellers" key={travellers} defaultValue={travellers ?? "2"} className={`${input} cursor-pointer`}>
            {[...new Set(["1", "2", "3", "4", "5", "6", ...(travellers ? [travellers] : []), "7 – 10", "10+"])].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
      {!compact && (
        <>
          <label className="sr-only" htmlFor="e-msg">Anything else?</label>
          <textarea id="e-msg" name="message" rows={4} placeholder="Budget, interests, special occasions…" className={`${input} resize-none`} />
        </>
      )}
      <button type="submit" className="mt-1 rounded-full bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-deep">
        {packageTitle ? "Request a free quote" : "Get my free itinerary"}
      </button>
      <p className="text-center text-xs text-muted">No spam. No payment needed to get a quote.</p>
    </form>
  );
}
