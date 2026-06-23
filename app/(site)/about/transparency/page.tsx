import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/sections/page-header";
import { TransparencyBlock } from "@/components/sections/transparency-block";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Transparency & financials",
  description:
    "How Kind Humanitarian Initiative is governed and where donations go: registration facts, allocation, and reports.",
  path: "/about/transparency",
});

export default function TransparencyPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Transparency & financials"
        intro="Donors and partners deserve to know how KHI is registered and where their support goes. Here is what we can share, with anything not yet confirmed clearly marked."
      />

      <Section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Transparency", href: "/about/transparency" },
          ]}
        />
        <div className="mt-10">
          <TransparencyBlock />
        </div>
      </Section>
    </>
  );
}
