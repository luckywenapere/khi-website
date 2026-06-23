import { Section } from "@/components/layout/section";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { PageHeader } from "@/components/sections/page-header";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Volunteer",
  description:
    "Lend your time and skills to KHI's programs across Abuja: tutoring, mentoring, distribution days, and more.",
  path: "/get-involved/volunteer",
});

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Volunteer with KHI"
        intro="From tutoring and mentoring to distribution days, volunteers make our programs possible. Tell us a little about yourself and the areas you care about."
        src="/images/volunteer/volunteer-team.jpg"
        imageAlt="KHI volunteers together at a community program"
        priority
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl">Why volunteer</h2>
            <p className="mt-4 text-muted-foreground">
              KHI runs on people who give their time. Whether you can help once
              or regularly, there is a place for your skills across education,
              health and hygiene, food relief, and youth leadership.
            </p>
            <PlaceholderImage
              alt="KHI volunteers distributing support in the community"
              src="/images/volunteer/volunteers.jpg"
              className="mt-6 aspect-[4/3] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <h2 className="text-2xl">Become a volunteer</h2>
            <div className="mt-6">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
