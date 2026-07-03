import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { DonateGrid } from "@/components/sections/donate-grid";
import { PageHeader } from "@/components/sections/page-header";
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
      <PageHeader
        eyebrow="Donate"
        title="Support our work"
        intro="Your gift funds practical help (exam fees, hygiene kits, food packs, and youth leadership) for communities in and around Abuja."
        src="/images/donate/girl-water.jpg"
        imageAlt="A child carrying water in a Nigerian community"
        priority
      />

      <Section>
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
            <p className="mt-4 text-xs text-muted-foreground">
              [KHI] Specific per-amount impact figures (e.g. &ldquo;₦10,000
              covers a term of exam fees&rdquo;) will be added once confirmed.
            </p>

            <p className="mt-6 flex items-start gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-blue-700"
                aria-hidden="true"
              />
              <span>
                KHI is a registered Nigerian non-profit.{" "}
                <Link
                  href="/about/transparency"
                  className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline"
                >
                  See where your money goes
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </span>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
