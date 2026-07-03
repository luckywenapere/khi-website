import { Section } from "@/components/layout/section";
import { Markdown } from "@/components/shared/markdown";
import { DocumentCard } from "@/components/shared/document-card";
import { ProseLayout } from "@/components/shared/prose-layout";
import { readLegalMarkdown } from "@/lib/content-files";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How KHI collects, uses, and protects your personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const body = readLegalMarkdown("privacy.md");
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
