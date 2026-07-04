import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { achievementsBand, stats, statsAsOf } from "@/content/stats";

import { StatCard } from "./stat-card";

function StatGrid() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">{statsAsOf}</p>
    </div>
  );
}

type StatBandProps = {
  /**
   * `band` (default): quiet white band — used on /impact.
   * `floating` (v2, old-site treatment): dark photo band with the stats in a
   * white card that overlaps into the next section — used on the homepage.
   */
  variant?: "band" | "floating";
};

/** Key statistics — 5-up grid; figures render server-side, count up in view. */
export function StatBand({ variant = "band" }: StatBandProps) {
  if (variant === "floating") {
    return (
      <section className="on-dark relative mb-20 bg-charcoal">
        <PlaceholderImage
          alt={achievementsBand.imageAlt}
          src={achievementsBand.image}
          showLabel={false}
          decorative
          className="absolute inset-0 rounded-none"
          sizes="100vw"
        />
        <div className="scrim-band absolute inset-0" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-2xl pt-16 pb-10 md:pt-20">
            <p className="text-overline text-white">
              {achievementsBand.eyebrow}
            </p>
            <h2 className="mt-2 text-white">{achievementsBand.title}</h2>
            <p className="mt-3 text-white">{achievementsBand.body}</p>
          </div>
          {/* White card overlapping out of the band (negative margin, CLS 0) */}
          <div className="relative z-10 -mb-16 rounded-xl border border-border bg-card p-6 shadow-lg md:p-10">
            <StatGrid />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <Section spacing="compact" className="border-y border-border bg-white">
      <h2 className="sr-only">Key statistics</h2>
      <StatGrid />
    </Section>
  );
}
