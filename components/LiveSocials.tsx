import type { ReactNode } from "react";
import { Reveal } from "./ui/Reveal";
import { links } from "@/lib/links";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LiveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

type SocialCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  icon: ReactNode;
  featured?: boolean;
};

function SocialCard({
  href,
  eyebrow,
  title,
  body,
  cta,
  icon,
  featured = false,
}: SocialCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="glass glass-interactive group flex h-full flex-col justify-between rounded-2xl p-8"
    >
      <div>
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 ${
              featured ? "text-gold-300" : "text-chrome-100"
            }`}
          >
            {icon}
          </span>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-ink-muted">
            {eyebrow}
          </span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-chrome">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          {body}
        </p>
      </div>
      <span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-gold-gradient">
        {cta}
        <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
      </span>
    </a>
  );
}

export function LiveSocials() {
  return (
    <section id="live" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-gradient">
            Catch us live
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-chrome sm:text-4xl">
            Where it all goes down.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            We go live on Whatnot and keep the conversation going on X. Follow
            both so you never miss a drop.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <SocialCard
              featured
              href={links.whatnot}
              eyebrow="Whatnot"
              title="Watch the breaks live"
              body="This is home base. Join the stream, hop in chat, grab a spot, and rip alongside the crew. New shows drop regularly."
              cta="Open our Whatnot channel"
              icon={<LiveIcon className="h-6 w-6" />}
            />
          </Reveal>
          <Reveal className="md:col-span-2" delay={120}>
            <SocialCard
              href={links.x}
              eyebrow="X / Twitter"
              title="Keep up between streams"
              body="Show times, big hits, and behind the scenes. Follow along and say what's up."
              cta="Follow @HobbyBoyz_"
              icon={<XIcon className="h-5 w-5" />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
