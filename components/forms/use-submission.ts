"use client";

import { useEffect, useRef, useState } from "react";

import {
  GENERIC_FORM_ERROR,
  type FormResult,
  type SubmissionState,
} from "@/lib/form-submission";

/**
 * Drives one form through the submission state machine in
 * lib/form-submission.ts.
 *
 * - `submit(action)` ignores calls while a submission is in flight.
 * - An action that throws (network drop, stale deploy) lands in `error` with
 *   the generic message, so the form never stays stuck on "Sending…".
 * - `statusRef` receives focus once the result is shown, for screen readers.
 */
export function useSubmission<T extends HTMLElement = HTMLDivElement>() {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const inFlight = useRef(false);
  const statusRef = useRef<T>(null);

  useEffect(() => {
    if (state.status === "success" || state.status === "error") {
      statusRef.current?.focus();
    }
  }, [state]);

  async function submit(action: () => Promise<FormResult>) {
    if (inFlight.current) return;
    inFlight.current = true;
    setState({ status: "submitting" });
    try {
      setState(await action());
    } catch {
      setState({ status: "error", message: GENERIC_FORM_ERROR });
    } finally {
      inFlight.current = false;
    }
  }

  return { state, submit, statusRef };
}
