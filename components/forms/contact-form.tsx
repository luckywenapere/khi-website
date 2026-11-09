"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { submitContact } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/schemas";

import { Field } from "./field";
import { useSubmission } from "./use-submission";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
    },
  });
  const { state, submit, statusRef } = useSubmission();

  function onSubmit(values: ContactValues) {
    void submit(() => submitContact(values));
  }

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-xl border border-border bg-accent p-6 outline-none"
      >
        <p className="font-sans text-lg font-semibold text-charcoal">
          Thank you. Your message has been sent.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We will be in touch as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <Field id="name" label="Name" required error={errors.name?.message}>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
      </Field>

      <Field id="email" label="Email" required error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </Field>

      <Field
        id="subject"
        label="Subject"
        required
        error={errors.subject?.message}
      >
        <Input
          id="subject"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          {...register("subject")}
        />
      </Field>

      <Field
        id="message"
        label="Message"
        required
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="assertive"
        className="outline-none"
      >
        {state.status === "error" ? (
          <p role="alert" className="text-sm text-destructive">
            {state.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={state.status === "submitting"}
        className="h-11 rounded-md px-6 text-base"
      >
        {state.status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
