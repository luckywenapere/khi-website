import { Section } from "@/components/layout/section";

type PageStubProps = {
  /** Small uppercase eyebrow above the heading. */
  eyebrow?: string;
  /** The page's single h1. */
  title: string;
  /** Optional lede; defaults to the Phase 1 placeholder. */
  description?: string;
};

/**
 * Minimal, consistent placeholder for Phase 1 route stubs: an eyebrow, the
 * page h1, a lede, and the brand throughline. Real content lands in later
 * phases. Each page supplies its own metadata.
 */
export function PageStub({ eyebrow, title, description }: PageStubProps) {
  return (
    <Section container="prose">
      {eyebrow ? (
        <p className="text-overline text-blue-700">{eyebrow}</p>
      ) : null}
      <h1 className="mt-3">{title}</h1>
      <p className="text-body-lg mt-6 text-muted-foreground">
        {description ?? "Coming together, content in a later phase."}
      </p>
      <div
        className="throughline mt-8 h-1 w-24 rounded-full"
        aria-hidden="true"
      />
    </Section>
  );
}
