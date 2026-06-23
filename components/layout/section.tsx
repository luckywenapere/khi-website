import { cn } from "@/lib/utils";

import { Container } from "./container";

type SectionSpacing = "default" | "compact" | "spacious" | "none";

/** Vertical rhythm tokens — brief §2.4: 56–72px mobile, 80–128px desktop. */
const spacingClass: Record<SectionSpacing, string> = {
  default: "py-14 md:py-20 lg:py-28",
  compact: "py-10 md:py-14",
  spacious: "py-16 md:py-24 lg:py-32",
  none: "",
};

type SectionProps = React.ComponentProps<"section"> & {
  spacing?: SectionSpacing;
  /** Wrap children in a Container of this width; pass false to opt out. */
  container?: ContainerFalseOrWidth;
};

type ContainerFalseOrWidth = false | "content" | "wide" | "prose";

/**
 * Vertical layout primitive: applies consistent section rhythm and, by
 * default, wraps its children in a content-width Container.
 */
export function Section({
  spacing = "default",
  container = "content",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingClass[spacing], className)} {...props}>
      {container ? (
        <Container width={container}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
