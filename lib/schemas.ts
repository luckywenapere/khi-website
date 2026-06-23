import { z } from "zod";

/**
 * Shared validation schemas for the Contact, Volunteer, and Newsletter forms.
 * Used by react-hook-form on the client and re-validated in the Server Action.
 * `company` is a honeypot — hidden from real users and expected to stay empty.
 */

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(2, "Please enter a subject."),
  message: z
    .string()
    .min(10, "Please enter a message (at least 10 characters)."),
  company: z.string().optional(),
});
export type ContactValues = z.infer<typeof contactSchema>;

export const volunteerSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  interests: z
    .array(z.string())
    .min(1, "Please choose at least one area of interest."),
  message: z.string().optional(),
  company: z.string().optional(),
});
export type VolunteerValues = z.infer<typeof volunteerSchema>;

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address."),
  company: z.string().optional(),
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;
