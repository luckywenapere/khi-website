import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/sections/page-header";
import { getProjectsByProgram, type Project } from "@/content/projects";
import { programs } from "@/content/programs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "What We Do",
  description:
    "KHI's four programs — education and scholarships, health and hygiene, food relief, and youth leadership — and the projects within each.",
  path: "/programs",
});

function projectTitles(projects: readonly Project[]): string {
  return projects.map((project) => project.title).join(" · ");
}

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Our programs"
        intro="KHI works across four ongoing areas. Each program holds specific, time-bound projects — the concrete work that delivers it."
      />

      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {programs.map((program) => {
            const programProjects = getProjectsByProgram(program.slug);
            return (
              <li key={program.slug}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-blue-200 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <h2 className="font-sans text-xl font-semibold text-charcoal">
                    {program.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {program.description}
                  </p>
                  {programProjects.length > 0 ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-medium text-charcoal">
                        Projects:{" "}
                      </span>
                      {projectTitles(programProjects)}
                    </p>
                  ) : null}
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                    Explore {program.title}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
