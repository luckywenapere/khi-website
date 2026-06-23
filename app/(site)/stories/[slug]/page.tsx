import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { Markdown } from "@/components/shared/markdown";
import { ProseLayout } from "@/components/shared/prose-layout";
import { getStory, stories } from "@/content/stories";
import { readPostBody } from "@/lib/content-files";
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) {
    return createMetadata({ title: "Story", path: `/stories/${slug}` });
  }
  return createMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${slug}`,
  });
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const body = readPostBody(story.bodyFile);
  const path = `/stories/${story.slug}`;

  return (
    <Section>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Stories", path: "/stories" },
            { name: story.title, path },
          ]),
          articleJsonLd({
            title: story.title,
            description: story.excerpt,
            path,
            datePublished: story.date,
            author: story.author,
          }),
        ]}
      />

      <ProseLayout>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Stories", href: "/stories" },
            { name: story.title, href: path },
          ]}
        />

        <header className="mt-8">
          <h1>{story.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            <time dateTime={story.date}>{formatDate(story.date)}</time>
            <span aria-hidden="true"> · </span>
            {story.author}
          </p>
        </header>

        <div className="mt-8">
          <Markdown>{body}</Markdown>
        </div>
      </ProseLayout>
    </Section>
  );
}
