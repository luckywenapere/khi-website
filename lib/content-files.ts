import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads verbatim markdown content files at build time. Used only by statically
 * rendered Server Components, so the file content is inlined into the prerender
 * (no runtime filesystem access).
 */
const CONTENT_DIR = join(process.cwd(), "content");

/** Strip a leading YAML frontmatter block (--- ... ---) from markdown. */
function stripFrontmatter(markdown: string): string {
  if (!markdown.startsWith("---")) return markdown;
  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return markdown;
  const newlineAfter = markdown.indexOf("\n", end + 1);
  return newlineAfter === -1
    ? ""
    : markdown.slice(newlineAfter + 1).trimStart();
}

/** A story post's body markdown (frontmatter removed). */
export function readPostBody(bodyFile: string): string {
  const raw = readFileSync(join(CONTENT_DIR, "posts", bodyFile), "utf8");
  return stripFrontmatter(raw);
}

/** A legal page's full markdown (its leading `# Title` is the page h1). */
export function readLegalMarkdown(file: string): string {
  return readFileSync(join(CONTENT_DIR, "legal", file), "utf8");
}
