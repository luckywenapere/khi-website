import Link from "next/link";
import { HeartHandshake } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { buttonVariants } from "@/components/ui/button";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Hero — who KHI is, what they do, and the primary actions. Split layout
 * (copy left, image right) on a warm cream field. Holds the page's single h1.
 *
 * Above-the-fold content renders immediately — no JS entrance animation here.
 * Wrapping the h1 (the LCP element) in an opacity:0 fade would block paint
 * until hydration; entrance motion is reserved for below-the-fold sections.
 */
export function Hero() {
  const { hero } = home;

  return (
    <section className="bg-cream">
      <Container>
        <div className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div
              className="throughline mb-6 h-1 w-16 rounded-full"
              aria-hidden="true"
            />
            <h1 className="text-display text-charcoal">{hero.headline}</h1>
            <p className="text-body-lg mt-6 max-w-prose text-muted-foreground">
              {hero.subhead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={hero.primaryCta.href}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-12 rounded-md px-6 text-base",
                )}
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 rounded-md px-6 text-base",
                )}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <PlaceholderImage
            alt={hero.imageAlt}
            src={hero.image}
            icon={HeartHandshake}
            priority
            className="aspect-[4/3] w-full lg:aspect-[5/4]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Container>
    </section>
  );
}
