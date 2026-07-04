import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/section";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
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

  // Confirmed photos (Phase 3b §6) where present; otherwise placeholder tiles.
  const hasPhotos = Boolean(project.gallery?.length);
  const galleryImages: GalleryImage[] = hasPhotos
    ? project.gallery!.map((image) => ({ src: image.src, alt: image.alt }))
    : [
        { alt: project.imageAlt },
        { alt: `${project.title} additional photo` },
        { alt: `${project.title} additional photo` },
      ];

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
      </div>

      <div className="mt-12">
        <h2 className="text-2xl">Gallery</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasPhotos ? (
            "Photos from this project."
          ) : (
            <>
              Photos from this project.{" "}
              <span className="text-charcoal">Photos coming soon.</span>
            </>
          )}
        </p>
        <div className="mt-5">
          <Gallery images={galleryImages} label={`${project.title} gallery`} />
        </div>
      </div>

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
