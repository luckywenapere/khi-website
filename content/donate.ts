/**
 * Donate configuration — Paystack redirect checkout (confirmed Phase 3b).
 * Preset pages follow the pattern /pay/donate-n{amount}; "any amount" is a
 * dedicated page. All URLs are https.
 *
 * [KHI] Only `donate-n500` and `any-amount` were verified to exist on Paystack;
 * the other five presets are inferred from the naming pattern — confirm them.
 */
export const donate = {
  baseUrl: "https://paystack.shop/pay",
  /** Naira preset amounts (no separators in the slug). */
  presets: [500, 1000, 10000, 100000, 500000, 1000000],
  anyAmountSlug: "any-amount",
  currencySymbol: "₦",
};

/** Paystack URL for a preset naira amount, e.g. 500 → .../pay/donate-n500. */
export function presetUrl(amount: number): string {
  return `${donate.baseUrl}/donate-n${amount}`;
}

/** Paystack URL for the open "any amount" page. */
export const anyAmountUrl = `${donate.baseUrl}/${donate.anyAmountSlug}`;

/** Display a naira amount with thousands separators, e.g. ₦1,000,000. */
export function formatNaira(amount: number): string {
  return `${donate.currencySymbol}${amount.toLocaleString("en-US")}`;
}

/**
 * "Where your gift goes" — templated categories. Specific per-amount figures
 * (e.g. "₦10,000 = a term of exam fees") are intentionally omitted until KHI
 * supplies real numbers ([KHI]).
 */
export const whereItGoes = [
  "Exam fees and learning support for students",
  "Menstrual-hygiene kits and dignity programs",
  "Food packs for families in need",
  "Youth leadership and mentorship",
];
