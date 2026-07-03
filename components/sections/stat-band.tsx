import { Section } from "@/components/layout/section";
import { stats } from "@/content/stats";

import { StatCard } from "./stat-card";

/** Key statistics — restrained 5-up (2 cols mobile, 5 across on desktop). */
export function StatBand() {
  return (
    <Section spacing="compact" className="border-y border-border bg-white">
      <h2 className="sr-only">Key statistics</h2>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </Section>
  );
}
