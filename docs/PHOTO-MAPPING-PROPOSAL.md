# Proposed photo → content mapping (for review)

**Nothing below is wired into the site yet.** Every image slot currently renders
`PlaceholderImage`. Once you confirm a mapping, wiring each photo is a one-line
`src` change (e.g. `<PlaceholderImage src="/images/people/dr-alabi.jpg" … />`).

Staged originals (no `-WxH` suffix) were copied into `public/images/{people,projects,stories}/`.
The ~38 demo/template assets and the 4 fake-location images were **not** copied.

## People → headshots (`public/images/people/`)

| File | Proposed person | Confidence |
|---|---|---|
| `dr-alabi.jpg` | Dr. Oluwaseun Yinka Alabi (ED / Trustee Secretary) | High |
| `mayowa.jpg` | Mayowa J. Odu | High |
| `ezinne.jpg` | Ezinne Janefrances Nwonu | High |
| `philip.jpg` | Yagba Philip Ierendoo | High |
| `anulika.jpg` | Barrister Anulika Njemanze | High |
| `ajani.jpg` | Ajani Lukman Idowu | High |
| `Ekpa-Friday.jpg` | Ekpa Friday Okpanachi (Trustee) | High |
| `omobola.jpg` | Omobola Omofaiye (Trustee) | High |
| `folake.jpg` | Fadeke Akinwale Akarakiri? | **Medium — spelling differs (folake vs Fadeke); confirm** |
| `margaret.jpg` / `Margaret-2.jpg` | Margaret Umeche | **Medium — two files; pick one** |
| `blessing-scaled.jpg` / `torbee2.jpg` | Tor Mwuese Blessing | **Medium — two candidates; confirm which** |
| `oluwaseun.jpg` | Engr. Oluwaseun Ige Abolurin (Chairman)? | **Low — two "Oluwaseun"s on the board; confirm vs Dr. Alabi** |
| `team_11.jpg` | Group team photo (About header / hero?) | Medium — appears to be a group shot, not a headshot |

## Projects → galleries (`public/images/projects/`)

| File | Proposed project | Confidence |
|---|---|---|
| `kenvic.jpg`, `kenvic-1.jpg`, `kenvic-3.jpg` | Kenvic Leadership Conference | High |
| `menstruation.jpg`, `menstruation-2.jpg` | IWD menstrual-hygiene **or** Pads & Pals (health-hygiene) | **Medium — confirm which project** |
| `food.jpg` | Ramadan Food Distribution | **Medium — file dates to 2019; confirm it's KHI's** |
| `children-classroom.jpg` | KHI Scholarship / education (illustrative) | **Low — may be stock; confirm** |

## Stories (`public/images/stories/`)

| File | Proposed use | Confidence |
|---|---|---|
| `girl-child.jpeg` | "The Power of the Girl Child" article | High |

## Not staged — review before use (likely stock or unlabeled)

In `docs/wp-export/uploads/` but **not** copied, because the filename does not
reliably indicate subject/consent. Confirm which are genuine KHI photos:

- Event photos with opaque names: `IMG-2025…-WA####`, `P10602##`, `100137####`, `school-1…6`, `20250205_…`, `IMG-20250320-WA018#`.
- Generic / likely stock: `pexels-…`, `african-woman(-1/-2)`, `african-farmers`, `happy-children(-2/-3)`, `happy-farmer`, `washing-hands`, `man-selling`, `giving-children`, `donate-1`, `fetching-water`, `school-building`, `baby-health`, `central-mosque`, `girl-water`, `child-water`, `food-market`, `happiness`.

## Beneficiary photos

Where faces are identifiable and consent is unconfirmed, keep `PlaceholderImage`
(or a tasteful crop) — never the old green-rectangle redaction. None are wired.
