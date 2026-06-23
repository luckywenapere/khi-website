export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (verified: both posts are 2025-09-10). */
  date: string;
  author: string;
  /** Markdown body file under content/posts (read at build). */
  bodyFile: string;
  /** Story image (Phase 4). Absent → PlaceholderImage. */
  image?: string;
  imageAlt: string;
};

/**
 * The two real articles from the WordPress export (verified). Bodies live as
 * verbatim markdown in content/posts and are read at build. Newest first.
 */
export const stories: readonly Story[] = [
  {
    slug: "the-power-of-the-girl-child",
    title: "The Power of the Girl Child: A Path to a Brighter Future",
    excerpt:
      "The world is full of untapped potential, and a significant portion of it lies in the hearts and minds of girls around the globe.",
    date: "2025-09-10",
    author: "Kind Humanitarian Initiative",
    bodyFile: "the-power-of-the-girl-child.md",
    // [KHI] Topical image from the export — confirm in the final eyes-on check.
    image: "/images/stories/girl-child.jpeg",
    imageAlt: "A girl studying in a classroom in Abuja",
  },
  {
    slug: "back-2-school",
    title: "Back 2 School",
    excerpt:
      "The summer holidays are coming to an end, and it's time to gear up for a new academic year.",
    date: "2025-09-10",
    author: "Blessing",
    bodyFile: "back-2-school.md",
    image: "/images/stories/torbee2.jpg",
    imageAlt: "Students heading back to school with their supplies",
  },
] as const;

/** Latest stories for the homepage news grid (already newest-first). */
export const latestStories = stories;

export function getStory(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}
