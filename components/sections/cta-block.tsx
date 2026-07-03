import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { buttonVariants } from "@/components/ui/button";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

type CtaVariant = "donate" | "volunteer" | "partner" | "photo";

/**
 * Reusable call-to-action band in four deliberately distinct treatments:
 * `donate` solid brand-blue; `volunteer`/`partner` quiet white bands; `photo`
 * the old site's dark full-bleed photo closing beat (max one per page).
 * Photo/dark bands apply .on-dark so focus rings stay visible, and text over
 * the photo scrim is solid white (guardrail).
 */
export function CtaBlock({ variant }: { variant: CtaVariant }) {
  if (variant === "photo") {
    const copy = home.cta.photo;
    return (
      <section className="on-dark relative bg-charcoal">
        <PlaceholderImage
          alt={copy.imageAlt}
          src={copy.image}
          showLabel={false}
          decorative
          className="absolute inset-0 rounded-none"
          sizes="100vw"
        />
        <div className="scrim-band absolute inset-0" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl py-20 text-center md:py-28">
            <p className="text-overline text-white">{copy.eyebrow}</p>
            <h2 className="mt-3 text-white">{copy.title}</h2>
            <p className="text-body-lg mt-4 text-white">{copy.body}</p>
            <Link
              href={copy.href}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-white px-7 text-base font-medium text-blue-700 transition-colors hover:bg-blue-50"
            >
              {copy.label}
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const copy = home.cta[variant];
  const isDonate = variant === "donate";
  const isPartner = variant === "partner";

  // On the cream canvas, quiet bands are white (cream-on-cream would vanish).
  const bandClass = isDonate
    ? "on-dark bg-blue-600"
    : "border-y border-border bg-white";

  return (
    <section className={bandClass}>
      {/* Thin brand throughline accent at the top of the band. */}
      <div className="throughline h-1 w-full" aria-hidden="true" />
      <Container>
        <div className="flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="max-w-2xl">
            <p
              className={cn(
                "text-overline",
                isDonate ? "text-white/90" : "text-blue-700",
              )}
            >
              {copy.eyebrow}
            </p>
            <h2
              className={cn("mt-2", isDonate ? "text-white" : "text-charcoal")}
            >
              {copy.title}
            </h2>
            <p
              className={cn(
                "text-body-lg mt-3",
                isDonate ? "text-white/90" : "text-muted-foreground",
              )}
            >
              {copy.body}
            </p>
          </div>

          {isDonate ? (
            <Link
              href={copy.href}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-white px-6 text-base font-medium text-blue-700 transition-colors hover:bg-blue-50"
            >
              {copy.label}
            </Link>
          ) : (
            <Link
              href={copy.href}
              className={cn(
                buttonVariants({ variant: isPartner ? "default" : "outline" }),
                "h-12 shrink-0 rounded-md px-6 text-base",
              )}
            >
              {copy.label}
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
