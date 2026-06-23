# KHI Website — Phase 2 Build Brief (Homepage) · for Claude Code

You're continuing in the **existing Phase 1 repo**. Phase 1 built the foundation (tokens, fonts, `Header`/`Nav`/`MobileNav`, `Footer`, `Container`/`Section`, motion primitives, SEO utilities, content modules, and stub routes) on **Next.js 16 / Tailwind v4 / shadcn on Base UI / React 19 / Framer Motion**. Reuse all of it — don't re-scaffold.

Content comes from `/content` (Path A) and the structured **`docs/KHI-content-pack.md`**. Items marked `[KHI]` there (images, some bios, verified numbers) aren't available yet — handle them with the placeholder strategy below.

**Build Phase 2 (the homepage) only. Stop and report when done. Do not build the other pages — that's Phase 3.**

---

## 1. The one principle that drives every section

**Lead with the concrete work, not abstraction.** The old site opened with sentiment ("Our Sacrifice to Humanity," "Normalizing Happiness") and buried the real proof. We invert that: *what KHI actually did* first, feeling second. Specifics earn the trust the brief is built around.

Two supporting rules:
- **Signature:** the blue→cyan **`--gradient-brand`** "throughline" recurs as a *thin* accent — a section divider, a hero accent line, a link underline. Sparingly; it's a thread, not wallpaper.
- **Content is thin right now** (two stories, placeholder imagery, modest stats). Build every section to look **intentional with few items and degrade gracefully** — never an empty grid or a broken image.

---

## 2. Build these reusable components (`components/sections/` unless noted)

They're composed on the homepage now and reused on Phase 3 pages, so build them general:

- `Hero`
- `MissionBand`
- `StatBand` + `StatCard` + `AnimatedCounter` (count-up on scroll; **reduced-motion → static final value**; figures in the mono font)
- `ProjectCard` + `FeaturedProjects`
- `StoryCard` + `StoryGrid`
- `PartnerCloud`
- `CtaBlock` (one component, `variant: "donate" | "volunteer"`)
- `PlaceholderImage` (in `components/shared/`) — renders a tasteful **`--gradient-brand`** field + a lucide icon + the `alt` text's intent; **requires an `alt` prop**; accepts an optional real `src` and renders `next/image` when present. Use it for **every `[KHI]` image slot** so the page is presentable pre-photography and swaps to real photos with a one-line change.

Put homepage-specific copy (hero headline/subhead, section intros) in **`content/home.ts`** so it's editable Path-A content, not hardcoded JSX.

---

## 3. Homepage composition — section by section

Render in this order inside `app/(site)/page.tsx`. The existing `Header`/`Footer` wrap it via the route-group layout — **do not rebuild the footer**.

**1 · Hero** — *who KHI is + what they do + act.*
Source: `content/home.ts` (headline + subhead) — default headline: *"Practical help for communities in Abuja — scholarships, hygiene, food relief, and leadership."* with `site.mission` as the subhead. (Keep an alternate, scholarship-led headline in the file, commented, so they can swap.) CTAs: primary **Donate** (`--blue-500` button → `/donate`), secondary **"See our work"** (→ `/programs`).
Treatment: **split layout** — copy left on white/cream, `PlaceholderImage` right — with a thin `--gradient-brand` accent. (Prefer this over a full-bleed photo hero, since imagery is placeholder; it reads intentional without leaning on a strong photo. If you do go full-bleed later, add a charcoal scrim for AA.) Fraunces display headline. **This is the page's single `<h1>`.** Mobile: stacked, copy first.

**2 · Mission** — *plain statement + what we focus on.*
Source: `site.mission` (a touch expanded) + the four programs from `programs.ts` as focus-area links (→ `/programs/[slug]`). **Do not** repeat the Compassion/Empowerment/Integrity values here — they live on About; repeating them is the duplication the audit flagged.
Treatment: calm band, generous whitespace, Fraunces lead sentence + Inter support, the four focus areas as a simple labelled row with the throughline accent.

**3 · Key statistics** — *credibility in numbers.*
Source: `stats.ts` (4+ Projects · 5+ Partners · 7+ Locations · ₦5M+ Funds raised). `StatBand` with `AnimatedCounter` (mono figures). Leave a code comment: *numbers need an "as of" date/source, and "Locations" depends on the unresolved "Other Locations" decision — render from data, flag for review.*
Treatment: restrained 4-up (2×2 on mobile), blue accent on figures.

**4 · Featured initiatives** — *the heart of "lead with concrete."* Place it high.
Source: three featured projects from `projects.ts` — recommend **KHI Scholarship** (flagship), **Kenvic Leadership Conference**, and **Pads & Pals** (ongoing — shows current activity). `ProjectCard`: `PlaceholderImage`, title, program tag, partner, status badge, summary, link to the project/program page. `Stagger` reveal, hover lift. "See all our work" → `/programs`.

**5 · Impact** — *result-led, distinct from #4.*
Source: one featured outcome built from a **real** project — recommend the Scholarship result (*"final-year exam fees paid for 20 students who'd otherwise have dropped out"*). Keep it **factual — no invented quotes/testimonials** (we have none); leave a clearly-marked optional `[KHI]` slot for a consented beneficiary quote later. Link → `/impact`.
Treatment: a focused band — a large outcome statement + supporting line + `PlaceholderImage`.
*Note:* #5 and #9 can overlap while content is thin — #5 = one outcome highlight, #9 = the news grid. If it stays thin, flag for a possible merge rather than showing the same cards twice.

**6 · Volunteer** — *invite time, not money.*
Source: `CtaBlock variant="volunteer"` → `/get-involved/volunteer`. Warm, specific copy ("Lend your time…").
Treatment: **visually distinct from the donation CTA** (lighter/cream or split-with-gradient) so we avoid the old "identical dark band repeated everywhere" problem.

**7 · Donation CTA** — *the boldest action on the page.*
Source: `CtaBlock variant="donate"` → `/donate`. Strong, **single** brand-blue/gradient band, white text (AA). Grounded copy ("Your gift covers exam fees, hygiene kits, and food packs") — keep specific naira amounts out unless real.
Treatment: the page's most prominent CTA; don't sprinkle duplicate donate bands elsewhere.

**8 · Partners** — *borrowed credibility.*
Source: `partners.ts` (4). `PartnerCloud` with a **placeholder logo treatment** (name in a bordered card until logos land), proper `alt`. Link → `/get-involved/partner`.
Treatment: quiet, restrained logo row/grid.

**9 · Latest news** — *signs of life.*
Source: latest from `stories.ts` (the 2 posts) as `StoryCard`s → `/stories/[slug]`; "All stories" → `/stories`. Grid degrades gracefully at two items.

*(Footer — already built in Phase 1. The homepage sits inside the existing `(site)` layout.)*

---

## 4. Motion · a11y · performance · SEO

- **Motion:** `FadeIn`/`Reveal` on scroll (`once: true`), `Stagger` for grids, `AnimatedCounter` for stats — all reduced-motion safe; keep client islands small (sections stay RSC where they can; isolate motion to wrappers).
- **A11y:** one `<h1>` (the hero); sections lead with `<h2>`, no skipped levels; `PlaceholderImage` enforces `alt`; visible focus via `--ring`; contrast per the §2 token rules (blue-700 for any blue text, never sky-cyan as text).
- **Performance:** the hero image gets `priority`; everything below lazy-loads; counters fire via `whileInView`/IntersectionObserver; no new heavy deps.
- **SEO:** homepage `metadata` (title/description/OG) via the existing `lib/seo.ts`. Organization JSON-LD is already site-wide from Phase 1 — **don't duplicate it**; a `WebSite`/`WebPage` node is optional.

---

## 5. Acceptance criteria (Phase 2 is "done" when)

- The homepage renders all nine sections, responsive at **360 / 768 / 1280**, animated and **reduced-motion safe**, WCAG 2.2 AA.
- New section components live in `components/sections/` (+ `PlaceholderImage` in `shared/`) and **read from `/content`**, not hardcoded data.
- `PlaceholderImage` covers every `[KHI]` image slot — **no missing/broken images**, and swapping in real photos is a one-line `src` change.
- `npm run build`, `npm run lint`, and `npm run typecheck` pass clean; strict, no `any`; **token-only colour** (no hardcoded hex in components).
- Single `<h1>`; homepage metadata set; visually distinct donate vs volunteer CTAs (no repeated identical bands).

---

## 6. When you finish

1. Run build + lint + typecheck; fix anything failing.
2. Summarise: sections built, components added, content modules touched, and the **TODOs** — especially which `PlaceholderImage` slots await real photos, plus the stats date/source and "Other Locations" flags.
3. **Stop and wait for review before Phase 3 (the remaining pages).** Don't continue automatically.
