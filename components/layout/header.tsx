import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { donateLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { Nav } from "./nav";

/**
 * Sticky site header: logo · desktop nav · persistent Donate button · mobile
 * hamburger. RSC shell with the interactive nav isolated to client islands.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <Nav />
          <div className="flex items-center gap-2">
            <Link
              href={donateLink.href}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-10 rounded-md px-5",
              )}
            >
              {donateLink.label}
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
