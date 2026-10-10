"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { departuresFor, formatDate, isInternational, type TourPackage } from "@/lib/data";
import { formatPrice, phoneHref, site, whatsappLink } from "@/lib/site";
import { recent } from "@/lib/store";
import { WishlistButton } from "./CardActions";
import { EnquiryForm } from "./EnquiryForm";
import { Calculator, Calendar, Check, Phone, Share, Users, WhatsApp } from "./icons";

const tiers = [
  { value: "standard", label: "Standard", note: "3★ / homestays", factor: 1 },
  { value: "premium", label: "Premium", note: "4★ stays", factor: 1.2 },
  { value: "luxury", label: "Luxury", note: "5★ & boutique", factor: 1.45 },
] as const;

type Tier = (typeof tiers)[number]["value"];

type Plan = {
  pkg: TourPackage;
  departure: string | null;
  setDeparture: (d: string | null) => void;
  adults: number;
  setAdults: (n: number) => void;
  kids: number;
  setKids: (n: number) => void;
  tier: Tier;
  setTier: (t: Tier) => void;
  flights: boolean;
  setFlights: (b: boolean) => void;
  insurance: boolean;
  setInsurance: (b: boolean) => void;
  quote: { lines: { label: string; amount: number }[]; total: number };
};

const PlanContext = createContext<Plan | null>(null);
const usePlan = () => {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <TripPlanner>");
  return ctx;
};

/** Shares departure, travellers and add-ons between the main column and the booking card. */
export function TripPlanner({ pkg, children }: { pkg: TourPackage; children: React.ReactNode }) {
  const [departure, setDeparture] = useState<string | null>(null);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [tier, setTier] = useState<Tier>("standard");
  const [flights, setFlights] = useState(false);
  const [insurance, setInsurance] = useState(false);

  useEffect(() => recent.touch(pkg.slug), [pkg.slug]);

  const quote = useMemo(() => {
    const intl = isInternational(pkg);
    const factor = tiers.find((t) => t.value === tier)!.factor;
    const adultPrice = Math.round(pkg.price * factor * (adults === 1 ? 1.35 : 1));
    const lines = [{ label: `${adults} adult${adults > 1 ? "s" : ""} × ${formatPrice(adultPrice)}${adults === 1 ? " (single room)" : ""}`, amount: adultPrice * adults }];
    if (kids) lines.push({ label: `${kids} child${kids > 1 ? "ren" : ""} (5–11 yrs) at 60%`, amount: Math.round(pkg.price * factor * 0.6) * kids });
    const people = adults + kids;
    if (flights) lines.push({ label: `Return flights (est.) × ${people}`, amount: (intl ? 30000 : 8000) * people });
    if (insurance) lines.push({ label: `Travel insurance × ${people}`, amount: (intl ? 1500 : 500) * people });
    return { lines, total: lines.reduce((s, l) => s + l.amount, 0) };
  }, [pkg, adults, kids, tier, flights, insurance]);

  const value = { pkg, departure, setDeparture, adults, setAdults, kids, setKids, tier, setTier, flights, setFlights, insurance, setInsurance, quote };
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function Departures() {
  const { pkg, departure, setDeparture } = usePlan();
  const list = departuresFor(pkg);
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight">Upcoming departures</h2>
      <p className="mt-1 text-muted">Fixed dates in the best season. Want other dates? Private trips can start any day.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {list.map((d) => {
          const on = departure === d.date;
          return (
            <button
              key={d.date}
              type="button"
              aria-pressed={on}
              onClick={() => setDeparture(on ? null : d.date)}
              className={`flex items-center justify-between gap-3 rounded-2xl p-4 text-left ring-1 transition ${on ? "bg-ink text-white ring-ink" : "bg-card ring-line hover:ring-ink/30"}`}
            >
              <span className="flex items-center gap-3">
                <Calendar className={`size-5 ${on ? "text-accent" : "text-muted"}`} />
                <span>
                  <span className="block font-semibold">{formatDate(d.date)}</span>
                  <span className={`text-xs ${on ? "text-white/70" : "text-muted"}`}>{pkg.days} days · returns {formatDate(addDays(d.date, pkg.days - 1)).replace(/, \d{4}$/, "")}</span>
                </span>
              </span>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${d.seatsLeft <= 4 ? "bg-accent text-white" : on ? "bg-white/15" : "bg-sea-soft text-sea"}`}>
                {d.seatsLeft <= 4 ? `Only ${d.seatsLeft} left` : `${d.seatsLeft} seats left`}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export function CostCalculator() {
  const { pkg, adults, setAdults, kids, setKids, tier, setTier, flights, setFlights, insurance, setInsurance, quote } = usePlan();
  const intl = isInternational(pkg);
  return (
    <section className="mt-12 rounded-3xl bg-card p-6 ring-1 ring-line sm:p-8">
      <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Calculator className="size-6 text-accent" /> Trip cost calculator
      </h2>
      <p className="mt-1 text-muted">Adjust travellers, hotel class and add-ons to see your all-in estimate instantly.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Stepper label="Adults" hint="12+ years" value={adults} min={1} max={12} onChange={setAdults} />
          <Stepper label="Children" hint="5–11 years" value={kids} min={0} max={6} onChange={setKids} />
          <fieldset>
            <legend className="text-sm font-semibold">Hotel class</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {tiers.map((t) => (
                <label key={t.value} className={`cursor-pointer rounded-2xl p-3 text-center ring-1 transition has-focus-visible:ring-2 has-focus-visible:ring-accent ${tier === t.value ? "bg-ink text-white ring-ink" : "ring-line hover:ring-ink/30"}`}>
                  <input type="radio" name="tier" value={t.value} checked={tier === t.value} onChange={() => setTier(t.value)} className="sr-only" />
                  <span className="block text-sm font-semibold">{t.label}</span>
                  <span className={`text-[11px] ${tier === t.value ? "text-white/70" : "text-muted"}`}>{t.note}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="space-y-2">
            <Toggle label={`Add return flights (${intl ? "international" : "domestic"} estimate)`} checked={flights} onChange={setFlights} />
            <Toggle label="Add travel insurance" checked={insurance} onChange={setInsurance} />
          </div>
        </div>

        <div className="flex flex-col rounded-2xl bg-paper p-5">
          <ul className="space-y-2.5 text-sm">
            {quote.lines.map((l) => (
              <li key={l.label} className="flex justify-between gap-4">
                <span className="text-muted">{l.label}</span>
                <span className="font-medium">{formatPrice(l.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="font-semibold">Estimated total</span>
            <span className="text-2xl font-bold tracking-tight">{formatPrice(quote.total)}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl bg-white p-2.5">
              <span className="block text-muted">Book with 25%</span>
              <span className="text-sm font-bold">{formatPrice(Math.round(quote.total * 0.25))}</span>
            </div>
            <div className="rounded-xl bg-white p-2.5">
              <span className="block text-muted">6-month EMI</span>
              <span className="text-sm font-bold">{formatPrice(Math.ceil(quote.total / 6))}</span>
            </div>
            <div className="rounded-xl bg-white p-2.5">
              <span className="block text-muted">12-month EMI</span>
              <span className="text-sm font-bold">{formatPrice(Math.ceil(quote.total / 12))}</span>
            </div>
          </div>
          <p className="mt-auto pt-4 text-[11px] leading-relaxed text-muted">Estimate only — taxes included, flight fares vary by date. No-cost EMI on select credit cards. Your trip designer confirms the final price.</p>
        </div>
      </div>
    </section>
  );
}

function Stepper({ label, hint, value, min, max, onChange }: { label: string; hint: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="text-xs text-muted">{hint}</span>
      </span>
      <span className="flex items-center gap-1 rounded-full p-1 ring-1 ring-line">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="grid size-8 place-items-center rounded-full text-lg hover:bg-paper disabled:opacity-30">−</button>
        <span className="w-6 text-center font-semibold tabular-nums" aria-live="polite">{value}</span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="grid size-8 place-items-center rounded-full text-lg hover:bg-paper disabled:opacity-30">+</button>
      </span>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl p-3 ring-1 ring-line has-focus-visible:ring-2 has-focus-visible:ring-accent">
      <span className="text-sm">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-line transition-colors peer-checked:bg-accent after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}

export function BookingCard() {
  const { pkg, departure, adults, kids, tier, flights, insurance, quote } = usePlan();
  const [copied, setCopied] = useState(false);

  const details = [
    departure && `Departure: ${formatDate(departure)}`,
    `Hotel class: ${tiers.find((t) => t.value === tier)!.label}`,
    flights && "Include flights",
    insurance && "Include travel insurance",
    `Estimated total: ${formatPrice(quote.total)}`,
  ].filter((x): x is string => Boolean(x));

  const share = async () => {
    const data = { title: pkg.title, text: `${pkg.title} — ${pkg.route}`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="rounded-3xl bg-card p-6 shadow-[0_24px_48px_-28px_rgba(18,32,46,0.35)] ring-1 ring-line lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Starting from</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
            <span className="text-3xl font-bold tracking-tight">{formatPrice(pkg.price)}</span>
            {pkg.originalPrice && <span className="text-muted line-through">{formatPrice(pkg.originalPrice)}</span>}
          </p>
          <p className="text-xs text-muted">per person on twin sharing, taxes included</p>
        </div>
        <div className="flex gap-1.5">
          <button type="button" onClick={share} aria-label="Share this trip" className="grid size-9 place-items-center rounded-full ring-1 ring-line hover:bg-paper">
            <Share className="size-[18px]" />
          </button>
          <WishlistButton slug={pkg.slug} title={pkg.title} className="ring-1 ring-line" />
        </div>
      </div>
      {copied && <p className="mt-2 text-xs font-semibold text-sea">Link copied!</p>}

      <div className="mt-5 space-y-2 rounded-2xl bg-paper p-4 text-sm">
        <p className="flex items-center gap-2">
          <Calendar className="size-4 text-muted" />
          {departure ? <b>{formatDate(departure)}</b> : <span className="text-muted">Pick a departure date or tell us yours</span>}
        </p>
        <p className="flex items-center gap-2">
          <Users className="size-4 text-muted" /> {adults} adult{adults > 1 ? "s" : ""}{kids ? `, ${kids} child${kids > 1 ? "ren" : ""}` : ""}
        </p>
        <p className="flex items-center justify-between gap-2 border-t border-line pt-2">
          <span className="flex items-center gap-2"><Check className="size-4 text-sea" /> Estimated total</span>
          <b>{formatPrice(quote.total)}</b>
        </p>
      </div>

      <div className="mt-5">
        <EnquiryForm packageTitle={pkg.title} compact details={details} travellers={String(adults + kids)} hideDate={Boolean(departure)} />
      </div>
      {(site.phone || site.whatsapp) && (
      <div className={`mt-5 grid gap-2 border-t border-line pt-5 text-sm font-semibold ${site.phone && site.whatsapp ? "grid-cols-2" : ""}`}>
        {site.phone && (
        <a href={phoneHref} className="flex items-center justify-center gap-2 rounded-full py-2.5 ring-1 ring-line hover:bg-paper">
          <Phone className="size-4" /> Call
        </a>
        )}
        {site.whatsapp && (
        <a
          href={whatsappLink([`Hi! I'm interested in the ${pkg.title} package.`, ...details].join("\n"))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full py-2.5 ring-1 ring-line hover:bg-paper"
        >
          <WhatsApp className="size-4 text-[#25D366]" /> WhatsApp
        </a>
        )}
      </div>
      )}
    </div>
  );
}
