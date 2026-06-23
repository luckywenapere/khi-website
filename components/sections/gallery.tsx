"use client";

import { useState } from "react";

import { PlaceholderImage } from "@/components/shared/placeholder-image";

import { Lightbox, type GalleryImage } from "./lightbox";

export type { GalleryImage };

/**
 * Responsive image grid that opens an accessible Lightbox on click. Works with
 * real photos or PlaceholderImage tiles, so it is presentable before
 * photography lands and swaps to real images one `src` at a time.
 */
export function Gallery({
  images,
  label = "Gallery",
}: {
  images: GalleryImage[];
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, position) => (
          <li key={`${image.alt}-${position}`}>
            <button
              type="button"
              onClick={() => {
                setIndex(position);
                setOpen(true);
              }}
              aria-label={`View image ${position + 1}: ${image.alt}`}
              className="block w-full overflow-hidden rounded-xl transition-transform duration-200 outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <PlaceholderImage
                alt={image.alt}
                src={image.src}
                showLabel={false}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={images}
        open={open}
        index={index}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
        label={label}
      />
    </div>
  );
}
