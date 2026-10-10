import { faqs } from "@/lib/data";
import { Plus } from "./icons";

export function Faq() {
  return (
    <div className="divide-y divide-line rounded-3xl bg-card px-6 ring-1 ring-line sm:px-8">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-6 text-left font-semibold">
            {f.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper transition-transform duration-300 group-open:rotate-45">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="mt-3 pr-10 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
