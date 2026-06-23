"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop primary navigation (lg+). Dropdowns use Base UI NavigationMenu. */
export function Nav() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-0.5">
        {mainNav.map((item) =>
          item.children ? (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-72 gap-1 p-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavigationMenuLink
                        render={<Link href={child.href} />}
                        data-active={
                          isActive(pathname, child.href) || undefined
                        }
                      >
                        <span className="flex flex-col gap-0.5">
                          <span className="font-medium text-foreground">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="text-xs text-muted-foreground">
                              {child.description}
                            </span>
                          ) : null}
                        </span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                render={<Link href={item.href} />}
                className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                data-active={isActive(pathname, item.href) || undefined}
                aria-current={
                  isActive(pathname, item.href) ? "page" : undefined
                }
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
