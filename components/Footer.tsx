import { Logo } from "./ui/Logo";
import { links } from "@/lib/links";

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-auto border-t border-white/10 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <Logo width={150} height={52} className="h-9 w-auto opacity-90" />

        <div className="flex items-center gap-6 font-display text-sm tracking-wide">
          <a
            href={links.whatnot}
            target="_blank"
            rel="noopener"
            className="text-ink-muted transition-colors hover:text-ink"
          >
            Whatnot
          </a>
          <a
            href={links.x}
            target="_blank"
            rel="noopener"
            className="text-ink-muted transition-colors hover:text-ink"
          >
            X / Twitter
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-ink-muted/70 md:flex-row">
        <p>&copy; {year} Hobby Boyz. All rights reserved.</p>
        <p>Built by the crew, for the hobby.</p>
      </div>
    </footer>
  );
}
