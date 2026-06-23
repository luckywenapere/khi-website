import type { Stat } from "@/content/stats";

import { AnimatedCounter } from "./animated-counter";

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="text-center sm:text-left">
      <div className="text-4xl font-semibold text-blue-700 lg:text-5xl">
        <AnimatedCounter
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}
