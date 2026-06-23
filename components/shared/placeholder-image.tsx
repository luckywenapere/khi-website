import Image from "next/image";
import { ImageIcon, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  /** Required: the intended subject of the photo. Doubles as the image alt. */
  alt: string;
  /** When supplied, a real photo renders via next/image — a one-line swap. */
  src?: string;
  /** lucide icon shown in placeholder mode. */
  icon?: LucideIcon;
  /** Aspect-ratio + sizing classes for the frame, e.g. "aspect-[4/3] w-full". */
  className?: string;
  /** next/image sizes hint (used when src is set). */
  sizes?: string;
  /** Prioritise loading (above-the-fold images only). */
  priority?: boolean;
  /** Show the alt text as a caption chip in placeholder mode. */
  showLabel?: boolean;
};

/**
 * Renders a tasteful brand-gradient field with an icon and the intended photo's
 * subject while real photography is pending — or the real photo when `src` is
 * provided. Always requires `alt`, so every image slot is accessible and
 * swapping in a photo is a single-prop change.
 */
export function PlaceholderImage({
  alt,
  src,
  icon: Icon = ImageIcon,
  className,
  sizes,
  priority,
  showLabel = true,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gray-100",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="throughline absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
        >
          <Icon className="size-9 text-white/90" aria-hidden="true" />
          {showLabel ? (
            <span className="max-w-[32ch] rounded-full bg-charcoal/70 px-3 py-1 text-center text-xs font-medium text-white">
              {alt}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
