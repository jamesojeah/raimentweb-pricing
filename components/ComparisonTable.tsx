import { comparisonRows, packages, site, type CellValue } from "@/data/pricing";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <>
        <svg viewBox="0 0 20 20" className="mx-auto h-6 w-6 text-brand" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.58 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">{site.comparison.included}</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-xl text-black/30">
          –
        </span>
        <span className="sr-only">{site.comparison.notIncluded}</span>
      </>
    );
  }
  return <span className="text-sm font-semibold text-ink">{value}</span>;
}

export function ComparisonTable() {
  const lastRow = comparisonRows.length - 1;

  return (
    <section id="compare" className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {site.comparison.heading}
          </h2>
          <p className="mt-3 text-base text-muted lg:hidden">{site.comparison.scrollHint} →</p>
        </Reveal>

        {/* On phones and tablets the table scrolls inside this box (sideways, and up/down
            so the header row can stay put). On large screens it uses the normal page scroll. */}
        <div className="relative mt-10 max-h-[75svh] overflow-auto overscroll-x-contain rounded-3xl shadow-soft ring-1 ring-black/5 lg:max-h-none lg:overflow-visible">
          <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-center">
            <caption className="sr-only">{site.comparison.heading}</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 top-0 z-30 w-36 border-b border-black/5 bg-white p-3 text-left text-sm font-bold text-muted sm:w-56 sm:p-4 lg:rounded-tl-3xl"
                >
                  {site.comparison.featureColumn}
                </th>
                {packages.map((pkg, i) => (
                  <th
                    key={pkg.id}
                    scope="col"
                    className={`sticky top-0 z-20 min-w-32 border-b border-black/5 p-3 align-bottom sm:p-4 ${
                      pkg.badge ? "bg-tint-strong" : "bg-white"
                    } ${i === packages.length - 1 ? "lg:rounded-tr-3xl" : ""}`}
                  >
                    <span className="block text-sm font-extrabold text-ink sm:text-base">{pkg.name}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-brand sm:text-sm">
                      {pkg.priceLabel}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rowIndex) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 bg-white p-3 text-left text-sm font-semibold text-ink sm:p-4 ${
                      rowIndex === lastRow ? "lg:rounded-bl-3xl" : "border-b border-black/5"
                    }`}
                  >
                    {row.label}
                  </th>
                  {packages.map((pkg, i) => (
                    <td
                      key={pkg.id}
                      className={`p-3 sm:p-4 ${pkg.badge ? "bg-tint" : "bg-white"} ${
                        rowIndex === lastRow
                          ? i === packages.length - 1
                            ? "lg:rounded-br-3xl"
                            : ""
                          : "border-b border-black/5"
                      }`}
                    >
                      <Cell value={row.values[pkg.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
