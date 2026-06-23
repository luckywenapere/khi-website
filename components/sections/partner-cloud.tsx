import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { partners } from "@/content/partners";

/**
 * Partners — borrowed credibility. Quiet, restrained grid. Until logos are
 * supplied, each partner shows as a bordered name card (one-line swap to a real
 * logo via the `logo` field in content/partners.ts).
 */
export function PartnerCloud() {
  return (
    <Section spacing="compact">
      <div className="text-center">
        <h2 className="text-overline text-blue-700">In partnership with</h2>
      </div>

      <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {partners.map((partner) => (
          <li key={partner.name}>
            <div className="flex h-20 items-center justify-center rounded-lg border border-border bg-card px-4 text-center">
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-sm font-medium text-charcoal">
                  {partner.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link
          href="/get-involved/partner"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          Partner with us
        </Link>
      </div>
    </Section>
  );
}
