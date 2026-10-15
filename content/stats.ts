export type Stat = {
  /** The numeric target the counter animates to. */
  value: number;
  /** Optional symbol before the number, e.g. "₦". */
  prefix?: string;
  /** Optional text after the number, e.g. "+" or "M+". */
  suffix?: string;
  label: string;
};

/** Headline impact figures, provided by KHI (July 2026). */
export const stats: Stat[] = [
  { value: 18, label: "Projects" },
  { value: 11, label: "Partners" },
  { value: 26, label: "Locations" },
  { value: 28, prefix: "₦", suffix: "M+", label: "Funds raised" },
  { value: 9000, label: "People reached" },
];

/** Shown beside the figures so the numbers carry their date. */
export const statsAsOf = "As of July 2026";

/** Copy + photo for the homepage's floating stat band (old-site treatment). */
export const achievementsBand = {
  eyebrow: "Thriving every day",
  title: "What we have achieved",
  body: "Through dedication and collective effort, we have touched lives, provided hope, and empowered communities.",
  // Oct 2026 refresh: EduKit distribution (2026).
  image: "/images/projects/edukit/students-with-backpacks.jpg",
  imageAlt:
    "Pupils holding up their new EduKit backpacks with KHI volunteers outside their school",
} as const;
