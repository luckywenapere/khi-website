import { anyAmountUrl, donate, formatNaira, presetUrl } from "@/content/donate";

/**
 * Paystack preset amounts as server-rendered links (work without JS, keyboard
 * accessible). Each goes to the matching Paystack redirect page; "any amount"
 * opens the open page. URLs come from content/donate.ts.
 */
export function DonateGrid() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {donate.presets.map((amount) => (
          <li key={amount}>
            <a
              href={presetUrl(amount)}
              className="flex h-14 items-center justify-center rounded-lg bg-blue-600 px-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {formatNaira(amount)}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={anyAmountUrl}
        className="mt-3 flex h-14 items-center justify-center rounded-lg border border-blue-200 bg-accent px-4 text-base font-medium text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Give any amount
      </a>
      <p className="mt-3 text-xs text-muted-foreground">
        Secure checkout via Paystack. You will be taken to Paystack to complete
        your gift.
      </p>
    </div>
  );
}
