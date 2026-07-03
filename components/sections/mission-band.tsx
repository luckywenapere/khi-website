import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { home } from "@/content/home";
import { programs } from "@/content/programs";

import { PhotoCollage } from "./photo-collage";

/**
 * "Who we are" — mission statement + the four programs as focus-area links,
 * beside a real-photo collage (the old site's text-left/photos-right beat).
 * Deliberately does NOT repeat the Compassion/Empowerment/Integrity values
 * (they live in the values card and on About).
 */
export function MissionBand() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-overline text-blue-700">{home.mission.eyebrow}</p>
          <h2 className="mt-3 text-balance">{home.mission.title}</h2>
          <p className="text-body-lg mt-4 text-foreground">
            {home.mission.lead}
          </p>
          <p className="mt-3 text-muted-foreground">{home.mission.body}</p>

          <div className="throughline mt-8 h-px w-full" aria-hidden="true" />

          <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
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
        </Reveal>

        <Reveal delay={0.1}>
          <PhotoCollage images={home.mission.collage} />
        </Reveal>
      </div>
    </Section>
  );
}
