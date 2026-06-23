import { CtaBlock } from "@/components/sections/cta-block";
import { PageHeader } from "@/components/sections/page-header";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Get Involved",
  description:
    "Three ways to support Kind Humanitarian Initiative in Abuja: volunteer your time, partner your organisation, or donate.",
  path: "/get-involved",
});

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Get involved"
        intro="There are three ways to help KHI bring practical support to communities in and around Abuja: give your time, partner your organisation, or make a gift. Choose what fits you."
      />
      <CtaBlock variant="volunteer" />
      <CtaBlock variant="partner" />
      <CtaBlock variant="donate" />
    </>
  );
}
