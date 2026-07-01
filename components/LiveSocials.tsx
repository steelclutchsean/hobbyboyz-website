import type { ReactNode } from "react";
import { Reveal } from "./ui/Reveal";
import { links } from "@/lib/links";
import { XIcon, YouTubeIcon, EbayIcon, WhatnotIcon } from "./ui/BrandIcons";

type SocialCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  icon: ReactNode;
  iconWrap?: string;
};

function SocialCard({
  href,
  eyebrow,
  title,
  body,
  cta,
  icon,
  iconWrap = "text-chrome-100",
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
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 ${iconWrap}`}
          >
            {icon}
          </span>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-ink-muted">
            {eyebrow}
          </span>
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold text-chrome">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
      </div>
      <span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-gold-gradient">
        {cta}
        <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
      </span>
    </a>
  );
}

const secondary = [
  {
    href: links.ebay,
    eyebrow: "eBay",
    title: "Shop the eBay store",
    body: "Singles, slabs, and sealed. Browse what we have listed at hobbyboyz-llc.",
    cta: "Visit our eBay store",
    icon: <EbayIcon className="h-5 w-auto" />,
  },
  {
    href: links.youtube,
    eyebrow: "YouTube",
    title: "Watch on YouTube",
    body: "Break recaps, big hits, and longer form hobby content when you missed the stream.",
    cta: "Subscribe on YouTube",
    icon: <YouTubeIcon className="h-5 w-5" />,
  },
  {
    href: links.x,
    eyebrow: "X / Twitter",
    title: "Keep up between streams",
    body: "Show times, big hits, and behind the scenes. Follow along and say what's up.",
    cta: "Follow @HobbyBoyz_",
    icon: <XIcon className="h-4 w-4" />,
  },
];

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
            Home base is Whatnot. We post recaps on YouTube, list cards on eBay,
            and keep the conversation going on X. Follow along so you never miss a
            drop.
          </p>
        </Reveal>

        {/* Featured: Whatnot */}
        <Reveal className="mt-14">
          <a
            href={links.whatnot}
            target="_blank"
            rel="noopener"
            className="glass glass-interactive group flex flex-col justify-between gap-8 rounded-2xl p-8 sm:flex-row sm:items-center sm:p-10"
          >
            <div className="flex items-start gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
                <WhatnotIcon className="h-14 w-14 rounded-2xl" />
              </span>
              <div>
                <span className="font-display text-xs uppercase tracking-[0.3em] text-ink-muted">
                  Whatnot
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-chrome">
                  Watch the breaks live
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">
                  This is where it happens. Join the stream, hop in chat, grab a
                  spot, and rip alongside the crew. New shows drop regularly.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-linear-to-b from-gold-300 to-gold-700 px-6 py-3 font-display text-sm font-semibold tracking-wide text-obsidian shadow-[0_12px_36px_-12px_rgba(201,162,75,0.6)] transition-transform group-hover:-translate-y-0.5">
              Open our Whatnot channel
            </span>
          </a>
        </Reveal>

        {/* Secondary platforms */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {secondary.map((s, i) => (
            <Reveal key={s.eyebrow} delay={i * 100}>
              <SocialCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
