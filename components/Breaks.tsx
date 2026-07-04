"use client";

import { useEffect, useRef, useState } from "react";
import { HoloCard } from "./ui/HoloCard";

const steps = [
  {
    step: "01",
    title: "What a break is",
    body: "We open sealed boxes and cases live, then split the cards by team, division, or spot. You grab a slot, we do the ripping, and everything you hit is yours.",
  },
  {
    step: "02",
    title: "How we run ours",
    body: "Straight and transparent. Every hit shown on camera, every spot called out, no funny business. If you have questions in chat, you get answers.",
  },
  {
    step: "03",
    title: "What to expect",
    body: "A good time and a fair shot. Chill hosts, real reactions, and a room full of people who love this stuff as much as you do. Winners and dubs all night.",
  },
];

export function Breaks() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setActive(i);
          }
        });
      },
      // Only the card crossing the vertical center band counts as active.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    cardRefs.current.forEach((n) => n && observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="breaks" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        {/* Sticky left column: heading + progress */}
        <div className="md:sticky md:top-28 md:h-fit md:self-start md:py-10">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-gradient">
            What we do
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-chrome sm:text-4xl">
            New to breaks? Here is the short version.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
            Buying into breaks on the site is coming later. For now, here is how
            it works when you join us live.
          </p>

          <ol className="mt-10 hidden space-y-1 md:block">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.step} className="flex items-center gap-4 py-2">
                  <span
                    className={`h-px w-10 shrink-0 transition-all duration-500 ${
                      on ? "w-16 bg-gold-500" : "bg-white/15"
                    }`}
                  />
                  <span
                    className={`font-display text-sm tracking-wide transition-colors duration-500 ${
                      on ? "text-ink" : "text-ink-muted/50"
                    }`}
                  >
                    <span
                      className={on ? "text-gold-gradient" : ""}
                    >{`${s.step} `}</span>
                    {s.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right column: step cards that activate as they scroll through center */}
        <div className="flex flex-col gap-8">
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <div
                key={s.step}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[55vh] items-center md:min-h-[70vh]"
              >
                <HoloCard
                  className={`glass w-full rounded-2xl p-8 transition-all duration-500 sm:p-10 ${
                    on
                      ? "border-gold-500/40 opacity-100"
                      : "opacity-45 md:scale-[0.97]"
                  }`}
                >
                  <span className="font-display text-4xl font-semibold tracking-[0.1em] text-gold-gradient">
                    {s.step}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </HoloCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
