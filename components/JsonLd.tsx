import { contact, formatNaira, packages, site } from "@/data/pricing";

/** LocalBusiness + Offer schema, built from pricing.ts so it never drifts from the page. */
export function JsonLd() {
  const prices = packages.flatMap((p) => (p.price === null ? [] : [p.price]));
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const highestIsFrom = packages.some((p) => p.isFromPrice && p.price === highest);

  const phone = /^\d{10,15}$/.test(contact.whatsappNumber)
    ? `+${contact.whatsappNumber}`
    : undefined;
  const sameAs = [contact.instagram, contact.facebook].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${site.url}/#business`,
    name: site.brand,
    url: site.url,
    image: `${site.url}${site.seo.ogImage}`,
    description: site.seo.description,
    email: contact.email || undefined,
    telephone: phone,
    priceRange: `${formatNaira(lowest)}–${formatNaira(highest)}${highestIsFrom ? "+" : ""}`,
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: { "@type": "Country", name: "Nigeria" },
    sameAs: sameAs.length ? sameAs : undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website design packages",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.description,
        url: `${site.url}/#package-${p.id}`,
        priceCurrency: "NGN",
        ...(p.price !== null && !p.isFromPrice ? { price: p.price } : {}),
        ...(p.price !== null && p.isFromPrice
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "NGN",
                minPrice: p.price,
              },
            }
          : {}),
        itemOffered: { "@type": "Service", name: p.name, description: p.bestFor },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so no text in the data can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
