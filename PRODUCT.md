# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people evaluating Chatchai "Dia" Danrungruang's creative development work — mostly visitors who arrived from a shared / bio link and are browsing casually to get a sense of what he makes and how. There is no single required action; the visit succeeds if they leave with a clear feel for his range and taste. Freelance clients and recruiters are secondary audiences that the Services / Contact / FAQ pages serve, but they are not the design target.

## Product Purpose

A personal portfolio and link-in-bio for a creative developer. It exists to show work and range — front-end web, browser mini-games, and UI/UX — and to leave a memorable impression of how he builds. Success means the visitor *experiences* the craft, not just reads a list of it. No hard conversion goal.

## Positioning

Two claims a generic developer portfolio cannot truthfully copy:

1. **The site is the demo.** It's an interactive pixel-art world with real, playable mini-games built into the page. It proves the skill by being made of it rather than describing it.
2. **One person across web, game development (Unity), and UI/UX**, with delivered products behind the claims (Lemony Shop e-commerce; Rules of Horror thesis game).

## Operating Context

- Reached mostly via a shared link / bio link; the first view is often mobile.
- Multi-page site: **Home** (the showcase), **Showreel** (long storytelling scroll), **Bio** (link-in-bio card), **Portfolio** (works grid), **Services**, **FAQ**, **Contact**.
- The **Portfolio / works zone is the substantive content** — the actual portfolio. The home page's playable mini-games (`TechBreakout`, `SpaceShooterMiniGame`) are deliberate gimmicks / atmosphere, **not** portfolio entries.
- Content is **Thai-primary**; English is used for section labels, navigation, and SEO metadata.
- Deployed on Vercel at `https://nanonc4-portfolio.vercel.app` (live, current).

## Capabilities and Constraints

- Front-end only. Project data is hardcoded in `data/projects.ts`; no CMS or backend.
- Stack: Next.js 16 (App Router), React 19, Tailwind v4, Framer Motion, Lenis smooth scroll, TypeScript. `AGENTS.md` warns this Next.js version has breaking changes vs. common knowledge — check `node_modules/next/dist/docs/` before writing Next code.
- Two hand-built HTML5-canvas mini-games (`TechBreakout`, `SpaceShooterMiniGame`) are Chatchai's own code and are genuinely playable.
- Naming: **NANONC4** = handle / gamer tag (nav brand, socials); **Chatchai Danrungruang** = real name (intro, metadata); **Dia** = nickname used in the hero. All fixed.
- Undecided: whether the site stays Thai-primary or becomes bilingual TH/EN.

## Brand Commitments

- The name / handle / nickname system above is fixed.
- Aesthetic direction is binding per `DEVLOG.md`: **"Modern UI fused with retro pixel-art,"** dark midnight palette, custom pixel-art elements drawn in code (starfield, crescent moon, pixel icons). Do not flatten this toward a generic dev-portfolio look. Recorded as a constraint only; the visual world itself is decided in later work.
- Voice: casual, first-person, warm, Thai; playful rather than corporate.

## Evidence on Hand

- **Real:** the two shipped projects — Lemony Shop / Lemony Shop Pro (e-commerce; `github.com/NANONC4`; live demo links) and Rules of Horror (Unity thesis game; Google Drive build + design doc). The home-page mini-games (playable, own code). The live deployed URL.
- **Sample / mock:** the bio-portfolio entries in `data/projects.ts` (Lemony, Dinino) are illustrative, not client work.
- **Not verified as real:** the client reviews on `/contact` (คุณ P\*\*\*, A\*\*\*, S\*\*\*, all 5 stars) and the polished project stat/description copy. Treat as placeholder until Chatchai confirms; future work must not present them as genuine testimonials or fabricate new ones.
- **Missing:** actual screenshots for the portfolio projects — `data/projects.ts` references `/images/*` files that do not exist. Do not invent imagery; use clearly-marked placeholders until real assets are supplied.

## Product Principles

1. **Show, don't list.** Let the visitor feel the craft — interaction, motion, playable pieces — rather than enumerate it.
2. **Division of labour:** the works zone carries the substance; the home page carries the personality. Preserve it.
3. **The aesthetic is load-bearing identity, not a skin.** Every new surface honours pixel-art-meets-modern.
4. **Legibility beats spectacle where there is something to read;** expression leads where it can.
5. **Never fabricate proof** — no invented clients, reviews, metrics, or screenshots. Placeholders stay visibly placeholders.

## Accessibility & Inclusion

Heavy motion and canvas animation throughout. Honour `prefers-reduced-motion` on every animated surface (the newer components already do). No other product-specific requirement established.
