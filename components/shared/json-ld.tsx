import type { JsonLdObject } from "@/lib/seo";

/**
 * Renders structured data as a script tag. `<` is escaped to its unicode
 * form to neutralise XSS via JSON.stringify (per Next.js JSON-LD guidance).
 */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
