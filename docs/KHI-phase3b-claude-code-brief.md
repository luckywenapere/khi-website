# KHI Website — Phase 3b Build Brief (Get Involved · Contact · Donate · Photos) · for Claude Code

Continue in the **existing repo**. Phases 1–3a built the foundation, homepage, and all content pages on **Next.js 16 / Tailwind v4 / shadcn on Base UI / React 19**. Phase 3b completes the **remaining (interactive) pages** and **wires the confirmed real photos** site-wide. This is the **last build phase** before Phase 4 (polish).

Content + decisions: `docs/khi-content/` (incl. `README-KHI-content-final.md`, `pages/partnerships.md`). Confirmed photo mapping is in §6 below.

**Build Phase 3b only. Stop and report when done.**

---

## 1. Pages to complete (replace the Phase 1 stubs)

`/get-involved` · `/get-involved/volunteer` · `/get-involved/partner` · `/contact` · `/donate`

## 2. Donate — Paystack redirect (confirmed)

- **Preset buttons** link to `https://paystack.shop/pay/donate-n{amount}` where `{amount}` is the naira value with no separators: **500, 1000, 10000, 100000, 500000, 1000000**.
- **"Any amount"** → `https://paystack.shop/pay/any-amount`.
- Use **https** for all (the source `donate-n500` came as http — upgrade it).
- Implement the amounts as **server-rendered `<a>` links** (works without JS, keyboard-accessible). Put the base URL + preset list in **`content/donate.ts`** so it's maintainable.
- Design per the audit: the ₦ amount grid + "any amount," brand-blue, **plus** "where your gift goes" microcopy (templated; real per-amount figures `[KHI]`) and a trust line linking to `/about/transparency`.
- **Flag for the user:** confirm all six preset pages exist on Paystack (only `donate-n500` + `any-amount` were verified; the rest are inferred from the naming pattern).

## 3. Contact + Volunteer — accessible forms

- **Stack:** react-hook-form + zod; shadcn `form`/`input`/`textarea`/`select`; programmatic labels + inline errors (`aria-describedby`); real **idle → submitting → success → error** states (**never fake success**); success announced via `aria-live`; focus moves to the status on submit.
- **Contact** (`/contact`): Name · Email · Subject · Message, alongside the contact block — **24 Kaltungo Street, Garki 2, Abuja, Nigeria** · `info@khinitiative.org` · `+234 708 222 7153` / `+234 908 892 8236` — and an **embedded map** (a titled Google Maps embed iframe — no API key — or a static map + "Get directions" link). **No "Other Locations."**
- **Volunteer** (`/get-involved/volunteer`): Name · Email · Phone · Areas of interest (the four programs as options) · Message, with intro copy and volunteer imagery (`volunteer-team.jpg` / `volunteers.jpg`).
- **Delivery (provider-agnostic):** post to a Next.js **Server Action** that sends via **Resend** (`RESEND_API_KEY` env var → `info@khinitiative.org`), structured so switching to **Formspree** (or similar) is a one-line endpoint change. **Flag:** delivery is inactive until the key/provider is set — show the success state only on real success, a friendly error otherwise.
- **Spam:** a honeypot field + validation (no heavy captcha).

## 4. Newsletter (footer)

Wire the existing footer newsletter stub to the same delivery (email capture → Resend/provider, or a mailing-list provider). Accessible single-field form with real states. Provider is `[KHI]` if undecided — flag it.

## 5. Get Involved overview + Partner page

- **`/get-involved`:** `PageHeader` + three paths (Volunteer · Partner · Donate) via `CtaBlock`s + short framing.
- **`/get-involved/partner`:** `PageHeader` + the four partners from `partners.ts` + the `pages/partnerships.md` intro + a "partner with us" pitch + contact CTA. Partner logos are `[KHI]` → bordered name cards / `PlaceholderImage` until logos arrive.

## 6. Photo-wiring pass — confirmed mapping (replace `PlaceholderImage` `src`)

Wire per this list. **You can't see faces either — wire by the mapping; the user does the final visual check.** Keep `PlaceholderImage` where noted. Use the **originals** (no `-WxH` suffix); set meaningful `alt`.

- **Team (About):** Dr. Alabi → `dr-alabi.jpg` · Margaret Umeche → `Margaret-2.jpg` · Mayowa Odu → `mayowa.jpg` · Tor Blessing → `blessing-scaled.jpg` · Ajani Idowu → `ajani.jpg` · Ezinne Nwonu → `ezinne.jpg` · Anulika Njemanze → `anulika.jpg` · **Fadeke Akarakiri → `folake.jpg`** ✓ · **Yagba Ierendoo → keep `PlaceholderImage`** (no photo).
- **Trustees (Board):** **Engr. Abolurin (Chair) → `oluwaseun.jpg`** ✓ · Dr. Alabi → `dr-alabi.jpg` (reuse) · Ekpa Okpanachi → `Ekpa-Friday.jpg` · Omobola Omofaiye → `omobola.jpg`.
- **Scholarship gallery:** `IMG-20250208-WA0000`, `IMG-20250224-WA0017`, `IMG-20250227-WA0015`, `IMG-20250304-WA0009`, `school-1`, `school-2-1`, `school-3`, `school-4-1`.
- **Kenvic gallery:** `kenvic.jpg`, `kenvic-1.jpg`, `kenvic-3.jpg`.
- **Health & Hygiene** *(tentative — flag to confirm/swap):* mid-March event photos `IMG-20250318-WA0298`, `IMG-20250320-WA0181…0184` → **IWD** project; `menstruation.jpg`, `menstruation-2.jpg` → **Pads & Pals**.
- **Donate hero:** `girl-water.jpg`.
- **Home hero/sections:** use the genuine event photos `P1060169 / 236 / 250 / 266 / 291 / 356 / 450.jpg` (replace the Phase 2 placeholders); pick the strongest.
- **Ramadan project:** **keep `PlaceholderImage`** — no genuine photo in the export (flag: needs a real source).
- **Do NOT wire** the stock-looking generics (`happy-children`, `african-woman`, `school-child`, `food`, `fresh-water`, etc.) as real KHI work — leave as `PlaceholderImage`/omit; flag for the user to replace.

## 7. a11y · performance · SEO

- Forms fully accessible (labels, error association, focus management, `aria-live` status). Map iframe has a `title`. Donate links keyboard-accessible with visible focus.
- `next/image` for all newly-wired photos (`sizes`, lazy; hero `priority`); galleries lazy-load.
- Per-page `metadata` for all five pages (Donate can get a tailored OG). Keep client islands minimal (forms are client; rest RSC).

## 8. Acceptance criteria

- All five pages built — **no stubs left**; responsive 360/768/1280; WCAG 2.2 AA; reduced-motion safe.
- Donate buttons link to the correct **https** Paystack URLs; scheme in `content/donate.ts`.
- Contact + Volunteer + newsletter forms validate, show **real** states, and post to the provider-agnostic handler (delivery behind `RESEND_API_KEY` / provider TODO).
- Confirmed photos wired site-wide; `PlaceholderImage` retained for Yagba, Ramadan, and stock-looking slots.
- `npm run build` / `lint` / `typecheck` clean; token-only colour; one `<h1>` per page.

## 9. When you finish

1. Run build + lint + typecheck; fix anything failing.
2. Summarise: pages completed, form + delivery status, Paystack wiring, photos wired vs still-placeholder, and remaining `[KHI]` items — **Resend key or Formspree choice**, **confirmation all six Paystack pages exist**, **Ramadan photos**, stock-image replacements, RC number, social URLs, logo SVG, lawyer review of legal pages.
3. **Stop and wait for review before Phase 4** (polish: live a11y sweep, performance/Lighthouse, SEO finalization, analytics). Don't continue automatically.
