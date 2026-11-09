"use server";

import { deliver } from "@/lib/email";
import {
  GENERIC_FORM_ERROR as GENERIC_ERROR,
  VALIDATION_FORM_ERROR as VALIDATION_ERROR,
  type FormResult,
} from "@/lib/form-submission";
import {
  contactSchema,
  newsletterSchema,
  volunteerSchema,
} from "@/lib/schemas";

export async function submitContact(raw: unknown): Promise<FormResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: VALIDATION_ERROR };

  const values = parsed.data;
  // Honeypot tripped — drop silently without tipping off the bot.
  if (values.company) return { status: "success" };

  const ok = await deliver({
    subject: `Contact form: ${values.subject}`,
    replyTo: values.email,
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Subject: ${values.subject}`,
      "",
      values.message,
    ].join("\n"),
  });

  return ok
    ? { status: "success" }
    : { status: "error", message: GENERIC_ERROR };
}

export async function submitVolunteer(raw: unknown): Promise<FormResult> {
  const parsed = volunteerSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: VALIDATION_ERROR };

  const values = parsed.data;
  if (values.company) return { status: "success" };

  const ok = await deliver({
    subject: "New volunteer application",
    replyTo: values.email,
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Areas of interest: ${values.interests.join(", ")}`,
      "",
      values.message ?? "(no message)",
    ].join("\n"),
  });

  return ok
    ? { status: "success" }
    : { status: "error", message: GENERIC_ERROR };
}

export async function submitNewsletter(raw: unknown): Promise<FormResult> {
  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: VALIDATION_ERROR };

  const values = parsed.data;
  if (values.company) return { status: "success" };

  const ok = await deliver({
    subject: "Newsletter signup",
    replyTo: values.email,
    text: `New newsletter signup: ${values.email}`,
  });

  return ok
    ? { status: "success" }
    : { status: "error", message: GENERIC_ERROR };
}
