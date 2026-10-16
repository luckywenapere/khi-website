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
        src: "/images/projects/tools-to-thrive-2026/beneficiaries-with-equipment.jpg",
        alt: "Tools to Thrive beneficiaries with the equipment they received for their trades",
      },
      {
        src: "/images/projects/edukit/backpacks-group.jpg",
        alt: "Students with their EduKit backpacks",
        decorative: true,
      },
      {
        src: "/images/projects/seeds-of-resilience/farm-inputs-handover.jpg",
        alt: "A woman farmer receives farm inputs at Seeds of Resilience",
      },
      {
        src: "/images/projects/partial-scholarship-2026/students-certificates.jpg",
        alt: "Scholarship students with their certificates",
        decorative: true,
      },
      {
        src: "/images/projects/tools-to-thrive-2026/beneficiary-sewing-machine.jpg",
        alt: "A Tools to Thrive beneficiary with her new sewing machine",
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
    // Oct 2026 refresh (Blessing asked for newer photos).
    image: "/images/projects/partial-scholarship-2026/certificates-group.jpg",
    imageAlt: "Students holding their KHI Scholarship Award certificates",
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
      // Oct 2026 refresh.
      image: "/images/projects/edukit/students-celebrating.jpg",
      imageAlt:
        "Students and KHI volunteers celebrating at an EduKit distribution",
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
