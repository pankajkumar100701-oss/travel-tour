import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase ${className}`}>
      <span className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">{title}</h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-white md:self-auto"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

/** Serif italic accent for a word inside a heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal text-accent">{children}</em>;
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: string; children?: ReactNode }) {
  return (
    <section className="container-x pt-10 pb-10 md:pt-16 md:pb-14">
      <div className="rise max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.05]">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
