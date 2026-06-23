# Kind Humanitarian Initiative — Website

Marketing site for **Kind Humanitarian Initiative (KHI)**, an Abuja, Nigeria nonprofit working in education & scholarships, health & hygiene, food relief, and youth leadership.

Built with **Next.js 16 (App Router)** · **TypeScript (strict)** · **Tailwind CSS v4** · **shadcn/ui on Base UI** · **React 19** · **Framer Motion**. Content is typed and in-repo (Path A) under `content/`.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (incl. `jsx-a11y`) |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run format` | Prettier (with Tailwind class sorting) |

Maintenance scripts (run with `node`): `scripts/optimize-assets.mjs` (regenerate PWA icons + compress images), `scripts/run-lighthouse.mjs`, `scripts/run-axe.mjs` (audit a running prod server).

---

## Environment variables

Create `.env.local` (and set the same in your host). Nothing is required to run or build; these enable live features.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | For form delivery | Sends Contact / Volunteer / newsletter submissions via [Resend](https://resend.com) to `info@khinitiative.org`. **Until set, forms validate and show a friendly error — never a fake success.** |
| `EMAIL_FROM` | With Resend | Verified sender, e.g. `KHI <noreply@khinitiative.org>`. The sending domain must be verified in Resend. |

Email delivery is provider-agnostic — swap [`lib/email.ts`](lib/email.ts) for Formspree or another provider in one place. Donations use **Paystack redirect** links configured in [`content/donate.ts`](content/donate.ts) (no key needed).

---

## Deploy (Vercel)

1. Import this repo in Vercel — it auto-detects Next.js 16 (build `next build`, no extra config).
2. Add the env vars above in **Project → Settings → Environment Variables**.
3. Point your domain at the project, then set `site.url` in [`content/site.ts`](content/site.ts) to the final domain (drives `metadataBase`, canonicals, sitemap, and OG URLs).
4. Vercel **Analytics** + **Speed Insights** are already wired (`app/layout.tsx`) and activate automatically on Vercel.

---

## Project structure

```
app/                 # App Router: (site) route group, layouts, sitemap/robots/manifest, OG images
components/
  ui/                # shadcn primitives (Base UI)
  layout/            # Header, Nav, MobileNav, Footer, Container, Section
  sections/          # Hero, StatBand, ProjectCard, Gallery/Lightbox, CtaBlock, …
  forms/             # Contact, Volunteer, Newsletter (react-hook-form + zod)
  shared/            # Logo, PlaceholderImage, JsonLd, Breadcrumbs, Markdown, …
  motion/            # FadeIn, Reveal, Stagger (reduced-motion aware)
content/             # Typed content (Path A): site, programs, projects, partners, team,
                     # trustees, stats, stories, donate, about + legal/ & posts/ markdown
lib/                 # utils, seo (metadata + JSON-LD), email, schemas, content loaders
public/images/       # Wired site photography + generated PWA icons
docs/                # Build briefs, content bundle, photo-mapping proposal
```

### Editing content

All copy and data live in `content/` as typed modules — edit there, not in JSX. Stories and legal pages are verbatim markdown under `content/posts/` and `content/legal/`. Images use `PlaceholderImage`, which renders a branded gradient until a real `src` is supplied (swapping in a photo is a one-line change).

---

## Quality

- **Accessibility:** WCAG 2.2 AA — axe-core reports **0 violations** across key routes (incl. the gallery Lightbox); one `<h1>` per page, keyboard-operable nav/forms/lightbox, visible focus, `prefers-reduced-motion` aware.
- **Performance:** desktop Lighthouse **99–100** (LCP ~0.8s, CLS 0). Server-first (RSC); client islands limited to nav, forms, motion, and the lightbox.
- **SEO:** per-route metadata, Organization/Breadcrumb/Article JSON-LD, sitemap, robots, and a PWA manifest with square + maskable icons.

---

## Before going live (`[KHI]`)

Set `RESEND_API_KEY` + verified `EMAIL_FROM` · confirm the six Paystack preset pages exist · add the real **RC registration number** (footer + Transparency) and **social URLs** (`content/site.ts`) · supply a **logo SVG** + purpose-built square icon · confirm beneficiary-photo consent and do a final eyes-on check on headshots/galleries · lawyer review of the legal pages · set the final domain.
