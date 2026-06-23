import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { home } from "@/content/home";
import { programs } from "@/content/programs";

/**
 * Mission — a plain statement of what KHI does, plus the four programs as
 * focus-area links. Deliberately does NOT repeat the Compassion/Empowerment/
 * Integrity values (those live on About — repeating them is the duplication the
 * audit flagged).
 */
export function MissionBand() {
  return (
    <Section>
      <Reveal>
        <div className="max-w-3xl">
          <h2 className="text-balance">{home.mission.lead}</h2>
          <p className="text-body-lg mt-4 text-muted-foreground">
            {home.mission.body}
          </p>
        </div>
      </Reveal>

      <div className="throughline mt-10 h-px w-full" aria-hidden="true" />

      <ul className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((program) => (
          <li key={program.slug}>
            <Link
              href={`/programs/${program.slug}`}
              className="group flex items-center justify-between gap-2 border-b border-border py-3 text-sm font-medium text-foreground transition-colors hover:text-blue-700"
            >
              {program.title}
              <ArrowRight
                className="size-4 shrink-0 text-blue-700 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
