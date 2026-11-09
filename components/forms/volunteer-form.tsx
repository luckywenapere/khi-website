"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { submitVolunteer } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { programs } from "@/content/programs";
import { volunteerSchema, type VolunteerValues } from "@/lib/schemas";

import { Field } from "./field";
import { useSubmission } from "./use-submission";

export function VolunteerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interests: [],
      message: "",
      company: "",
    },
  });
  const { state, submit, statusRef } = useSubmission();

  function onSubmit(values: VolunteerValues) {
    void submit(() => submitVolunteer(values));
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
          Thank you for offering your time.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We will reach out about ways to get involved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <Field id="v-name" label="Name" required error={errors.name?.message}>
        <Input
          id="v-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "v-name-error" : undefined}
          {...register("name")}
        />
      </Field>

      <Field id="v-email" label="Email" required error={errors.email?.message}>
        <Input
          id="v-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "v-email-error" : undefined}
          {...register("email")}
        />
      </Field>

      <Field id="v-phone" label="Phone" required error={errors.phone?.message}>
        <Input
          id="v-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "v-phone-error" : undefined}
          {...register("phone")}
        />
      </Field>

      <fieldset
        aria-describedby={errors.interests ? "interests-error" : undefined}
      >
        <legend className="text-sm font-medium text-charcoal">
          Areas of interest{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {programs.map((program) => (
            <label
              key={program.slug}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <input
                type="checkbox"
                value={program.slug}
                className="size-4 accent-blue-600"
                {...register("interests")}
              />
              {program.title}
            </label>
          ))}
        </div>
        {errors.interests ? (
          <p
            id="interests-error"
            role="alert"
            className="mt-1 text-sm text-destructive"
          >
            {errors.interests.message}
          </p>
        ) : null}
      </fieldset>

      <Field
        id="v-message"
        label="Message"
        hint="Optional: tell us a little about yourself."
        error={errors.message?.message}
      >
        <Textarea
          id="v-message"
          rows={4}
          aria-describedby="v-message-hint"
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
        {state.status === "submitting" ? "Sending…" : "Become a volunteer"}
      </Button>
    </form>
  );
}
