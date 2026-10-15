"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/app/(site)/portal/actions";
import { Field } from "@/components/forms/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={action} className="space-y-5">
      <Field id="portal-password" label="Password" error={state.error}>
        <Input
          id="portal-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "portal-password-error" : undefined}
          className="h-11 text-base"
        />
      </Field>
      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-md px-6 text-base"
      >
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
