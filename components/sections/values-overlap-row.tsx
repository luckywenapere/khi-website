import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export type ValueItem = { name: string; description: string };

type ValuesOverlapRowProps = {
  values: readonly ValueItem[];
  /** Pull the card up over the previous (hero) section. */
  overlap?: boolean;
};

/**
 * The old site's signature 01/02/03 values card. A white card that, on the
 * homepage, overlaps the hero bottom (pure negative margin — zero CLS).
 * DOM source order stays hero-content → values, so the overlap is visual only.
 */
export function ValuesOverlapRow({
  values,
  overlap = false,
}: ValuesOverlapRowProps) {
  return (
    <section className={cn(overlap && "relative z-10 -mt-24 md:-mt-28")}>
      <Container>
        <h2 className="sr-only">Our values</h2>
        <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border shadow-lg sm:grid-cols-3">
          {values.map((value, index) => (
            <li key={value.name} className="bg-card p-6 md:p-8">
              <span
                aria-hidden="true"
                className="font-display text-3xl font-medium text-blue-700"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-sans text-lg font-semibold text-charcoal">
                {value.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {value.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
