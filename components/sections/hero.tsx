import Link from "next/link";
import { HeartHandshake } from "lucide-react";

import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { home } from "@/content/home";

/**
 * Hero — full-bleed photo with white serif display type over a charcoal scrim
 * (the old site's signature composition). Holds the page's single h1.
 *
 * Above-the-fold content renders immediately — no JS entrance animation here.
 * Wrapping the h1 (the LCP element) in an opacity:0 fade would block paint
 * until hydration; entrance motion is reserved for below-the-fold sections.
 *
 * Guardrails: text over the photo is SOLID white on the .scrim-hero overlay
 * (≥ charcoal/65 behind the text zone); the image is the route's only
 * priority image; .on-dark gives focus rings a white outline.
 */
export function Hero() {
  const { hero } = home;

  return (
    <section className="on-dark relative flex min-h-[70svh] flex-col justify-center overflow-hidden bg-charcoal">
      <PlaceholderImage
        alt={hero.imageAlt}
        src={hero.image}
        icon={HeartHandshake}
        priority
        showLabel={false}
        className="absolute inset-0 rounded-none"
        sizes="100vw"
      />
      <div className="scrim-hero absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-content px-5 pt-20 pb-40 sm:px-6 md:pb-48 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="throughline mx-auto mb-8 h-1 w-16 rounded-full"
            aria-hidden="true"
          />
          <h1 className="text-display-xl text-white">{hero.headline}</h1>
          <p className="text-body-lg mx-auto mt-6 max-w-2xl text-white">
            {hero.subhead}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-7 text-base font-medium text-blue-700 transition-colors hover:bg-blue-50"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/70 px-7 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
