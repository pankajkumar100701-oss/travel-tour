"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";

export function Newsletter() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm">
        <Check className="size-4 text-accent" /> You&apos;re in. Deals land on Fridays.
      </p>
    );
  }

  return (
    <form
      className="flex w-full max-w-md gap-2 rounded-full bg-white/10 p-1.5"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@email.com"
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/50 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-white transition-colors hover:bg-accent-deep"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
