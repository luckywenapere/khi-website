# KHI Website — Phase 3a Build Brief (Content Pages) · for Claude Code

Continue in the **existing repo**. Phases 1–2 built the foundation and the homepage on **Next.js 16 / Tailwind v4 / shadcn on Base UI / React 19 / Framer Motion**. Phase 3a builds the **content/display pages** from KHI's real content.

**Content lives in `docs/khi-content/`** (now in the repo):
- `README-KHI-content-final.md` — **read first**: the verified data + the decisions to apply.
- `KHI-content-pack.md` — structured scaffold (programs/projects/partners/stats/donate).
- `pages/*.md`, `posts/*.md`, `legal/*.md` — **verbatim** page/post/legal text (the content source).
- `images.md` — image triage. Staged originals are in **`docs/wp-export/uploads/`**.

**Build Phase 3a only — the content pages below. Leave the Contact, Volunteer, and Donate stubs untouched (they're Phase 3b). Stop and report when done.**

---

## 0. Step one — reconcile content, then build

Read `README-KHI-content-final.md`, `KHI-content-pack.md`, and the relevant `pages/`/`posts/`/`legal/` files. Then **update the Phase 2 content modules with the verified data** and add new modules as needed (`team.ts`, `trustees.ts`, `about.ts`; stories bodies + legal as `.md`/`.mdx`). Structure the team/trustee bios from `pages/about-us.md` and `pages/board-of-trustees.md`.

## 1. Decisions to apply everywhere (from the README)

- **Remove "Other Locations"** (India/Australia/US — they're fake demo data) from Contact and anywhere they appear.
- **Stats:** `Projects 4+ · Partners 5+ · Funds raised ₦5M+` — **drop "Locations."** Each needs an "as of" date (`[KHI]`) — render without one for now, no invented dates.
- **Name fixes:** Mayowa J. **Odu** · Tor **Mwuese** Blessing · **Ajani** Lukman Idowu · Ezinne Janefrances **Nwonu** · Barrister **Anulika** Njemanze.
- **Pads & Pals = `ongoing`** (the site mislabels it completed).
- **Gallery is folded into projects** — no standalone Gallery page or nav item; each project carries its own photos.
- **Team + Trustees → one "People & governance" section on About.**
- **Imagery:** discard the demo/template assets; use real photos (§2).

## 2. Images — triage, then propose a mapping (don't guess blind)

1. Per `docs/khi-content/images.md`, copy the **real originals** (the ones with **no `-WxH` suffix**) from `docs/wp-export/uploads/` into `public/images/` (organized by area); **discard** the ~38 demo/template assets and the 4 fake-location images.
2. **Do not blind-match** a headshot to a person or a photo to a project — filenames don't reliably say who/what. Where a mapping isn't certain, use **`PlaceholderImage`** with correct `alt`, and **produce a proposed photo→content mapping** (a short markdown list: file → page/person/project) for the user to confirm in review.
3. **Beneficiary photos:** where faces are identifiable and consent is unconfirmed, use a tasteful crop or `PlaceholderImage` — never the old crude green-rectangle redaction.

## 3. New reusable components (`components/sections/` + `shared/` + `ui/`)

- `PageHeader` — page hero (title, intro, optional image, thin `--gradient-brand` accent).
- `Breadcrumbs` (+ `BreadcrumbList` JSON-LD).
- `PersonCard` + `PeopleGrid` — name, role, photo/placeholder, bio (expandable or detail).
- `Timeline` — the **signature throughline**, used for "How We Came About" milestones.
- `ProjectDetail` (project layout) + `Gallery` + `Lightbox` (**keyboard-operable**: focus trap, arrow keys, Esc, alt text).
- `TransparencyBlock` (registration facts + "where your money goes" + reports placeholder) + `ProseLayout` (max-width 720px, typographic — for stories & legal).

Reuse from Phases 1–2: `Container`/`Section`, `ProjectCard`, `StoryCard`/`StoryGrid`, `PartnerCloud`, `CtaBlock`, `StatBand`, `PlaceholderImage`, and the motion primitives.

## 4. Pages to build

| Page | Route | Content source | Notes |
|---|---|---|---|
| **About** | `/about` | `pages/about-us.md` + people roster + `pages/board-of-trustees.md` | Story via `Timeline` (ACLSD training → CAC reg 3 Jan 2025 → TIN/SCUML); `PeopleGrid` for Team **and** Trustees under "People & governance"; clean the `## 01`/`## Compassion` value artifacts; apply name fixes; link to Transparency |
| **Transparency** | `/about/transparency` | README founding/registration facts | The audit's #1 trust page: registration facts (CAC 3 Jan 2025, TIN/FIRS, SCUML/EFCC), **RC number `[KHI]`**, a "where your money goes" allocation (templated — real % `[KHI]`), reports placeholder. Honest, clearly-marked placeholders |
| **Programs** | `/programs` (nav: "What We Do") | `programs.ts` | `PageHeader` + 4 program cards (name, summary, the projects each holds) |
| **Program** | `/programs/[slug]` ×4 | `programs.ts` + `projects.ts` (filtered) | `generateStaticParams`; intro + that program's project cards + `CtaBlock` |
| **Project** | `/projects/[slug]` ×5 | `projects.ts` + `pages/*.md` + project photos | `generateStaticParams`; `ProjectDetail` (title, program tag, partner link, date, status badge, body) + `Gallery`/`Lightbox`; Pads & Pals = ongoing |
| **Impact** | `/impact` | `stats.ts` + factual outcomes | `StatBand` (no Locations) + `ImpactHighlight`(s) (e.g. the scholarship result — factual, **no invented quotes**) + outcome stories + link to Transparency |
| **Stories** | `/stories` | `stories.ts` (2 posts) | `PageHeader` + `StoryGrid`; degrades gracefully at two |
| **Story** | `/stories/[slug]` ×2 | `posts/*.md` (full bodies + frontmatter) | `generateStaticParams`; `ProseLayout`; `Article` + `BreadcrumbList` JSON-LD |
| **Legal** ×4 | `/privacy` `/terms` `/cookies` `/disclaimer` | `legal/*.md` | `ProseLayout`; metadata; (content is the existing text — flag a lawyer review) |

## 5. Motion · a11y · performance · SEO

- **Motion:** reuse `FadeIn`/`Reveal`/`Stagger`; `Lightbox` transitions; all reduced-motion safe.
- **A11y:** one `<h1>` per page; `Breadcrumbs` on deep pages; `Gallery`/`Lightbox` fully keyboard-operable with `alt` text; accessible expandable bios; prose semantics; contrast per the token rules (blue-700 for blue text, never sky-cyan).
- **Performance:** `next/image` for all real photos (`sizes`, lazy; a page's first image may be `priority`); galleries lazy-load; keep client islands small (`Lightbox` is the main one).
- **SEO:** per-page `metadata` via `lib/seo.ts`; `BreadcrumbList` on deep pages; `Article` JSON-LD on stories; program/project metadata; confirm `sitemap.ts` picks up the new slugs.

## 6. Acceptance criteria

- Every Phase-3a route built with **real content from the bundle**; responsive at 360/768/1280; WCAG 2.2 AA; reduced-motion safe.
- Verified data applied (name fixes, Pads & Pals ongoing, no Locations stat, no "Other Locations," real mission/vision/story).
- Real images imported and used where mapping is confirmed; `PlaceholderImage` elsewhere; **a proposed photo→content mapping produced for review**.
- `npm run build` / `lint` / `typecheck` clean; strict, no `any`; **token-only colour**; one `<h1>` per page; metadata + breadcrumb/article JSON-LD in place.
- **Contact, Volunteer, and Donate remain the Phase 1 stubs** (Phase 3b).

## 7. When you finish

1. Run build + lint + typecheck; fix anything failing.
2. Summarise: pages built, components added, the **photo→content mapping proposal**, and the remaining `[KHI]` items (RC number, social URLs, impact "as of" dates, financials, photo confirmations).
3. **Stop and wait for review before Phase 3b** (Contact / Volunteer / Donate + Paystack). Don't continue automatically.
