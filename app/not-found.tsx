import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <Logo className="mb-8" />
      <p className="text-overline text-blue-700">404</p>
      <h1 className="mt-3">Page not found</h1>
      <p className="text-body-lg mt-4 max-w-prose text-muted-foreground">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-8 h-11 rounded-md px-6",
        )}
      >
        Back to home
      </Link>
    </main>
  );
}
