import { Container } from "@/components/layout/container";
import { PlaceholderImage } from "@/components/shared/placeholder-image";
import { donateHero } from "@/content/donate";

/**
 * Donate hero (v2): the old site's solid blue band with white serif display
 * type and the photo overlapping out of the band bottom. Holds the page h1.
 * Solid blue-600 band (white text 6.45:1) — no scrim needed; h1 renders
 * server-side with no animation; the photo is the route's priority image.
 */
export function DonateHero() {
  return (
    <section className="on-dark bg-blue-600">
      <Container>
        <div className="mx-auto max-w-3xl pt-16 pb-8 text-center md:pt-24">
          <h1 className="text-display-xl text-white">{donateHero.headline}</h1>
          <p className="text-body-lg mx-auto mt-5 max-w-2xl text-white/90">
            {donateHero.subhead}
          </p>
        </div>
        {/* Photo card overlapping out of the blue band (negative margin, CLS 0) */}
        <PlaceholderImage
          alt={donateHero.imageAlt}
          src={donateHero.image}
          priority
          showLabel={false}
          className="relative z-10 mx-auto -mb-24 aspect-[16/9] w-full max-w-3xl shadow-lg md:-mb-32"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </Container>
    </section>
  );
}
