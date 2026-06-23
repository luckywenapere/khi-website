"use client";

import { useCallback, useEffect } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { PlaceholderImage } from "@/components/shared/placeholder-image";

export type GalleryImage = { src?: string; alt: string };

type LightboxProps = {
  images: GalleryImage[];
  open: boolean;
  index: number;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  label?: string;
};

/**
 * Accessible image lightbox. Built on Base UI Dialog for focus trap + Esc;
 * adds Left/Right arrow navigation and prev/next/close controls. Every image
 * carries its alt text.
 */
export function Lightbox({
  images,
  open,
  index,
  onOpenChange,
  onIndexChange,
  label = "Gallery",
}: LightboxProps) {
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = images[index];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-charcoal/85 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 outline-none">
          <Dialog.Title className="sr-only">{label}</Dialog.Title>

          {current ? (
            <figure className="w-full max-w-4xl">
              <PlaceholderImage
                alt={current.alt}
                src={current.src}
                showLabel={false}
                className="aspect-[3/2] w-full"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <figcaption className="mt-3 text-center text-sm text-white/90">
                {current.alt}
                {count > 1 ? (
                  <span className="mt-1 block text-xs text-white/60">
                    {index + 1} / {count}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ) : null}

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          ) : null}

          <Dialog.Close
            aria-label="Close gallery"
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="size-5" aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
