import { site, whatsappLink } from "@/data/pricing";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(site.floatingWhatsApp.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site.floatingWhatsApp.label}
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lift ring-4 ring-white/80 transition-transform hover:scale-105 hover:bg-wa-dark sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
