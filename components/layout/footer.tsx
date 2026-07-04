import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CurrentYear } from "@/components/shared/current-year";
import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
import { Separator } from "@/components/ui/separator";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";

import { Container } from "./container";

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/** Site footer: brand, link groups, contact, newsletter stub, legal line (§4.2). */
export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-12 lg:py-20">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {site.mission}
            </p>
            <SocialLinks className="mt-5" />
          </div>

          {/* Link groups */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-5"
          >
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-overline text-charcoal">{group.title}</h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-blue-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact + newsletter */}
          <div className="md:col-span-3">
            <h2 className="text-overline text-charcoal">Contact</h2>
            <address className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground not-italic">
              <span>{site.contact.address.full}</span>
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-blue-700"
              >
                {site.contact.email}
              </a>
              {site.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="transition-colors hover:text-blue-700"
                >
                  {phone}
                </a>
              ))}
            </address>

            {/* Newsletter — posts to the provider-agnostic Server Action. */}
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6 text-xs text-muted-foreground">
          <p>
            © <CurrentYear /> {site.name}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
