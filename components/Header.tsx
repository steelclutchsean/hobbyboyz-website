"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui/Logo";
import { links, nav } from "@/lib/links";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "glass border-b border-white/10"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center" aria-label="Hobby Boyz home">
          <Logo width={132} height={46} priority className="h-8 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-sm tracking-wide text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={links.whatnot}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-linear-to-b from-gold-300 to-gold-700 px-4 py-2 font-display text-sm font-semibold tracking-wide text-obsidian shadow-[0_8px_24px_-8px_rgba(201,162,75,0.6)] transition-transform hover:-translate-y-0.5"
        >
          Watch Live
        </a>
      </div>
    </header>
  );
}
