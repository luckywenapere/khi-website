import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { CtaBlock } from "@/components/sections/cta-block";
import { PageHeader } from "@/components/sections/page-header";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Get Involved",
  description:
    "Three ways to support Kind Humanitarian Initiative in Abuja: volunteer your time, partner your organisation, or donate.",
  path: "/get-involved",
});

const pathways = [
  {
    title: "Volunteer",
    body: "Give your time and skills: tutoring, mentoring, and distribution days across our four programs.",
    href: "/get-involved/volunteer",
    label: "Become a volunteer",
    image: "/images/volunteer/khi-volunteer-team.jpg",
    imageAlt:
      "KHI volunteers in branded vests and T-shirts at a school outreach",
  },
  {
    title: "Partner with us",
    body: "Organisations and businesses extend KHI's reach. Let's find what we can build together.",
    href: "/get-involved/partner",
    label: "Explore partnership",
    image: "/images/projects/kenvic-leadership-conference/kenvic.jpg",
    imageAlt: "A partner panel at the Kenvic leadership conference",
  },
  {
    title: "Donate",
    body: "Fund the work directly: exam fees, hygiene kits, and food packs for families in Abuja.",
    href: "/donate",
    label: "Give today",
    image: "/images/donate/girl-water.jpg",
    imageAlt: "A child carrying water in a Nigerian community",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        variant="editorial"
        eyebrow="Get Involved"
        title="Get involved"
        intro="There are three ways to help KHI bring practical support to communities in and around Abuja: give your time, partner your organisation, or make a gift. Choose what fits you."
      />

      <Section>
        <h2 className="sr-only">Ways to get involved</h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {pathways.map((pathway) => (
            <li key={pathway.href}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <PlaceholderImage
                  alt={pathway.imageAlt}
                  src={pathway.image}
                  showLabel={false}
                  className="aspect-[16/10] w-full rounded-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-sans text-lg font-semibold text-charcoal">
                    {pathway.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {pathway.body}
                  </p>
                  <Link
                    href={pathway.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
                  >
                    {pathway.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* Closing beat */}
      <CtaBlock variant="photo" />
    </>
  );
}
