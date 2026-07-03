import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { ImpactHighlight } from "@/components/sections/impact-highlight";
import { PageHeader } from "@/components/sections/page-header";
import { StatBand } from "@/components/sections/stat-band";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Impact",
  description:
    "The proof behind KHI's work, the numbers, outcomes, and a commitment to transparency.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        variant="editorial"
        eyebrow="Impact"
        title="Our impact"
        intro="We measure our work by what changes for the people we serve. Here is what we can show so far, with figures we are still dating and sourcing for full credibility."
      />

      <StatBand />

      <ImpactHighlight
        ctaHref="/projects/khi-scholarship-cohort-1"
        ctaLabel="See the scholarship project"
      />

      <Section>
        <div className="max-w-prose">
          <h2>Honest numbers</h2>
          <p className="mt-3 text-muted-foreground">
            We are committed to impact figures that carry a date and a source.
            The headline numbers above are being verified, and our registration
            and allocation details are published openly.
          </p>
          <Link
            href="/about/transparency"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
          >
            See our transparency &amp; financials
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
