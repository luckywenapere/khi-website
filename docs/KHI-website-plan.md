# Kind Human Initiative — Website Rebuild
### Phase 0: Architecture, Content Audit, Information Architecture, Design System & Implementation Plan

---

## 0. Read this first — status

**Update:** you've since sent 14 full-page screenshots, so the audit is done — see the companion **`KHI-content-audit.md`** for the real page-by-page findings, the validated information architecture, and the authoritative post-audit palette. Two corrections that matter here:

- The brand colour is a **royal/cornflower blue** (`#426EC6`, confirmed from your logo), with a **sky-cyan `#00B0F2`** at the bright end of the logo's arc — **not** the marigold placeholder this document originally used. The accent tokens in §4.1 are updated to match.
- The legal name is **Kind Humanitarian Initiative**, not "Kind Human Initiative" as written in the brief.

- **Stack (post-Phase-1):** the build runs on **Next.js 16 / Tailwind v4 / shadcn on Base UI / React 19** — `create-next-app` installs 16 in mid-2026 and the scaffold is idiomatic to it. The §1 table reflects this. (Original target was Next 15.)

The architecture, design-system structure, and implementation plan below all stand; only the accent value, the stack version, and the live-site assumptions changed.

So this document does three honest things:

1. **Delivers in full** the parts that don't depend on your live site: the project architecture, the proposed information architecture and sitemap (with concrete improvements over the structure in the brief), the design system, and the implementation plan.
2. **Gives you a real audit *framework*** — exactly what I'll inventory and the specific failure modes common to WordPress charity themes — so the audit becomes a 30-minute exercise the moment you hand me the content.
3. **Lists precisely what I need from you** (Section 7) to make the audit concrete and to lock the brand/design before we build.

Everything below is built to be correct regardless of what your current site looks like. Where I've had to assume something about KHI specifically (most importantly the **accent color**), it's flagged with **`[CONFIRM]`**.

---

## 1. Project architecture

### 1.1 Stack (as briefed, with rationale)

| Layer | Choice | Note |
|---|---|---|
| Framework | Next.js 16, App Router | RSC by default; client components isolated to interactive islands |
| Language | TypeScript (strict) | `strict: true`, no implicit any |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | Design tokens as the single source of truth (Section 5) |
| Components | shadcn/ui (`base-nova`, on Base UI) | Copy-in, not a dependency — we own and theme the primitives |
| Motion | Framer Motion | Wrapped in thin client components so RSC stays the default |
| Icons | lucide-react | Tree-shakeable |
| Images | next/image | AVIF/WebP, responsive `sizes`, blur placeholders |
| Lint/format | ESLint + Prettier | `eslint-config-next` + Tailwind plugin for class sorting |
| Forms | react-hook-form + zod | Accessible, typed, validated on client + server action |
| Deploy | Vercel | Edge-friendly; Analytics + Speed Insights on |

### 1.2 Folder structure

```
khi/
├── app/
│   ├── (site)/                  # marketing route group, shared layout
│   │   ├── layout.tsx           # Header + Footer + skip link
│   │   ├── page.tsx             # Home
│   │   ├── about/page.tsx
│   │   ├── programs/page.tsx
│   │   ├── programs/[slug]/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── impact/page.tsx
│   │   ├── get-involved/page.tsx
│   │   ├── get-involved/volunteer/page.tsx
│   │   ├── get-involved/partner/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── stories/page.tsx
│   │   ├── stories/[slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx               # <html>, fonts, theme, analytics
│   ├── sitemap.ts               # dynamic sitemap
│   ├── robots.ts
│   ├── manifest.ts
│   ├── opengraph-image.tsx      # default OG; per-route overrides where useful
│   └── not-found.tsx
├── components/
│   ├── ui/                      # shadcn primitives (Button, Card, Sheet, Accordion…)
│   ├── layout/                  # Header, Footer, Container, Section, Nav, MobileNav
│   ├── sections/                # Hero, StatBand, ProgramGrid, StoryRail, CtaBlock…
│   ├── motion/                  # FadeIn, Stagger, Counter, Reveal (client wrappers)
│   └── shared/                  # Logo, Breadcrumbs, SocialLinks
├── content/                     # typed content (see 1.3)
│   ├── programs.ts
│   ├── projects.ts
│   ├── stats.ts
│   ├── partners.ts
│   ├── team.ts
│   └── stories/*.mdx
├── lib/
│   ├── utils.ts                 # cn(), formatters
│   ├── seo.ts                   # metadata + JSON-LD builders
│   └── content.ts               # typed loaders / MDX
├── public/
│   ├── images/
│   └── og/
├── styles/globals.css           # tokens + base layer
└── (config files)
```

### 1.3 Content modeling — decision needed

The brief doesn't specify a CMS. Two viable paths, and this is a **`[DECISION]`** for you:

- **Path A — Typed content in-repo (TS + MDX).** Programs/projects/stats/partners live as typed TS objects; News & Stories as MDX. Fastest to ship, zero infra, fully type-safe, version-controlled. Downside: every content edit is a code change/deploy.
- **Path B — Headless CMS (Sanity recommended).** Non-technical staff edit stories, projects, stats, and impact numbers without touching code. More setup, small ongoing cost, but it's the right call if KHI staff (not engineers) will maintain News, Stories, and impact figures regularly.

**My recommendation:** start on **Path A** so we ship the rebuild fast, but design the content layer behind a clean typed interface (`lib/content.ts`) so swapping to Sanity later is a loader change, not a rewrite. If staff need to publish stories weekly from day one, we go straight to Path B.

### 1.4 SEO & metadata architecture

- Per-route `generateMetadata` (title, description, canonical, OG/Twitter).
- **Structured data (JSON-LD):** `NGO`/`NonProfit` Organization on the homepage (legal name, logo, sameAs socials, registration), `BreadcrumbList` on deep pages, `Article` on each story, `FAQPage` where an FAQ exists.
- `sitemap.ts` generated from routes + content; `robots.ts` allowing all, pointing to sitemap.
- Default `opengraph-image.tsx`, with bespoke OG images for Home, Donate, and feature stories.

### 1.5 Performance approach (Lighthouse > 95 target)

- **Server-first.** Pages render as RSC; Framer Motion and forms are the only client islands.
- **Images:** `next/image` everywhere, `priority` only on the hero, explicit `sizes`, blur placeholders, AVIF first.
- **Fonts:** `next/font` with subsetting + `display: swap`; preload only the display weight used above the fold.
- **JS budget:** isolate motion; avoid shipping animation libs to static sections that only need a CSS reveal.
- **CWV guardrails:** reserve hero/image dimensions to protect CLS; defer non-critical third parties (donation embed loaded on the Donate route only).

---

## 2. Content audit — framework + what I'll check

I can't audit pages I can't see, so here is the exact instrument. Hand me the content (Section 7) and I'll return a filled-in version of the tables below.

### 2.1 What I inventory, per page

For every existing URL: page title, purpose, primary CTA, word count, media, internal links in/out, traffic (if you have GA), and a **keep / merge / rewrite / cut** verdict with a one-line reason.

### 2.2 Failure modes I'll specifically test for (typical of WordPress charity themes)

These are the usual suspects — I'll confirm which actually apply to KHI once I have the content:

- **Trust gaps:** no legal/registration number, no clear "where your money goes," no financials/annual report, vague or missing impact numbers, stock photography instead of real beneficiaries/field work.
- **Conversion leaks:** donate buried in a sub-menu instead of a persistent button; multiple competing CTAs per page; donation flow that leaves the site jarringly.
- **IA bloat:** overlapping "Programs" vs "Projects" with no clear distinction; a thin "Gallery" page carrying weight it shouldn't; orphan pages with no inbound links.
- **Content quality:** mission stated in jargon rather than plain language; "About" that talks about the org instead of the people served; news that's stale (last post >12 months old reads as "abandoned").
- **UX/visual debt:** carousels nobody scrolls, low-contrast text on hero images, tiny tap targets, inconsistent spacing/type from theme defaults.
- **Accessibility (WCAG 2.2 AA):** images without alt text, heading levels skipped (h1→h3), non-descriptive link text ("click here"), form fields without labels, focus not visible, color-only meaning, contrast failures.
- **Performance:** unoptimized hero images (multi-MB JPEGs), render-blocking plugin CSS/JS, no caching.

### 2.3 Content-readiness checklist (what to gather)

Mission statement · real impact numbers (with the date/source for each) · 3–6 program descriptions · 3–10 project/initiative writeups · beneficiary stories + consent to publish · real photography (and rights) · partner logos + permission · team bios + headshots · legal/registration details · financials or annual report · donation provider details (Section 7).

---

## 3. Information architecture & sitemap

You proposed a solid structure. Here's where I'd change it — each change earns its place against the brief's goals of **credibility, transparency, and a clear path to act.**

### 3.1 Recommended sitemap

```
Home
About
  ├─ Our story / mission
  ├─ Team & governance
  └─ Transparency & financials      ← see 3.2 (a)
What We Do                           ← renamed hub (was "Our Programs")
  ├─ Programs (overview)
  └─ Programs › [program]            ← each program lists its Projects
       └─ Projects nested as instances of a program   ← see 3.2 (b)
Impact                               ← stories + numbers + reports, see 3.2 (c)
Get Involved
  ├─ Volunteer
  ├─ Partner with us
  └─ Fundraise / Other ways to give  ← optional, see 3.2 (d)
Stories                              ← merges "News & Stories" + "Gallery", see 3.2 (e)
Contact
Donate                               ← not in nav as a tab; persistent button, see 3.2 (f)

Footer (every page): legal name + registration no., Privacy Policy,
Terms, Financials/Annual report, Contact, Newsletter, Socials.
```

### 3.2 The reasoning behind each change

**(a) Add "Transparency & financials" under About.** This is the single highest-leverage trust move and it's exactly what GiveDirectly and Charity: Water do well. Donors give to organizations that show where money goes. A page with operating-vs-program ratios, an annual report, and registration details converts skeptics. The brief's top goal is credibility — this is how you earn it structurally, not just visually.

**(b) Nest Projects under Programs instead of two sibling tabs.** "Our Programs" and "Projects" as separate top-level items almost always confuse visitors — they overlap and no one can tell which to click. The clean mental model: **Programs are the ongoing areas of work** (e.g., Education, Health, Clean Water); **Projects are specific, often time-bound instances** within a program. So a project always belongs to a program and is reached through it. Both still get their own pages and URLs (good for SEO and deep links), but the navigation stops asking the visitor to disambiguate.

**(c) Make "Impact" the home for proof, and fold stories' *evidence* role into it.** Impact = the numbers + the reports + a few flagship outcome stories. This keeps "did it actually work?" answerable in one place. (Day-to-day storytelling still lives in Stories — see (e).)

**(d) "Fundraise / other ways to give" is optional.** Only build it if KHI actually supports peer fundraising, in-kind, or legacy giving. Don't ship an empty promise.

**(e) Merge "News & Stories" + "Gallery" into one "Stories" hub.** A standalone Gallery page is the most "charity-template" element in the proposed structure and usually the least-visited. Photography is far more powerful *in context* — inside a story, a program page, or the impact section — than in a decontextualized grid. Recommendation: **drop Gallery from the top nav**, fold imagery into Stories and program pages, and (if you want a gallery at all) make it a filtered view *within* Stories, not a primary destination. Stories becomes one strong content hub instead of two weak ones.

**(f) Donate is a persistent action, not a nav tab.** It lives as a high-contrast button in the header (and a sticky bar on mobile), present on every page, plus a dedicated `/donate` page for the actual flow. Treating "give" as a tab among ten dilutes it; treating it as the one always-visible action is how conversion-focused orgs do it.

### 3.3 Navigation model

- **Desktop header:** logo · About · What We Do · Impact · Get Involved · Stories · Contact · **Donate (button, accent)**. "What We Do" and "Get Involved" use a `NavigationMenu` dropdown for their children.
- **Mobile:** logo · **Donate** · hamburger → `Sheet` with full nav, accordion sub-items, and large tap targets. Sticky Donate bar at the bottom on scroll.
- **Footer:** the trust + legal layer (registration, privacy, financials, newsletter, socials) plus a condensed sitemap.

---

## 4. Design system

The brief pins the direction (white, soft grays, deep charcoal, one vibrant accent) and references Stripe/Linear/Vercel/Notion/Airbnb. I'm following that exactly. The job is to make it specifically *KHI's* — warm and human, not a generic clean-SaaS clone, and deliberately **not** the cream-paper-plus-terracotta look that reads as templated.

> **Signature idea:** the recurring motif is a *throughline* — a thin accent line/connector that visually links "first need → action → measured outcome" across the site (in the hero, in the program→project relationship, in the impact timeline). It encodes the actual logic of the work (cause → effort → result) rather than decorating. One bold element; everything else stays quiet.

### 4.1 Color tokens

Neutrals are concrete (briefed). The **accent is a `[CONFIRM]` placeholder** — I've chosen a warm marigold as a defensible recommendation (generosity/warmth/hope, and it sidesteps the over-used charity blue/green), but the moment you send KHI's real brand hex I'll rebuild the scale around it.

```
/* Neutrals */
--white:        #FFFFFF
--gray-50:      #F8F9FA
--gray-100:     #F1F3F5
--gray-200:     #E9ECEF
--gray-300:     #DEE2E6
--gray-500:     #868E96
--gray-700:     #495057
--charcoal:     #1F2328   /* deep charcoal — primary text */

/* Brand blue — confirmed from the KHI logo (#426EC6) */
--blue-50:      #EEF3FC
--blue-100:     #D9E4F8
--blue-200:     #B5C9F0
--blue-400:     #5E84D4
--blue-500:     #426EC6   /* brand blue — fills, buttons (white text passes AA, ~4.9:1) */
--blue-600:     #345BAE   /* hover */
--blue-700:     #2A4C95   /* blue for TEXT/links — ~8:1 on white */

/* Sky-cyan — bright end of the logo's arc; accents + brand gradient ONLY (never text) */
--sky-400:      #38B6EE
--sky-500:      #00B0F2
--gradient-brand: linear-gradient(120deg, #345BAE 0%, #426EC6 40%, #00B0F2 100%)

/* Warm off-white from the logo badge — optional warm surface */
--cream:        #F7F6EC

/* Semantic (mapped to shadcn CSS vars) */
--background     → --white
--foreground     → --charcoal
--muted          → --gray-100
--muted-foreground → --gray-700
--border         → --gray-200
--primary        → --blue-500   (primary-foreground: white)
--ring           → --blue-500
```

**Contrast rule baked in:** the brand blue is for *fills and shapes*; blue **text/links use `--blue-700`** to clear WCAG AA (≥4.5:1) on white, and the amber secondary is reserved for non-text highlights. All body text is charcoal on white/gray-50. We'll verify every pairing.

### 4.2 Typography — `[CONFIRM]` pairing

A deliberate pairing, not Inter-everywhere:

- **Display / headings — Fraunces** (variable, optical sizing). A modern, slightly warm serif used *with restraint* at large sizes — it carries the "human, trustworthy, considered" tone without tipping into the generic high-contrast-serif look (we keep backgrounds white/charcoal, not cream).
- **Body / UI — Inter** (or **Geist**). Quiet, hyper-legible, excellent at small sizes — does the reading work so the display face can be the personality.
- **Data / utility — a mono (Geist Mono / IBM Plex Mono)** for statistics and figures, so impact numbers feel precise and "measured."

If KHI's brand already specifies type, that wins — tell me and I'll swap. Alternative if you'd rather avoid a serif entirely: display in **Bricolage Grotesque**, body in **Inter**.

**Type scale (fluid, `clamp()`):**

```
display   clamp(2.75rem, 5vw, 4.5rem)   / 1.05 / -0.02em / Fraunces 500
h1        clamp(2.25rem, 4vw, 3.25rem)  / 1.1
h2        clamp(1.75rem, 3vw, 2.5rem)   / 1.15
h3        1.5rem  / 1.2
h4        1.25rem / 1.3
body-lg   1.125rem / 1.6                / Inter
body      1rem / 1.65
small     0.875rem / 1.5
overline  0.75rem / 1.4 / 0.08em / uppercase
```

### 4.3 Spacing, radius, shadow, motion

```
Spacing      4px base → 1,2,3,4,6,8,12,16,20,24,32 (Tailwind scale)
             Section vertical rhythm: 80–128px desktop, 56–72px mobile

Radius       sm 8 · md 12 · lg 16 · xl 24 · pill 9999
             (cards lg, buttons md, inputs md, hero media xl)

Shadow       soft, low-opacity, layered — never harsh:
             sm  0 1px 2px rgba(31,35,40,.06)
             md  0 4px 16px rgba(31,35,40,.06)
             lg  0 12px 32px rgba(31,35,40,.08)

Motion       duration: 150 (micro) / 250 (default) / 400 (entrance)
             easing:   entrance ease-out [.16,1,.3,1]; exit ease-in
             reveal:   fade + 16px rise; stagger 60–80ms per child
             ALWAYS gated by prefers-reduced-motion (see 4.6)

Breakpoints  Tailwind defaults, mobile-first: 640 / 768 / 1024 / 1280 / 1536
Container    max-w 1200px content; 1320px for wide media; 720px for prose/stories
```

### 4.4 Component inventory

**From shadcn/ui (themed to tokens):** Button, Card, NavigationMenu, Sheet (mobile nav), Accordion (FAQ), Dialog, Tabs, Badge, Avatar, Separator, Tooltip, Input/Textarea/Select/Checkbox + Form (react-hook-form + zod), Sonner (toasts), Carousel (used sparingly).

**Custom (composed on top):**

| Component | Purpose |
|---|---|
| `Section` / `Container` | Consistent vertical rhythm + max-width; kills the spacing drift that plagues theme sites |
| `Hero` (variants) | Home, page-header, campaign |
| `StatCard` + `Counter` | Animated count-up impact numbers (reduced-motion → static) |
| `ProgramCard` / `ProjectCard` | The program→project relationship made visible |
| `Timeline` | The "throughline" signature — process or impact-over-time |
| `Testimonial` / `StoryCard` | Beneficiary voice and field stories |
| `ImageGallery` + lightbox | Lives inside Stories, not as a top-level tab |
| `CtaBlock` | Reusable donate/volunteer/partner call-to-action band |
| `PartnerCloud` | Logo row with proper alt text |
| `DonationWidget` | Wraps the provider; amount presets; "where it goes" microcopy |
| `Breadcrumbs` | Trust + orientation on deep pages |

### 4.5 Motion principles (Framer Motion)

Tasteful and few, per the brief: fade-up reveal on scroll (`whileInView`, `once: true`), staggered card grids, animated counters, gentle hover lift on cards/buttons, smooth route transitions. **No** parallax-heavy hero, no looping background motion, nothing that competes with content. Motion is isolated to small `components/motion/*` client wrappers so the rest of the tree stays server-rendered.

### 4.6 Accessibility standards (WCAG 2.2 AA — non-negotiable floor)

Semantic landmarks (`header`/`nav`/`main`/`footer`) · skip-to-content link · one `h1` per page, no skipped levels · visible focus rings (the `--ring` token, never `outline:none` without replacement) · full keyboard operability incl. the mobile `Sheet` and dropdowns (focus trap + Esc) · descriptive link text · all images carry intentional alt (decorative → `alt=""`) · form fields labeled with inline, programmatically-associated errors · AA contrast verified on every token pairing · `prefers-reduced-motion` collapses all entrance/counter animation to instant.

### 4.7 Voice & copy

Plain, warm, specific. Talk about the people served, not the org's self-image. Active CTAs that keep their name through the flow ("Donate" → "Thank you," not "Submit" → "Success"). Numbers always carry a unit and, ideally, a source. Empty/error states give direction, not mood.

---

## 5. Implementation plan

I'm keeping your four phases and sharpening each with a definition of done and its dependencies. **Phase 0 is this document.** I'll stop for your confirmation at the end of every phase, as you asked.

**Phase 0 — Strategy (this doc).** Architecture, audit framework, IA/sitemap, design system, plan. → *awaiting your sign-off + the inputs in Section 7.*

**Phase 1 — Foundation.** Repo + tooling (TS strict, ESLint/Prettier, Tailwind tokens, shadcn init), `globals.css` with the full token system, root layout + fonts, `Container`/`Section`, **Header + responsive nav + Footer**, motion + SEO/JSON-LD utilities, `sitemap.ts`/`robots.ts`.
*Done when:* a tokenized, accessible global shell renders on every (empty) route, navigable by keyboard, lighthouse-clean.
*Depends on:* confirmed **accent hex** and **type** (Section 7). I can scaffold with the placeholders and reskin in minutes once you confirm.

**Phase 2 — Homepage.** All ten sections: hero, mission, stat band, featured initiatives, impact stories, volunteer, donation CTA, partners, latest news, footer.
*Done when:* homepage is fully responsive, animated (reduced-motion safe), AA-compliant, and CWV-green with real or placeholder content.
*Depends on:* mission, stats, 2–3 stories, partner logos, hero imagery.

**Phase 3 — Remaining pages.** About (+ Transparency), What We Do / Programs + project detail, Impact, Get Involved / Volunteer / Partner, Stories + story detail, Donate, Contact (with working validated form).
*Done when:* every route in the sitemap is built, metadata + structured data in place.
*Depends on:* the content set in Section 2.3 and the donation-provider decision.

**Phase 4 — Polish.** Accessibility pass (keyboard + screen-reader sweep), performance pass (image/JS budget, Lighthouse > 95 on key routes), SEO finalization (per-route metadata, OG images, JSON-LD, sitemap), cross-device QA, reduced-motion + dark-surface checks.
*Done when:* it ships to Vercel meeting every target in the brief.

---

## 6. Open decisions (quick to resolve)

1. **Accent color** — your real brand hex? (placeholder = warm marigold)
2. **Type** — keep Fraunces + Inter, or do you have brand fonts?
3. **Content layer** — typed in-repo (Path A) or Sanity CMS (Path B)?
4. **Donations** — which provider/flow? (embed vs redirect changes the Donate page.)
5. **Gallery** — agree to fold it into Stories, or do you specifically want it kept?
6. **Programs vs Projects** — does the "projects nested under programs" model match how KHI actually organizes the work?

---

## 7. What I need from you to make this concrete

To turn the audit framework into a real audit and to unblock the build:

1. **Existing site content** — since I can't browse to it: paste the page text, upload an export (HTML/Word/PDF/screenshots), or even a sitemap.xml + a few screenshots. Anything that shows me what's there.
2. **Brand assets** — logo files, the **accent hex**, any existing fonts/brand guide.
3. **The content set** from Section 2.3 (mission, real impact numbers, programs, projects, stories, photos + rights, partners, team, legal/registration, financials).
4. **Donation provider** details.
5. **Answers to the six open decisions** in Section 6.

You don't have to send everything at once. The fastest unlock is **#1 (current content) + #2 (accent hex)** — with those I can deliver the real audit and start Phase 1 immediately.
