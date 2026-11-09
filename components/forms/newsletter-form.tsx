"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { submitNewsletter } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";

import { useSubmission } from "./use-submission";

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", company: "" },
  });
  const { state, submit, statusRef } = useSubmission<HTMLParagraphElement>();

  function onSubmit(values: NewsletterValues) {
    void submit(() => submitNewsletter(values));
  }

  if (state.status === "success") {
    return (
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="text-sm text-charcoal outline-none"
      >
        Thank you for subscribing.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label
        htmlFor="newsletter-email"
        className="text-sm font-medium text-charcoal"
      >
        Stay in the loop
      </label>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />
      <div className="mt-2 flex gap-2">
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email
              ? "newsletter-error"
              : state.status === "error"
                ? "newsletter-status"
                : undefined
          }
          {...register("email")}
        />
        <Button
          type="submit"
          disabled={state.status === "submitting"}
          className="h-8 shrink-0 px-4"
        >
          {state.status === "submitting" ? "…" : "Subscribe"}
        </Button>
      </div>
      {errors.email ? (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-xs text-destructive"
        >
          {errors.email.message}
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          Occasional updates. No spam, unsubscribe anytime.
        </p>
      )}
      {state.status === "error" ? (
        <p
          id="newsletter-status"
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="mt-2 text-xs text-destructive outline-none"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
