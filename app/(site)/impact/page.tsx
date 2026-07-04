import { CtaBlock } from "@/components/sections/cta-block";
import { ImpactHighlight } from "@/components/sections/impact-highlight";
import { PageHeader } from "@/components/sections/page-header";
import { StatBand } from "@/components/sections/stat-band";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Impact",
  description:
    "The proof behind KHI's work: the numbers and the outcomes for the people we serve.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        variant="editorial"
        eyebrow="Impact"
        title="Our impact"
        intro="We measure our work by what changes for the people we serve. Here is what that looks like so far."
      />

      <StatBand />

      <ImpactHighlight
        ctaHref="/projects/khi-scholarship-cohort-1"
        ctaLabel="See the scholarship project"
      />

      {/* Closing beat */}
      <CtaBlock variant="photo" />
    </>
  );
}
