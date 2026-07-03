import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/section";
import { CtaBlock } from "@/components/sections/cta-block";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectCard } from "@/components/sections/project-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getProgram, programs } from "@/content/programs";
import { getProjectsByProgram } from "@/content/projects";
import { createMetadata } from "@/lib/seo";

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) {
    return createMetadata({ title: "Program", path: `/programs/${slug}` });
  }
  return createMetadata({
    title: program.title,
    description: program.description,
    path: `/programs/${slug}`,
  });
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const programProjects = getProjectsByProgram(program.slug);

  return (
    <>
      <PageHeader
        variant="editorial"
        eyebrow="What We Do"
        title={program.title}
        intro={program.description}
      />

      <Section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "What We Do", href: "/programs" },
            { name: program.title, href: `/programs/${program.slug}` },
          ]}
        />

        <h2 className="mt-10">Projects in this program</h2>
        {programProjects.length > 0 ? (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programProjects.map((project) => (
              <li key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-muted-foreground">
            Projects in this program are coming soon.
          </p>
        )}
      </Section>

      <CtaBlock variant="donate" />
    </>
  );
}
