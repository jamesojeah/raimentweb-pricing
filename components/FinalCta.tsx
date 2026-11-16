import { site } from "@/data/pricing";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

export function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-brand to-brand-dark py-16 text-white sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            {site.finalCta.text}
          </p>
          <WhatsAppButton
            size="lg"
            message={site.finalCta.whatsappMessage}
            className="mt-9 w-full ring-4 ring-white/25 sm:w-auto"
          >
            {site.finalCta.button}
          </WhatsAppButton>
        </Reveal>
      </Container>
    </section>
  );
}
