import { AddOns } from "@/components/AddOns";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";
import { PricingSections } from "@/components/PricingSections";

// Rebuild once a day so the © year in the footer stays current.
export const revalidate = 86400;

export default function Home() {
  return (
    <MotionProvider>
      <main>
        <Hero />
        <PricingSections />
        <ComparisonTable />
        <AddOns />
        <HowItWorks />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <JsonLd />
    </MotionProvider>
  );
}
