import { MapPin, Mail, Phone } from "lucide-react";

import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Kind Humanitarian Initiative in Garki 2, Abuja, by message, email, or phone.",
  path: "/contact",
});

const mapQuery = encodeURIComponent(site.contact.address.full);

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        variant="editorial"
        eyebrow="Contact"
        title="Contact KHI"
        intro="Have a question, an idea, or want to work together? Send us a message and we will get back to you."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="text-2xl">Reach us directly</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-blue-700"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">
                  {site.contact.address.full}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="mt-0.5 size-5 shrink-0 text-blue-700"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-muted-foreground hover:text-blue-700"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 size-5 shrink-0 text-blue-700"
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-1">
                  {site.contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      className="text-muted-foreground hover:text-blue-700"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <iframe
                title={`Map showing ${site.contact.address.full}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
            >
              Get directions
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
