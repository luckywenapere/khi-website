import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { cn } from "@/lib/utils";

export type CollageImage = {
  src?: string;
  alt: string;
  /** Skipped by screen readers (guardrail: ≤1–2 meaningful alts per collage). */
  decorative?: boolean;
};

type PhotoCollageProps = {
  /** 3–5 images; tiles beyond the layout pattern are ignored. */
  images: readonly CollageImage[];
  /** Mirror the layout for left/right alternation between sections. */
  flip?: boolean;
  className?: string;
};

/**
 * Old-site style masonry collage. Deterministic CSS grid — every tile has an
 * explicit span, so layout is computed at style time (CLS 0, no JS masonry).
 */
export function PhotoCollage({ images, flip, className }: PhotoCollageProps) {
  const tiles = images.slice(0, 5);
  // Span pattern by index: first tile is the tall anchor, rest fill around it.
  const spans = [
    "row-span-2",
    "row-span-1",
    "row-span-1",
    "row-span-2",
    "row-span-1",
  ];

  return (
    <div
      className={cn(
        "grid auto-rows-[9rem] grid-cols-2 gap-3 md:auto-rows-[10rem]",
        className,
      )}
    >
      {tiles.map((image, index) => (
        <PlaceholderImage
          key={`${image.alt}-${index}`}
          alt={image.alt}
          src={image.src}
          decorative={image.decorative}
          showLabel={false}
          className={cn(
            "h-full w-full",
            spans[index],
            flip && index === 0 && "col-start-2 row-start-1",
          )}
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      ))}
    </div>
  );
}
