/**
 * Single source of truth for KHI organisation facts. Consumed by the Footer,
 * SEO/JSON-LD builders, and metadata. Values flagged TBD are confirmed
 * placeholders pending input from KHI (see Phase 1 TODOs).
 */

export type SocialPlatform = "instagram" | "facebook";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  /** Handle/URL TBD — placeholder until KHI confirms */
  href: string;
};

export const site = {
  /** Legal name — corrected from the brief's "Kind Human Initiative" */
  name: "Kind Humanitarian Initiative",
  shortName: "KHI",
  /** Domain TBD — placeholder base URL until the real domain is confirmed */
  url: "https://www.khinitiative.org",
  /** One-line mission used in the footer brand block and default metadata.
   *  Faithful to the live site's hero copy. The formal vision + mission
   *  statements live on the About page (content/about.ts). */
  mission:
    "We build sustainable systems that foster self-sufficiency and growth, empowering less-privileged communities in Abuja to thrive.",
  /** Default meta description (page-level descriptions override this) */
  description:
    "Kind Humanitarian Initiative is an Abuja, Nigeria nonprofit working in education and scholarships, health and hygiene, food relief, and youth leadership.",
  contact: {
    address: {
      street: "24 Kaltungo Street",
      locality: "Garki 2",
      region: "Abuja",
      country: "Nigeria",
      /** Single-line form for display */
      full: "24 Kaltungo Street, Garki 2, Abuja, Nigeria",
    },
    email: "info@khinitiative.org",
    phones: ["+234 708 222 7153", "+234 908 892 8236"],
  },
  socials: [
    { platform: "instagram", label: "Instagram", href: "#" },
    { platform: "facebook", label: "Facebook", href: "#" },
  ] satisfies SocialLink[],
} as const;

export type Site = typeof site;
