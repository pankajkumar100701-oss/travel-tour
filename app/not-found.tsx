import Link from "next/link";
import { Compass } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-28 text-center">
      <Compass className="size-14 text-accent" />
      <p className="mt-6 font-serif text-2xl text-muted italic">404</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">Looks like you&apos;re off the map</h1>
      <p className="mt-4 max-w-md text-muted">The page you were looking for has moved or never existed. Let&apos;s get you back on route.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">Back home</Link>
        <Link href="/packages" className="rounded-full px-6 py-3 font-semibold ring-1 ring-line hover:bg-card">Browse packages</Link>
      </div>
    </section>
  );
}
