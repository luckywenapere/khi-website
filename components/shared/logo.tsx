import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

import khiLogo from "@/public/khi-logo.png";

type LogoProps = {
  className?: string;
  /** Tailwind height class for the mark; width stays auto to keep ratio. */
  imgClassName?: string;
};

/**
 * KHI wordmark, linking home. The link carries the accessible name, so the
 * image itself is decorative (alt="").
 *
 * TODO: replace the PNG with a crisp SVG once KHI supplies one (brief §5.8).
 */
export function Logo({ className, imgClassName }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "inline-flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <Image
        src={khiLogo}
        alt=""
        className={cn("h-9 w-auto", imgClassName)}
        sizes="(max-width: 768px) 140px, 170px"
      />
    </Link>
  );
}
