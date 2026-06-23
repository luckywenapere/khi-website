# KHI Content — Verified & Final (from the WordPress export)

Parsed the WXR export (205 items: **18 pages, 2 posts, 155 images**). This **supersedes the `[KHI: copy from source]` gaps** in `KHI-content-pack.md`. The clean, verbatim text for every page/post/legal page is in this bundle (`pages/`, `posts/`, `legal/`); this file is the **verified + decided layer** — corrections, structured data, image triage, and what's still genuinely missing.

---

## A. What the export changed (findings & decisions)

1. **Real origin story — use it.** KHI was founded by ten graduates of the **African Centre for Leadership, Strategy & Development**, **registered with the CAC on 3 January 2025**, with TIN (FIRS) and SCUML (EFCC) obtained. Strong, verifiable trust content for About + the Transparency page. (Full text: `pages/about-us.md`.)
2. **"Other Locations" are fake — remove them.** The India/Australia/US addresses are demo placeholders from the theme (*"Dev Plaza, New Delhi"*, *"Birdsville QLD"*). **Decision: delete them site-wide and drop the "7+ Locations" stat.**
3. **Built on Elementor + a wildlife/animal-welfare theme template.** ~38 images are leftover demo assets (`save-elephants`, `clean-ocean`, `deer-icon`…) — **discard.** Real photos need your review (§D).
4. **Name corrections** (my screenshot reading → verified from source):
   - Mayowa J. ~~Oshi~~ → **Odu**
   - Tor ~~Mngusee~~ → **Mwuese** Blessing
   - ~~Ajimi~~ → **Ajani** Lukman Idowu
   - Ezinne Janefrances ~~Nwomu~~ → **Nwonu**
   - ~~Annlika~~ → **Anulika** Njemanze
5. **Pads & Pals status:** the site tags it "completed," but the copy says it's current → **`status: "ongoing"`**.
6. **Old plugins (FYI, not carried over):** donations ran on **GiveWP**, the contact form on **WPForms**. The rebuild uses **Paystack (redirect)** + a custom contact form per your decisions, so neither transfers — just context for what those pages did.
7. **Both posts are dated 2025-09-10** (verified) — fills the date gap from the content pack.

---

## B. Verified structured data (for `/content`)

**Mission, vision, values** (real, from the live About page):
- **Vision** — "To create a world where everyone has access to food, quality education, healthcare, and gender equality."
- **Mission** — "We aim to ensure that all individuals, regardless of gender, have the resources and opportunities necessary to thrive and be fulfilled."
- **Current home tagline** — "Empowering lives… building futures."
- **Values** — Education · Health · Gender Equality · Climate action
- **Founding** — registered with the CAC on **3 Jan 2025** (+ TIN, SCUML).

**Stats** — **drop "Locations"** (it depended on the fake addresses). Suggested set: `Projects 4+ · Partners 5+ · Funds raised ₦5M+`. All still need an **"as of" date + source** to be credible (`[KHI]`).

**Programs / projects / partners** — structure unchanged from the content pack (4 programs, 5 projects, 4 partners). Exact verified descriptions are now in `pages/projects.md` and `pages/partnerships.md`. Apply the **Pads & Pals → ongoing** fix.

**People** (verified roster — **full bios are in `pages/about-us.md` and `pages/board-of-trustees.md`**):

*Team*
- Dr. Oluwaseun Yinka Alabi — Executive Director
- Margaret Umeche — Secretary/Admin
- Mayowa J. Odu — Financial Manager
- Fadeke Akinwale Akarakiri — Programs/Project Team Lead
- Yagba Philip Ierendoo — Procurement Officer
- Tor Mwuese Blessing — Communications Lead
- Ajani Lukman Idowu — Partnership/Volunteer Manager
- Ezinne Janefrances Nwonu — Team Member
- Barrister Anulika Njemanze — Team Member

*Board of Trustees*
- Engr. Oluwaseun Ige Abolurin — Chairman
- Dr. Oluwaseun Yinka Alabi — Secretary
- Ekpa Friday Okpanachi — Member
- Omobola Omofaiye — Member

**Stories** (verified):
- "The Power of the Girl Child: A Path to a Brighter Future" — 2025-09-10 → `posts/the-power-of-the-girl-child.md`
- "Back 2 School" — 2025-09-10 → `posts/back-2-school.md`

**Contact** (verified): 24 Kaltungo Street, Garki 2, Abuja, Nigeria · info@khinitiative.org · 0708 222 7153, 0908 892 8236. **Remove** the "Other Locations" block.

---

## C. Long-form content in this bundle

- **`pages/`** — home, about-us, board-of-trustees, projects, partnerships, contact, donate, updates, gallery, and the four project sub-pages.
- **`legal/`** — privacy, terms, cookies, disclaimer (full text; Privacy & Terms dated 7 Mar 2025 — worth a lawyer's quick pass).
- **`posts/`** — both articles with frontmatter.

*Minor:* a few residual heading artifacts remain from the page builder (e.g., values rendered as `## 01` / `## Compassion`). Clean those when composing the page — the prose itself is intact.

---

## D. Image triage (full list in `images.md`)

- **~38 template/demo** assets (`save-*`, `wildlife`, `deer-icon`…) → **discard.**
- **4 fake-location** images (`africa`/`australia`/`india`/`usa`) → **discard.**
- **~113 "likely real"** → **review and map.** This bucket holds the genuine project/gallery photos, team headshots, and hero candidates — but the filter is loose, so some demo may be mixed in, and I **can't reliably match a specific headshot to a specific person from filenames alone.** Mapping photo → project/person is a **Phase 3 review step with your eyes on it.**

---

## E. Still genuinely missing (only KHI can supply)

1. **Registration (RC) number** — the story confirms CAC registration but the number isn't in the text; needed for footer/Transparency trust.
2. **Real social handles / URLs** (Instagram, Facebook) — the site only had labels.
3. **Verified impact numbers + an "as of" date** (the 4+/5+/₦5M+).
4. **Photo → content mapping** (§D) and consent confirmation for any identifiable beneficiaries.
5. **Final domain** (assuming `khinitiative.org`).

---

## F. How this plugs into the build

- The **clean page/legal/post files** are the **verbatim content source** for Phase 3 pages.
- **§B** is the **verified data** to (a) fill the `[KHI]` gaps in the Phase 2 content modules and (b) build Phase 3.
- **Decisions to apply everywhere:** remove "Other Locations"; drop the "Locations" stat; apply the five name fixes; Pads & Pals = ongoing; discard the demo imagery.

Put this whole bundle **and** `KHI-content-pack.md` into `docs/` for the Phase 3 session.
