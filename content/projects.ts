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
  /** ISO date (YYYY-MM-DD) used only to order projects newest first. */
  sortDate?: string;
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
  /** Short facts shown as a list under the body (e.g. sponsorship tiers). */
  highlights?: string[];
  /** Paragraphs shown after the highlights list. */
  closing?: string[];
  /** Call-to-action links shown under the body. */
  cta?: { label: string; href: string }[];
  /** Surfaced in the homepage "Featured initiatives" section. */
  featured?: boolean;
};

/**
 * KHI's projects. The 2026 projects (top) come from KHI's comms lead and the
 * project photo folders (Oct 2026). The five earlier initiatives were verified
 * against pages/projects.md and the old site's per-project galleries (see
 * docs/redesign-v2-notes.md §H). Pads & Pals is ongoing (the legacy site
 * mislabelled it completed). The two Ramadan recipient photos with baked-in
 * green-box redaction were excluded site-wide.
 *
 * `projects` (exported below) is sorted newest first by `sortDate`; undated
 * projects keep their order after the dated ones.
 */
const allProjects: Project[] = [
  {
    slug: "adopt-a-child-campaign",
    title: "Adopt a Child Campaign",
    programSlug: "education-scholarships",
    date: "Launched September 2026",
    sortDate: "2026-09-01",
    status: "ongoing",
    summary:
      "Sponsor a child's full tuition for an academic session, for children in vulnerable communities who have been out of school.",
    body: [
      "Launched in September 2026, the Adopt a Child Campaign lets individuals and organisations sponsor a child's full tuition for an academic session.",
      "The campaign is for children in vulnerable communities who have been out of school. Sponsorship per child, per academic session:",
    ],
    highlights: [
      "Primary: ₦100,000",
      "Junior Secondary: ₦150,000",
      "Senior Secondary: ₦200,000",
    ],
    closing: [
      "To adopt a child or ask a question, call +234 708 222 7153 or email info@khinitiative.org.",
    ],
    cta: [
      { label: "Sponsor a child", href: "/donate" },
      { label: "Ask us about adopting", href: "/contact" },
    ],
    imageAlt: "Adopt a Child Campaign: sponsor a child's school tuition",
    // Flyer from KHI's Instagram (12 Sep 2026); Blessing asked for it first.
    cardImage: "/images/projects/adopt-a-child-campaign/flyer.jpg",
    gallery: [
      {
        src: "/images/projects/adopt-a-child-campaign/flyer.jpg",
        alt: "Adopt a Child Campaign flyer: Primary ₦100,000, Junior Secondary ₦150,000 and Senior Secondary ₦200,000 per child per session, with KHI's Zenith Bank account details and contact number",
      },
    ],
    featured: true,
  },
  {
    slug: "tools-to-thrive-2026",
    title: "Tools to Thrive (TOT) 2026",
    // Closest program fit: skills and empowerment (no livelihoods program yet).
    programSlug: "youth-leadership",
    date: "8 August 2026",
    sortDate: "2026-08-08",
    status: "completed",
    summary:
      "An entrepreneurship empowerment programme pairing business training with practical equipment for each beneficiary's trade.",
    body: [
      "Tools to Thrive (TOT) 2026 was KHI's entrepreneurship empowerment programme, held on Saturday, 8 August 2026 at 22 Sokode Crescent, Wuse Zone 5, Abuja.",
      "Sessions covered entrepreneurship and financial management, digital business growth, and entrepreneurial success stories, with time for networking.",
      "Beyond the training, beneficiaries received practical equipment tailored to their trades, from tailoring machines to cooking pots, to turn their skills into sustainable livelihoods.",
    ],
    imageAlt: "Tools to Thrive 2026 entrepreneurship programme",
    cardImage:
      "/images/projects/tools-to-thrive-2026/beneficiaries-with-equipment.jpg",
    gallery: [
      {
        src: "/images/projects/tools-to-thrive-2026/beneficiaries-with-equipment.jpg",
        alt: "Tools to Thrive beneficiaries and the KHI team with the sewing machines, generators and cooking equipment they received",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/khi-team.jpg",
        alt: "The KHI team in branded shirts in front of the Tools to Thrive backdrop",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/training-session.jpg",
        alt: "Participants listening during a Tools to Thrive training session",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/speaker-session.jpg",
        alt: "A facilitator speaks to participants during the entrepreneurship sessions",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/sewing-machine-handover.jpg",
        alt: "A beneficiary receives a sewing machine and certificate",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/equipment-handover.jpg",
        alt: "A beneficiary receives commercial cooking pots for his trade",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/beneficiary-sewing-machine.jpg",
        alt: "A beneficiary with her new sewing machine in front of the Tools to Thrive banner",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/beneficiary-generator.jpg",
        alt: "A beneficiary with his new generator in front of the Tools to Thrive banner",
      },
      {
        src: "/images/projects/tools-to-thrive-2026/group-photo.jpg",
        alt: "Tools to Thrive beneficiaries gathered with their equipment",
      },
    ],
    featured: true,
  },
  {
    slug: "seeds-of-resilience",
    title: "Seeds of Resilience",
    // Closest program fit: household food security.
    programSlug: "food-relief",
    date: "April–May 2026",
    sortDate: "2026-04-24",
    status: "completed",
    summary:
      "Improved seedlings, food-preservation training, and market-access support for women farmers in Keti Community, Abuja.",
    body: [
      "Seeds of Resilience worked with women farmers in Keti Community, Airport Road, Abuja, to strengthen their livelihoods and household food security.",
      "The project began with a needs assessment with the women farmers in late March 2026. The programme launched on 24 April 2026: the women received improved seedlings, practical training in food preservation, and support toward access to sustainable markets.",
    ],
    imageAlt:
      "Women farmers at the Seeds of Resilience programme in Keti Community, Abuja",
    cardImage: "/images/projects/seeds-of-resilience/group-photo.jpg",
    gallery: [
      {
        src: "/images/projects/seeds-of-resilience/group-photo.jpg",
        alt: "Women farmers and KHI volunteers in front of the Seeds of Resilience banners in Keti Community",
      },
      {
        src: "/images/projects/seeds-of-resilience/facilitator-banner.jpg",
        alt: "A KHI facilitator speaks beside the Seeds of Resilience Project banner",
      },
      {
        src: "/images/projects/seeds-of-resilience/women-farmers-seated.jpg",
        alt: "Women farmers listening during a Seeds of Resilience session",
      },
      {
        src: "/images/projects/seeds-of-resilience/training-session.jpg",
        alt: "A training session for women farmers in a community hall, with supplies stacked at the back",
      },
      {
        src: "/images/projects/seeds-of-resilience/farm-inputs-handover.jpg",
        alt: "A woman farmer receives a sack of farm inputs from KHI team members",
      },
      {
        src: "/images/projects/seeds-of-resilience/seedlings-and-supplies.jpg",
        alt: "Sacks and bags of seedlings and farm supplies ready for distribution",
      },
    ],
    featured: true,
  },
  {
    slug: "edukit",
    title: "EduKit",
    programSlug: "education-scholarships",
    // Blessing (Oct 16, 2026): three cohorts so far; Cohort 2 was with the
    // Rotary Club of Omole-Golden on 27–28 January 2026. [KHI] Cohort 1 date.
    date: "Cohorts 1–3",
    sortDate: "2026-03-03",
    status: "completed",
    summary:
      "Learning kits for school students: school bags, exercise books, uniforms and other essentials. Three cohorts so far.",
    body: [
      'EduKit ("Kindness in Every Backpack") puts school essentials in the hands of students. KHI has run three EduKit cohorts so far.',
      "EduKit Cohort 2 was presented together with the Rotary Club of Omole-Golden on 27–28 January 2026.",
      "Students received school backpacks with EduKit exercise books, school uniforms and other learning materials. Cohort 3 also included menstrual hygiene support, with sanitary pads for girls.",
    ],
    imageAlt: "Students holding their new EduKit backpacks",
    cardImage: "/images/projects/edukit/students-with-backpacks.jpg",
    gallery: [
      {
        src: "/images/projects/edukit/students-with-backpacks.jpg",
        alt: "Pupils in school uniform hold up their new EduKit backpacks with KHI volunteers",
      },
      {
        src: "/images/projects/edukit/backpacks-group.jpg",
        alt: "Students line up with their EduKit backpacks outside their school",
      },
      {
        src: "/images/projects/edukit/students-celebrating.jpg",
        alt: "Students and KHI volunteers celebrate outside a school, holding up their EduKit materials",
      },
      {
        src: "/images/projects/edukit/backpack-handover.jpg",
        alt: "A student receives an EduKit backpack from a KHI representative",
      },
      {
        src: "/images/projects/edukit/uniform-handover.jpg",
        alt: "A student receives a school uniform at an EduKit distribution table",
      },
      {
        src: "/images/projects/edukit/banner-and-kits.jpg",
        alt: "A speaker addresses students beside the EduKit banner, with uniforms and sanitary pads on the table",
      },
      {
        src: "/images/projects/edukit/cohort-2-kit.jpg",
        alt: "A student receives her EduKit pack in front of the EduKit Cohort 2 banner",
      },
    ],
  },
  {
    slug: "partial-scholarship-2026",
    title: "2026 Partial Scholarship",
    programSlug: "education-scholarships",
    date: "January 2026",
    sortDate: "2026-01-28",
    status: "completed",
    // [KHI] confirm: schools from the photo folder names (GSS Madalla, GSS
    // Maraba); date from the photos (23 and 28 January 2026).
    summary:
      "Partial scholarships awarded to students in graduating classes at GSS Madalla and GSS Maraba.",
    body: [
      "In January 2026, KHI presented partial scholarship awards to students in graduating classes at Government Secondary School Madalla and Government Secondary School Maraba.",
    ],
    imageAlt: "Students holding their KHI Scholarship Award certificates",
    cardImage:
      "/images/projects/partial-scholarship-2026/certificates-group.jpg",
    gallery: [
      {
        src: "/images/projects/partial-scholarship-2026/certificates-group.jpg",
        alt: "Students holding Scholarship Award certificates with KHI team members in front of the KHI Scholarship Program banner",
      },
      {
        src: "/images/projects/partial-scholarship-2026/students-certificates.jpg",
        alt: "Five students in school uniform holding their Scholarship Award certificates",
      },
      {
        src: "/images/projects/partial-scholarship-2026/award-recipients.jpg",
        alt: "Scholarship recipients holding their certificates in a classroom, with KHI team members",
      },
      {
        src: "/images/projects/partial-scholarship-2026/recipients-and-team.jpg",
        alt: "KHI team members with scholarship recipients holding their certificates",
      },
    ],
  },
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
  },
  {
    slug: "iwd-menstrual-hygiene",
    title: "International Women's Day Program",
    programSlug: "health-hygiene",
    partnerSlug: "margaret-umeche-centre",
    date: "8 March 2025",
    sortDate: "2025-03-08",
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
    sortDate: "2025-03-27",
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
  },
];

/** Newest first by sortDate; undated projects follow in listed order. */
export const projects: readonly Project[] = allProjects
  .map((project, index) => ({ project, index }))
  .sort((a, b) => {
    const da = a.project.sortDate;
    const db = b.project.sortDate;
    if (da && db) return db.localeCompare(da) || a.index - b.index;
    if (da) return -1;
    if (db) return 1;
    return a.index - b.index;
  })
  .map(({ project }) => project);

/** Projects highlighted on the homepage (the newest work), newest first. */
export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByProgram(programSlug: string): readonly Project[] {
  return projects.filter((project) => project.programSlug === programSlug);
}
