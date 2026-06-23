import { PageHeader } from "@/components/sections/page-header";
import { StoryGrid } from "@/components/sections/story-grid";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Stories",
  description:
    "Articles and field updates from Kind Humanitarian Initiative's work across Nigerian communities.",
  path: "/stories",
});

export default function StoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stories"
        title="Stories"
        intro="Articles and updates from our work — on education, girls, and the communities we serve."
      />
      <StoryGrid showHeader={false} />
    </>
  );
}
