"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { donateLink, mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

/** Mobile navigation: hamburger → Sheet (focus trap + Esc), Accordion sub-menus. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet when a link is tapped (event-driven, not via an effect).
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-11 lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[88%] max-w-sm gap-0 p-0">
        <SheetHeader className="flex-row items-center gap-2 border-b p-4">
          <Logo />
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation links
          </SheetDescription>
        </SheetHeader>

        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col overflow-y-auto p-2"
        >
          {mainNav.map((item) =>
            item.children ? (
              <Accordion key={item.href} className="border-b">
                <AccordionItem value={item.href} className="border-b-0">
                  <AccordionTrigger className="px-2 py-3 text-base">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pl-2">
                    <ul className="flex flex-col">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="flex min-h-11 items-center rounded-md px-2 text-[0.95rem] text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center border-b px-2 text-base font-medium hover:bg-muted",
                  pathname === item.href && "text-blue-700",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="border-t p-4">
          <Button
            render={<Link href={donateLink.href} onClick={close} />}
            className="h-12 w-full rounded-md text-base"
          >
            {donateLink.label}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
