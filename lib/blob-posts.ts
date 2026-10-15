/**
 * Portal posts stored in Vercel Blob (server only).
 *
 * Layout in the store:
 *   posts/<slug>.json      the post (see `blobPostSchema`)
 *   posts/<slug>/<n>.jpg   its photos (public, random suffix)
 *
 * When BLOB_READ_WRITE_TOKEN is absent (local builds, previews without a
 * store) every read returns [] so the site still builds and renders.
 */
import { del, list, put } from "@vercel/blob";
import { z } from "zod";

import { DEFAULT_AUTHOR, type Story } from "@/content/stories";

export const POSTS_PREFIX = "posts/";

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

const imageSchema = z.object({ src: z.url(), alt: z.string() });

export const blobPostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().default(DEFAULT_AUTHOR),
  excerpt: z.string(),
  body: z.string(),
  image: z.url().optional(),
  imageAlt: z.string(),
  gallery: z.array(imageSchema).default([]),
  createdAt: z.string().optional(),
});

export type BlobPost = z.infer<typeof blobPostSchema>;

function toStory(post: BlobPost): Story {
  return { ...post, source: "portal" };
}

async function listAll(prefix: string) {
  const blobs: Awaited<ReturnType<typeof list>>["blobs"] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

/** Every portal post. Never throws: a store outage degrades to []. */
export async function readBlobStories(): Promise<Story[]> {
  if (!blobConfigured()) return [];
  try {
    const blobs = await listAll(POSTS_PREFIX);
    const jsonBlobs = blobs.filter(
      (blob) =>
        blob.pathname.endsWith(".json") &&
        !blob.pathname.slice(POSTS_PREFIX.length).includes("/"),
    );
    const posts = await Promise.all(
      jsonBlobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url, {
            next: { revalidate: 60 },
          });
          if (!response.ok) return null;
          const parsed = blobPostSchema.safeParse(await response.json());
          return parsed.success ? toStory(parsed.data) : null;
        } catch {
          return null;
        }
      }),
    );
    return posts.filter((post): post is Story => post !== null);
  } catch (error) {
    console.error("[stories] Could not read portal posts from Blob", error);
    return [];
  }
}

/** Upload one (already resized) photo for a post. Returns its public URL. */
export async function putPostImage(
  slug: string,
  index: number,
  file: Blob,
): Promise<string> {
  const result = await put(`${POSTS_PREFIX}${slug}/${index}.jpg`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: "image/jpeg",
  });
  return result.url;
}

/** Write the post JSON (never overwrites an existing post). */
export async function putPost(post: BlobPost): Promise<void> {
  await put(`${POSTS_PREFIX}${post.slug}.json`, JSON.stringify(post), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

/** Whether a post JSON already exists for this slug. */
export async function blobPostExists(slug: string): Promise<boolean> {
  const blobs = await listAll(`${POSTS_PREFIX}${slug}.json`);
  return blobs.some((blob) => blob.pathname === `${POSTS_PREFIX}${slug}.json`);
}

/** Delete a post's JSON and every photo under posts/<slug>/. */
export async function deleteBlobPost(slug: string): Promise<number> {
  const images = await listAll(`${POSTS_PREFIX}${slug}/`);
  const json = await listAll(`${POSTS_PREFIX}${slug}.json`);
  const urls = [...images, ...json]
    .filter(
      (blob) =>
        blob.pathname === `${POSTS_PREFIX}${slug}.json` ||
        blob.pathname.startsWith(`${POSTS_PREFIX}${slug}/`),
    )
    .map((blob) => blob.url);
  if (urls.length) await del(urls);
  return urls.length;
}

/** Delete photos uploaded for a post that was never published. */
export async function deletePostImages(slug: string): Promise<void> {
  const images = await listAll(`${POSTS_PREFIX}${slug}/`);
  if (images.length) await del(images.map((blob) => blob.url));
}
