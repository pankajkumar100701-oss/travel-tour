import { whatsappLink } from "@/lib/site";
import { WhatsApp } from "./icons";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi! I found you on your website and want to plan a trip.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsApp className="size-7" />
    </a>
  );
}
