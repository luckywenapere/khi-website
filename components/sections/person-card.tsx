import { ChevronDown, User } from "lucide-react";

import { PlaceholderImage } from "@/components/shared/placeholder-image";
import type { Person } from "@/content/team";

/**
 * A team member / trustee: portrait (placeholder until a photo is confirmed),
 * name, role, and an accessible expandable bio (native <details>, keyboard-
 * operable, no client JS).
 */
export function PersonCard({ person }: { person: Person }) {
  const hasBio = person.bio.length > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <PlaceholderImage
        alt={`Portrait of ${person.name}`}
        src={person.photo}
        icon={User}
        showLabel={false}
        className="aspect-square w-full rounded-none"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col p-5">
        {/* Name is a styled non-heading so PeopleGrid can sit under any
            heading level without skipping (cards aren't section headings). */}
        <p className="font-sans text-base font-semibold text-charcoal">
          {person.name}
        </p>
        <p className="text-sm text-blue-700">{person.role}</p>

        {hasBio ? (
          <details className="group mt-3">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-foreground outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Read bio</span>
              <span className="hidden group-open:inline">Hide bio</span>
              <ChevronDown
                className="size-4 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {person.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </details>
        ) : null}
      </div>
    </article>
  );
}
