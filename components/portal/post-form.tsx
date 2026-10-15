"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ImagePlus, X } from "lucide-react";

import {
  discardUploads,
  publishPost,
  startPost,
  uploadPhoto,
} from "@/app/(site)/portal/actions";
import { Field } from "@/components/forms/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_EXTRA_PHOTOS,
  postFieldsSchema,
  type PostFields,
} from "@/lib/portal-schema";

import { resizeImage } from "./resize-image";

type Errors = Partial<Record<keyof PostFields | "cover" | "extras", string>>;

type Phase =
  | { kind: "editing" }
  | { kind: "working"; message: string }
  | { kind: "done"; slug: string; title: string };

/** Local preview of a not-yet-uploaded photo. */
function Preview({
  file,
  alt,
  className,
}: {
  file: File;
  alt: string;
  className: string;
}) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  // eslint-disable-next-line @next/next/no-img-element -- blob: preview URL
  return <img src={url} alt={alt} className={className} />;
}

export function PostForm({ today }: { today: string }) {
  const router = useRouter();
  const [fields, setFields] = useState<PostFields>({
    title: "",
    date: today,
    excerpt: "",
    body: "",
  });
  const [cover, setCover] = useState<File[]>([]);
  const [extras, setExtras] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [phase, setPhase] = useState<Phase>({ kind: "editing" });
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase.kind !== "editing" || formError) statusRef.current?.focus();
  }, [phase.kind, formError]);

  const update =
    (key: keyof PostFields) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((current) => ({ ...current, [key]: event.target.value }));
      setErrors((current) => ({ ...current, [key]: undefined }));
    };

  function addExtras(list: FileList | null) {
    if (!list) return;
    const picked = Array.from(list).filter((file) =>
      file.type.startsWith("image/"),
    );
    const merged = [...extras, ...picked];
    setExtras(merged.slice(0, MAX_EXTRA_PHOTOS));
    setErrors((current) => ({
      ...current,
      extras:
        merged.length > MAX_EXTRA_PHOTOS
          ? `You can add up to ${MAX_EXTRA_PHOTOS} extra photos. We kept the first ${MAX_EXTRA_PHOTOS}.`
          : undefined,
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const parsed = postFieldsSchema.safeParse(fields);
    const nextErrors: Errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof PostFields;
        nextErrors[key] ??= issue.message;
      }
    }
    if (cover.length === 0) nextErrors.cover = "Please add a cover photo.";
    setErrors(nextErrors);
    if (!parsed.success || cover.length === 0) {
      setFormError("Please fix the highlighted fields.");
      return;
    }

    const photos = [cover[0], ...extras];
    let slug = "";
    try {
      setPhase({ kind: "working", message: "Getting ready…" });
      const started = await startPost({
        title: parsed.data.title,
        date: parsed.data.date,
      });
      if (!started.ok) throw new Error(started.error);
      slug = started.slug;

      const urls: string[] = [];
      for (const [position, file] of photos.entries()) {
        setPhase({
          kind: "working",
          message: `Uploading photo ${position + 1} of ${photos.length}…`,
        });
        const resized = await resizeImage(file);
        const body = new FormData();
        body.append("file", resized, `${position + 1}.jpg`);
        const uploaded = await uploadPhoto(slug, position + 1, body);
        if (!uploaded.ok) throw new Error(uploaded.error);
        urls.push(uploaded.url);
      }

      setPhase({ kind: "working", message: "Publishing your story…" });
      const published = await publishPost({
        ...parsed.data,
        slug,
        image: urls[0],
        gallery: urls.slice(1),
      });
      if (!published.ok) throw new Error(published.error);

      setPhase({
        kind: "done",
        slug: published.slug,
        title: parsed.data.title,
      });
      router.refresh();
    } catch (error) {
      if (slug) void discardUploads(slug);
      setPhase({ kind: "editing" });
      setFormError(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please check your connection and try again.",
      );
    }
  }

  function reset() {
    setFields({ title: "", date: today, excerpt: "", body: "" });
    setCover([]);
    setExtras([]);
    setErrors({});
    setFormError("");
    setPhase({ kind: "editing" });
  }

  if (phase.kind === "done") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-border bg-accent/60 p-6 outline-none"
      >
        <CheckCircle2 className="size-8 text-blue-700" aria-hidden="true" />
        <h3 className="mt-3 font-sans text-xl font-semibold">Published!</h3>
        <p className="mt-2 text-muted-foreground">
          &ldquo;{phase.title}&rdquo; will appear on the site in about 2–3
          minutes.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/stories/${phase.slug}`}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground hover:bg-primary/80"
          >
            View the story
          </Link>
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            className="h-11 rounded-md px-6 text-base"
          >
            Write another
          </Button>
        </div>
      </div>
    );
  }

  const working = phase.kind === "working";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset disabled={working} className="space-y-6">
        <Field id="post-title" label="Title" required error={errors.title}>
          <Input
            id="post-title"
            value={fields.title}
            onChange={update("title")}
            maxLength={140}
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={errors.title ? "post-title-error" : undefined}
            className="h-11 text-base"
          />
        </Field>

        <Field id="post-date" label="Date" required error={errors.date}>
          <Input
            id="post-date"
            type="date"
            value={fields.date}
            onChange={update("date")}
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={errors.date ? "post-date-error" : undefined}
            className="h-11 text-base"
          />
        </Field>

        <Field
          id="post-excerpt"
          label="Short summary"
          required
          hint="One or two lines. Shown on the story cards."
          error={errors.excerpt}
        >
          <Textarea
            id="post-excerpt"
            rows={2}
            value={fields.excerpt}
            onChange={update("excerpt")}
            maxLength={300}
            aria-invalid={errors.excerpt ? true : undefined}
            aria-describedby={
              errors.excerpt
                ? "post-excerpt-hint post-excerpt-error"
                : "post-excerpt-hint"
            }
            className="text-base"
          />
        </Field>

        <Field
          id="post-body"
          label="Story"
          required
          hint="Write in plain paragraphs. Optional: **bold**, and lines starting with - for a list."
          error={errors.body}
        >
          <Textarea
            id="post-body"
            rows={12}
            value={fields.body}
            onChange={update("body")}
            aria-invalid={errors.body ? true : undefined}
            aria-describedby={
              errors.body ? "post-body-hint post-body-error" : "post-body-hint"
            }
            className="min-h-64 text-base"
          />
        </Field>

        <Field
          id="post-cover"
          label="Cover photo"
          required
          hint="The main photo at the top of the story."
          error={errors.cover}
        >
          {cover[0] ? (
            <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-border">
              <Preview
                file={cover[0]}
                alt="Selected cover photo preview"
                className="aspect-[16/10] w-full object-cover"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => setCover([])}
                className="absolute top-2 right-2"
                aria-label="Remove cover photo"
              >
                <X aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor="post-cover"
              className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-input text-sm text-muted-foreground hover:bg-muted"
            >
              <ImagePlus className="size-6" aria-hidden="true" />
              Choose cover photo
            </label>
          )}
          <input
            id="post-cover"
            type="file"
            accept="image/*"
            className="sr-only"
            aria-describedby={
              errors.cover
                ? "post-cover-hint post-cover-error"
                : "post-cover-hint"
            }
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setCover([file]);
                setErrors((e) => ({ ...e, cover: undefined }));
              }
              event.target.value = "";
            }}
          />
        </Field>

        <Field
          id="post-extras"
          label={`Extra photos (optional, up to ${MAX_EXTRA_PHOTOS})`}
          hint="Shown in a gallery below the story."
          error={errors.extras}
        >
          {extras.length > 0 ? (
            <ul className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {extras.map((file, index) => (
                <li
                  key={`${file.name}-${file.lastModified}-${file.size}-${index}`}
                  className="relative overflow-hidden rounded-lg border border-border"
                >
                  <Preview
                    file={file}
                    alt={`Extra photo ${index + 1} preview`}
                    className="aspect-square w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    onClick={() =>
                      setExtras((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                    className="absolute top-1 right-1"
                    aria-label={`Remove extra photo ${index + 1}`}
                  >
                    <X aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : null}
          {extras.length < MAX_EXTRA_PHOTOS ? (
            <label
              htmlFor="post-extras"
              className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input text-sm text-muted-foreground hover:bg-muted"
            >
              <ImagePlus className="size-5" aria-hidden="true" />
              Add photos
            </label>
          ) : null}
          <input
            id="post-extras"
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            aria-describedby="post-extras-hint"
            onChange={(event) => {
              addExtras(event.target.files);
              event.target.value = "";
            }}
          />
        </Field>
      </fieldset>

      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="outline-none"
      >
        {working ? (
          <p className="text-sm font-medium text-blue-700">{phase.message}</p>
        ) : formError ? (
          <p role="alert" className="text-sm text-destructive">
            {formError}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={working}
        className="h-12 w-full rounded-md px-6 text-base sm:w-auto"
      >
        {working ? "Publishing…" : "Publish story"}
      </Button>
    </form>
  );
}
