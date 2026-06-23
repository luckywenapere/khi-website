"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { submitNewsletter } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", company: "" },
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      statusRef.current?.focus();
    }
  }, [status]);

  async function onSubmit(values: NewsletterValues) {
    setStatus("submitting");
    const result = await submitNewsletter(values);
    if (result.status === "success") {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "success") {
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
              : status === "error"
                ? "newsletter-status"
                : undefined
          }
          {...register("email")}
        />
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-8 shrink-0 px-4"
        >
          {status === "submitting" ? "…" : "Subscribe"}
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
          Occasional updates. No spam — unsubscribe anytime.
        </p>
      )}
      {status === "error" ? (
        <p
          id="newsletter-status"
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="mt-2 text-xs text-destructive outline-none"
        >
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
