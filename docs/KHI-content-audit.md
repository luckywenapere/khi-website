# Kind Humanitarian Initiative — Content Audit & Revised Direction
### Phase 0, Part 2 — done from your 14 full-page screenshots (≈18 pages)

This is the audit the brief asked for in step 1. It's based on the actual live site, not assumptions. It supersedes the *audit framework* in `KHI-website-plan.md`; the architecture, design-system structure, and implementation plan in that doc still stand.

> **Name:** the org is **Kind Humanitarian Initiative**, not "Kind Human Initiative" as the brief had it. I'll use the correct name throughout.

---

## A. What the brand actually is

Worth saying clearly because it's good news: **the brand DNA is solid — the execution is the problem.** The rebuild keeps the identity and fixes how it's delivered.

- **Logo:** circular badge, two cupped hands, "KHI" — blue + teal. Wordmark set in a heavy charcoal sans.
- **Primary colour:** a **royal/cornflower blue**, **`#426EC6`**, confirmed from the logo (the "K" and the arc). This is the brand and the rebuild builds on it.
- **Secondary:** the arc sweeps from that blue into a **bright sky-cyan (`#00B0F2`)** — that **blue→cyan gradient is the brand's signature**, and the rebuild reuses it. (The orange in the homepage stat icons isn't in the logo — it was a theme accent — so it's set aside unless you want a warm accent kept.)
- **Type:** the site already pairs a **high-contrast serif for headings** with a **humanist sans for body** — exactly the warm-but-credible direction the plan proposed. So that pairing is now *grounded in your real identity*, not a guess. We'll refine the serif for screen legibility and tighten the scale.

### Corrected palette (authoritative — replaces the plan's placeholder)

```
Neutrals    white #FFFFFF · gray-50 #F8F9FA · gray-100 #F1F3F5 · gray-200 #E9ECEF
            gray-500 #868E96 · gray-700 #495057 · charcoal #1F2328
            cream #F7F6EC  (warm off-white from the logo badge; optional surface)

Blue        50 #EEF3FC · 100 #D9E4F8 · 200 #B5C9F0 · 400 #5E84D4
            500 #426EC6  (brand — fills/buttons; white text passes AA ~4.9:1)
            600 #345BAE  (hover)
            700 #2A4C95  (TEXT/links — ~8:1 on white)

Sky-cyan    500 #00B0F2 · 400 #38B6EE   (accents only, never text)
Gradient    linear-gradient(120deg, #345BAE, #426EC6 40%, #00B0F2)  ← the logo arc; brand signature
```

Rule: blue **fills/shapes** use 500; blue **text/links** use 700; the **sky-cyan** is for accents and the brand gradient only — never text (cyan on white fails contrast).

---

## B. Page inventory & verdicts

| Page (live) | What's there | Verdict | Action in rebuild |
|---|---|---|---|
| **Home** | Hero, 3 values (Compassion/Empowerment/Integrity), Who We Are, photo grid, Core Values, "Priority Initiatives" (11 themes), stats (4+/5+/7+/₦5M+), repeated donate CTAs | **Rebuild** | Lead with concrete work; keep stats; cut repetition |
| **About Us** | Story ("How We Came About"), Vision, values (repeated), **Meet The Team** (large roster), **Other Locations** (India/Australia/Africa/US) | **Keep + restructure** | Split team into a *People* section; reframe "Other Locations" (see D-3) |
| **Board of Trustees** *(separate page)* | 4 trustees w/ photos + roles | **Merge** | Fold into **About › People & governance** with the team |
| **Projects** | 5 specific, dated, partner-credited initiatives, each → "SEE PICTURES" | **Keep + elevate** | This is your strongest asset — make it central (see F) |
| **Project photo albums** | Per-project galleries (Scholarship, Ramadan, Kenvic, Margaret Umeche) | **Merge** | Each album becomes the gallery *inside* its project page |
| **Partnerships** | 4 partners (Margaret Umeche Centre, Ramadan Food Aid, Kenvic Global Foundation, Hopeful Hands for Help) w/ logos + blurbs | **Keep** | Place under About or Get Involved; cross-link to projects |
| **Gallery** *(index)* | Grid that just re-lists the same projects | **Cut from nav** | Redundant with Projects — fold in; drop the standalone tab |
| **Contact** | Form, address (Garki 2, Abuja), `info@khinitiative.org`, two phones, map | **Keep** | Rebuild with accessible labels + validation |
| **Donate** | Naira preset buttons (₦500 → ₦1,000,000) + "any amount" | **Keep + upgrade** | Add impact framing, recurring option, trust info (see D-5) |
| **Updates** *(news listing)* | Only **2 posts**, newest **Sep 2025** | **Keep, rename → Stories** | Needs fresh/ongoing content to not read as inactive |
| **Articles** | "The Power of the Girl Child", "Back 2 School" (full posts) | **Keep** | Good long-form template to carry over |
| **Policies** | Terms, Privacy, Cookie, Disclaimer (Terms dated 7 Mar 2025) | **Keep** | Footer; light copy review |

---

## C. What's working — keep these

- **The Projects content is the gem.** Specific, dated, partner-credited, photo-documented: the KHI Scholarship (exam fees for 20 SSS3 students), the International Women's Day menstrual-hygiene program with Margaret Umeche Centre, Ramadan food distribution, the Kenvic leadership conference (27 Mar 2025), the "Pads and Pals" project with Hopeful Hands for Help. This is exactly the concrete proof that builds trust — it's just buried.
- **Real people and governance** — a named team and a Board of Trustees with photos. Credibility most charity sites lack.
- **Named partners** with logos and descriptions.
- **A complete Contact page** — address, email, two numbers, map.
- **A clear, ownable brand** — the blue + serif identity is a strong foundation.

---

## D. Problems found

**1 — Visual / UX**
- Reads as a **generic WordPress charity theme** — the exact look the brief wants to leave behind; inconsistent spacing and theme-default components throughout.
- **Broken "Values" element on About:** giant solid-black chevron/arrow shapes with tiny labels. It dominates the page, the hierarchy is inverted, and it looks broken.
- **CTA fatigue:** a near-identical dark "They Need Your Help! / DONATE NOW" band repeats on almost every page.
- **Empty voids:** large blank cream blocks (e.g., below the two posts on Updates, and on Home) make it feel unfinished.
- **Hero legibility:** white serif over a busy dark photo with no consistent scrim — readable here, fragile in general.

**2 — Content**
- **The homepage leads with abstraction** — "Our Sacrifice To Humanity," "Normalizing Happiness," "The goal is to give it away happily." Evocative, but a first-time visitor can't quickly tell *what KHI actually does*. Meanwhile the concrete Projects page answers exactly that — and it's three clicks away.
- **Copy errors:** "achieve a thrive to greater future"; a sentence that starts lowercase ("our work is guided by…"); inconsistent capitalisation.
- **Thin, stale news:** two posts, newest ~9 months old. Reads as dormant.

**3 — Trust / credibility (this is the brief's #1 goal, so treat carefully)**
- **No registration / charity number, no financials, no "where your money goes."** For the donors and partners you want, this is the highest-leverage gap.
- **Impact numbers lack provenance** — 4+/5+/7+/₦5M+ with no dates or sources.
- **"Other Locations" (India, Australia, United States) is a credibility risk.** An early-stage Abuja organisation claiming offices on three other continents invites doubt from exactly the careful donors/funders you're courting. **Decision needed:** are these registered entities, volunteer chapters, or aspirational? Recommendation — substantiate each (local registration/contact) or reframe honestly ("supporters in…") or remove. Overstated reach tends to backfire on trust.

**4 — Accessibility (WCAG 2.2 AA)**
- The **contact form appears to use placeholder-only fields** (Name/Email/Subject/Your thoughts) with no persistent, programmatic labels — a clear AA failure.
- **Repeated non-descriptive link text** — "Read more," "SEE PICTURES," "SEE OUR PROJECTS" — unusable out of context for screen-reader users.
- Likely **contrast and heading-hierarchy issues** inherited from the theme (light-grey body text; white-on-photo).
- **Crude face redaction** — green rectangles over beneficiaries' faces in the Ramadan album, applied inconsistently. A privacy/consent and professionalism issue; use proper consent + tasteful blurring, or photos cleared for use.

**5 — Donation flow**
- The amount grid jumps straight to numbers with **no impact framing** ("₦10,000 = a term of exam fees"), **no recurring option**, and **no trust/receipt information**. Easy, high-value wins.

**6 — Consistency**
- **Every project is tagged `[COMPLETED]`** — including one described as "currently in partnership."
- **Governance is split** across two pages (Team on About + a separate Board of Trustees).
- The footer's **"Quick Links" vs "Navigate"** split is arbitrary and duplicative.

---

## E. Information architecture — validated and refined

The live site **confirms** the moves proposed in the plan:

- **Programs vs Projects is the real confusion.** The site has *Priority Initiatives* (11 themes on Home) **and** *Projects* (5 specific instances) with **no Programs page**. → Build a **Programs** hub (the themes = ongoing areas of work) and **nest Projects** as instances within them. Confirmed.
- **Gallery duplicates Projects** (literally the same albums). → **Drop Gallery from the nav;** each project carries its own photos. Confirmed.
- **Governance is scattered** (Team + separate Trustees). → Consolidate into **About › People & governance**.
- **Donate is a footer/nav link.** → Make it the **persistent header button** + sticky mobile bar. Confirmed.
- **"Updates" is vague** and mixes notices with real articles. → Rename **Stories**.

### Refined sitemap (small delta from the plan)

```
Home
About
  ├─ Our story & mission
  ├─ People & governance        ← team + trustees, merged
  └─ Transparency & financials   ← NEW: registration, reports, where money goes
What We Do (Programs)            ← the 11 themes, organised
  └─ Programs › [program] › Projects (instances, each with its photos)
Impact                           ← stats (with sources) + outcome stories + reports
Get Involved
  ├─ Volunteer
  └─ Partner with us             ← the 4 partners live here
Stories                          ← was "Updates"; articles + field updates
Contact
Donate                           ← persistent button, not a tab; upgraded flow

Footer: legal name + registration no. · Transparency · Privacy/Terms/Cookie/Disclaimer
        · Contact · Newsletter · Socials   (replaces the arbitrary Quick Links/Navigate split)
```

---

## F. The single biggest content move

**Flip the homepage from abstract to concrete.** Right now it opens with sentiment and hides the proof. Lead instead with what KHI has actually, specifically done — *"We paid the final-year exam fees for 20 students. Here's what happened next."* — then let the values and vision follow. The Projects page already contains this material; the rebuild just promotes it to the front door. This one change does more for credibility than any visual polish.

---

## G. What I still need before/while building

1. **Brand files** — logo (SVG/PNG), exact blue + amber hexes, any brand/font guide. (I'm working from sampled colour for now.)
2. **The "Other Locations" decision** (D-3) — real, chapters, or aspirational? Affects trust copy and structured data.
3. **Real impact numbers with dates/sources** to replace 4+/5+/7+/₦5M+.
4. **Donation provider** — Paystack (given Naira)? And do you want **recurring** giving?
5. **Content layer** — given news is currently thin, in-repo typed content (Path A in the plan) is probably the right start unless staff will publish Stories regularly.
6. **Registration / legal details + any financials** for the Transparency page.

None of this blocks **Phase 1** (foundation: tokens, layout, header/nav, footer). I can start on the sampled blue and swap in your exact values the moment you send the logo.
