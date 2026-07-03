import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/sections/page-header";
import { PeopleGrid } from "@/components/sections/people-grid";
import { Timeline } from "@/components/sections/timeline";
import { about } from "@/content/about";
import { team } from "@/content/team";
import { trustees } from "@/content/trustees";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Who Kind Humanitarian Initiative is: our vision and mission, our story, our values, and the people behind the work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About KHI"
        intro={about.intro}
        imageAlt="KHI team and community members in Abuja"
        icon={Users}
        priority
      />

      {/* Vision & mission */}
      <Section>
        <h2>Our vision and mission</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-overline text-blue-700">Vision</p>
            <p className="text-body-lg mt-2 text-foreground">{about.vision}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-overline text-blue-700">Mission</p>
            <p className="text-body-lg mt-2 text-foreground">{about.mission}</p>
          </div>
        </div>
      </Section>

      {/* Story */}
      <Section spacing="compact" container="prose">
        <h2>Our story</h2>
        {about.story.map((section) => (
          <div key={section.heading} className="mt-6">
            <h3 className="font-sans text-lg font-semibold text-charcoal">
              {section.heading}
            </h3>
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mt-3 leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </Section>

      {/* How we came about — timeline */}
      <Section spacing="compact" className="border-y border-border bg-white">
        <div className="mx-auto max-w-prose">
          <h2>How we came about</h2>
          <p className="mt-3 text-muted-foreground">
            From a leadership cohort to a registered Nigerian non-profit.
          </p>
          <div className="mt-8">
            <Timeline items={about.timeline} />
          </div>
          <Link
            href="/about/transparency"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
          >
            See our transparency &amp; registration details
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <h2>Our values</h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-3">
          {about.values.map((value) => (
            <li
              key={value.name}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-sans text-lg font-semibold text-charcoal">
                {value.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* People & governance */}
      <Section className="border-t border-border bg-white">
        <h2>People &amp; governance</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Our team and Board of Trustees bring expertise across engineering,
          law, development, health, and education.
        </p>

        <h3 className="text-overline mt-10 text-blue-700">Team</h3>
        <div className="mt-4">
          <PeopleGrid people={team} />
        </div>

        <h3 className="text-overline mt-12 text-blue-700">Board of Trustees</h3>
        <div className="mt-4">
          <PeopleGrid people={trustees} />
        </div>
      </Section>
    </>
  );
}
