import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { featuredProjects } from "@/content/projects";
import { home } from "@/content/home";

import { ProjectCard } from "./project-card";

/**
 * Featured initiatives — the heart of "lead with the concrete work". Three
 * flagship projects revealed with a stagger, placed high on the page.
 */
export function FeaturedProjects() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-overline text-blue-700">{home.featured.eyebrow}</p>
          <h2 className="mt-2">{home.featured.title}</h2>
        </div>
        <Link
          href="/programs"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
        >
          See all our work
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
