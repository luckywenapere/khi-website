import { Section } from "@/components/layout/section";
import { Markdown } from "@/components/shared/markdown";
import { ProseLayout } from "@/components/shared/prose-layout";
import { readLegalMarkdown } from "@/lib/content-files";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookie Policy",
  description: "How and why the KHI website uses cookies.",
  path: "/cookies",
});

export default function CookiesPage() {
  const body = readLegalMarkdown("cookies.md");
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
