/**
 * Programs are KHI's ongoing areas of work. Specific, time-bound Projects are
 * nested as instances within a program (see projects.ts).
 *
 * `summary` is the concise nav-dropdown helper; `description` is the fuller
 * line used on the Programs / program pages (verified from KHI-content-pack.md).
 */
export type Program = {
  /** URL segment under /programs/[slug] */
  slug: string;
  /** Display label used in nav, headings, and cards */
  title: string;
  /** One-line summary used as muted helper text in the nav dropdown */
  summary: string;
  /** Fuller description shown on the Programs hub and program pages */
  description: string;
};

export const programs: readonly Program[] = [
  {
    slug: "education-scholarships",
    title: "Education & Scholarships",
    summary: "School fees, exam support, and learning help.",
    description:
      "Removing the cost barriers that keep able students out of school, from exam fees to learning support.",
  },
  {
    slug: "health-hygiene",
    title: "Health & Hygiene",
    summary: "Menstrual health, hygiene, and dignity programs.",
    description:
      "Menstrual health, hygiene education, and dignity programs for women and girls.",
  },
  {
    slug: "food-relief",
    title: "Food Relief",
    summary: "Food for families in periods of greatest need.",
    description:
      "Getting food to families, orphans, and widows in periods of greatest need.",
  },
  {
    slug: "youth-leadership",
    title: "Youth & Leadership",
    summary: "Skills and confidence for young leaders.",
    description:
      "Equipping young people with the skills and confidence to lead change in their communities.",
  },
] as const;

export function getProgram(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
