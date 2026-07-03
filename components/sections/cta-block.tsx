import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

type CtaVariant = "donate" | "volunteer" | "partner";

/**
 * Reusable call-to-action band. Three deliberately distinct treatments so the
 * page never repeats the same dark band: `donate` is the boldest action (solid
 * brand-blue, white text — AA), `volunteer` is a lighter cream invitation, and
 * `partner` is a quiet white band with a primary-blue button.
 */
export function CtaBlock({ variant }: { variant: CtaVariant }) {
  const copy = home.cta[variant];
  const isDonate = variant === "donate";
  const isPartner = variant === "partner";

  // On the cream canvas, quiet bands are white (cream-on-cream would vanish).
  const bandClass = isDonate
    ? "bg-blue-600"
    : isPartner
      ? "border-y border-border bg-white"
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
