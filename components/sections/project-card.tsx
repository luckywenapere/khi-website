import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { getPartner } from "@/content/partners";
import { getProgram } from "@/content/programs";
import type { Project, ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: ProjectStatus }) {
  const isOngoing = status === "ongoing";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        isOngoing ? "bg-accent text-blue-700" : "bg-gray-100 text-gray-700",
      )}
    >
      {isOngoing ? "Ongoing" : "Completed"}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const program = getProgram(project.programSlug);
  const partner = project.partnerSlug
    ? getPartner(project.partnerSlug)
    : undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <PlaceholderImage
        alt={project.imageAlt}
        className="aspect-[16/10] w-full rounded-none"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {program ? (
            <span className="text-overline text-blue-700">{program.title}</span>
          ) : null}
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-2 font-sans text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        {partner ? (
          <p className="mt-1 text-xs text-muted-foreground">
            With {partner.name}
          </p>
        ) : null}
        <p className="mt-3 flex-1 text-sm text-muted-foreground">
          {project.summary}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
        >
          Read more
          <span className="sr-only"> about {project.title}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
