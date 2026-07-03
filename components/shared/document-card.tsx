import { cn } from "@/lib/utils";

/**
 * White "document on cream" card used for long-form legal/prose pages —
 * mirrors the old site's floating document treatment.
 */
export function DocumentCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-md sm:p-10 md:p-14",
        className,
      )}
    >
      {children}
    </div>
  );
}
