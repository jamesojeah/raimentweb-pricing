import { addOns, site } from "@/data/pricing";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function AddOns() {
  return (
    <section id="add-ons" className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {site.addOns.heading}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((addOn, i) => (
            <li key={addOn.id}>
              <Reveal className="h-full" delay={(i % 3) * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                  <h3 className="text-base font-bold leading-snug text-ink">{addOn.name}</h3>
                  <p className="mt-4 text-2xl font-extrabold tracking-tight text-brand">
                    {addOn.priceLabel}
                    {addOn.note && (
                      <span className="ml-2 text-base font-semibold text-muted">{addOn.note}</span>
                    )}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
