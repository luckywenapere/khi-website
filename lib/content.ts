/**
 * Path A content layer (brief §3): a thin typed interface over in-repo
 * content. Pages and SEO read through here so swapping to a CMS later is a
 * loader change, not a rewrite.
 */
export { programs, getProgram, type Program } from "@/content/programs";

/** Turn a URL slug into a human-readable Title Case label. */
export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
