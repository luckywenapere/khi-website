/**
 * Story types + the repo half of the stories content layer.
 *
 * Stories come from two places, merged in `lib/stories.ts`:
 * 1. Markdown files in `content/posts/*.md` (read here, at build/ISR time).
 * 2. Posts published from the /portal, stored in Vercel Blob.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type StoryImage = { src: string; alt: string };

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  author: string;
  /** Markdown body. */
  body: string;
  /** Cover image (absent → PlaceholderImage). */
  image?: string;
  imageAlt: string;
  /** Extra photos rendered below the body. */
  gallery: StoryImage[];
  /** Where the post lives: a repo markdown file or a portal (Blob) post. */
  source: "repo" | "portal";
};

export const DEFAULT_AUTHOR = "Kind Humanitarian Initiative";

const POSTS_DIR = join(process.cwd(), "content", "posts");

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"');
  }
  return trimmed;
}

/**
 * Minimal YAML-ish frontmatter parser: `key: value` lines plus one level of
 * `- item` lists (used for `gallery`). Enough for hand-written posts.
 */
export function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>;
  body: string;
} {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!text.startsWith("---")) return { data: {}, body: text };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: text };
  const block = text.slice(3, end);
  const afterEnd = text.indexOf("\n", end + 1);
  const body = afterEnd === -1 ? "" : text.slice(afterEnd + 1).trimStart();

  const data: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of block.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) {
      const list = data[listKey];
      if (Array.isArray(list)) list.push(unquote(item[1]));
      continue;
    }
    const pair = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (!pair) continue;
    const [, key, value] = pair;
    if (value.trim() === "") {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = unquote(value);
      listKey = null;
    }
  }
  return { data, body };
}

function str(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

/** First paragraph of the body, trimmed to ~200 chars, as a fallback excerpt. */
export function excerptFrom(body: string): string {
  const first =
    body
      .split(/\n\s*\n/)
      .map((p) => p.replace(/[#*_>`]/g, "").trim())
      .find(Boolean) ?? "";
  return first.length > 200 ? `${first.slice(0, 197).trimEnd()}…` : first;
}

/** Every `content/posts/*.md` story (unsorted). Missing folder → []. */
export function readRepoStories(): Story[] {
  let files: string[];
  try {
    files = readdirSync(POSTS_DIR).filter(
      (file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md",
    );
  } catch {
    return [];
  }

  return files.flatMap((file): Story[] => {
    const { data, body } = parseFrontmatter(
      readFileSync(join(POSTS_DIR, file), "utf8"),
    );
    const title = str(data.title);
    const date = str(data.date);
    if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
    const gallery = Array.isArray(data.gallery) ? data.gallery : [];
    return [
      {
        slug: file.replace(/\.md$/, ""),
        title,
        date,
        author: str(data.author) || DEFAULT_AUTHOR,
        excerpt: str(data.excerpt) || excerptFrom(body),
        body,
        image: str(data.image) || undefined,
        imageAlt: str(data.imageAlt) || title,
        gallery: gallery.map((src, index) => ({
          src,
          alt: `${title}: photo ${index + 2}`,
        })),
        source: "repo",
      },
    ];
  });
}

/** Newest first; ties broken by title for a stable order. */
export function sortStories(list: Story[]): Story[] {
  return [...list].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
  );
}
