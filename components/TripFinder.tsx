"use client";

import { useState } from "react";
import { getDestination, packages, type Category, type TourPackage } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";
import { ArrowRight, Sparkles, WhatsApp } from "./icons";
import { PackageCard } from "./PackageCard";

type Answers = { who?: string; vibe?: string; budget?: string; days?: string; passport?: string };

const questions: { key: keyof Answers; title: string; options: { value: string; label: string; emoji: string }[] }[] = [
  {
    key: "who",
    title: "Who's coming along?",
    options: [
      { value: "solo", label: "Just me", emoji: "🎒" },
      { value: "couple", label: "My partner", emoji: "💑" },
      { value: "family", label: "Family with kids", emoji: "👨‍👩‍👧" },
      { value: "friends", label: "Friends gang", emoji: "🧑‍🤝‍🧑" },
    ],
  },
  {
    key: "vibe",
    title: "What's the dream view?",
    options: [
      { value: "mountains", label: "Snowy mountains", emoji: "🏔️" },
      { value: "beach", label: "Beaches & islands", emoji: "🏝️" },
      { value: "heritage", label: "Forts & culture", emoji: "🏰" },
      { value: "luxury", label: "Pure luxury", emoji: "🥂" },
    ],
  },
  {
    key: "budget",
    title: "Budget per person?",
    options: [
      { value: "25000", label: "Under ₹25k", emoji: "🪙" },
      { value: "50000", label: "₹25k – ₹50k", emoji: "💵" },
      { value: "100000", label: "₹50k – ₹1 lakh", emoji: "💳" },
      { value: "999999", label: "₹1 lakh +", emoji: "💎" },
    ],
  },
  {
    key: "days",
    title: "How many days off?",
    options: [
      { value: "5", label: "A long weekend", emoji: "⚡" },
      { value: "7", label: "About a week", emoji: "🗓️" },
      { value: "10", label: "As long as it takes", emoji: "🌍" },
    ],
  },
  {
    key: "passport",
    title: "Passport ready?",
    options: [
      { value: "india", label: "Stay in India", emoji: "🇮🇳" },
      { value: "any", label: "Happy to fly abroad", emoji: "✈️" },
    ],
  },
];

const vibeCategories: Record<string, Category[]> = {
  mountains: ["adventure"],
  beach: ["beach"],
  heritage: ["heritage"],
  luxury: ["luxury"],
};
const mountainDestinations = ["ladakh", "himachal", "switzerland", "nepal"];
const whoCategories: Record<string, Category[]> = { couple: ["honeymoon"], family: ["family"], friends: ["adventure", "beach"], solo: ["adventure", "heritage"] };

function score(p: TourPackage, a: Answers) {
  let s = 0;
  const dest = getDestination(p.destination)!;
  if (a.vibe && vibeCategories[a.vibe].some((c) => p.categories.includes(c))) s += 30;
  if (a.vibe === "mountains" && mountainDestinations.includes(p.destination)) s += 15;
  if (a.who && whoCategories[a.who].some((c) => p.categories.includes(c))) s += 20;
  const budget = Number(a.budget);
  if (budget) s += p.price <= budget ? 25 : p.price <= budget * 1.25 ? 10 : -20;
  const days = Number(a.days);
  if (days) s += Math.abs(p.days - days) <= 1 ? 15 : Math.abs(p.days - days) <= 3 ? 5 : 0;
  if (a.passport === "india" && dest.region === "International") s -= 60;
  return s + p.rating;
}

export function TripFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= questions.length;

  if (done) {
    const ranked = packages.map((p) => ({ p, s: score(p, answers) })).sort((x, y) => y.s - x.s).slice(0, 3);
    const top = ranked[0].s;
    return (
      <div className="rise">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-accent"><Sparkles className="size-4" /> Your top matches</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">We think you&apos;ll love these</h2>
          </div>
          <button type="button" onClick={() => { setAnswers({}); setStep(0); }} className="rounded-full px-5 py-2.5 text-sm font-semibold ring-1 ring-line hover:bg-card">
            Start over
          </button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map(({ p, s }) => (
            <div key={p.slug}>
              <p className="mb-2 text-sm font-semibold text-sea">{Math.max(60, Math.min(98, Math.round(98 - (top - s) * 0.8)))}% match</p>
              <PackageCard pkg={p} />
            </div>
          ))}
        </div>
        {site.whatsapp && (
        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-lg">Not quite right? Send your answers and a trip designer will build a custom plan.</p>
          <a
            href={whatsappLink(`Hi! I took the trip finder quiz:\n${questions.map((q) => `${q.title} ${q.options.find((o) => o.value === answers[q.key])?.label ?? "-"}`).join("\n")}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold"
          >
            <WhatsApp className="size-5" /> Send my answers
          </a>
        </div>
        )}
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] bg-card p-6 ring-1 ring-line sm:p-10">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Question {step + 1} of {questions.length}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="font-semibold text-ink hover:text-accent">← Back</button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper">
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
      </div>
      <h2 key={q.key} className="rise mt-8 text-3xl font-bold tracking-tight sm:text-4xl">{q.title}</h2>
      <div className={`mt-8 grid gap-3 ${q.options.length === 2 ? "sm:grid-cols-2" : q.options.length === 3 ? "sm:grid-cols-3" : "grid-cols-2"}`}>
        {q.options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => {
              setAnswers({ ...answers, [q.key]: o.value });
              setStep(step + 1);
            }}
            className={`group flex flex-col items-start gap-3 rounded-2xl p-5 text-left ring-1 transition hover:-translate-y-0.5 hover:ring-accent ${answers[q.key] === o.value ? "bg-accent-soft ring-accent" : "ring-line"}`}
          >
            <span className="text-3xl" aria-hidden>{o.emoji}</span>
            <span className="flex w-full items-center justify-between font-semibold">
              {o.label} <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
