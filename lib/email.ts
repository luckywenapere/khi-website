/**
 * Provider-agnostic email delivery. Resend by default (via fetch — no SDK
 * dependency). Switching providers (e.g. Formspree) is a one-function change
 * here; callers only see a boolean result.
 *
 * Delivery is INACTIVE until RESEND_API_KEY is set — `deliver` returns false so
 * forms show a friendly error rather than a fake success.
 *
 * [KHI] Set RESEND_API_KEY and a verified `from` sender (EMAIL_FROM), or swap
 * this function for Formspree/another provider.
 */

const RECIPIENT = "info@khinitiative.org";
const DEFAULT_FROM = "KHI Website <noreply@khinitiative.org>";

export type DeliverPayload = {
  subject: string;
  text: string;
  /** Reply-To, so KHI can respond directly to the sender. */
  replyTo?: string;
};

export async function deliver(payload: DeliverPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? DEFAULT_FROM,
        to: [RECIPIENT],
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
