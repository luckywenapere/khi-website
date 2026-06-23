import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { home } from "@/content/home";
import { latestStories } from "@/content/stories";
import { cn } from "@/lib/utils";

import { StoryCard } from "./story-card";

/**
 * Latest news — signs of life. Degrades gracefully when content is thin: the
 * grid caps at two columns so two posts read as intentional, not a sparse 3-up.
 * `showHeader` is on for the homepage section and off on the Stories index
 * (which has its own page header).
 */
export function StoryGrid({
  showHeader = true,
  cardHeadingLevel,
}: { showHeader?: boolean; cardHeadingLevel?: "h2" | "h3" } = {}) {
  if (latestStories.length === 0) return null;

  // Under the homepage "Latest news" h2 → cards are h3; on the Stories index
  // (no section h2, directly under the page h1) → cards are h2.
  const headingLevel = cardHeadingLevel ?? (showHeader ? "h3" : "h2");

  return (
    <Section>
      {showHeader ? (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-overline text-blue-700">
              {home.stories.eyebrow}
            </p>
            <h2 className="mt-2">{home.stories.title}</h2>
          </div>
          <Link
            href="/stories"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
          >
            All stories
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      ) : null}

      <Stagger
        className={cn(
          "mt-10 grid gap-6",
          latestStories.length > 1 ? "sm:grid-cols-2" : "max-w-xl",
        )}
      >
        {latestStories.map((story) => (
          <StaggerItem key={story.slug} className="h-full">
            <StoryCard story={story} headingLevel={headingLevel} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
