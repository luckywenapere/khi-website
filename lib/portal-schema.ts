import { z } from "zod";

/** Shared by the portal form (client) and its server actions. */
export const MAX_EXTRA_PHOTOS = 12;

export const postFieldsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Please add a title (at least 3 characters).")
    .max(140, "Please keep the title under 140 characters."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date."),
  excerpt: z
    .string()
    .trim()
    .min(10, "Please add a short summary (one or two lines).")
    .max(
      300,
      "Please keep the summary to one or two lines (under 300 characters).",
    ),
  body: z
    .string()
    .trim()
    .min(20, "Please write the story (at least a couple of sentences).")
    .max(50_000, "That story is very long. Please shorten it a little."),
});

export type PostFields = z.infer<typeof postFieldsSchema>;

/** URL-safe slug from a title: "Back to School!" → "back-to-school". */
export function slugify(title: string): string {
  return (
    title
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/g, "") || "story"
  );
}

/**
 * Turn plain typed paragraphs into markdown paragraphs: people on phones often
 * separate paragraphs with a single line break, which markdown would merge.
 * List items, headings and quotes are left as they are.
 */
export function normaliseBody(body: string): string {
  const special = /^\s*([-*+]\s|\d+[.)]\s|#{1,6}\s|>)/;
  const lines = body.replace(/\r\n/g, "\n").trim().split("\n");
  const out: string[] = [];
  lines.forEach((line, index) => {
    const prev = lines[index - 1];
    if (
      index > 0 &&
      line.trim() !== "" &&
      prev !== undefined &&
      prev.trim() !== "" &&
      !(special.test(line) && special.test(prev))
    ) {
      out.push("");
    }
    out.push(line.trimEnd());
  });
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}
