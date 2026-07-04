import Image from "next/image";
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
          <GlassCard className="relative aspect-4/3 overflow-hidden p-0">
            <Image
              src="/brand/crew.png"
              alt="The Hobby Boyz crew opening card packs together"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Subtle bottom fade to blend the art into the dark UI. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-obsidian/60 via-transparent to-transparent"
            />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
