import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { home } from "@/content/home";

type ImpactHighlightProps = {
  /** CTA target (defaults to the Impact page, as used on the homepage). */
  ctaHref?: string;
  ctaLabel?: string;
};

/**
 * Impact — one real, result-led outcome (distinct from the project grid above).
 * Factual only; no invented quotes. A consented beneficiary quote can slot in
 * later (see [KHI] note in content/home.ts).
 */
export function ImpactHighlight({
  ctaHref = "/impact",
  ctaLabel = "See our impact",
}: ImpactHighlightProps = {}) {
  const { impact } = home;

  return (
    <Section className="border-y border-border bg-gray-50">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-overline text-blue-700">{impact.eyebrow}</p>
          <h2 className="mt-3 text-balance">{impact.statement}</h2>
          <p className="text-body-lg mt-4 text-muted-foreground">
            {impact.support}
          </p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <PlaceholderImage
            alt={impact.imageAlt}
            src={impact.image}
            icon={GraduationCap}
            className="aspect-[4/3] w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>
      </div>
    </Section>
  );
}
