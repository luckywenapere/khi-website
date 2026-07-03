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
  /** Card image override; defaults to gallery[0] in ProjectCard. */
  cardImage?: string;
  /** Gallery photos (recovered from the WordPress export, v2 Phase A). */
  gallery?: { src: string; alt: string }[];
  /** Surfaced in the homepage "Featured initiatives" section. */
  featured?: boolean;
};

/**
 * The five real initiatives, verified against pages/projects.md and the old
 * site's per-project galleries (see docs/redesign-v2-notes.md §H). Pads & Pals
 * is ongoing (the legacy site mislabelled it completed). The two Ramadan
 * recipient photos with baked-in green-box redaction were excluded site-wide.
 */
export const projects: readonly Project[] = [
  {
    slug: "khi-scholarship-cohort-1",
    title: "KHI Scholarship: Cohort 1",
    programSlug: "education-scholarships",
    status: "completed",
    summary:
      "Senior-secondary exam fees paid for 20 indigent students in their final transition class (SSS3).",
    body: [
      "Cohort 1 of the KHI Scholarship project, where KHI paid the senior-secondary school examination fees of 20 indigent students in their transition class (SSS3) to help them complete school and move toward a brighter future.",
    ],
    imageAlt:
      "Senior-secondary students supported by the KHI Scholarship in Abuja",
    cardImage: "/images/projects/khi-scholarship-cohort-1/ict-lab-group.jpg",
    gallery: [
      {
        src: "/images/projects/khi-scholarship-cohort-1/ict-lab-group.jpg",
        alt: "Scholarship recipients and dignitaries at the PTA ICT Lab, Government Secondary School",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/cohort-certificates.jpg",
        alt: "Students holding their KHI Scholarship certificates in front of the project banner",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/certificate-award.jpg",
        alt: "A certificate presentation during the KHI Scholarship program",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/ict-lab-award.jpg",
        alt: "Award group photo at the school's ICT lab",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-seminar.jpg",
        alt: "KHI seminar session with students at the school",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/gss-kuje-sign.jpg",
        alt: "Government Secondary School Kuje, Abuja signboard",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250208-WA0000.jpg",
        alt: "KHI Scholarship project photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250224-WA0017.jpg",
        alt: "KHI Scholarship project photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250227-WA0015.jpg",
        alt: "KHI Scholarship project photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/IMG-20250304-WA0009.jpg",
        alt: "KHI Scholarship project photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-1.jpg",
        alt: "KHI Scholarship school-visit photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-2-1.jpg",
        alt: "KHI Scholarship school-visit photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-3.jpg",
        alt: "KHI Scholarship school-visit photo",
      },
      {
        src: "/images/projects/khi-scholarship-cohort-1/school-4-1.jpg",
        alt: "KHI Scholarship school-visit photo",
      },
    ],
    featured: true,
  },
  {
    slug: "iwd-menstrual-hygiene",
    title: "International Women's Day Program",
    programSlug: "health-hygiene",
    partnerSlug: "margaret-umeche-centre",
    date: "8 March 2025",
    status: "completed",
    summary:
      "An International Women's Day program on menstrual hygiene, with the Margaret Umeche Centre.",
    body: [
      "In partnership with the Margaret Umeche Centre, KHI ran an International Women's Day program educating women on menstrual hygiene and the vices of social-media misuse.",
      'The 2025 edition, themed "Accelerate Action," took place on 8 March 2025 at the School Auditorium, KSU Kabba.',
    ],
    imageAlt:
      "Women at KHI's International Women's Day menstrual-hygiene program",
    cardImage: "/images/projects/iwd-menstrual-hygiene/margaret.jpg",
    gallery: [
      {
        src: "/images/projects/iwd-menstrual-hygiene/margaret.jpg",
        alt: "Speakers and guests in front of the International Women's Day 2025 banner",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0078.jpg",
        alt: "Guests gathered at the International Women's Day 2025 program, KSU Kabba",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0079.jpg",
        alt: "Group photo at the International Women's Day 2025 program",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0065.jpg",
        alt: "A speaker addressing the audience at the Women's Day program",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0067.jpg",
        alt: "Keynote speaker at the podium during the Women's Day program",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0068.jpg",
        alt: "A guest at the International Women's Day program",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0069.jpg",
        alt: "A speaker presenting at the Women's Day program",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0080.jpg",
        alt: "Guests in front of the Women's Day 2025 banner",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0087.jpg",
        alt: "Attendees at the International Women's Day 2025 program",
      },
      {
        src: "/images/projects/iwd-menstrual-hygiene/IMG-20250408-WA0089.jpg",
        alt: "Wide group photo at the International Women's Day 2025 program",
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
    cardImage: "/images/projects/ramadan-food-distribution/bag-label.jpg",
    gallery: [
      {
        src: "/images/projects/ramadan-food-distribution/bag-label.jpg",
        alt: 'A food pack labelled "Distribution of Food Stuffs to the Needy"',
      },
      {
        src: "/images/projects/ramadan-food-distribution/bags-packed.jpg",
        alt: "Rows of packed food bags ready for distribution",
      },
      {
        src: "/images/projects/ramadan-food-distribution/bags-in-car.jpg",
        alt: "Food packs loaded in a car for delivery",
      },
    ],
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
        alt: "Panel discussion at the Kenvic leadership and empowerment conference",
      },
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic-students.jpg",
        alt: "Students speaking at the Kenvic leadership conference",
      },
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic-podium.jpg",
        alt: "A speaker at the Kenvic Global Foundation podium",
      },
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic-anniversary.jpg",
        alt: "Kenvic Global Foundation fifth-anniversary celebration on stage",
      },
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic-1.jpg",
        alt: "Kenvic leadership conference photo",
      },
      {
        src: "/images/projects/kenvic-leadership-conference/kenvic-3.jpg",
        alt: "Kenvic leadership conference photo",
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
    cardImage: "/images/projects/pads-and-pals/school-outreach.jpg",
    // [KHI] Eyes-on/consent check: the new event photos show identifiable
    // participants posing with KHI media props/banners at organised events.
    gallery: [
      {
        src: "/images/projects/pads-and-pals/school-outreach.jpg",
        alt: "KHI volunteers at a Pads & Pals school outreach session",
      },
      {
        src: "/images/projects/pads-and-pals/volunteer-talk.jpg",
        alt: "A KHI volunteer speaking with students during Pads & Pals",
      },
      {
        src: "/images/projects/pads-and-pals/distribution-line.jpg",
        alt: "Students receiving supplies at a Pads & Pals distribution",
      },
      {
        src: "/images/projects/pads-and-pals/walk-banner.jpg",
        alt: "A participant at the Pads & Pals menstrual hygiene awareness walk",
      },
      {
        src: "/images/projects/pads-and-pals/frame-prop.jpg",
        alt: "A student holding the KHI photo frame with a pack of sanitary pads",
      },
      {
        src: "/images/projects/pads-and-pals/one-act-of-kindness.jpg",
        alt: 'Schoolgirls with a KHI "One Act of Kindness" sign',
      },
      {
        src: "/images/projects/pads-and-pals/menstruation.jpg",
        alt: "Pads & Pals menstrual-hygiene project photo",
      },
      {
        src: "/images/projects/pads-and-pals/menstruation-2.jpg",
        alt: "Pads & Pals menstrual-hygiene project photo",
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
