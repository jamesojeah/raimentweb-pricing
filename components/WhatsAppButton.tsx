import { whatsappLink } from "@/data/pricing";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface WhatsAppButtonProps {
  /** The message that is pre-filled in WhatsApp. */
  message: string;
  children: React.ReactNode;
  size?: "md" | "lg";
  className?: string;
}

const sizes = {
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
};

export function WhatsAppButton({
  message,
  children,
  size = "md",
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-wa font-semibold text-white shadow-soft transition-colors hover:bg-wa-dark ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
      {children}
    </a>
  );
}
