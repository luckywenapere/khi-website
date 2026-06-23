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
    // Phase 3b §6: genuine event photo (confirm strongest in visual review).
    image: "/images/home/P1060250.jpg",
    imageAlt:
      "KHI volunteers and community members during a program in Abuja, Nigeria",
  },

  mission: {
    lead: "Kind Humanitarian Initiative brings practical, dignified help to people in and around Abuja.",
    body: "We concentrate on four areas where small, well-run efforts change lives: paying school fees, protecting health and dignity, feeding families through hard seasons, and building the next generation of leaders.",
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
