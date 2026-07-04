"use client";

import { useEffect, useRef } from "react";
import { Logo } from "./ui/Logo";
import { links } from "@/lib/links";

export function Hero() {
  const plateRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight || 1;
        if (plateRef.current) {
          plateRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        }
        if (contentRef.current) {
          const p = Math.min(y / vh, 1); // 0..1 over the first screen
          contentRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 - p * 0.08})`;
          contentRef.current.style.opacity = `${1 - p * 0.9}`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 pt-16 sm:px-8"
    >
      {/* Parallax diamond-plate backdrop, softly masked. */}
      <div
        ref={plateRef}
        aria-hidden
        className="plate-texture pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_45%,black,transparent_75%)]"
      />
      {/* Vignette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_40%,transparent,rgba(8,8,10,0.85))]"
      />

      <div
        ref={contentRef}
        className="mx-auto flex max-w-4xl flex-col items-center text-center will-change-transform"
      >
        {/* Logo with gold sheen sweep. */}
        <div className="relative w-[min(88vw,640px)] overflow-hidden">
          <Logo
            width={1280}
            height={445}
            priority
            className="h-auto w-full drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          />
          <span
            aria-hidden
            className="animate-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-gold-300/40 to-transparent"
          />
        </div>

        <h1 className="mt-10 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-chrome sm:text-5xl">
          Cards, breaks, and the people who love them.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          We are a group of friends pooling our time to move the hobby forward.
          Pull up on Whatnot and watch it happen live.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={links.whatnot}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-linear-to-b from-gold-300 to-gold-700 px-7 py-3 font-display font-semibold tracking-wide text-obsidian shadow-[0_12px_36px_-10px_rgba(201,162,75,0.65)] transition-transform hover:-translate-y-0.5"
          >
            Watch us on Whatnot
          </a>
          <a
            href={links.x}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-chrome-500/40 px-7 py-3 font-display font-semibold tracking-wide text-ink transition-colors hover:border-chrome-300 hover:bg-white/5"
          >
            Follow on X
          </a>
        </div>
      </div>

      {/* Scroll cue. */}
      <div
        aria-hidden
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-ink-muted/60"
      >
        Scroll
      </div>
    </section>
  );
}
