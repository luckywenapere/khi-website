import { Section } from "@/components/layout/section";
import { stats } from "@/content/stats";

import { StatCard } from "./stat-card";

/** Key statistics — restrained 4-up (2×2 on mobile), mono figures in blue. */
export function StatBand() {
  return (
    <Section spacing="compact" className="border-y border-border bg-gray-50">
      <h2 className="sr-only">Key statistics</h2>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </Section>
  );
}
