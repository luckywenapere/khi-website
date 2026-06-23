import { FileText } from "lucide-react";

import { about } from "@/content/about";

/** "Where your money goes" — templated allocation; real percentages are [KHI]. */
const allocation = [
  {
    label: "Programs & direct support",
    note: "Scholarships, hygiene kits, food relief, and youth programs.",
  },
  {
    label: "Operations & logistics",
    note: "Distribution, travel, and program delivery costs.",
  },
  {
    label: "Fundraising & administration",
    note: "Keeping the organisation running and accountable.",
  },
];

/**
 * Registration facts, a "where your money goes" breakdown, and a reports
 * placeholder — the site's highest-leverage trust content. Everything not yet
 * verified is clearly marked [KHI] rather than invented.
 */
export function TransparencyBlock() {
  const { founding } = about;

  return (
    <div className="space-y-12">
      {/* Registration */}
      <div>
        <h2 className="text-2xl sm:text-3xl">Registration & legal status</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          KHI was founded by {founding.foundedBy.toLowerCase()} and is a
          registered non-governmental organisation in Nigeria.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5">
            <dt className="text-overline text-blue-700">
              Registered with the CAC
            </dt>
            <dd className="mt-1 font-sans text-lg font-semibold text-charcoal">
              {founding.cacRegistered}
            </dd>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <dt className="text-overline text-blue-700">RC number</dt>
            <dd className="mt-1 font-sans text-lg font-semibold text-charcoal">
              TBD{" "}
              <span className="text-sm font-normal text-muted-foreground">
                [KHI: to confirm]
              </span>
            </dd>
          </div>
        </dl>
        <ul className="mt-4 flex flex-wrap gap-2">
          {founding.certificates.map((certificate) => (
            <li
              key={certificate}
              className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-blue-700"
            >
              {certificate}
            </li>
          ))}
        </ul>
      </div>

      {/* Where your money goes */}
      <div>
        <h2 className="text-2xl sm:text-3xl">Where your money goes</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          We are committed to transparency and accountability. The breakdown
          below shows how donations are put to work.{" "}
          <span className="text-charcoal">
            [KHI: exact percentages to be confirmed.]
          </span>
        </p>
        <ul className="mt-6 space-y-3">
          {allocation.map((item) => (
            <li
              key={item.label}
              className="flex flex-col gap-1 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-charcoal">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </div>
              <span className="font-mono text-sm text-muted-foreground">
                TBD% [KHI]
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reports */}
      <div>
        <h2 className="text-2xl sm:text-3xl">Reports & accounts</h2>
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-dashed border-border bg-gray-50 p-5">
          <FileText
            className="mt-0.5 size-5 shrink-0 text-blue-700"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            Annual reports and financial statements will be published here.{" "}
            <span className="text-charcoal">[KHI: first report pending.]</span>
          </p>
        </div>
      </div>
    </div>
  );
}
