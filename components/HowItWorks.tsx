import { site, steps } from "@/data/pricing";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {site.howItWorks.heading}
          </h2>
        </Reveal>

        <div className="relative mt-12">
          {/* dashed line joining the steps on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-accent/40 lg:block"
          />
          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-white shadow-soft ring-8 ring-white">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
