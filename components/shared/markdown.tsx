import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Token-styled markdown renderer for verbatim content (legal pages, story
 * bodies). Runs in a Server Component, so the parsed output is part of the
 * static prerender. GFM enables autolinking of bare URLs/emails and lists.
 */
const components: Components = {
  h1: ({ children }) => <h1 className="mt-2">{children}</h1>,
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl sm:text-3xl">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-sans text-lg font-semibold text-charcoal">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 leading-relaxed text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/90 marker:text-blue-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground/90 marker:text-blue-700">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-charcoal">{children}</strong>
  ),
  hr: () => <hr className="mt-8 border-border" />,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-blue-300 pl-4 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    const target = href ?? "#";
    if (target.startsWith("/")) {
      return (
        <Link
          href={target}
          className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
        >
          {children}
        </Link>
      );
    }
    const isExternal = target.startsWith("http");
    return (
      <a
        href={target}
        className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  },
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
