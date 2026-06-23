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
 * Headline impact figures (provided by KHI).
 * [KHI] Each figure still needs an "as of <date>" + source to be fully
 * credible; rendered without one for now rather than inventing a date.
 * [KHI] Confirm the 26 "Locations" are genuine communities/areas served.
 */
export const stats: Stat[] = [
  { value: 18, label: "Projects" },
  { value: 11, label: "Partners" },
  { value: 26, label: "Locations" },
  { value: 28, prefix: "₦", suffix: "M+", label: "Funds raised" },
  { value: 9000, label: "Impacts" },
];
