import type { Metadata } from "next";

import { site } from "@/content/site";

/** Absolute base URL for the site (placeholder domain until confirmed). */
export const siteUrl = site.url;

type CreateMetadataInput = {
  /** Page title — slots into the root layout's title template ("%s · KHI"). */
  title?: string;
  description?: string;
  /** Route path beginning with "/", used for canonical + OG url. */
  path?: string;
  /** Share image (absolute URL or site path); defaults to the route's OG image. */
  image?: string;
  /** Keep the page out of search engines (e.g. the private portal). */
  noIndex?: boolean;
};

/**
 * Per-route metadata builder. Keeps title/description/canonical/OG/Twitter
 * consistent across every page. The root layout owns `metadataBase` and the
 * title template; this fills in the per-page pieces.
 */
export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: CreateMetadataInput = {}): Metadata {
  const url = new URL(path, siteUrl).toString();
  const resolvedDescription = description ?? site.description;
  const ogTitle = title ? `${title} · ${site.shortName}` : site.name;

  const metadata: Metadata = {
    description: resolvedDescription,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: resolvedDescription,
      url,
      siteName: site.name,
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: resolvedDescription,
    },
  };

  // Only set `title` when provided — an explicit `undefined` would suppress the
  // root layout's title.default (which is what the homepage relies on).
  if (title) metadata.title = title;

  if (image) {
    metadata.openGraph = { ...metadata.openGraph, images: [{ url: image }] };
    metadata.twitter = { ...metadata.twitter, images: [image] };
  }

  if (noIndex) metadata.robots = { index: false, follow: false };

  return metadata;
}

/** A plain JSON-LD object (serialised into a <script> by the JsonLd component). */
export type JsonLdObject = Record<string, unknown>;

/**
 * Organization (NGO) structured data for the site. Registration number and
 * social handles are placeholders; they are omitted from output until real.
 */
export function organizationJsonLd(): JsonLdObject {
  const sameAs = site.socials
    .map((social) => social.href)
    .filter((href) => href !== "#");

  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: new URL("/khi-logo.png", site.url).toString(),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      addressCountry: site.contact.address.country,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** BreadcrumbList structured data for deep pages. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

/** Article structured data for story/news pages. */
export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "NGO",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: new URL("/khi-logo.png", siteUrl).toString(),
      },
    },
    mainEntityOfPage: new URL(article.path, siteUrl).toString(),
  };
}
