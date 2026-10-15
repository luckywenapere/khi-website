"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { DEFAULT_AUTHOR } from "@/content/stories";
import {
  blobPostExists,
  deleteBlobPost,
  deletePostImages,
  putPost,
  putPostImage,
} from "@/lib/blob-posts";
import {
  checkPassword,
  endSession,
  isSignedIn,
  portalConfigured,
  startSession,
} from "@/lib/portal-auth";
import {
  MAX_EXTRA_PHOTOS,
  normaliseBody,
  postFieldsSchema,
  slugify,
} from "@/lib/portal-schema";
import { getStories, STORIES_TAG } from "@/lib/stories";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const NOT_CONFIGURED = "Portal not configured. Please contact the web team.";
const SIGNED_OUT =
  "You have been signed out. Please refresh the page and sign in again.";

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(80);

async function guard(): Promise<string | null> {
  if (!portalConfigured()) return NOT_CONFIGURED;
  if (!(await isSignedIn())) return SIGNED_OUT;
  return null;
}

function refreshStories(slug: string) {
  updateTag(STORIES_TAG);
  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath(`/stories/${slug}`);
  revalidatePath("/portal");
}

/* ---------- Sign in / out ---------- */

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!portalConfigured()) return { error: NOT_CONFIGURED };
  const candidate = String(formData.get("password") ?? "");
  if (!candidate || !checkPassword(candidate)) {
    // Small delay blunts password guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "That password isn't right. Please try again." };
  }
  await startSession();
  redirect("/portal");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/portal");
}

/* ---------- Publishing (called in order by the post form) ---------- */

/** Step 1: pick a unique slug for the title. */
export async function startPost(input: {
  title: string;
  date: string;
}): Promise<Result<{ slug: string }>> {
  const blocked = await guard();
  if (blocked) return { ok: false, error: blocked };

  const parsed = postFieldsSchema
    .pick({ title: true, date: true })
    .safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  try {
    const taken = new Set((await getStories()).map((story) => story.slug));
    const base = slugify(parsed.data.title);
    const candidates = [base, `${base}-${parsed.data.date}`];
    for (let n = 2; n < 50; n++)
      candidates.push(`${base}-${parsed.data.date}-${n}`);
    for (const slug of candidates) {
      if (!taken.has(slug) && !(await blobPostExists(slug))) {
        return { ok: true, slug };
      }
    }
    return { ok: false, error: "Please choose a slightly different title." };
  } catch (error) {
    console.error("[portal] startPost", error);
    return {
      ok: false,
      error: "We couldn't reach the photo store. Please try again in a minute.",
    };
  }
}

/** Step 2: upload one resized photo (n = 1 is the cover). */
export async function uploadPhoto(
  slug: string,
  index: number,
  formData: FormData,
): Promise<Result<{ url: string }>> {
  const blocked = await guard();
  if (blocked) return { ok: false, error: blocked };
  if (!slugSchema.safeParse(slug).success)
    return { ok: false, error: "Something went wrong. Please try again." };
  if (!Number.isInteger(index) || index < 1 || index > MAX_EXTRA_PHOTOS + 1) {
    return {
      ok: false,
      error: `You can add up to ${MAX_EXTRA_PHOTOS} extra photos.`,
    };
  }

  const file = formData.get("file");
  if (!(file instanceof Blob) || file.size === 0) {
    return {
      ok: false,
      error: "A photo didn't come through. Please choose it again.",
    };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Please choose photos only (JPEG or PNG)." };
  }
  if (file.size > 4 * 1024 * 1024) {
    return {
      ok: false,
      error: "One photo is too large. Please choose a smaller one.",
    };
  }

  try {
    const url = await putPostImage(slug, index, file);
    return { ok: true, url };
  } catch (error) {
    console.error("[portal] uploadPhoto", error);
    return {
      ok: false,
      error:
        "A photo failed to upload. Please check your connection and try again.",
    };
  }
}

/** Step 3: save the post; it goes live at once. */
export async function publishPost(input: {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
  gallery: string[];
}): Promise<Result<{ slug: string }>> {
  const blocked = await guard();
  if (blocked) return { ok: false, error: blocked };

  const fields = postFieldsSchema.safeParse(input);
  if (!fields.success) {
    return {
      ok: false,
      error: fields.error.issues[0]?.message ?? "Please check the form.",
    };
  }
  const slug = slugSchema.safeParse(input.slug);
  if (!slug.success)
    return { ok: false, error: "Something went wrong. Please try again." };

  // Only accept photos this post just uploaded to our own store.
  const ownPhoto = (value: string) => {
    try {
      const url = new URL(value);
      return (
        url.protocol === "https:" &&
        url.hostname.endsWith(".public.blob.vercel-storage.com") &&
        url.pathname.startsWith(`/posts/${slug.data}/`)
      );
    } catch {
      return false;
    }
  };
  const gallery = Array.isArray(input.gallery) ? input.gallery : [];
  if (
    !ownPhoto(input.image) ||
    gallery.length > MAX_EXTRA_PHOTOS ||
    !gallery.every(ownPhoto)
  ) {
    return {
      ok: false,
      error: "The photos didn't upload correctly. Please try again.",
    };
  }

  const { title, date, excerpt, body } = fields.data;
  try {
    if (await blobPostExists(slug.data)) {
      return {
        ok: false,
        error:
          "A story with this title was just published. Please change the title slightly.",
      };
    }
    await putPost({
      slug: slug.data,
      title,
      date,
      author: DEFAULT_AUTHOR,
      excerpt,
      body: normaliseBody(body),
      image: input.image,
      imageAlt: `Cover photo: ${title}`,
      gallery: gallery.map((src, index) => ({
        src,
        alt: `${title}: photo ${index + 2}`,
      })),
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[portal] publishPost", error);
    return {
      ok: false,
      error: "We couldn't save the story. Please try again in a minute.",
    };
  }

  refreshStories(slug.data);
  return { ok: true, slug: slug.data };
}

/** Clean up photos when a publish attempt fails part-way. */
export async function discardUploads(slug: string): Promise<void> {
  if (await guard()) return;
  if (!slugSchema.safeParse(slug).success) return;
  if (await blobPostExists(slug)) return; // never touch a published post here
  try {
    await deletePostImages(slug);
  } catch (error) {
    console.error("[portal] discardUploads", error);
  }
}

/* ---------- Delete ---------- */

export async function deletePost(slug: string): Promise<Result> {
  const blocked = await guard();
  if (blocked) return { ok: false, error: blocked };
  if (!slugSchema.safeParse(slug).success)
    return { ok: false, error: "Something went wrong. Please try again." };

  try {
    const removed = await deleteBlobPost(slug);
    if (removed === 0) {
      return {
        ok: false,
        error: "That story was already removed, or it isn't a portal post.",
      };
    }
  } catch (error) {
    console.error("[portal] deletePost", error);
    return {
      ok: false,
      error: "We couldn't delete the story. Please try again in a minute.",
    };
  }

  refreshStories(slug);
  return { ok: true };
}
