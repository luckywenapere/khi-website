import Link from "next/link";
import { LogOut } from "lucide-react";

import { Section } from "@/components/layout/section";
import { DeletePostButton } from "@/components/portal/delete-post-button";
import { LoginForm } from "@/components/portal/login-form";
import { PostForm } from "@/components/portal/post-form";
import { Button } from "@/components/ui/button";
import { isSignedIn, portalConfigured } from "@/lib/portal-auth";
import { createMetadata } from "@/lib/seo";
import { getStories } from "@/lib/stories";
import { formatDate } from "@/lib/utils";

import { logout } from "./actions";

export const metadata = createMetadata({
  title: "Stories portal",
  description: "Private page for KHI staff to publish stories.",
  path: "/portal",
  noIndex: true,
});

/** Always per-request: depends on the sign-in cookie. */
export const dynamic = "force-dynamic";

function todayInAbuja(): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default async function PortalPage() {
  if (!portalConfigured()) {
    return (
      <Section container="prose">
        <p className="text-overline text-blue-700">Stories portal</p>
        <h1 className="mt-3">Portal not configured</h1>
        <p className="text-body-lg mt-6 text-muted-foreground">
          The stories portal isn&rsquo;t switched on yet. Please contact the web
          team.
        </p>
      </Section>
    );
  }

  if (!(await isSignedIn())) {
    return (
      <Section container="prose">
        <div className="mx-auto max-w-sm">
          <p className="text-overline text-blue-700">Stories portal</p>
          <h1 className="mt-3 text-4xl">Sign in</h1>
          <p className="mt-4 text-muted-foreground">
            Enter the portal password to post a story to the website.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </Section>
    );
  }

  const stories = await getStories();

  return (
    <Section container="prose">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-overline text-blue-700">Stories portal</p>
          <h1 className="mt-3 text-4xl">Post a story</h1>
        </div>
        <form action={logout}>
          <Button type="submit" variant="outline" className="h-10 px-3">
            <LogOut aria-hidden="true" />
            Sign out
          </Button>
        </form>
      </div>
      <p className="mt-4 text-muted-foreground">
        Fill in the form and tap <strong>Publish story</strong>. Photos are
        shrunk on your phone before they upload, so any size is fine.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
        <PostForm today={todayInAbuja()} />
      </div>

      <h2 className="mt-14 text-2xl">Published stories</h2>
      {stories.length === 0 ? (
        <p className="mt-3 text-muted-foreground">No stories yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
          {stories.map((story) => (
            <li
              key={story.slug}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <Link
                  href={`/stories/${story.slug}`}
                  className="font-medium text-foreground hover:text-blue-700 hover:underline"
                >
                  {story.title}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <time dateTime={story.date}>{formatDate(story.date)}</time>
                </p>
              </div>
              {story.source === "portal" ? (
                <DeletePostButton slug={story.slug} title={story.title} />
              ) : (
                <span className="text-xs text-muted-foreground">
                  Managed in code
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
