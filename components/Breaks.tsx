import { Reveal } from "./ui/Reveal";
import { GlassCard } from "./ui/GlassCard";

const cards = [
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
  return (
    <section id="breaks" className="relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-gradient">
            What we do
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-chrome sm:text-4xl">
            New to breaks? Here is the short version.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Buying into breaks on the site is coming later. For now, here is how
            it works when you join us live.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.step} delay={i * 110}>
              <GlassCard interactive className="h-full p-7">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-gold-gradient">
                  {card.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {card.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
