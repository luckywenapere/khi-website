/**
 * The form submission state machine, shared by the server actions in
 * app/actions.ts and the client forms in components/forms.
 *
 *   idle ──submit──▶ submitting ──ok──────▶ success   (terminal)
 *                        │
 *                        └──fail/throw──▶ error ──submit──▶ submitting
 *
 * Each state carries only the data valid in it, so "an error message while
 * idle" or "success while still submitting" cannot be represented.
 */

/** What a server action returns. */
export type FormResult =
  | { status: "success" }
  | { status: "error"; message: string };

/** What a form renders from. */
export type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | FormResult;

export const GENERIC_FORM_ERROR =
  "Sorry, we couldn't send your message right now. Please email info@khinitiative.org directly.";

export const VALIDATION_FORM_ERROR = "Please check the form and try again.";
