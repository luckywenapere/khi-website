import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/section";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { buttonVariants } from "@/components/ui/button";
import { getPartner } from "@/content/partners";
import { getProgram } from "@/content/programs";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

import { Gallery, type GalleryImage } from "./gallery";

function StatusBadge({ status }: { status: Project["status"] }) {
  const isOngoing = status === "ongoing";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        isOngoing ? "bg-accent text-blue-700" : "bg-gray-100 text-gray-700",
      )}
    >
      {isOngoing ? "Ongoing" : "Completed"}
    </span>
  );
}

/**
 * Full project layout: program tag, status, partner link, date, body, and the
 * project's own photo gallery (folded in — no standalone Gallery page). Holds
 * the page h1.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const program = getProgram(project.programSlug);
  const partner = project.partnerSlug
    ? getPartner(project.partnerSlug)
    : undefined;

  // Confirmed photos (Phase 3b §6) where present; projects without photos
  // skip the gallery section entirely.
  const hasPhotos = Boolean(project.gallery?.length);
  const galleryImages: GalleryImage[] = hasPhotos
    ? project.gallery!.map((image) => ({ src: image.src, alt: image.alt }))
    : [];

  return (
    <Section>
      <div className="flex flex-wrap items-center gap-2">
        {program ? (
          <Link
            href={`/programs/${program.slug}`}
            className="text-overline text-blue-700 hover:underline"
          >
            {program.title}
          </Link>
        ) : null}
        <StatusBadge status={project.status} />
      </div>

      <h1 className="mt-3">{project.title}</h1>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
        {partner ? (
          <div className="flex gap-1">
            <dt>In partnership with</dt>
            <dd>
              <Link
                href="/get-involved/partner"
                className="text-blue-700 hover:underline"
              >
                {partner.name}
              </Link>
            </dd>
          </div>
        ) : null}
        {project.date ? (
          <div className="flex gap-1">
            <dt className="sr-only">Date</dt>
            <dd>{project.date}</dd>
          </div>
        ) : null}
      </dl>

      {/* Photo-led opening (v2): the strongest gallery image leads the page. */}
      {hasPhotos ? (
        <PlaceholderImage
          alt={project.gallery![0].alt}
          src={project.gallery![0].src}
          priority
          showLabel={false}
          className="mt-8 aspect-[16/9] w-full"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      ) : null}

      <div className="text-body-lg mt-8 max-w-prose space-y-4 text-muted-foreground">
        {project.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {project.highlights?.length ? (
          <ul className="list-disc space-y-1 pl-6 font-medium text-foreground">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {project.closing?.map((paragraph, index) => (
          <p key={`closing-${index}`}>{paragraph}</p>
        ))}
      </div>

      {project.cta?.length ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {project.cta.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={cn(
                buttonVariants({
                  variant: index === 0 ? "default" : "outline",
                }),
                "h-11 rounded-md px-6 text-base",
              )}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}

      {hasPhotos ? (
        <div className="mt-12">
          <h2 className="text-2xl">Gallery</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Photos from this project.
          </p>
          <div className="mt-5">
            <Gallery
              images={galleryImages}
              label={`${project.title} gallery`}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-12">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All programs
        </Link>
      </div>
    </Section>
  );
}
