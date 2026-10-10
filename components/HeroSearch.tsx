"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories, destinations, durations } from "@/lib/data";
import { Calendar, Compass, MapPin, Search } from "./icons";

const fieldClass =
  "w-full appearance-none bg-transparent pr-2 text-[15px] font-semibold text-ink focus:outline-none cursor-pointer";

export function HeroSearch() {
  const router = useRouter();
  const [dest, setDest] = useState("");
  const [type, setType] = useState("");
  const [days, setDays] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        if (dest) q.set("dest", dest);
        if (type) q.set("type", type);
        if (days) q.set("days", days);
        const s = q.toString();
        router.push(s ? `/packages?${s}` : "/packages");
      }}
      className="grid gap-1 rounded-[28px] bg-white p-2 shadow-[0_30px_60px_-30px_rgba(18,32,46,0.45)] ring-1 ring-line sm:grid-cols-[1fr_1fr_1fr_auto]"
    >
      <Field icon={<MapPin className="size-5" />} label="Where to?" htmlFor="s-dest">
        <select id="s-dest" value={dest} onChange={(e) => setDest(e.target.value)} className={fieldClass}>
          <option value="">Anywhere</option>
          <optgroup label="India">
            {destinations.filter((d) => d.region === "India").map((d) => (
              <option key={d.slug} value={d.slug}>{d.name}</option>
            ))}
          </optgroup>
          <optgroup label="International">
            {destinations.filter((d) => d.region === "International").map((d) => (
              <option key={d.slug} value={d.slug}>{d.name}</option>
            ))}
          </optgroup>
        </select>
      </Field>
      <Field icon={<Compass className="size-5" />} label="Trip type" htmlFor="s-type">
        <select id="s-type" value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
          <option value="">Any style</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label}</option>
          ))}
        </select>
      </Field>
      <Field icon={<Calendar className="size-5" />} label="Duration" htmlFor="s-days">
        <select id="s-days" value={days} onChange={(e) => setDays(e.target.value)} className={fieldClass}>
          <option value="">Any length</option>
          {durations.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </Field>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-[22px] bg-accent px-7 py-4 font-semibold text-white transition-colors hover:bg-accent-deep"
      >
        <Search className="size-5" /> Search trips
      </button>
    </form>
  );
}

function Field({ icon, label, htmlFor, children }: { icon: React.ReactNode; label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] px-4 py-3 transition-colors focus-within:bg-paper hover:bg-paper">
      <span className="text-accent">{icon}</span>
      <div className="min-w-0 flex-1">
        <label htmlFor={htmlFor} className="block text-[11px] font-semibold tracking-wider text-muted uppercase">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
