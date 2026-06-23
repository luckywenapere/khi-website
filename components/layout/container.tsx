import { cn } from "@/lib/utils";

type ContainerWidth = "content" | "wide" | "prose";

const widthClass: Record<ContainerWidth, string> = {
  content: "max-w-content", // 1200px
  wide: "max-w-wide", //    1320px (wide media)
  prose: "max-w-prose", //   720px (reading measure)
};

type ContainerProps = React.ComponentProps<"div"> & {
  /** Max content width — content (default) · wide · prose */
  width?: ContainerWidth;
};

/**
 * Horizontal layout primitive: centres content and applies the responsive
 * gutter. One of two primitives (with Section) that kill the spacing drift
 * typical of theme sites.
 */
export function Container({
  width = "content",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widthClass[width],
        className,
      )}
      {...props}
    />
  );
}
