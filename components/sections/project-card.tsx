import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";

import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { getPartner } from "@/content/partners";
import { getProgram } from "@/content/programs";
import type { Project } from "@/content/projects";

import { StatusBadge } from "./status-badge";

/** Placeholder icons for projects that don't have photos yet. */
const programIcons: Record<string, LucideIcon> = {
  "education-scholarships": GraduationCap,
  "health-hygiene": HeartPulse,
  "food-relief": Wheat,
  "youth-leadership": Sprout,
};


export function ProjectCard({ project }: { project: Project }) {
  const program = getProgram(project.programSlug);
  const partner = project.partnerSlug
    ? getPartner(project.partnerSlug)
    : undefined;

  const image = project.cardImage ?? project.gallery?.[0]?.src;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <PlaceholderImage
        alt={project.imageAlt}
        src={image}
        icon={program ? programIcons[program.slug] : undefined}
        showLabel={false}
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
