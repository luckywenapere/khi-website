import { Section } from "@/components/layout/section";
import { Markdown } from "@/components/shared/markdown";
import { ProseLayout } from "@/components/shared/prose-layout";
import { readLegalMarkdown } from "@/lib/content-files";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Disclaimer",
  description:
    "Important notices regarding the information on the KHI website.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const body = readLegalMarkdown("disclaimer.md");
  return (
    <Section>
      <ProseLayout>
        <Markdown>{body}</Markdown>
        <p className="mt-10 border-t border-border pt-4 text-xs text-muted-foreground">
          [KHI] This is the existing site text and should be reviewed by a
          lawyer before launch.
        </p>
      </ProseLayout>
    </Section>
  );
}
