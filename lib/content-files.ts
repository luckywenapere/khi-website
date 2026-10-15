import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads verbatim markdown content files at build time. Used only by statically
 * rendered Server Components, so the file content is inlined into the prerender
 * (no runtime filesystem access). Story posts are loaded by content/stories.ts.
 */
const CONTENT_DIR = join(process.cwd(), "content");

/** A legal page's full markdown (its leading `# Title` is the page h1). */
export function readLegalMarkdown(file: string): string {
  return readFileSync(join(CONTENT_DIR, "legal", file), "utf8");
}
