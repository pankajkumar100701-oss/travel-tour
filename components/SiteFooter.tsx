import Link from "next/link";
import { destinations } from "@/lib/data";
import { nav, site } from "@/lib/site";
import { Logo, Mail, MapPin, Phone } from "./icons";
import { Newsletter } from "./Newsletter";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="size-8" />
            <span className="text-lg font-bold tracking-tight">
              {site.name}
              <span className="font-serif text-xl font-normal italic text-accent"> {site.suffix}</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{site.tagline} Handcrafted trips across India and the world since 2014.</p>
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold">Weekly deals in your inbox</p>
            <Newsletter />
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            {[...nav, { href: "/wishlist", label: "Saved trips" }, { href: "/compare", label: "Compare" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold">Popular places</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/65">
            {destinations.slice(0, 10).map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className="hover:text-white">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold">Talk to us</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0" /> {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" /> {site.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.name} {site.suffix}. Demo website — contact details are placeholders. Photos from Unsplash.
          </p>
          <ul className="flex gap-5">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
