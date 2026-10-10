"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, phoneHref, site } from "@/lib/site";
import { wishlist } from "@/lib/store";
import { Heart, Logo, Menu, Phone, X } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-paper/85 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-paper"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="size-8" />
          <span className="text-lg font-bold tracking-tight">
            {site.name}
            <span className="font-serif text-xl font-normal italic text-accent"> {site.suffix}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? "bg-ink text-white" : "text-ink/75 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-3">
          {site.phone && (
          <a href={phoneHref} className="hidden items-center gap-2 text-sm font-medium text-ink/75 hover:text-ink xl:flex">
            <Phone className="size-4" /> {site.phone}
          </a>
          )}
          <SavedLink onClick={() => setOpen(false)} />
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep lg:block"
          >
            Plan my trip
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper md:top-[72px] lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-6" aria-label="Mobile">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-2xl font-semibold tracking-tight"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-accent px-5 py-3.5 text-center font-semibold text-white"
            >
              Plan my trip
            </Link>
            {site.phone && (
            <a href={phoneHref} className="mt-3 flex items-center justify-center gap-2 py-2 text-muted">
              <Phone className="size-4" /> {site.phone}
            </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function SavedLink({ onClick }: { onClick: () => void }) {
  const count = wishlist.use().length;
  return (
    <Link href="/wishlist" onClick={onClick} aria-label={`Saved trips (${count})`} className="relative grid size-10 place-items-center rounded-full hover:bg-ink/5">
      <Heart filled={count > 0} className={`size-5 ${count > 0 ? "text-accent" : ""}`} />
      {count > 0 && (
        <span className="absolute top-0.5 right-0.5 grid min-w-[18px] place-items-center rounded-full bg-ink px-1 text-[10px] leading-[18px] font-bold text-white">{count}</span>
      )}
    </Link>
  );
}
