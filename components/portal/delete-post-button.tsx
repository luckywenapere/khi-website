"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { deletePost } from "@/app/(site)/portal/actions";
import { Button } from "@/components/ui/button";

export function DeletePostButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  function onDelete() {
    if (
      !window.confirm(
        `Delete "${title}"?\n\nThe story and its photos will be removed from the website. This can't be undone.`,
      )
    ) {
      return;
    }
    setError("");
    startTransition(async () => {
      const result = await deletePost(slug);
      if (result.ok) router.refresh();
      else setError(result.error);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant="destructive"
        onClick={onDelete}
        disabled={pending}
        className="h-10 px-3"
      >
        <Trash2 aria-hidden="true" />
        {pending ? "Deleting…" : "Delete"}
        <span className="sr-only"> {title}</span>
      </Button>
      {error ? (
        <p role="alert" className="text-right text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
