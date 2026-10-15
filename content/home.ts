import { site } from "@/content/site";

/**
 * Homepage-specific copy (Path A content). Editable here rather than hardcoded
 * in JSX. Sourced from the Phase 2 brief; the dedicated content pack
 * (docs/KHI-content-pack.md) was not present, so verified facts come from the
 * Phase 0 content audit. Items needing KHI input are flagged [KHI].
 */
export const home = {
  hero: {
    // Default headline (Phase 2 brief §3.1).
    headline:
      "Practical help for communities in Abuja: scholarships, hygiene, food relief, and leadership.",
    // Alternate, scholarship-led headline — swap in by replacing `headline` above:
    // "We paid the final-year exam fees for 20 students. Here is what happened next."
    subhead: site.mission,
    primaryCta: { label: "Donate", href: "/donate" },
    secondaryCta: { label: "See our work", href: "/programs" },
    // Oct 2026 refresh: Seeds of Resilience group photo (Keti Community, April 2026).
    image: "/images/projects/seeds-of-resilience/group-photo.jpg",
    imageAlt:
      "Women farmers and KHI volunteers at the Seeds of Resilience programme in Keti Community, Abuja",
  },

  mission: {
    eyebrow: "About us",
    title: "Who we are",
    lead: "Kind Humanitarian Initiative brings practical, dignified help to people in and around Abuja.",
    body: "We concentrate on four areas where small, well-run efforts change lives: paying school fees, protecting health and dignity, feeding families through hard seasons, and building the next generation of leaders.",
    /* Real photography (recovered/staged); one meaningful alt, rest decorative. */
    collage: [
      {
        src: "/images/projects/pads-and-pals/one-act-of-kindness.jpg",
        alt: 'Schoolgirls with a KHI "One Act of Kindness" sign at a school outreach',
      },
      {
        src: "/images/home/P1060169.jpg",
        alt: "KHI community program photo",
        decorative: true,
      },
      {
        src: "/images/about/sewing-training.jpg",
        alt: "A young woman at a sewing machine during vocational training",
      },
      {
        src: "/images/home/P1060236.jpg",
        alt: "KHI community program photo",
        decorative: true,
      },
      {
        src: "/images/home/P1060266.jpg",
        alt: "KHI community program photo",
        decorative: true,
      },
    ],
  },

  impact: {
    eyebrow: "Impact",
    // Built from a real project (the KHI Scholarship) — no invented figures.
    statement:
      "Final-year exam fees paid for 20 students who would otherwise have dropped out.",
    support:
      "Through the KHI Scholarship, twenty SSS3 students sat their final exams, keeping their path to graduation open.",
    // [KHI] Optional: a consented beneficiary quote can be added here later.
    // Phase 3b §6: genuine event photo.
    image: "/images/home/P1060450.jpg",
    imageAlt:
      "A KHI scholarship recipient in their final year of secondary school",
  },

  cta: {
    donate: {
      eyebrow: "Donate",
      title: "Your gift goes straight to the work",
      // Grounded copy; specific naira amounts intentionally omitted until verified.
      body: "Your gift covers exam fees, hygiene kits, and food packs for families in and around Abuja.",
      label: "Donate",
      href: "/donate",
    },
    volunteer: {
      eyebrow: "Volunteer",
      title: "Lend your time and skills",
      body: "From tutoring and mentoring to distribution days, volunteers make KHI's programs possible. Find a way to help that fits you.",
      label: "Become a volunteer",
      href: "/get-involved/volunteer",
    },
    partner: {
      eyebrow: "Partner",
      title: "Partner with us",
      body: "Organisations and businesses extend KHI's reach. Let's find what we can build together for communities in Abuja.",
      label: "Explore partnership",
      href: "/get-involved/partner",
    },
    /* Dark photo closing band — the old site's signature beat (one per page).
       [KHI] Confirm the headline tone; image is the old band's own photo. */
    photo: {
      eyebrow: "Make a difference",
      title: "They need your help.",
      body: "Extend a hand. Your gift covers exam fees, hygiene kits, and food packs for families in and around Abuja.",
      label: "Donate now",
      href: "/donate",
      image: "/images/home/they-need-your-help.jpg",
      imageAlt: "Children at a KHI community program in Abuja",
    },
  },

  featured: {
    eyebrow: "What we have done",
    title: "Featured initiatives",
  },

  stories: {
    eyebrow: "Stories",
    title: "Latest news",
  },
} as const;
