import { ShieldCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { DonateGrid } from "@/components/sections/donate-grid";
import { DonateHero } from "@/components/sections/donate-hero";
import { whereItGoes } from "@/content/donate";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Donate",
  description:
    "Support KHI's work in education, health and hygiene, food relief, and youth leadership. Secure giving via Paystack.",
  path: "/donate",
});

export default function DonatePage() {
  return (
    <>
      <DonateHero />

      <Section className="pt-32 md:pt-44">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2>Choose an amount</h2>
            <p className="mt-2 text-muted-foreground">
              Pick a preset or give any amount that works for you.
            </p>
            <div className="mt-6">
              <DonateGrid />
            </div>
          </div>

          <aside className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl">Where your gift goes</h2>
            <ul className="mt-4 space-y-2">
              {whereItGoes.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-blue-700"
                aria-hidden="true"
              />
              <span>
                KHI is a registered Nigerian non-profit (CAC, 3 January 2025).
              </span>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
