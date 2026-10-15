/**
 * Stories content layer: repo markdown posts merged with portal (Blob) posts,
 * newest first. Pages that use it export `revalidate = 60` (ISR), and the
 * portal calls revalidatePath/revalidateTag after publishing or deleting so
 * changes show at once.
 */
import { unstable_cache } from "next/cache";

import { readRepoStories, sortStories, type Story } from "@/content/stories";
import { readBlobStories } from "@/lib/blob-posts";

export type { Story };

export const STORIES_TAG = "stories";

const cachedBlobStories = unstable_cache(readBlobStories, ["blob-stories"], {
  revalidate: 60,
  tags: [STORIES_TAG],
});

/** All stories, newest first. A repo post wins over a portal post's slug. */
export async function getStories(): Promise<Story[]> {
  const repo = readRepoStories();
  const repoSlugs = new Set(repo.map((story) => story.slug));
  const portal = (await cachedBlobStories()).filter(
    (story) => !repoSlugs.has(story.slug),
  );
  return sortStories([...repo, ...portal]);
}

/** Newest stories for the homepage grid. */
export async function getLatestStories(count = 3): Promise<Story[]> {
  return (await getStories()).slice(0, count);
}

export async function getStory(slug: string): Promise<Story | undefined> {
  return (await getStories()).find((story) => story.slug === slug);
}

/** Repo stories only (for generateStaticParams). */
export function getRepoStories(): Story[] {
  return sortStories(readRepoStories());
}
