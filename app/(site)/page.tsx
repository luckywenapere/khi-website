import { CtaBlock } from "@/components/sections/cta-block";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { ImpactHighlight } from "@/components/sections/impact-highlight";
import { MissionBand } from "@/components/sections/mission-band";
import { PartnerCloud } from "@/components/sections/partner-cloud";
import { StatBand } from "@/components/sections/stat-band";
import { StoryGrid } from "@/components/sections/story-grid";
import { ValuesOverlapRow } from "@/components/sections/values-overlap-row";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
  description: site.description,
});

export default function HomePage() {
  return (
    <>
      {/* 1 · Hero — who KHI is + what they do + act (holds the single h1) */}
      <Hero />
      {/* 1b · Values card overlapping the hero (old-site signature) */}
      <ValuesOverlapRow values={about.values} overlap />
      {/* 2 · Mission — plain statement + four focus areas */}
      <MissionBand />
      {/* 3 · Key statistics */}
      <StatBand />
      {/* 4 · Featured initiatives — lead with the concrete work */}
      <FeaturedProjects />
      {/* 5 · Impact — one real, result-led outcome */}
      <ImpactHighlight />
      {/* 6 · Volunteer — invite time, not money */}
      <CtaBlock variant="volunteer" />
      {/* 7 · Donation CTA — the boldest action on the page */}
      <CtaBlock variant="donate" />
      {/* 8 · Partners — borrowed credibility */}
      <PartnerCloud />
      {/* 9 · Latest news — signs of life */}
      <StoryGrid />
    </>
  );
}
