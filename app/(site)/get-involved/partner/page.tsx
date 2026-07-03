import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/sections/page-header";
import { buttonVariants } from "@/components/ui/button";
import { partners } from "@/content/partners";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Partner with us",
  description:
    "KHI prioritises strategic partnerships built on shared values. Meet our partners and explore working together.",
  path: "/get-involved/partner",
});

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Partner with us"
        intro="Kind Humanitarian Initiative prioritizes strategic partnerships to broaden its impact and address diverse community needs. These collaborations are built on shared values and a commitment to sustainable, positive change."
      />

      <Section>
        <h2>Our partners</h2>
        {/* [KHI] Partner logos to come — bordered name cards until then. */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {partners.map((partner) => (
            <li
              key={partner.slug}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-sans text-lg font-semibold text-charcoal">
                {partner.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {partner.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="compact" className="border-t border-border bg-white">
        <div className="max-w-prose">
          <h2>Let&rsquo;s work together</h2>
          <p className="mt-4 text-muted-foreground">
            If your organisation or business shares our commitment to education,
            health, food security, and youth leadership, we would love to
            explore what we can build together.
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-6 h-11 rounded-md px-6 text-base",
            )}
          >
            Talk to us about partnering
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
