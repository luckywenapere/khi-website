import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ProjectDetail } from "@/components/sections/project-detail";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getProgram } from "@/content/programs";
import { getProject, projects } from "@/content/projects";
import { createMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return createMetadata({ title: "Project", path: `/projects/${slug}` });
  }
  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const program = getProgram(project.programSlug);

  return (
    <>
      <Container>
        <div className="pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "What We Do", href: "/programs" },
              ...(program
                ? [
                    {
                      name: program.title,
                      href: `/programs/${program.slug}`,
                    },
                  ]
                : []),
              { name: project.title, href: `/projects/${project.slug}` },
            ]}
          />
        </div>
      </Container>
      <ProjectDetail project={project} />
    </>
  );
}
