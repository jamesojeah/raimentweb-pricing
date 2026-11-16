import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/data/pricing";
import { Container } from "./Container";
import { WhatsAppButton } from "./WhatsAppButton";

/** Checked at build time, so a missing photo never breaks the build. */
function photoExists(): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", site.hero.photo.replace(/^\//, "")),
    );
  } catch {
    return false;
  }
}

function PhotoPlaceholder() {
  return (
    <div
      className="flex h-full w-full items-end justify-center bg-tint-strong"
      role="img"
      aria-label={site.hero.photoAlt}
    >
      <svg viewBox="0 0 100 100" className="h-4/5 w-4/5 text-accent/60" fill="currentColor" aria-hidden="true">
        <circle cx="50" cy="34" r="18" />
        <path d="M14 100c0-22 16-38 36-38s36 16 36 38z" />
      </svg>
    </div>
  );
}

export function Hero() {
  const { hero } = site;
  const hasPhoto = photoExists();

  return (
    <section className="overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Photo: first on mobile, right on desktop */}
        <div className="order-first lg:order-last">
          <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[420px]">
            {/* soft purple glow (a gradient, not a blur filter, so it is cheap on phones) */}
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgb(139_92_246/0.35),transparent)]"
            />
            {/* offset arch behind the photo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full rounded-b-[2rem] bg-gradient-to-br from-accent to-brand sm:translate-x-4 sm:translate-y-4"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-white shadow-lift ring-4 ring-white">
              {hasPhoto ? (
                <Image
                  src={hero.photo}
                  alt={hero.photoAlt}
                  fill
                  priority
                  quality={75}
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 320px, 240px"
                  className="object-cover object-top"
                />
              ) : (
                <PhotoPlaceholder />
              )}
            </div>
            <div className="absolute -bottom-3 left-0 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold shadow-lift ring-1 ring-black/5 sm:-left-8 sm:bottom-10">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-wa opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-wa" />
              </span>
              {hero.badge}
            </div>
          </div>
        </div>

        {/* Words */}
        <div className="text-center lg:text-left">
          <p className="inline-block rounded-full bg-tint-strong px-4 py-1.5 text-sm font-semibold text-brand">
            {hero.tag}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
            {hero.subtext}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-base font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
            >
              {hero.primaryCta}
            </a>
            <WhatsAppButton message={hero.whatsappMessage}>
              {hero.whatsappCta}
            </WhatsAppButton>
          </div>
          <p className="mt-6 text-sm text-muted">
            {hero.trustLabel}{" "}
            <a
              href={hero.trustLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:decoration-brand"
            >
              {hero.trustLinkText}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
