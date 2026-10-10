/** Brand and contact details live here so a rename touches one file. Contact details are demo placeholders. */
export const site = {
  name: "Safarnama",
  suffix: "Journeys",
  tagline: "Trips planned like a friend would plan them.",
  description:
    "Handcrafted holidays across India and abroad — Ladakh to the Maldives — with honest pricing, local guides and a real person on call for the whole trip.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  email: "hello@safarnama.example",
  address: "2nd Floor, Mall Road, Shimla, Himachal Pradesh 171001",
  hours: "Mon – Sat, 9:30 am – 7:30 pm",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};

export const nav = [
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/when-to-go", label: "When to go" },
  { href: "/trip-finder", label: "Trip finder" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatPrice = (n: number) => inr.format(n);

export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;
