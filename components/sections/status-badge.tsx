import type { ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * One entry per ProjectStatus. Adding a status to the type (and the Sanity
 * schema in sanity/schemaTypes/documents/project.ts) fails type-checking here
 * until it has a label and style.
 */
const STATUS_BADGE = {
  ongoing: { label: "Ongoing", className: "bg-accent text-blue-700" },
  completed: { label: "Completed", className: "bg-gray-100 text-gray-700" },
} satisfies Record<ProjectStatus, { label: string; className: string }>;

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const badge = STATUS_BADGE[status] ?? STATUS_BADGE.completed;
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        badge.className,
      )}
    >
      {badge.label}
    </span>
  );
}
