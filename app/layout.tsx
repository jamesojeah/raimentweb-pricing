import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/data/pricing";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brand,
    title: site.seo.title,
    description: site.seo.description,
    locale: "en_NG",
    images: [
      {
        url: site.seo.ogImage,
        width: 1200,
        height: 630,
        alt: site.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5B21B6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${jakarta.variable} antialiased`}>
      <body className="min-h-screen bg-paper text-ink">{children}</body>
    </html>
  );
}
