"use client";

/**
 * Always the visitor's current year. A server-rendered year is baked in at
 * build time and only changes on redeploy; this hydrates to the real year on
 * the client (suppressHydrationWarning covers the year-boundary mismatch).
 */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
