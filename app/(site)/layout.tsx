import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileDonateBar } from "@/components/layout/mobile-donate-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { organizationJsonLd } from "@/lib/seo";

/**
 * Shared chrome for every marketing route: skip link, header, the main
 * landmark, footer, and the persistent mobile Donate bar. Organization
 * JSON-LD is emitted site-wide.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <a
        href="#main-content"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-md focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground focus-visible:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Skip to content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />

      <MobileDonateBar />
      {/* Spacer so the fixed mobile Donate bar never covers footer content. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}
