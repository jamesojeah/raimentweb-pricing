/**
 * ALL CONTENT FOR THE SITE LIVES IN THIS FILE.
 *
 * Change a price, a feature, a phone number or a sentence here and the whole
 * page updates. Nothing is hard-coded in the components.
 *
 * Prices: edit the numbers in PRICES below. Every label ("₦180,000",
 * "From ₦600,000", "₦50,000/month") is built from those numbers, and the
 * page title, SEO description and Google schema use them too.
 */

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type PackageId = "starter" | "business" | "store" | "custom";

export interface PricingPackage {
  id: PackageId;
  name: string;
  /** Number in Naira. For "From" prices this is the starting price. */
  price: number | null;
  /** Ready-to-show price text, built from `price`. */
  priceLabel: string;
  /** True when the price is a starting price ("From ₦600,000"). */
  isFromPrice: boolean;
  /** Small ribbon on the card, e.g. "Most Popular". Empty string = none. */
  badge: string;
  bestFor: string;
  description: string;
  features: string[];
  delivery: string;
  ctaText: string;
  /** Text that is pre-filled when the visitor taps the WhatsApp button. */
  whatsappMessage: string;
}

/** A cell in the comparison table: true = tick, false = dash, string = text. */
export type CellValue = boolean | string;

export interface ComparisonRow {
  label: string;
  values: Record<PackageId, CellValue>;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  /** What the price covers, e.g. "month", "year". Empty = one-off. */
  per: string;
  /** Built from price + per. */
  priceLabel: string;
  /** Small extra line under the price, e.g. "+ ad budget". */
  note: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface PickerOption {
  id: string;
  label: string;
  /** The package this option recommends. */
  packageId: PackageId;
  /** One short line shown under the chips after tapping. */
  reason: string;
}

export interface Step {
  title: string;
  text: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers (used only to build the labels in this file)                      */
/* -------------------------------------------------------------------------- */

/** 180000 -> "₦180,000" (same output on server and browser). */
export function formatNaira(amount: number): string {
  return "₦" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Builds the wa.me link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* -------------------------------------------------------------------------- */
/*  Prices (in Naira). Change the numbers here.                               */
/* -------------------------------------------------------------------------- */

const PRICES = {
  starter: 180_000,
  business: 280_000,
  store: 400_000,
  custom: 600_000, // starting price ("From")
  metaAds: 50_000, // per month
  maintenance: 15_000, // per month
  extraPage: 25_000,
  productUpload: 20_000, // per extra 50 items
  renewal: 25_000, // per year, from year 2
} as const;

/* -------------------------------------------------------------------------- */
/*  Contact (REPLACE THE PLACEHOLDERS before you deploy)                      */
/* -------------------------------------------------------------------------- */

export const contact = {
  /** Country code + number, no "+", no spaces, no leading 0. Example: 2348012345678 */
  whatsappNumber: "2348131104057",
  email: "hello@raimentweb.com.ng",
  instagram: "https://instagram.com/raimentweb",
  facebook: "https://facebook.com/raimentweb",
};

/* -------------------------------------------------------------------------- */
/*  Site-wide copy                                                            */
/* -------------------------------------------------------------------------- */

export const site = {
  brand: "Raiment Web",
  owner: "Travis James",
  url: "https://raimentweb.com.ng",
  locality: "Asaba",
  region: "Delta State",
  country: "NG",

  seo: {
    title: "Website Design Prices in Nigeria | Raiment Web – Asaba",
    // Built from the lowest package price.
    description: `Website design packages from ${formatNaira(PRICES.starter)} for Nigerian businesses. Starter pages, business websites, online stores and booking systems. Clear prices, built in Asaba.`,
    ogImage: "/og-travis.jpg",
    ogImageAlt: "Travis James, web designer in Asaba, Nigeria",
  },

  hero: {
    tag: "Web Designer · Asaba, Nigeria",
    headline: "Websites that bring you customers, not just compliments.",
    subtext:
      "I'm Travis. I build websites for Nigerian businesses and run the ads that send people to them. Clear prices below, no hidden charges.",
    primaryCta: "See Prices",
    whatsappCta: "Chat on WhatsApp",
    whatsappMessage: "Hi Travis, I saw your website and I'd like to talk about a website for my business.",
    trustLabel: "Live projects:",
    trustLinkText: "raimentstore.com.ng",
    trustLinkUrl: "https://raimentstore.com.ng",
    photo: "/travis.jpg",
    photoAlt: "Travis James, web designer in Asaba",
    photoWidth: 1728,
    photoHeight: 2304,
    badge: "Replies within 1 hour",
  },

  picker: {
    heading: "Which package is for me?",
    subheading: "Tap what sounds like you. I'll point you to the right one.",
    resultPrefix: "Best fit:",
    recommendedTag: "Recommended for you",
  },

  packages: {
    heading: "Pick what fits your business",
    subheading:
      "Every package includes mobile design, your own .com.ng domain for the first year, and free hosting setup.",
    bestForLabel: "Best for",
    deliveryLabel: "Delivery",
  },

  comparison: {
    heading: "Compare everything",
    scrollHint: "Swipe sideways to see every package",
    featureColumn: "What you get",
    included: "Included",
    notIncluded: "Not included",
  },

  addOns: {
    heading: "Extras you can add anytime",
  },

  howItWorks: {
    heading: "How it works",
  },

  faq: {
    heading: "Questions people ask me",
  },

  finalCta: {
    text: "Not sure which one to pick? Send me a message. I'll tell you honestly what your business needs.",
    button: "Chat on WhatsApp",
    whatsappMessage: "Hi Travis, I'm not sure which package to pick. Can you help me?",
  },

  floatingWhatsApp: {
    label: "Chat on WhatsApp",
    whatsappMessage: "Hi Travis, I have a question about a website for my business.",
  },

  footer: {
    line: "Raiment Web · Built by Travis James",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    facebookLabel: "Facebook",
  },
};

/* -------------------------------------------------------------------------- */
/*  Packages                                                                  */
/* -------------------------------------------------------------------------- */

export const packages: PricingPackage[] = [
  {
    id: "starter",
    name: "Starter Page",
    price: PRICES.starter,
    priceLabel: formatNaira(PRICES.starter),
    isFromPrice: false,
    badge: "",
    bestFor: "New businesses and vendors who need to look legit fast",
    description:
      "One clean page that tells people who you are, what you sell, and how to reach you.",
    features: [
      "1-page website (up to 6 sections)",
      "Mobile-friendly design",
      "WhatsApp chat button",
      "Google Maps location",
      "Photo gallery (up to 15 images)",
      ".com.ng domain for 1 year",
      "Basic Google setup so people can find you",
      "2 rounds of changes",
    ],
    delivery: "5–7 days",
    ctaText: "Start on WhatsApp",
    whatsappMessage: "Hi Travis, I'm interested in the Starter Page package.",
  },
  {
    id: "business",
    name: "Business Website",
    price: PRICES.business,
    priceLabel: formatNaira(PRICES.business),
    isFromPrice: false,
    badge: "Most Popular",
    bestFor: "Shops, offices, salons, solar and service businesses",
    description:
      "A full website with separate pages for your services, about, and contact.",
    features: [
      "Everything in Starter",
      "Up to 5 pages",
      "Contact form that sends to your email",
      "Google Business Profile setup",
      "Business email (you@yourbusiness.com.ng)",
      "Customer reviews section",
      "Basic SEO for your town and services",
      "3 rounds of changes",
    ],
    delivery: "10–14 days",
    ctaText: "Start on WhatsApp",
    whatsappMessage: "Hi Travis, I'm interested in the Business Website package.",
  },
  {
    id: "store",
    name: "Online Store",
    price: PRICES.store,
    priceLabel: formatNaira(PRICES.store),
    isFromPrice: false,
    badge: "",
    bestFor: "Vendors selling bags, fashion, electronics, gadgets",
    description:
      "Customers browse your products, add to cart, and order without endless DMs.",
    features: [
      "Everything in Business Website",
      "Product catalogue with categories and search",
      "Cart and checkout (order sent to your WhatsApp)",
      "Online payments with Paystack or Flutterwave",
      "Discount codes",
      "Admin panel: add/edit products and prices yourself",
      "Up to 50 products uploaded for you",
      "Training video on how to manage it",
    ],
    delivery: "2–3 weeks",
    ctaText: "Start on WhatsApp",
    whatsappMessage: "Hi Travis, I'm interested in the Online Store package.",
  },
  {
    id: "custom",
    name: "Booking & Custom",
    price: PRICES.custom,
    priceLabel: `From ${formatNaira(PRICES.custom)}`,
    isFromPrice: true,
    badge: "",
    bestFor: "Hotels, shortlets, restaurants, schools, real estate",
    description:
      "Built around how your business actually runs: bookings, menus, listings, dashboards.",
    features: [
      "Everything in Online Store",
      "Room/table/appointment booking with dates and prices",
      "Restaurant menu with online ordering",
      "Property listings with filters",
      "Custom dashboard for staff",
      "Priority support for the first 3 months",
    ],
    delivery: "Based on scope",
    ctaText: "Let's Talk",
    whatsappMessage: "Hi Travis, I'm interested in the Booking & Custom package.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Quick picker: which chip recommends which package                         */
/* -------------------------------------------------------------------------- */

export const pickerOptions: PickerOption[] = [
  {
    id: "whatsapp-instagram",
    label: "I sell on WhatsApp/Instagram",
    packageId: "starter",
    reason: "One clean page that makes you look serious, with a WhatsApp button so customers reach you in one tap.",
  },
  {
    id: "shop-office",
    label: "I run a shop or office",
    packageId: "business",
    reason: "Separate pages for your services, about and contact, and you show up on Google Maps.",
  },
  {
    id: "restaurant",
    label: "I run a restaurant",
    packageId: "custom",
    reason: "A menu with online ordering and table bookings, built around how you work.",
  },
  {
    id: "hotel-shortlet",
    label: "I run a hotel/shortlet",
    packageId: "custom",
    reason: "Guests pick dates and book rooms straight from your site.",
  },
  {
    id: "custom",
    label: "I need something custom",
    packageId: "custom",
    reason: "Tell me how your business runs and I'll build around it.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Comparison table                                                          */
/* -------------------------------------------------------------------------- */

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Pages",
    values: { starter: "1 page", business: "Up to 5", store: "Up to 5 + shop", custom: "Built to fit" },
  },
  {
    label: "Mobile-friendly design",
    values: { starter: true, business: true, store: true, custom: true },
  },
  {
    label: ".com.ng domain (1st year)",
    values: { starter: true, business: true, store: true, custom: true },
  },
  {
    label: "WhatsApp chat button",
    values: { starter: true, business: true, store: true, custom: true },
  },
  {
    label: "Contact form to your email",
    values: { starter: false, business: true, store: true, custom: true },
  },
  {
    label: "Business email",
    values: { starter: false, business: true, store: true, custom: true },
  },
  {
    label: "Google Business Profile",
    values: { starter: false, business: true, store: true, custom: true },
  },
  {
    label: "SEO (found on Google)",
    values: { starter: "Basic setup", business: "Town + services", store: "Town + services", custom: "Town + services" },
  },
  {
    label: "Product catalogue",
    values: { starter: false, business: false, store: "50 products added", custom: true },
  },
  {
    label: "Online payments",
    values: { starter: false, business: false, store: "Paystack / Flutterwave", custom: true },
  },
  {
    label: "Admin panel (edit it yourself)",
    values: { starter: false, business: false, store: true, custom: true },
  },
  {
    label: "Booking system",
    values: { starter: false, business: false, store: false, custom: true },
  },
  {
    label: "Rounds of changes",
    values: { starter: "2", business: "3", store: "3", custom: "3" },
  },
  {
    label: "Delivery time",
    values: { starter: "5–7 days", business: "10–14 days", store: "2–3 weeks", custom: "Based on scope" },
  },
  {
    label: "Support after launch",
    values: { starter: "Maintenance plan", business: "Maintenance plan", store: "Maintenance plan", custom: "3 months priority" },
  },
];

/* -------------------------------------------------------------------------- */
/*  Add-ons                                                                   */
/* -------------------------------------------------------------------------- */

function addOn(
  id: string,
  name: string,
  price: number,
  per: string,
  note = "",
): AddOn {
  return {
    id,
    name,
    price,
    per,
    priceLabel: per ? `${formatNaira(price)}/${per}` : formatNaira(price),
    note,
  };
}

export const addOns: AddOn[] = [
  addOn("meta-ads", "Meta Ads Management (Facebook & Instagram)", PRICES.metaAds, "month", "+ ad budget"),
  addOn("maintenance", "Monthly maintenance & updates", PRICES.maintenance, "month"),
  addOn("extra-page", "Extra page", PRICES.extraPage, ""),
  addOn("product-upload", "Product upload (per extra 50 items)", PRICES.productUpload, ""),
  addOn("renewal", "Yearly domain + hosting renewal (from Year 2)", PRICES.renewal, "year"),
];

/* -------------------------------------------------------------------------- */
/*  How it works                                                              */
/* -------------------------------------------------------------------------- */

export const steps: Step[] = [
  { title: "Chat with me on WhatsApp", text: "Tell me about your business." },
  { title: "Pay 50% to start", text: "I send you a first look within days." },
  { title: "You review", text: "Ask for changes until it feels right." },
  { title: "Pay the balance", text: "Your site goes live." },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export const faqs: Faq[] = [
  {
    question: "Why should I pay for a website when I already sell on WhatsApp?",
    answer:
      "A website makes you look serious, shows up on Google, and lets customers see your prices and products without waiting for replies.",
  },
  {
    question: "Do I pay every year?",
    answer: `First year domain is included. From year 2, renewal is ${formatNaira(PRICES.renewal)}/year. No surprise charges.`,
  },
  {
    question: "Can I pay in instalments?",
    answer: "50% to start, 50% before launch.",
  },
  {
    question: "Can I update the site myself?",
    answer:
      "Online Store and above come with an admin panel. For Starter and Business, I handle updates (or add the maintenance plan).",
  },
  {
    question: "How long does it take?",
    answer: "See the delivery time on each package.",
  },
  {
    question: "Do you also run ads?",
    answer:
      "Yes. I can run Facebook and Instagram ads that send customers straight to your new site.",
  },
];
