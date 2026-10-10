"use client";

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) return `${src}?auto=format&fit=crop&w=${width}&q=${quality || 72}`;
  return src;
}
