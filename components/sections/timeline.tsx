import { Reveal } from "@/components/motion/reveal";
import type { Milestone } from "@/content/about";

/**
 * Vertical milestone timeline. The connecting line is the signature blue→cyan
 * throughline — used here for KHI's "How We Came About" story.
 */
export function Timeline({ items }: { items: readonly Milestone[] }) {
  return (
    <div className="relative">
      <div
        className="throughline absolute top-2 bottom-2 left-[7px] w-0.5"
        aria-hidden="true"
      />
      <ol className="space-y-8">
        {items.map((item) => (
          <li key={item.title} className="relative pl-8">
            <span
              className="absolute top-1.5 left-0 size-3.5 rounded-full border-2 border-background bg-blue-600 ring-1 ring-blue-200"
              aria-hidden="true"
            />
            <Reveal>
              <p className="text-overline text-blue-700">{item.date}</p>
              <h3 className="mt-1 font-sans text-lg font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-1 text-muted-foreground">{item.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
