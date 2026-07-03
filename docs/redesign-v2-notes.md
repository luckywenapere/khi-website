# Redesign v2 — Old-Site Design Language Analysis

Working notes for the "second pass" the user requested (2026-06): make the new
site **bold and confident** without losing what made the old WordPress site
beautiful. KHI recently raised more money and has a reputation to maintain.
Extend this file as more screenshots arrive.

## Screenshots received so far (batch 1 of N)
1. Old homepage (full page)
2. Disclaimer page
3. Cookie Policy page
4. Privacy Policy page
5. Terms and Conditions page

---

## A. The old homepage — structure & composition (top to bottom)

1. **Header:** circular badge logo + wordmark · Home · About ▾ · Projects ·
   Partnerships · Contact · **DONATE NOW** (blue pill). Clean, airy.
2. **Full-bleed photo hero** (dark forest/field image, subtle dark scrim):
   centered **white serif display headline** "Empowering lives... building
   futures", short subhead, single pill CTA ("SUPPORT INITIATIVE").
   Dramatic, emotional, confident.
3. **Numbered values card row overlapping the hero bottom** (floating white
   card): 01 Compassion · 02 Empowerment · 03 Integrity, each with a one-line
   description. The overlap gives depth/craft.
4. **"ABOUT US / Who We Are":** small caps eyebrow + big blue serif heading,
   two short paragraphs, button; RIGHT: **masonry photo collage** (4-5 real
   photos of children/women/community work). Cream background.
5. **"WHAT WE BELIEVE IN / Our Core Values":** mirrored composition — photo
   collage LEFT (hands-heart photo, woman presenting), heading + bullet list
   (Education, Health, Gender equality, Climate action) RIGHT.
6. **Full-width flat blue donation band:** "Your donation is making a
   difference" + white DONATE NOW pill. Mid-page conversion moment.
7. **"IMPACTING COMMUNITIES / Normalizing Happiness":** centered eyebrow +
   serif heading + short paragraph + one **large single photo** (smiling
   children) + small ornament divider. Breathing room; one emotional beat.
8. **"OUR PROJECTS / Our Sacrifice To Humanity":** centered heading +
   paragraph; photo of a community meeting beside a "Priority Initiatives"
   bullet list (11 themes); "SEE OUR PROJECTS" button.
9. **Floating stats card over a dark photo band:** white rounded card with
   orange icons — 4+ Projects · 5+ Partners · 7+ Locations · ₦5M+ Funds
   Raised — overlapping into "THRIVING EVERYDAY / What We Have Achieved"
   text. (Numbers superseded: new site shows 18/11/26/₦28M+/9,000.)
10. **Dark full-bleed photo CTA:** "They Need Your Help!" + DONATE NOW over a
    photo of children. Emotional close.
11. **Footer:** Social · Quick Links · Navigate · Policies columns.

## B. Legal pages (Disclaimer / Cookie / Privacy / Terms)
- Same chrome; content as a **white card floating on the cream page
  background** with generous padding — reads as a document, not a bare page.
- Serif page title, bold numbered section headings, blue links.
- Confirms real domain **khinitiative.org** and info@khinitiative.org.
- Text is what we already carried over verbatim into `content/legal/`.

## C. The old site's design language (the "beauty" to preserve)
- **Photography-first.** Big, real, emotional photos everywhere: full-bleed
  hero, collages, single hero-photo sections, photo-backed CTA bands. The
  imagery does the persuasion; text stays short.
- **Serif display in brand blue / white** at large sizes (matches our
  Fraunces direction — the pairing is already grounded in their identity).
- **Cream page background** (#F7F6EC-ish) as the default canvas, white cards
  on top — warm, not clinical. (Our rebuild uses white as default, cream as
  accent; old site is the inverse.)
- **Depth via overlap:** floating cards that straddle section boundaries
  (values row over hero; stats card over dark band).
- **Alternating composition rhythm:** text-left/photos-right, then
  photos-left/text-right, then centered — never monotonous.
- **Eyebrow + big heading** pattern for every section (we kept this).
- **Confident conversion moments:** a flat blue band mid-page and a dark
  photo CTA at the end.
- **Evocative, human section titles** ("Normalizing Happiness") — emotional
  register, even if the audit rightly wanted concrete proof up front.

## D. What we deliberately fixed and must NOT regress (Phase 0 audit)
- Fake "Other Locations" (India/Australia/US) — removed; stays removed.
- The SAME dark donate band repeated on nearly every page (CTA fatigue) —
  one bold band per page is the fix, not zero bold bands.
- Abstraction burying the concrete work — keep leading with real projects.
- Broken values chevrons on About; placeholder-only content; stale numbers.
- No trust layer — Transparency page, honest stats stay.

## E. Synthesis direction for v2 (to refine after remaining screenshots)
Keep the new IA, content strategy, a11y, and performance. Adopt the old
site's visual boldness:
1. **Full-bleed photo hero** with charcoal scrim + white Fraunces display
   type (Phase 2 brief already sanctioned this once real photography landed —
   it has: Drive photos incoming via `public/images/incoming/`).
2. **Numbered values row (01/02/03)** as a floating card overlapping the hero.
3. **Photo collage/masonry** compositions on Home + About instead of single
   placeholder rectangles.
4. **Floating stat card** treatment (or full-bleed dark band) for the stats.
5. **Dark photo CTA band** as the page's closing beat (single, not repeated).
6. Consider **cream as the default page canvas** with white cards, matching
   the old warmth.
7. Legal pages: white document card on cream (small change, big polish).
8. Keep: header/nav IA, Donate persistent button, forms, Paystack, SEO/JSON-LD.

---

## F. Batch 2 screenshots (Partnerships · Trustees · About · Team · Home again)

### Partnerships page — the strongest editorial layout on the old site
- **Asymmetric page header:** huge dark serif "Partnerships" LEFT, intro
  paragraph RIGHT, full-width horizontal rule under both. Confident,
  magazine-like. Worth adopting for v2 page headers.
- **Partner rows:** blue serif partner name (left) | thin vertical divider |
  description (right), generous vertical spacing, hairline rules between.
- **Partner LOGOS displayed** (Ramadan Food Aid round badge, Kenvic gold
  badge, Hopeful Hands). Margaret Umeche Centre had none.
- Ends with the dark "They Need Your Help!" photo CTA + footer.

### Board of Trustees page
- Centered blue serif heading + justified intro paragraph.
- **4 elevated white cards** (drop shadow, portrait, serif name, small grey
  role). Confirms the real trustee headshots match what we wired
  (Abolurin grey suit, Alabi, Ekpa navy/plaid, Omobola red).

### About page + Meet The Team (captured broken/raw)
- Content order: tagline → About Us → A Soft Spot for Children → photo stack
  → Social Impact → big logo → How We Came About → 01/02/03 values →
  Partner With Us (B/W photo) → Vision → Mission → Values → Meet The Team.
- **Execution was broken:** Elementor filler text visible ("Adjusting full
  image box with important details using this team template..."), Dr. Alabi
  block duplicated, giant logo dumped mid-page, stray blue dot dividers.
  Evidence for the rebuild; copy the warmth, never the execution.
- **Imagery inventory (real KHI):** classroom close-ups, girl at sewing
  machine, "One Act of Kindness" crowd sign photo, distribution events,
  B/W kids photo used for "Partner With Us".
- Dark photo CTA band repeats on every page → confirms the audit's CTA
  fatigue finding. v2 keeps ONE bold closing band per page.

## G. Asset discoveries (verified on disk in docs/wp-export — recoverable!)
Checked the untriaged square PNGs by eye:
- `2025/05/1001136152.png` (720x714) = **Hopeful Hands for Help logo** ✓
- `2025/05/Mask-group-2.png` (429x431) = **Kenvic Global Foundation logo** ✓
- `2025/07/1001371298.png` = REAL photo: girl with pads + KHI Instagram-frame
  prop at a school (Pads & Pals / hygiene outreach; deliberately posed with
  media prop).
- `2025/07/1001371243.png` = REAL photo: woman at "Pads & Pals — Menstrual
  Hygiene Awareness and Walk" (banner: 6 Apr 2025, KHI + Hopeful Hands as
  sponsors, hinitiative.org contact).
- `2025/07/1001371294.png` = REAL photo: schoolgirls crowd + KHI-branded
  "One Act of Kindness can change a life" sign (used on old About).
- Unchecked, same batch (likely more event photos): `1001371292_1.png`,
  `1001371291.png`, `1001371295.png`.
- **Ramadan Food Aid logo** (round red/blue badge on old Partnerships page):
  not yet located in the export — hunt during redesign pass or request.
- v2 actions: wire the two confirmed logos into `content/partners.ts` +
  PartnerCloud/partner page; add the three verified event photos to the
  Pads & Pals gallery / About collage. Consent posture: subjects posing with
  KHI media props/banners at organised events reads as media-consented, but
  still get KHI's explicit confirmation.

---

## H. Batch 3 screenshots (Gallery index + 3 galleries · Donate · Contact · Stories · Updates)

### Gallery index + per-project galleries
- Index: editorial header + 4 project cards (Scholarship = PTA ICT Lab group
  shot; Ramadan = blue bag close-up; Kenvic = panel-on-couches; Margaret
  Umeche = IWD banner group) each with SEE PICTURES. Confirms our
  fold-gallery-into-projects decision; card imagery ref for v2 ProjectCards.
- "Tap each image to enlarge it" lightbox hint → we already have a proper
  keyboard-operable Lightbox.
- **Scholarship gallery (13 photos)** matches the set we wired (school-1..4,
  IMG-2025xxx): certificates, PTA ICT LAB 2023/2024 building, Government
  Secondary School Zuba signs, classroom desks. Mapping validated ✓.
- **Ramadan gallery EXISTS (5 photos):** blue food bags in a car; labelled
  bag close-up ("Distribution of Food Stuffs to the Needy"); rows of bags on
  floor; two recipients holding bags with the CRUDE GREEN-BOX face redaction
  the audit flagged. → Three shots are FACE-FREE and immediately usable if
  originals are found. Originals not yet located in the export
  (20250304_103256 checked by eye = school compound, NOT Ramadan; the
  confirmed scholarship mapping stands). v2 action: contact-sheet eyeball
  pass over all unmapped export photos to find the blue-bag originals; never
  reproduce green-box redaction (crop/omit faces instead).
- **IWD / Margaret Umeche gallery (9 photos):** International Women's Day
  2025, 8 MAR 2025, School Auditorium KSU Kabba, purple "ACCELERATE ACTION"
  banners; group shots, podium speakers. These do NOT visually match the
  IMG-20250318/20 files we tentatively wired as the IWD gallery → cross-check
  in the contact-sheet pass (candidates: P106* auditorium-style camera files,
  currently used for home hero/impact). Tentative flag was justified.
- **Kenvic gallery (4 photos):** kids with mics, woman at podium, panel on
  couches, man + woman with 5th-anniversary cake. Our kenvic*.jpg likely
  covers 3; panel photo = gallery-index card.

### Donate page (old)
- Solid blue full-width band, white serif headline **"The goal is to give it
  away happily."**, subhead, then the girl-with-jerrycan photo (the same
  girl-water.jpg we already use), then preset buttons ₦500 → ₦1,000,000 +
  ANY AMOUNT — exactly matching our Paystack config ✓. v2: adopt the bold
  blue band + overlapping photo composition; keep our trust rail. The old
  headline is candidate copy (evocative; pair with concrete subcopy).

### Contact page (old)
- Editorial header; white form card (placeholder-only labels = the audit's
  a11y flaw, ours fixes it) + right rail: Office address, embedded map,
  Email Us, Give Us a Call, Social Media. Our structure already mirrors this.

### Stories / Updates
- Back 2 School hero = the torbee2 portrait (author Blessing) ✓ matches our
  wiring. Girl Child hero = girl-child.jpeg (synthetic/stock-looking girls
  photo — it IS the site's original; keep, note aesthetic).
- Updates listing = 2 post cards, meta rows (date · author · category),
  Read more. Our stories grid ≈ equivalent.
- Dark "They Need Your Help!" band again on every page (regression guard).

## Old-site coverage status
Seen: Home ✓ About(+Team) ✓ Trustees ✓ Partnerships ✓ Gallery index ✓
Ramadan/Scholarship/IWD/Kenvic galleries ✓ Donate ✓ Contact ✓ Updates ✓
both stories ✓ four legal pages ✓. NOT yet seen: the Projects listing page
(have its verbatim text in pages/projects.md — likely sufficient).

## Open questions for the user
- Confirm consent/clearance for identifiable-face photos (esp. Ramadan
  recipients — old site green-boxed them; we will crop/omit instead).
- Projects listing screenshot: available, or proceed without (text known)?
- Drive photo folders → `public/images/incoming/` still pending download.
- Green light to assemble the full v2 design plan?
