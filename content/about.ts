/**
 * About-page content, verified from pages/about-us.md. The Compassion/
 * Empowerment/Integrity value artifacts (rendered as `## 01` etc. in the
 * export) are cleaned here. "Climate action" is intentionally omitted from the
 * focus areas — it appears as a stated value on the old site but has no project
 * behind it (per the audit, don't promise an empty program).
 */

export type AboutValue = { name: string; description: string };
export type AboutSection = { heading: string; paragraphs: string[] };
export type Milestone = { title: string; date: string; body: string };

export const about = {
  intro:
    "At Kind Humanitarian Initiative, we create lasting change in the lives of vulnerable communities: combating hunger, promoting education, and empowering individuals through sustainable programs that foster self-sufficiency and social development.",

  vision:
    "To create a world where everyone has access to food, quality education, healthcare, and gender equality.",
  mission:
    "We aim to ensure that all individuals, regardless of gender, have the resources and opportunities necessary to thrive and be fulfilled.",

  values: [
    {
      name: "Compassion",
      description:
        "We uplift vulnerable communities, ensuring no one is left behind.",
    },
    {
      name: "Empowerment",
      description:
        "We equip individuals with the education and skills needed for self-sufficiency.",
    },
    {
      name: "Integrity",
      description:
        "We uphold transparency, accountability, and ethical practices in all our initiatives.",
    },
  ] satisfies AboutValue[],

  focusAreas: ["Education", "Health", "Gender equality"],

  story: [
    {
      heading: "A soft spot for children",
      paragraphs: [
        "We believe that every child deserves access to quality education, regardless of their socio-economic background. Through educational support, tutoring, and mentorship initiatives, we strive to enhance learning outcomes and open doors to brighter futures.",
      ],
    },
    {
      heading: "Social impact",
      paragraphs: [
        "Beyond education, we collaborate with vocational training centres to equip individuals with essential skills that drive economic independence. Our programs extend to health-awareness campaigns, ensuring communities have the knowledge and resources to maintain proper nutrition, hygiene, and disease prevention.",
        "We prioritise community-driven solutions, engaging local members in development initiatives that strengthen social cohesion and collective action. With a strong commitment to transparency and accountability, we have established a robust monitoring and evaluation framework to assess the impact of our programs and continuously improve our efforts.",
      ],
    },
  ] satisfies AboutSection[],

  /** "How We Came About" milestones — rendered as the signature Timeline. */
  timeline: [
    {
      title: "A shared vision",
      date: "2024",
      body: "Ten graduates of the African Centre for Leadership, Strategy, and Development come together to address the needs of vulnerable and underserved people in their community.",
    },
    {
      title: "Registered with the CAC",
      date: "3 January 2025",
      body: 'The name "Kind Humanitarian Initiative" is approved and the certificate of registration is issued by the Corporate Affairs Commission.',
    },
    {
      title: "Tax & compliance complete",
      date: "2025",
      body: "KHI obtains a Tax Identification Number (TIN) from FIRS and a SCUML certificate from the EFCC, completing the legal registration process in Nigeria.",
    },
    {
      title: "Teams established",
      date: "2025",
      body: "Leadership and operational teams are formed across Finance, Project Management, Communications, Volunteer & Partnership Management, and Procurement & Logistics.",
    },
  ] satisfies Milestone[],

  /** Registration facts reused by the Transparency page. */
  founding: {
    foundedBy:
      "Ten graduates of the African Centre for Leadership, Strategy, and Development.",
    cacRegistered: "3 January 2025",
    certificates: [
      "CAC certificate of registration",
      "TIN (FIRS)",
      "SCUML (EFCC)",
    ],
  },
} as const;
