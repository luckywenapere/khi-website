export type Partner = {
  slug: string;
  name: string;
  /** Verified description from pages/partnerships.md. */
  description: string;
  /** Logo path in /public; absent → PartnerCloud shows a name card. */
  logo?: string;
};

/**
 * KHI's partner organisations, verbatim from pages/partnerships.md. Logos
 * recovered from the WordPress export (v2 Phase A); Margaret Umeche Centre
 * had none on the old site either.
 */
export const partners: readonly Partner[] = [
  {
    slug: "margaret-umeche-centre",
    name: "Margaret Umeche Centre",
    description:
      "Focuses on women's education and empowerment, with programs in menstrual-hygiene education and the responsible use of social media, collaborating with other organizations to deliver them.",
  },
  {
    slug: "ramadan-food-aid",
    name: "Ramadan Food Aid",
    description:
      "Provides foodstuffs to the poor, orphans, widows, and the needy during Ramadan and beyond. Started in 2021 in Abuja, with plans to extend across all states of the federation.",
    logo: "/images/partners/ramadan-food-aid.jpg",
  },
  {
    slug: "kenvic-global-foundation",
    name: "Kenvic Global Foundation (KGF)",
    description:
      "A non-profit that empowers marginalized groups, especially women and children, through education, skills development, and leadership growth.",
    logo: "/images/partners/kenvic.png",
  },
  {
    slug: "hopeful-hands-for-help",
    name: "Hopeful Hands for Help Initiative",
    description:
      "Dedicated to inspiring hope and transforming lives through sustainable development, education, healthcare, and social justice, empowering communities and advocating for vulnerable populations.",
    logo: "/images/partners/hopeful-hands.png",
  },
] as const;

export function getPartner(slug: string): Partner | undefined {
  return partners.find((partner) => partner.slug === slug);
}
