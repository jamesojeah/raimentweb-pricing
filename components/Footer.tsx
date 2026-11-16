import { contact, site, whatsappLink } from "@/data/pricing";
import { Container } from "./Container";

export function Footer() {
  const links = [
    {
      label: site.footer.whatsappLabel,
      href: whatsappLink(site.floatingWhatsApp.whatsappMessage),
    },
    { label: site.footer.emailLabel, href: contact.email ? `mailto:${contact.email}` : "" },
    { label: site.footer.instagramLabel, href: contact.instagram },
    { label: site.footer.facebookLabel, href: contact.facebook },
  ].filter((link) => link.href);

  return (
    // Extra bottom space so the floating WhatsApp button never covers the last line.
    <footer className="bg-ink pb-24 pt-12 text-white sm:pb-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="text-lg font-bold">{site.footer.line}</p>
        <nav aria-label="Contact links">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 items-center text-base font-semibold text-white/90 underline decoration-accent underline-offset-4 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} {site.brand}
        </p>
      </Container>
    </footer>
  );
}
