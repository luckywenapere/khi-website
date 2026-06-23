# KHI Website — Phase 1 Build Brief (for Claude Code)

You are continuing a project that was scoped in a separate planning session. This brief is **self-contained** — you have everything you need below. Two companion docs (`KHI-website-plan.md`, `KHI-content-audit.md`) carry the full rationale; read them if present, but this brief is authoritative for Phase 1.

**Build Phase 1 only. Stop and report when done. Do not start the homepage or page content.**

---

## 1. What we're building

A complete from-scratch rebuild of the website for **Kind Humanitarian Initiative (KHI)** — an Abuja, Nigeria nonprofit. This is **not** a WordPress migration. Goal: a modern, trustworthy, fast site in the spirit of Stripe / Linear / Vercel — clean, warm, lots of whitespace, strong typography — that keeps KHI's existing brand identity.

**Stack (built on):** Next.js **16** (App Router) · TypeScript (`strict`) · Tailwind **v4** · shadcn/ui (Base UI) · Framer Motion · lucide-react · next/image · ESLint + Prettier · deploys on Vercel. *(Originally targeted Next 15; `create-next-app` installs 16 in mid-2026 and the build adapted — confirmed by the user.)*
**Do not use:** WordPress, page builders, Bootstrap, Material UI, CSS-in-JS runtimes, or `localStorage`-dependent patterns.

---

## 2. Brand & design tokens — implement exactly

These values are confirmed from KHI's logo. Put them in `app/globals.css` as the single source of truth, then wire them to Tailwind + shadcn.

### 2.1 Colour (raw brand tokens)

```css
:root {
  /* Brand blue (the "K" and the arc) */
  --blue-50:  #EEF3FC;  --blue-100: #D9E4F8;  --blue-200: #B5C9F0;
  --blue-300: #8BA9E4;  --blue-400: #5E84D4;
  --blue-500: #426EC6;  /* brand — fills/buttons; white text on it passes AA (~4.9:1) */
  --blue-600: #345BAE;  /* hover */
  --blue-700: #2A4C95;  /* TEXT/links on white (~8:1) */
  --blue-800: #213A73;

  /* Sky-cyan (bright end of the logo arc) — accents + gradient ONLY, never text */
  --sky-400: #38B6EE;   --sky-500: #00B0F2;

  /* Signature: the logo's blue→cyan arc, reused across the site */
  --gradient-brand: linear-gradient(120deg, #345BAE 0%, #426EC6 40%, #00B0F2 100%);

  /* Neutrals */
  --white: #FFFFFF;
  --gray-50: #F8F9FA;  --gray-100: #F1F3F5;  --gray-200: #E9ECEF;
  --gray-300: #DEE2E6; --gray-500: #868E96;  --gray-700: #495057;
  --charcoal: #1F2328; /* body text */
  --cream:    #F7F6EC; /* warm off-white from the logo badge; optional warm surface */
}
```

**Contrast rules (WCAG 2.2 AA, non-negotiable):** brand blue (`--blue-500`) is for fills/shapes and takes white text; blue **text/links use `--blue-700`**; **sky-cyan is never text** (fails on white) — only accents/gradient. Body text is `--charcoal` on white/`--gray-50`.

### 2.2 shadcn semantic mapping

Run `npx shadcn@latest init`, then map its semantic tokens to the brand tokens above, in **whatever colour format the installed shadcn version uses** (hex/oklch/HSL — match what `init` generates; don't fight it):

```
--background → white          --foreground → charcoal
--card → white                --card-foreground → charcoal
--muted → gray-100            --muted-foreground → gray-700
--border → gray-200           --input → gray-200
--primary → blue-500          --primary-foreground → white
--secondary → gray-100        --secondary-foreground → charcoal
--accent → blue-50            --accent-foreground → blue-700
--ring → blue-500             --radius → 0.75rem
```

### 2.3 Typography (next/font)

- **Display / headings — Fraunces** (variable, `next/font/google`), used at large sizes with optical sizing. Warm + credible; matches KHI's existing serif headings.
- **Body / UI — Inter** (`next/font/google`).
- **Data / stats — a mono** (Geist Mono via the `geist` package, or IBM Plex Mono via `next/font/google`) for figures so impact numbers feel precise.

Expose as CSS variables (`--font-display`, `--font-sans`, `--font-mono`) on `<html>` and reference in Tailwind's `fontFamily`. `display: swap`, subset, preload only the display weight used above the fold.

**Fluid type scale** (use `clamp()`):
```
display  clamp(2.75rem, 5vw, 4.5rem)  /1.05 /-0.02em  Fraunces 500
h1       clamp(2.25rem, 4vw, 3.25rem) /1.1
h2       clamp(1.75rem, 3vw, 2.5rem)  /1.15
h3       1.5rem /1.2
h4       1.25rem /1.3
body-lg  1.125rem /1.6   body 1rem /1.65   small 0.875rem /1.5
overline 0.75rem /1.4 /0.08em uppercase
```

### 2.4 Spacing, radius, shadow, motion, breakpoints

```
Spacing      4px base (Tailwind scale). Section rhythm: 80–128px desktop, 56–72px mobile.
Radius       sm 8 · md 12 · lg 16 · xl 24 · pill 9999  (cards lg, buttons md, inputs md)
Shadow       --shadow-sm: 0 1px 2px rgba(31,35,40,.06)
             --shadow-md: 0 4px 16px rgba(31,35,40,.06)
             --shadow-lg: 0 12px 32px rgba(31,35,40,.08)
Motion       durations 150/250/400ms; entrance ease cubic-bezier(.16,1,.3,1)
             reveal = fade + 16px rise; stagger 60–80ms; ALL gated by prefers-reduced-motion
Breakpoints  Tailwind defaults, mobile-first (640/768/1024/1280/1536)
Containers   content max-w 1200px · wide media 1320px · prose 720px
```

**Signature element:** a thin blue→cyan "throughline" (`--gradient-brand`) is the recurring motif — use it sparingly as an accent line/underline/connector. Don't overuse it.

---

## 3. Folder structure

```
app/
  (site)/                 # route group sharing Header + Footer
    layout.tsx            # Header + <main> + Footer + skip link
    page.tsx              # Home (STUB in Phase 1)
    about/page.tsx
    about/transparency/page.tsx
    programs/page.tsx              # nav label: "What We Do"
    programs/[slug]/page.tsx       # a program; lists its projects
    projects/[slug]/page.tsx       # deep project page (reached via programs)
    impact/page.tsx
    get-involved/page.tsx
    get-involved/volunteer/page.tsx
    get-involved/partner/page.tsx
    stories/page.tsx
    stories/[slug]/page.tsx
    contact/page.tsx
    donate/page.tsx
    privacy/page.tsx  terms/page.tsx  cookies/page.tsx  disclaimer/page.tsx
  layout.tsx              # <html lang="en">, fonts, metadata base
  sitemap.ts  robots.ts  manifest.ts  not-found.tsx
  opengraph-image.tsx     # default OG
components/
  ui/        # shadcn primitives
  layout/    # Header, Nav, MobileNav, Footer, Container, Section
  motion/    # FadeIn, Stagger, Reveal (client wrappers)
  shared/    # Logo, SocialLinks
content/     # typed content modules (Path A); programs.ts, navigation.ts, site.ts
lib/         # utils.ts (cn), seo.ts (metadata + JSON-LD), content.ts
public/      # logo, images, og
```

Content approach is **Path A — typed content in `/content`** (no CMS). For Phase 1, create `content/site.ts`, `content/navigation.ts`, and `content/programs.ts` so the Header/Footer read from data, not hardcoded JSX.

---

## 4. Information architecture (drives the nav you build now)

### 4.1 Header nav

`Logo · About · What We Do ▾ · Impact · Get Involved ▾ · Stories · Contact · [Donate]`

- **What We Do ▾** (→ `/programs`) dropdown lists the four programs + "All programs":
  - Education & Scholarships → `/programs/education-scholarships`
  - Health & Hygiene → `/programs/health-hygiene`
  - Food Relief → `/programs/food-relief`
  - Youth & Leadership → `/programs/youth-leadership`
- **Get Involved ▾** (→ `/get-involved`): Volunteer (`/get-involved/volunteer`), Partner with us (`/get-involved/partner`).
- **Donate** is a high-contrast `--blue-500` **button**, not a text link. Present in the header on every page.
- **Mobile:** logo · Donate · hamburger → shadcn `Sheet` with full nav (Accordion for the two dropdowns), large tap targets, focus trap + Esc. Add a sticky bottom Donate bar on mobile scroll.

Use shadcn `NavigationMenu` (desktop) and `Sheet` + `Accordion` (mobile).

### 4.2 Footer (replaces the old "Quick Links / Navigate" split)

Four meaningful groups + brand + legal:
- **Brand:** logo + one-line mission + social icons (Instagram, Facebook — handles TBD, use `#` placeholders).
- **Explore:** Home, About, What We Do, Impact, Stories, Contact.
- **Get Involved:** Volunteer, Partner with us, Donate.
- **Trust & legal:** Transparency, Privacy Policy, Terms & Conditions, Cookie Policy, Disclaimer.
- **Contact block:** `24 Kaltungo Street, Garki 2, Abuja, Nigeria` · `info@khinitiative.org` · `0708 222 7153`, `0908 892 8236`.
- Newsletter signup (stub the form; non-functional is fine in Phase 1).
- `© {year} Kind Humanitarian Initiative.` Drop the "Powered by…" line.

### 4.3 Real org facts (for footer + JSON-LD)

```
Legal name:  Kind Humanitarian Initiative
Address:     24 Kaltungo Street, Garki 2, Abuja, Nigeria
Email:       info@khinitiative.org
Phone:       +234 708 222 7153 · +234 908 892 8236
Socials:     Instagram, Facebook  (handles TBD → placeholder)
Reg. number: TBD  (leave a clearly-marked placeholder)
Domain:      TBD  (use https://www.khinitiative.org as placeholder base URL)
```

---

## 5. Phase 1 scope — DO / DON'T

### DO
1. **Scaffold** the Next.js 15 + TS app, Tailwind, ESLint + Prettier (with `prettier-plugin-tailwindcss`), `shadcn init`. Confirm versions from `package.json`; adapt token format to the installed Tailwind/shadcn (v4 `@theme` vs v3 `tailwind.config.ts`).
2. **`globals.css`** with the full token system from §2.
3. **Fonts** via next/font (§2.3).
4. **Root layout** (`app/layout.tsx`): `<html lang="en">`, fonts, `metadataBase`, default metadata + OG, skip-to-content link, analytics placeholders.
5. **`(site)/layout.tsx`**: semantic `header` / `main` / `footer` landmarks.
6. **`Container` + `Section`** primitives enforcing the spacing rhythm and max-widths.
7. **Header + responsive nav** (§4.1) and **Footer** (§4.2), reading links from `content/navigation.ts` + `content/site.ts`.
8. **Logo** component from the supplied PNG (place in `public/`; ask the user for an SVG later — note it as TODO).
9. **Motion primitives** in `components/motion/` (FadeIn, Stagger, Reveal) — thin client wrappers, all reduced-motion aware. Keep the rest server-rendered.
10. **SEO utilities** (`lib/seo.ts`): a metadata builder + JSON-LD builders (`NGO`/Organization for the site, ready for `BreadcrumbList`/`Article` later). Add `sitemap.ts`, `robots.ts`, `manifest.ts`, default `opengraph-image.tsx`, `not-found.tsx`.
11. **Stub every route** in §3 with a minimal page: correct `<h1>` + per-route `generateMetadata` + a "Coming together — content in a later phase" placeholder, so the nav fully resolves and routing/SEO are testable. Dynamic `[slug]` routes can render a minimal stub or be deferred with a clear `// Phase 3` note.

### DON'T (later phases — do not build now)
- The homepage sections (hero, stats, stories, CTA bands…) → **Phase 2**.
- Real page content, the projects/stories data, the donation flow, the contact form logic, the Transparency page content → **Phase 3**.
- Any CMS. Any real copy beyond nav/footer/labels.

### Acceptance criteria (Phase 1 is "done" when)
- `npm run build` and `npm run lint` pass clean; TypeScript strict, no `any`.
- Every nav + footer link resolves to a real (stub) route; no 404s.
- Fully **keyboard navigable**: visible focus rings (the `--ring` token), working skip link, mobile `Sheet` traps focus and closes on Esc.
- **Mobile-first** and responsive at 360 / 768 / 1280; Donate reachable on every page (header + sticky mobile bar).
- `prefers-reduced-motion` disables all entrance/transition motion.
- Tokens are the only source of colour/spacing — **no hardcoded hex** in components.
- Header/Footer content matches §4; brand colours match §2 exactly.

---

## 6. Quality floor (applies from the first commit)
- Semantic HTML + landmarks; one `h1` per page; no skipped heading levels.
- Descriptive link text (no bare "click here"); `aria-label` on icon-only controls (hamburger, socials, Donate icon).
- Images via `next/image` with intentional `alt` (decorative → `alt=""`).
- Color contrast verified against §2 rules.
- Client components only where interactivity demands (nav, motion); everything else RSC.

---

## 7. When you finish Phase 1
1. Run the build + lint; fix anything failing.
2. Print a short summary: what was scaffolded, the routes created, the component inventory, and any TODOs (e.g., logo SVG, social handles, registration number, exact domain).
3. **Stop and wait for review before starting Phase 2 (homepage).** Do not continue automatically.
