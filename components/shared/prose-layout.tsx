import { cn } from "@/lib/utils";

/**
 * Reading-measure container (720px) for long-form prose — stories and legal.
 */
export function ProseLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-prose", className)}>
      {children}
    </div>
  );
}
