# KHI Website — Phase 4 Build Brief (Polish · a11y · Performance · SEO · Launch) · for Claude Code

The **final phase**. Phases 1–3b built the whole site on **Next.js 16 / Tailwind v4 / shadcn on Base UI / React 19**. Phase 4 hardens it for launch: automated checks + fixes in-repo, finalization, and a launch checklist (some items are user actions, clearly marked `[KHI]`).

**Do the in-repo work, fix what's fixable, and report. This is the last phase — end with a launch-readiness summary, don't auto-deploy.**

---

## 1. Accessibility (WCAG 2.2 AA)

- Ensure `eslint-plugin-jsx-a11y` is active (it ships with `next/core-web-vitals`); resolve any warnings.
- Run **axe** against key routes (e.g. a `@axe-core/playwright` script, or `npx @axe-core/cli` on a running build) covering Home, About, a Program, a Project (with Lightbox), Impact, Stories, a Story, Contact, Donate. **Fix all violations.**
- Re-verify by hand in code: heading order + single `<h1>` per page; landmarks; `alt` on every image; **contrast** against the tokens (blue text = blue-700, never sky-cyan); form labels + `aria-describedby` errors + `aria-live` status + focus management; **Lightbox** keyboard ops (focus trap, arrows, Esc); skip link; `prefers-reduced-motion`.
- Produce a short **manual-QA checklist** for the user (keyboard-only walk-through of header/mobile sheet/dropdowns/forms/lightbox/donate; a screen-reader pass on Home/About/a Project/Contact).

## 2. Performance (Lighthouse > 95)

- On a **production build** (`next build && next start`), run **Lighthouse** (CLI or `unlighthouse` across routes); target **> 95** for Performance / Accessibility / Best-Practices / SEO on Home, About, a Program, a Project, Donate, Contact.
- **Image audit:** `next/image` everywhere with correct `sizes`; hero `priority`, the rest lazy; modern formats; **compress any oversized staged originals** in `public/images/` (some WhatsApp/camera files may be large).
- **CWV:** protect CLS (reserved image dimensions), LCP (hero), and JS budget (keep client islands minimal — forms, nav, lightbox, counter only); confirm fonts subset/preload only the above-the-fold display weight; drop unused deps.
- Fix findings; note any that need real-world field data.

## 3. SEO finalization

- **Metadata audit** via `lib/seo.ts`: every route has a unique title, description, canonical, and OG/Twitter tags; fill any gaps.
- **OG images:** a strong default + tailored ones for Home and Donate (stories can use an Article-style OG). Generate via `opengraph-image` or static assets.
- **JSON-LD:** verify Organization/NGO (site-wide), `BreadcrumbList` (deep pages), `Article` (stories); validate the shapes.
- **`sitemap.ts`** includes all routes incl. dynamic slugs; **`robots.ts`**; **`manifest.ts`** with **square + maskable PWA icons** (carryover — replace the wide wordmark); confirm `metadataBase` = the final domain.

## 4. Analytics

- Add **Vercel Analytics** + **Speed Insights** (`@vercel/analytics`, `@vercel/speed-insights`) in the root layout.

## 5. Content / photo polish (small carryovers)

- Wire the **Back 2 School** story image (`torbee2.jpg`); for **The Power of the Girl Child**, wire a real photo or keep `PlaceholderImage`.
- Leave a note for the user to confirm the **tentative IWD gallery** and do a final **eyes-on face check** on headshots.

## 6. Launch checklist (produce this, with status; `[KHI]` = user action)

**In-repo / automated (you):**
- [ ] Lighthouse > 95 on key routes · axe clean · `build`/`lint`/`typecheck` green.
- [ ] Metadata/OG/JSON-LD/sitemap/robots/manifest finalized · analytics added · images optimized.

**Config / gate go-live (`[KHI]`):**
- [ ] **Email:** set `RESEND_API_KEY` + a **verified sending domain** for `EMAIL_FROM` (recipient `info@khinitiative.org`) — or switch `lib/email.ts` to Formspree. Test a real submission.
- [ ] **Confirm all six Paystack preset pages exist** + test a redirect.
- [ ] **Logo SVG** (replace the PNG) + square/maskable icons.
- [ ] **Real social URLs** (Instagram/Facebook) in site config.
- [ ] **RC registration number** (footer + Transparency).
- [ ] **Ramadan photos** (real source) — or keep the placeholder intentionally.
- [ ] **Lawyer review** of the four legal pages.
- [ ] **Domain + DNS** pointed to Vercel · env vars set in Vercel · canonical/`metadataBase` = final domain.
- [ ] (Optional pre-launch) per-amount donate impact figures · allocation % + first report on Transparency.

## 7. When you finish

Run `build` + `lint` + `typecheck` + Lighthouse + axe; fix everything fixable in-repo; then report: scores, what was changed, the **manual-QA checklist**, and the **launch checklist** with each item's status. End with a clear **"ready to deploy pending the `[KHI]` items."** This is the final phase — don't deploy automatically.
