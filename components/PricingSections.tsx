"use client";

import { useState } from "react";
import { packages, pickerOptions, site, type PricingPackage } from "@/data/pricing";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.58 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.3.7l2.5 2.5a1 1 0 001.4-1.4L11 9.6V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PackageCard({
  pkg,
  highlighted,
}: {
  pkg: PricingPackage;
  highlighted: boolean;
}) {
  const ring = highlighted
    ? "ring-4 ring-accent shadow-lift"
    : pkg.badge
      ? "ring-2 ring-brand shadow-lift"
      : "ring-1 ring-black/5 shadow-soft";

  return (
    <article
      id={`package-${pkg.id}`}
      className={`flex h-full scroll-mt-6 flex-col rounded-3xl bg-white p-6 transition-shadow duration-300 ${ring}`}
    >
      {/* Reserved row so card contents line up whether or not a tag shows */}
      <div className="mb-3 flex min-h-7 flex-wrap items-center gap-2">
        {pkg.badge && (
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {pkg.badge}
          </span>
        )}
        {highlighted && (
          <span className="rounded-full bg-tint-strong px-3 py-1 text-xs font-bold text-brand">
            {site.picker.recommendedTag}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-ink">{pkg.name}</h3>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-brand">
        {pkg.priceLabel}
      </p>

      <p className="mt-4 text-sm leading-snug text-muted">
        <span className="font-bold text-ink">{site.packages.bestForLabel}: </span>
        {pkg.bestFor}
      </p>
      <p className="mt-3 text-base leading-relaxed text-ink">{pkg.description}</p>

      <ul className="mt-5 flex-1 space-y-2.5 border-t border-black/5 pt-5">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm leading-snug text-ink">
            <CheckIcon />
            <span className={feature.startsWith("Everything in") ? "font-bold" : ""}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
        <ClockIcon />
        <span className="text-muted">{site.packages.deliveryLabel}:</span> {pkg.delivery}
      </p>

      <WhatsAppButton message={pkg.whatsappMessage} className="mt-5 w-full">
        {pkg.ctaText}
      </WhatsAppButton>
    </article>
  );
}

export function PricingSections() {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const selected = pickerOptions.find((o) => o.id === selectedOptionId) ?? null;
  const selectedPackage = selected
    ? packages.find((p) => p.id === selected.packageId)
    : undefined;

  function choose(optionId: string) {
    const option = pickerOptions.find((o) => o.id === optionId);
    if (!option) return;
    setSelectedOptionId(optionId);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`package-${option.packageId}`)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <>
      {/* 2. Quick picker */}
      <section id="picker" className="bg-white py-14 sm:py-16">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {site.picker.heading}
            </h2>
            <p className="mt-3 text-lg text-muted">{site.picker.subheading}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3" role="group" aria-label={site.picker.heading}>
              {pickerOptions.map((option) => {
                const active = option.id === selectedOptionId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => choose(option.id)}
                    aria-pressed={active}
                    className={`min-h-12 rounded-full border-2 px-5 py-2.5 text-base font-semibold transition-colors ${
                      active
                        ? "border-brand bg-brand text-white"
                        : "border-tint-strong bg-tint text-brand hover:border-accent"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-5 min-h-12 text-base text-ink" aria-live="polite">
              {selected && selectedPackage && (
                <>
                  <span className="font-bold text-brand">{site.picker.resultPrefix} </span>
                  <span className="font-bold">{selectedPackage.name}</span>
                  {" – "}
                  {selected.reason}
                </>
              )}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 3. Packages */}
      <section id="pricing" className="scroll-mt-4 py-16 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {site.packages.heading}
            </h2>
            <p className="mt-3 text-lg text-muted">{site.packages.subheading}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} className="h-full" delay={(i % 2) * 0.08}>
                <PackageCard pkg={pkg} highlighted={selectedPackage?.id === pkg.id} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
