import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { donateLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Persistent Donate bar pinned to the bottom of the viewport on small screens,
 * guaranteeing the primary action is always reachable on mobile (brief §4.1).
 * Hidden at lg+ where the header Donate button is always visible.
 */
export function MobileDonateBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <Link
        href={donateLink.href}
        className={cn(
          buttonVariants({ variant: "default" }),
          "h-12 w-full rounded-md text-base",
        )}
      >
        {donateLink.label}
      </Link>
    </div>
  );
}
