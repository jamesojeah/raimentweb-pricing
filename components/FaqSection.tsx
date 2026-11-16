import { faqs, site } from "@/data/pricing";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

/** Uses the browser's built-in <details> element: no JavaScript, works with a keyboard. */
export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{site.faq.heading}</h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-white shadow-soft ring-1 ring-black/5 open:ring-brand/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-base font-bold text-ink sm:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-180"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-base leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
