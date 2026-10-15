import type { MetadataRoute } from "next";

import { programs } from "@/content/programs";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/seo";
import { getStories } from "@/lib/stories";

/** Re-generated hourly so portal posts are listed without a redeploy. */
export const revalidate = 3600;

/** Routable static pages (dynamic [slug] routes are added from content). */
const staticPaths = [
  "/",
  "/about",
  "/programs",
  "/impact",
  "/get-involved",
  "/get-involved/volunteer",
  "/get-involved/partner",
  "/stories",
  "/contact",
  "/donate",
  "/privacy",
  "/terms",
  "/cookies",
  "/disclaimer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getStories();
  const lastModified = new Date();

  const staticEntries = staticPaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const programEntries = programs.map((program) => ({
    url: new URL(`/programs/${program.slug}`, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projectEntries = projects.map((project) => ({
    url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const storyEntries = stories.map((story) => ({
    url: new URL(`/stories/${story.slug}`, siteUrl).toString(),
    lastModified: new Date(`${story.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...programEntries,
    ...projectEntries,
    ...storyEntries,
  ];
}
