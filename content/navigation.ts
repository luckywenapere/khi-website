import { programs } from "@/content/programs";

/**
 * Navigation model for the Header and Footer. Header/Footer components read
 * from this data rather than hardcoding JSX, so the IA lives in one place.
 */

export type NavLink = {
  label: string;
  href: string;
  /** Optional muted helper text, used in dropdown menus */
  description?: string;
};

export type NavItem = NavLink & {
  /** When present, the item renders as a dropdown (desktop) / accordion (mobile) */
  children?: NavLink[];
};

/** Primary header navigation. Donate is intentionally NOT here — it is a
 *  persistent button, not a nav tab (see IA §3.2f). */
export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "What We Do",
    href: "/programs",
    children: [
      ...programs.map((program) => ({
        label: program.title,
        href: `/programs/${program.slug}`,
        description: program.summary,
      })),
      { label: "All programs", href: "/programs" },
    ],
  },
  { label: "Impact", href: "/impact" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Partner with us", href: "/get-involved/partner" },
    ],
  },
  { label: "Stories", href: "/stories" },
  { label: "Contact", href: "/contact" },
];

/** The persistent primary action present on every page. */
export const donateLink: NavLink = { label: "Donate", href: "/donate" };

/** Footer link groups — replaces the old arbitrary "Quick Links / Navigate" split. */
export type FooterGroup = {
  title: string;
  links: NavLink[];
};

export const footerNav: FooterGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "What We Do", href: "/programs" },
      { label: "Impact", href: "/impact" },
      { label: "Stories", href: "/stories" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Partner with us", href: "/get-involved/partner" },
      { label: "Donate", href: "/donate" },
    ],
  },
  {
    title: "Trust & legal",
    links: [
      { label: "Transparency", href: "/about/transparency" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];
