import { Section } from "@/components/layout/section";
import { Markdown } from "@/components/shared/markdown";
import { DocumentCard } from "@/components/shared/document-card";
import { ProseLayout } from "@/components/shared/prose-layout";
import { readLegalMarkdown } from "@/lib/content-files";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: "The terms governing your use of the KHI website.",
  path: "/terms",
});

export default function TermsPage() {
  const body = readLegalMarkdown("terms.md");
  return (
    <Section>
      <DocumentCard className="mx-auto max-w-3xl">
        <ProseLayout>
          <Markdown>{body}</Markdown>
          <p className="mt-10 border-t border-border pt-4 text-xs text-muted-foreground">
            [KHI] This is the existing site text and should be reviewed by a
            lawyer before launch.
          </p>
        </ProseLayout>
      </DocumentCard>
    </Section>
  );
}
