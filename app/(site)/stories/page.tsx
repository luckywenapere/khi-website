import { Newspaper } from "lucide-react";

import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/sections/page-header";
import { StoryGrid } from "@/components/sections/story-grid";
import { createMetadata } from "@/lib/seo";
import { getStories } from "@/lib/stories";

export const metadata = createMetadata({
  title: "Stories",
  description:
    "Articles and field updates from Kind Humanitarian Initiative's work across Nigerian communities.",
  path: "/stories",
});

/** ISR: portal posts appear within a minute even without a redeploy. */
export const revalidate = 60;

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <>
      <PageHeader
        variant="editorial"
        eyebrow="Stories"
        title="Stories"
        intro="Articles and updates from our work on education, girls, and the communities we serve."
      />
      {stories.length > 0 ? (
        <StoryGrid stories={stories} showHeader={false} />
      ) : (
        <Section>
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-xl border border-border bg-card px-6 py-12 text-center">
            <Newspaper className="size-9 text-blue-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl">Updates coming soon</h2>
            <p className="mt-2 text-muted-foreground">
              We&rsquo;re putting together stories from our latest work. Check
              back shortly.
            </p>
          </div>
        </Section>
      )}
    </>
  );
}
