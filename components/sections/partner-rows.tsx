import Image from "next/image";

import type { Partner } from "@/content/partners";

/**
 * Editorial partner rows from the old Partnerships page: serif blue name
 * (+ logo where one exists) left, hairline divider, description right.
 */
export function PartnerRows({ partners }: { partners: readonly Partner[] }) {
  return (
    <ul className="divide-y divide-border">
      {partners.map((partner) => (
        <li
          key={partner.slug}
          className="grid items-center gap-6 py-10 md:grid-cols-12 md:gap-10"
        >
          <div className="flex flex-col items-start gap-4 md:col-span-5 md:items-center md:text-center">
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={96}
                height={96}
                className="size-20 rounded-lg object-contain md:size-24"
              />
            ) : null}
            <h3 className="font-display text-2xl font-medium text-blue-700">
              {partner.name}
            </h3>
          </div>
          <p className="text-muted-foreground md:col-span-7 md:border-l md:border-border md:pl-10">
            {partner.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
