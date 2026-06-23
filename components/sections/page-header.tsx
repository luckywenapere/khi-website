import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** When provided, a PlaceholderImage/photo renders beside the copy. */
  imageAlt?: string;
  /** Real photo src — renders next/image instead of the gradient placeholder. */
  src?: string;
  icon?: LucideIcon;
  /** Prioritise the header image (use on the topmost page image). */
  priority?: boolean;
};

/** Page hero: eyebrow, h1, intro, optional image, thin brand throughline. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  imageAlt,
  src,
  icon,
  priority,
}: PageHeaderProps) {
  const hasImage = Boolean(imageAlt);

  return (
    <section className="bg-cream">
      <Container>
        <div
          className={cn(
            "py-14 md:py-20",
            hasImage && "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          )}
        >
          <div>
            <div
              className="throughline mb-5 h-1 w-16 rounded-full"
              aria-hidden="true"
            />
            {eyebrow ? (
              <p className="text-overline text-blue-700">{eyebrow}</p>
            ) : null}
            <h1 className="mt-2">{title}</h1>
            {intro ? (
              <p className="text-body-lg mt-5 max-w-prose text-muted-foreground">
                {intro}
              </p>
            ) : null}
          </div>

          {hasImage && imageAlt ? (
            <PlaceholderImage
              alt={imageAlt}
              src={src}
              icon={icon}
              priority={priority}
              className="aspect-[4/3] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
