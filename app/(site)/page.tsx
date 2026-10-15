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
import { getLatestStories } from "@/lib/stories";

/** ISR: portal posts appear within a minute even without a redeploy. */
export const revalidate = 60;

export const metadata = createMetadata({
  path: "/",
  description: site.description,
});

export default async function HomePage() {
  const latestStories = await getLatestStories(3);

  return (
    <>
      {/* 1 · Hero — who KHI is + what they do + act (holds the single h1) */}
      <Hero />
      {/* 1b · Values card overlapping the hero (old-site signature) */}
      <ValuesOverlapRow values={about.values} overlap />
      {/* 2 · Who we are — mission + focus areas beside a real-photo collage */}
      <MissionBand />
      {/* 3 · Featured initiatives — lead with the concrete work */}
      <FeaturedProjects />
      {/* 4 · Impact — one real, result-led outcome (feature treatment) */}
      <ImpactHighlight variant="feature" />
      {/* 5 · Volunteer — invite time, not money (quiet white band) */}
      <CtaBlock variant="volunteer" />
      {/* 6 · What we have achieved — dark photo band + floating stat card */}
      <StatBand variant="floating" />
      {/* 7 · Partners — borrowed credibility (now with real logos) */}
      <PartnerCloud />
      {/* 8 · Latest news — signs of life */}
      <StoryGrid stories={latestStories} />
      {/* 9 · The ONE dark closing beat — donate (old-site signature band) */}
      <CtaBlock variant="photo" />
    </>
  );
}
