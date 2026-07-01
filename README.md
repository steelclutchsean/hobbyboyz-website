# Hobby Boyz

Marketing site for Hobby Boyz, a crew of friends in the trading-card hobby who run a
Whatnot channel and an X page. Dark neo-minimalist glass UX, chrome-and-gold palette pulled
from the logo. v0/v1 is a single-page site with no e-commerce.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first config in `app/globals.css`)

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

- `app/layout.tsx` — fonts (Chakra Petch / Inter), metadata, Open Graph
- `app/globals.css` — palette, `.glass` utilities, chrome/gold gradients, animations
- `app/page.tsx` — assembles the sections
- `components/` — `Header`, `Hero`, `About`, `Breaks`, `LiveSocials`, `Footer` and `components/ui/*`
- `lib/links.ts` — single source of truth for the Whatnot and X URLs
- `public/brand/` — logo assets (source art kept in `logos/`)

## Editing content

- Outbound links: `lib/links.ts`
- Marketing copy: inline in each component under `components/`
- Placeholders (crew photo, etc.) are marked with `TODO` and styled glass tiles

## Not in v0/v1

Any commerce (break signups, merch store, payments, accounts). The Breaks and Live sections
are built so these slot in later without a rewrite.
