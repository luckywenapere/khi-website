import type { Program } from "@/content/programs";

export type ProjectStatus = "ongoing" | "completed";

export type Project = {
  slug: string;
  title: string;
  /** The program this project is an instance of. */
  programSlug: Program["slug"];
  /** Partner organisation slug (→ partners.ts), where one is credited. */
  partnerSlug?: string;
  /** Human-readable date; omitted where unverified ([KHI]). */
  date?: string;
  status: ProjectStatus;
  /** Short summary for cards and intros. */
  summary: string;
  /** Detail-page body paragraphs (verbatim from source, lightly cleaned). */
  body: string[];
  /** Card/hero alt (also used when no gallery photos are wired yet). */
  imageAlt: string;
  /** Confirmed gallery photos (Phase 3b §6). Absent → PlaceholderImage tiles. */
  gallery?: { src: string; alt: string }[];
  /** Surfaced in the homepage "Featured initiatives" section. */
  featured?: boolean;
};

/**
 * The five real initiatives, verified against pages/projects.md and the content
 * pack. Pads & Pals is ongoing (the legacy site mislabelled it completed). The
 * "achieve a thrive to greater future" typo is cleaned. [KHI] dates and photos
 * to be confirmed.
 */
export const projects: readonly Project[] = [
  {
    slug: "khi-scholarship-cohort-1",
    title: "KHI Scholarship — Cohort 1",
    programSlug: "education-scholarships",
    status: "completed",
    summary:
      "Senior-secondary exam fees paid for 20 indigent students in their final transition class (SSS3).",
    body: [
      "Cohort 1 of the KHI Scholarship project, where KHI paid the senior-secondary school examination fees of 20 indigent students in their transition class (SSS3) to help them complete school and move toward a brighter future.",
    ],
    imageAlt:
      "Senior-secondary students supported by the KHI Scholarship in Abuja",
    gallery: [
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250208-WA0000.jpg",
        alt: "KHI Scholarship project — photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250224-WA0017.jpg",
        alt: "KHI Scholarship project — photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250227-WA0015.jpg",
        alt: "KHI Scholarship project — photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250304-WA0009.jpg",
        alt: "KHI Scholarship project — photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-1.jpg",
        alt: "KHI Scholarship — school visit photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-2-1.jpg",
        alt: "KHI Scholarship — school visit photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-3.jpg",
        alt: "KHI Scholarship — school visit photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-4-1.jpg",
        alt: "KHI Scholarship — school visit photo",
      },
    ],
    featured: true,
  },
  {
    slug: "iwd-menstrual-hygiene",
    title: "International Women's Day Program",
    programSlug: "health-hygiene",
    partnerSlug: "margaret-umeche-centre",
    status: "completed",
    summary:
      "An International Women's Day program on menstrual hygiene, with the Margaret Umeche Centre.",
    body: [
      "In partnership with the Margaret Umeche Centre, KHI ran an International Women's Day program educating women on menstrual hygiene and the vices of social-media misuse.",
    ],
    imageAlt:
      "Women at KHI's International Women's Day menstrual-hygiene program",
    // [KHI] Tentative — mid-March event photos; confirm these belong to IWD.
    gallery: [
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250318-WA0298.jpg",
        alt: "International Women's Day program — photo",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250320-WA0181.jpg",
        alt: "International Women's Day program — photo",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250320-WA0182.jpg",
        alt: "International Women's Day program — photo",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250320-WA0183.jpg",
        alt: "International Women's Day program — photo",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250320-WA0184.jpg",
        alt: "International Women's Day program — photo",
      },
    ],
  },
  {
    slug: "ramadan-food-distribution",
    title: "Ramadan Food Distribution",
    programSlug: "food-relief",
    partnerSlug: "ramadan-food-aid",
    status: "completed",
    summary:
      "Foodstuffs distributed to the poor, orphans, and widows during the Ramadan season.",
    body: [
      "KHI partnered with the Ramadan Food Aid organization to distribute foodstuffs to the poor, orphans, and widows during the month of Ramadan and beyond.",
    ],
    imageAlt: "Food packs distributed during KHI's Ramadan food relief",
  },
  {
    slug: "kenvic-leadership-conference",
    title: "Kenvic Leadership Conference",
    programSlug: "youth-leadership",
    partnerSlug: "kenvic-global-foundation",
    date: "27 March 2025",
    status: "completed",
    summary:
      "A leadership and empowerment conference equipping young people to lead change.",
    body: [
      'KHI partnered with Kenvic Global Foundation on their leadership and empowerment conference, themed "Developing Essential Skills for the Modern Leader."',
      "The collaboration equipped participants with the skills, knowledge, and confidence to become effective leaders and change-makers in their communities. The event took place on Thursday, 27 March 2025.",
    ],
    imageAlt:
      "Participants at the Kenvic leadership and empowerment conference",
    gallery: [
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic.jpg",
        alt: "Kenvic leadership conference — photo",
      },
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic-1.jpg",
        alt: "Kenvic leadership conference — photo",
      },
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic-3.jpg",
        alt: "Kenvic leadership conference — photo",
      },
    ],
    featured: true,
  },
  {
    slug: "pads-and-pals",
    title: "Pads & Pals",
    programSlug: "health-hygiene",
    partnerSlug: "hopeful-hands-for-help",
    status: "ongoing",
    summary:
      "An ongoing menstrual health and hygiene project for young girls, with Hopeful Hands for Help.",
    body: [
      "An ongoing project with the Hopeful Hands for Help Initiative promoting menstrual health and hygiene among young girls.",
      "The project educates girls about menstruation and empowers boys to be supportive allies, fostering a culture of understanding and respect.",
    ],
    imageAlt: "Girls taking part in the ongoing Pads & Pals hygiene project",
    gallery: [
      {
        src: "/images/projects/pads-and-pals/menstruation.jpg",
        alt: "Pads & Pals menstrual-hygiene project — photo",
      },
      {
        src: "/images/projects/pads-and-pals/menstruation-2.jpg",
        alt: "Pads & Pals menstrual-hygiene project — photo",
      },
    ],
    featured: true,
  },
];

/** The three projects highlighted on the homepage, in display order. */
export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByProgram(programSlug: string): readonly Project[] {
  return projects.filter((project) => project.programSlug === programSlug);
}
