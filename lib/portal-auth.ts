/**
 * Password gate for the /portal (server only).
 *
 * The session cookie is `<expiry-ms>.<hmac>` where the HMAC (SHA-256) is keyed
 * with PORTAL_PASSWORD, so changing the password signs everyone out.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import { blobConfigured } from "@/lib/blob-posts";

export const PORTAL_COOKIE = "khi_portal";
const SESSION_MS = 30 * 24 * 60 * 60 * 1000;

function password(): string {
  return process.env.PORTAL_PASSWORD ?? "";
}

/** Both the password and a Blob store must be set up. */
export function portalConfigured(): boolean {
  return password().length > 0 && blobConfigured();
}

function sign(payload: string): string {
  return createHmac("sha256", password())
    .update(`khi-portal:${payload}`)
    .digest("hex");
}

/** Constant-time string compare (hashes first so lengths always match). */
function safeEqual(a: string, b: string): boolean {
  const ha = createHmac("sha256", "khi-compare").update(a).digest();
  const hb = createHmac("sha256", "khi-compare").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(candidate: string): boolean {
  if (!password()) return false;
  return safeEqual(candidate, password());
}

export async function startSession(): Promise<void> {
  const expires = Date.now() + SESSION_MS;
  const store = await cookies();
  store.set(PORTAL_COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(PORTAL_COOKIE);
}

/** True when the request carries a valid, unexpired portal cookie. */
export async function isSignedIn(): Promise<boolean> {
  if (!portalConfigured()) return false;
  const store = await cookies();
  const value = store.get(PORTAL_COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}
