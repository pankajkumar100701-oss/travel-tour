import { testimonials } from "@/lib/data";
import { Star } from "./icons";
import { Accent, SectionHeading } from "./ui";

const initials = (name: string) =>
  name
    .replace(/^The /, "")
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

export function Testimonials() {
  return (
    <section className="container-x mt-24 md:mt-32">
      <SectionHeading eyebrow="Traveller stories" title={<>Loved by <Accent>12,000+</Accent> travellers</>} intro="4.9 average across Google and TripAdvisor. A few recent notes from people who just got back." />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <figure key={t.name} className={`flex flex-col rounded-3xl p-7 ring-1 ring-line sm:p-8 ${i % 3 === 0 ? "bg-ink text-white ring-ink" : "bg-card"}`}>
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: 5 }, (_, k) => (
                <Star key={k} className="size-4" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent-deep">{initials(t.name)}</span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className={`text-sm ${i % 3 === 0 ? "text-white/60" : "text-muted"}`}>
                  {t.city} · {t.trip}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
