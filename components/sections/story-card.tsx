import Link from "next/link";
import { Newspaper } from "lucide-react";

import { PlaceholderImage } from "@/components/shared/placeholder-image";
import type { Story } from "@/content/stories";
import { formatDate } from "@/lib/utils";

export function StoryCard({
  story,
  headingLevel = "h3",
}: {
  story: Story;
  /** h2 on the Stories index (directly under the page h1); h3 in the
   *  homepage "Latest news" section (which has its own h2). */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <PlaceholderImage
        alt={story.imageAlt}
        src={story.image}
        icon={Newspaper}
        className="aspect-[16/9] w-full rounded-none"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="flex flex-1 flex-col p-5">
        {story.date ? (
          <time dateTime={story.date} className="text-xs text-muted-foreground">
            {formatDate(story.date)}
          </time>
        ) : null}
        <Heading className="mt-1 font-sans text-lg font-semibold text-foreground">
          {/* Stretched link makes the whole card clickable; title is the label. */}
          <Link
            href={`/stories/${story.slug}`}
            className="after:absolute after:inset-0 hover:text-blue-700 focus-visible:outline-none"
          >
            {story.title}
          </Link>
        </Heading>
        <p className="mt-2 text-sm text-muted-foreground">{story.excerpt}</p>
      </div>
    </article>
  );
}
