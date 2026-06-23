# KHI Content Pack — for Path A (`/content`)

This is the **content transfer** for the rebuild. It's the structured seed Claude Code turns into typed modules under `/content`.

**Read this honestly:**
- Most of what's below was **transcribed from screenshots of your existing site** — so **verify every line against the source**; small transcription errors are possible.
- Anything marked **`[KHI]`** must be supplied by you — I can't extract or invent it.
- **Images are not in here.** Export them full-resolution from your WordPress **media library**; the screenshots can't be reused. Beneficiary photos need consent + clean handling.
- **Verbatim long-form text** I only partly captured (full team bios, the two article bodies, the four legal pages) is marked `[KHI: copy from source]` — fastest via copy/paste from the live site or a WP export.

The recommended flow: **use this pack as the structured scaffold** (it already reorganizes everything into the new IA + program model), then **fill the `[KHI]` gaps from a WordPress export** (media + verbatim text). That's the whole content transfer.

---

## 1. Site basics → `content/site.ts`

```ts
export const site = {
  name: "Kind Humanitarian Initiative",
  shortName: "KHI",
  // Faithful to current homepage hero copy — fine to keep or refine:
  mission:
    "We build sustainable systems that foster self-sufficiency and growth, empowering less-privileged communities to thrive.",
  contact: {
    address: "24 Kaltungo Street, Garki 2, Abuja, Nigeria",
    email: "info@khinitiative.org",
    phones: ["+234 708 222 7153", "+234 908 892 8236"],
  },
  socials: {
    instagram: "[KHI: handle/URL]",
    facebook: "[KHI: handle/URL]",
  },
  registrationNumber: "[KHI: CAC/registration number — needed for the Transparency page + footer trust]",
  foundedYear: "[KHI: year KHI itself was founded]",
  baseUrl: "https://www.khinitiative.org", // [KHI: confirm final domain]
};
```

---

## 2. Programs → `content/programs.ts`

The four areas, with the projects nested under each. **Descriptions are my drafts** — rename/reword freely.

```ts
export const programs = [
  {
    slug: "education-scholarships",
    name: "Education & Scholarships",
    summary:
      "Removing the cost barriers that keep able students out of school — from exam fees to learning support.",
    projects: ["khi-scholarship-cohort-1"],
  },
  {
    slug: "health-hygiene",
    name: "Health & Hygiene",
    summary:
      "Menstrual health, hygiene education, and dignity programs for women and girls.",
    projects: ["iwd-menstrual-hygiene", "pads-and-pals"],
  },
  {
    slug: "food-relief",
    name: "Food Relief",
    summary:
      "Getting food to families, orphans, and widows in periods of greatest need.",
    projects: ["ramadan-food-distribution"],
  },
  {
    slug: "youth-leadership",
    name: "Youth & Leadership",
    summary:
      "Equipping young people with the skills and confidence to lead change in their communities.",
    projects: ["kenvic-leadership-conference"],
  },
];
```

> Note: "Climate action" appears as a stated value on the current site but has **no project behind it**. Per the audit, leave it out of the menu until there's real work — don't promise an empty program.

---

## 3. Projects → `content/projects.ts`

The five real initiatives, faithful to the site (light copy cleanup flagged inline). **Each needs real photos `[KHI]`.**

```ts
export const projects = [
  {
    slug: "khi-scholarship-cohort-1",
    title: "KHI Scholarship — Cohort 1",
    program: "education-scholarships",
    partner: null,
    date: "2024/2025", // [KHI: confirm exact date]
    status: "completed",
    summary:
      "KHI paid the senior-secondary examination fees for 20 indigent students in their final transition class (SSS3), helping them complete school and move toward a brighter future.",
    // original copy had "achieve a thrive to greater future" — cleaned above; verify intent
    images: ["[KHI: scholarship photos — students, certificates, ICT lab]"],
  },
  {
    slug: "iwd-menstrual-hygiene",
    title: "International Women's Day Program",
    program: "health-hygiene",
    partner: "margaret-umeche-centre",
    date: "[KHI: date]",
    status: "completed",
    summary:
      "In partnership with the Margaret Umeche Centre, an International Women's Day program educating women on menstrual hygiene and the harms of social-media misuse.",
    images: ["[KHI: Women's Day / Margaret Umeche photos]"],
  },
  {
    slug: "ramadan-food-distribution",
    title: "Ramadan Food Distribution",
    program: "food-relief",
    partner: "ramadan-food-aid",
    date: "[KHI: date]",
    status: "completed",
    summary:
      "Partnering with Ramadan Food Aid to distribute foodstuffs to the poor, orphans, and widows during Ramadan and beyond.",
    images: ["[KHI: Ramadan distribution photos — proper consent/handling]"],
  },
  {
    slug: "kenvic-leadership-conference",
    title: "Developing Essential Skills for the Modern Leader",
    program: "youth-leadership",
    partner: "kenvic-global-foundation",
    date: "2025-03-27",
    status: "completed",
    summary:
      "A leadership and empowerment conference with Kenvic Global Foundation, equipping participants with the skills, knowledge, and confidence to become effective leaders and change-makers in their communities.",
    images: ["[KHI: Kenvic conference photos]"],
  },
  {
    slug: "pads-and-pals",
    title: "Pads & Pals",
    program: "health-hygiene",
    partner: "hopeful-hands-for-help",
    date: "[KHI: start date]",
    status: "ongoing", // CORRECTED: site tags it "completed" but the copy says it's current
    summary:
      "An ongoing project with the Hopeful Hands for Help Initiative promoting menstrual health and hygiene among young girls — educating girls about menstruation and empowering boys to be supportive allies.",
    images: ["[KHI: Pads & Pals photos]"],
  },
];
```

---

## 4. Partners → `content/partners.ts`

```ts
export const partners = [
  {
    slug: "margaret-umeche-centre",
    name: "Margaret Umeche Centre",
    description:
      "Focuses on women's education and empowerment, with programs in menstrual-hygiene education and the responsible use of social media, partnering with other organizations to deliver them.",
    logo: "[KHI: logo file]",
  },
  {
    slug: "ramadan-food-aid",
    name: "Ramadan Food Aid",
    description:
      "Provides foodstuffs to the poor, orphans, widows, and the needy during Ramadan and beyond. Started in 2021 in Abuja, with plans to extend across all states of the federation.",
    logo: "[KHI: logo file]",
  },
  {
    slug: "kenvic-global-foundation",
    name: "Kenvic Global Foundation (KGF)",
    description:
      "A non-profit that empowers marginalized groups — especially women and children — through education, skills development, and leadership growth.",
    logo: "[KHI: logo file]",
  },
  {
    slug: "hopeful-hands-for-help",
    name: "Hopeful Hands for Help Initiative",
    description:
      "Dedicated to inspiring hope and transforming lives through sustainable development, education, healthcare, and social justice — empowering communities and advocating for vulnerable populations.",
    logo: "[KHI: logo file]",
  },
];
```

---

## 5. People & governance → `content/team.ts` + `content/trustees.ts`

**Names are from your site; roles I'm unsure of are `[KHI]`; full bios + headshots are `[KHI: copy from source]`.** Confirm who should still be listed.

```ts
// content/team.ts
export const team = [
  { name: "Dr. Oluwaseun Yinka Alabi", role: "Executive Director", bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Mayowa J. Oshi",            role: "Financial Manager",  bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Fadeke Akinwale Akarakiri", role: "[KHI: confirm]",     bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Margaret Umeche",           role: "[KHI: confirm]",     bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Yagba Philip Ierendoo",     role: "[KHI: confirm]",     bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Tor Mngusee Blessing",      role: "[KHI: confirm]",     bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Ajimi Lukman Idowu",        role: "[KHI: confirm]",     bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Ezinne Janefrances Nwomu",  role: "[KHI: confirm]",     bio: "[KHI: copy from source]", photo: "[KHI]" },
  { name: "Barrister Annlika Njemanze", role: "[KHI: confirm]",    bio: "[KHI: copy from source]", photo: "[KHI]" },
];

// content/trustees.ts  (Board of Trustees — merge into About › People & governance)
export const trustees = [
  { name: "Engr. Oluwaseun Ige Abolurin", role: "Chairman",  photo: "[KHI]" },
  { name: "Dr. Oluwaseun Yinka Alabi",    role: "Secretary", photo: "[KHI]" },
  { name: "Ekpa Friday Okpanachi",        role: "Member",    photo: "[KHI]" },
  { name: "Omobola Omofaiye",             role: "Member",    photo: "[KHI]" },
];
```

---

## 6. Impact stats → `content/stats.ts`

```ts
export const stats = [
  { value: "4+",   label: "Projects" },
  { value: "5+",   label: "Partners" },
  { value: "7+",   label: "Locations" },
  { value: "₦5M+", label: "Funds raised" },
];
// [KHI] Per the audit, each number needs an "as of" date + source to be credible.
// Also resolve the "Other Locations" claim (India/Australia/US) before "7+ Locations"
// goes on the Impact/About pages — substantiate, reframe, or drop.
```

---

## 7. About → `content/about` (mission, values, story)

Faithful to the current site; full story text is `[KHI]`.

- **Vision:** "We aim to ensure that all individuals, regardless of background or socioeconomic status… " `[KHI: copy full text from source]`
- **Our story ("How We Came About"):** `[KHI: copy from source]`
- **Values** (keep — they're clear):
  - **Compassion** — We uplift vulnerable communities, ensuring no one is left behind.
  - **Empowerment** — We equip individuals with the education and skills needed for self-sufficiency.
  - **Integrity** — We uphold transparency, accountability, and ethical practices in all our initiatives.
- **Focus areas** (from "Core Values"): Education · Health · Gender equality · (Climate action — aspirational, no project yet)

> **Audit's #1 content move:** the homepage should **lead with the concrete work**, not abstraction. Draft hero options grounded in real facts (pick/edit one):
> - *"We paid the final exam fees for 20 students who'd have dropped out. That's where we start."*
> - *"Practical help for communities in Abuja — scholarships, hygiene, food relief, leadership."*

---

## 8. Stories → `content/stories/`

Metadata + excerpts are real; **full bodies are `[KHI: copy from source]`** (I have outlines, not verbatim text).

```ts
export const stories = [
  {
    slug: "back-2-school",
    title: "Back 2 School",
    date: "2025-09-10",
    author: "Blessing",
    excerpt: "Introduction: The summer holidays are coming to an end, and it's time to gear up…",
    body: "[KHI: copy from source]",
    image: "[KHI]",
  },
  {
    slug: "the-power-of-the-girl-child",
    title: "The Power of the Girl Child: A Path to a Brighter Future",
    date: "2025-09-10",
    author: "KH Initiative",
    excerpt: "The world is full of untapped potential, and a significant portion of it lies in…",
    body: "[KHI: copy from source]", // outline below for reference
    image: "[KHI]",
  },
];
```

*Outline of "The Power of the Girl Child" (for reference, fill body from source):* The Challenges They Face (Poverty · Child Marriage · Gender-Based Violence · Lack of Sanitation) → The Transformative Impact of Education (Improved Health · Economic Growth · Breaking the Cycle of Poverty · Empowered Voices) → Real-Life Stories of Resilience → How We Can All Help (Support Girl-Focused Initiatives · Challenge Harmful Norms · Raise Awareness · Be a Mentor).

> Two posts, both Sep 2025, is thin and reads as inactive. Plan a small cadence of new Stories so the section looks alive at launch.

---

## 9. Donate → `content/donate.ts`

```ts
export const donate = {
  provider: "paystack",      // redirect checkout
  currency: "NGN",
  presets: [500, 1000, 10000, 100000, 500000, 1000000],
  allowCustom: true,
  // [KHI] Add impact framing per the audit (fill real figures):
  // e.g. "₦[amount] covers exam fees for one student", "₦[amount] = a Ramadan food pack"
  recurring: "[KHI: do you want a monthly option? brief said redirect — confirm]",
};
```

---

## 10. Legal → Terms / Privacy / Cookie / Disclaimer

All four exist on the current site; I only captured fragments, so: **`[KHI: copy full text from source]`** for each. (Terms shows an effective date of **7 March 2025**.) A lawyer should give them a quick pass, but the existing text is the starting point.

---

## 11. Image manifest — what to export from WordPress `[KHI]`

Export full-resolution from your media library (and gather consent for any identifiable beneficiaries):

- **Logo** — you've sent the PNG; an **SVG** is ideal for crisp scaling.
- **Hero / field photography** — the current homepage and donate-page images (incl. the child carrying the water container).
- **Per project:** Scholarship (students, certificates, the ICT-lab/school sign), Ramadan distribution, Kenvic conference, Women's Day / Margaret Umeche.
- **People:** team headshots + the four trustee photos.
- **Stories:** the images for both articles.

Anything you can't recover at good quality is a candidate for a fresh, consented shoot.

---

## What I still need from you (consolidated)

1. **WordPress export** (or copy/paste) for the `[KHI: copy from source]` items — full team bios, both article bodies, the four legal pages, the full vision/story text.
2. **Images** per §11.
3. **Verified impact numbers + dates** (§6) and the **"Other Locations" decision**.
4. **Registration number, social handles, founded year, final domain** (§1).
5. Confirm **team roles** flagged `[KHI: confirm]` and who should still be listed.
