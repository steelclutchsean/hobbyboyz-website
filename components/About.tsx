import { Reveal } from "./ui/Reveal";
import { GlassCard } from "./ui/GlassCard";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-gradient">
            Who we are
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-chrome sm:text-4xl">
            Collectors first. Always have been.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              Hobby Boyz started the way most good things do, with a few friends
              who could not stop talking about the hobby. We are not a faceless
              shop. We are collectors first, and we run our channel the way we
              would want someone to run it for us.
            </p>
            <p>
              Fair, loud, and fun. We pool our time because the hobby is better
              when the people in it actually care. Pull up a chair and hang out.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/* TODO: real crew photo asset. Placeholder glass tile for now. */}
          <GlassCard className="flex aspect-4/3 items-center justify-center overflow-hidden">
            <div className="plate-texture flex h-full w-full items-center justify-center opacity-70">
              <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 font-display text-xs uppercase tracking-[0.25em] text-ink-muted backdrop-blur">
                Crew photo coming soon
              </span>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
