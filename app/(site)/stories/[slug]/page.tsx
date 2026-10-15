import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { Markdown } from "@/components/shared/markdown";
import { ProseLayout } from "@/components/shared/prose-layout";
import { Gallery } from "@/components/sections/gallery";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { getRepoStories, getStory } from "@/lib/stories";
import { formatDate } from "@/lib/utils";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

/** ISR: portal posts (Vercel Blob) render on first request, then cache. */
export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return getRepoStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) {
    return createMetadata({ title: "Story", path: `/stories/${slug}` });
  }
  return createMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${slug}`,
    image: story.image,
  });
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

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

        {story.image ? (
          <PlaceholderImage
            alt={story.imageAlt}
            src={story.image}
            priority
            showLabel={false}
            className="mt-8 aspect-[16/9] w-full"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        ) : null}

        <div className="mt-8">
          <Markdown>{story.body}</Markdown>
        </div>

        {story.gallery.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-2xl">Photos</h2>
            <div className="mt-5">
              <Gallery images={story.gallery} label={`${story.title} photos`} />
            </div>
          </div>
        ) : null}
      </ProseLayout>
    </Section>
  );
}
