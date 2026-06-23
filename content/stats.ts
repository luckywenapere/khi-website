export type Stat = {
  /** The numeric target the counter animates to. */
  value: number;
  /** Optional symbol before the number, e.g. "₦". */
  prefix?: string;
  /** Optional text after the number, e.g. "+" or "M+". */
  suffix?: string;
  label: string;
};

/**
 * [REVIEW] Verified figures from the legacy site. "Locations" has been dropped
 * (it depended on the fake "Other Locations" addresses, now removed). Each
 * figure still needs an "as of <date>" + source to be fully credible ([KHI]) —
 * rendered without one for now rather than inventing a date.
 */
export const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Projects" },
  { value: 5, suffix: "+", label: "Partners" },
  { value: 5, prefix: "₦", suffix: "M+", label: "Funds raised" },
];
