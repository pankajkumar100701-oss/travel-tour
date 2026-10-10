import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p });

export const ArrowRight = (p: P) => (<svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowUpRight = (p: P) => (<svg {...base(p)}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const MapPin = (p: P) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Calendar = (p: P) => (<svg {...base(p)}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>);
export const Users = (p: P) => (<svg {...base(p)}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></svg>);
export const Clock = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>);
export const Star = (p: P) => (<svg {...base({ fill: "currentColor", stroke: "none", ...p })}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" /></svg>);
export const Check = (p: P) => (<svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const X = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const Menu = (p: P) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Search = (p: P) => (<svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
export const Phone = (p: P) => (<svg {...base(p)}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>);
export const Mail = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>);
export const Shield = (p: P) => (<svg {...base(p)}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6Z" /><path d="m9 12 2 2 4-4" /></svg>);
export const Wallet = (p: P) => (<svg {...base(p)}><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" /><rect x="4" y="8" width="16" height="11" rx="2.5" /><path d="M16 13.5h.01" /></svg>);
export const Headset = (p: P) => (<svg {...base(p)}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3.5" y="13" width="4" height="6" rx="1.5" /><rect x="16.5" y="13" width="4" height="6" rx="1.5" /><path d="M20 19a3 3 0 0 1-3 3h-3" /></svg>);
export const Compass = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></svg>);
export const Leaf = (p: P) => (<svg {...base(p)}><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19 13 11" /></svg>);
export const Chat = (p: P) => (<svg {...base(p)}><path d="M4 18.5V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H8Z" /><path d="M8.5 9.5h7M8.5 12.5h4.5" /></svg>);
export const Plus = (p: P) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const Sliders = (p: P) => (<svg {...base(p)}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>);

export const WhatsApp = (p: P) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.5 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5Zm0 17.1a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1 1 12 19.6Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.4.2-.4.7-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
  </svg>
);

/** Brand mark: a compass needle tucked into a rounded square. */
export const Logo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <rect width="32" height="32" rx="9" fill="var(--accent)" />
    <path d="M21.5 10.5 18 18l-7.5 3.5L14 14Z" fill="#fff" />
    <circle cx="16" cy="16" r="1.6" fill="var(--accent)" />
  </svg>
);

export const Heart = ({ filled, ...p }: P & { filled?: boolean }) => (<svg {...base({ fill: filled ? "currentColor" : "none", ...p })}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" /></svg>);
export const Columns = (p: P) => (<svg {...base(p)}><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><path d="M9.2 4.5v15M14.8 4.5v15" /></svg>);
export const Share = (p: P) => (<svg {...base(p)}><circle cx="18" cy="5.5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="18.5" r="2.5" /><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" /></svg>);
export const Sparkles = (p: P) => (<svg {...base(p)}><path d="M11 3.5 12.6 8l4.4 1.6-4.4 1.6L11 15.7l-1.6-4.5L5 9.6 9.4 8Z" /><path d="M18 14.5 18.8 17l2.4.8-2.4.8L18 21l-.8-2.4-2.4-.8 2.4-.8Z" /></svg>);
export const Sun = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></svg>);
export const Plane = (p: P) => (<svg {...base(p)}><path d="M10.5 13.5 3 11l1.5-1.5 7.5 1L16.5 6a2 2 0 0 1 3 3L15 13.5l1 7.5-1.5 1.5-2.5-7.5L9 17.5V20l-1.5 1-1-3.5L3 16.5l1-1.5h2.5Z" /></svg>);
export const Passport = (p: P) => (<svg {...base(p)}><rect x="5" y="3" width="14" height="18" rx="2.5" /><circle cx="12" cy="10.5" r="3" /><path d="M9 17h6" /></svg>);
export const Coins = (p: P) => (<svg {...base(p)}><ellipse cx="9" cy="7" rx="5.5" ry="2.5" /><path d="M3.5 7v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V7" /><path d="M9.5 16.4c.9.4 2.1.6 3.5.6 3 0 5.5-1.1 5.5-2.5v-4c0-1.2-1.8-2.2-4.3-2.4" /><path d="M3.5 11v4c0 1.4 2.5 2.5 5.5 2.5" /></svg>);
export const Language = (p: P) => (<svg {...base(p)}><path d="M4 5h8M8 3v2M10.5 5c-.6 3.6-3 6.4-6.5 8M6 8.5c1 2 2.7 3.6 5 4.5" /><path d="m12 21 4-9 4 9M13.4 18h5.2" /></svg>);
export const Luggage = (p: P) => (<svg {...base(p)}><rect x="5.5" y="7" width="13" height="13" rx="2.5" /><path d="M9 7V4.5h6V7M9.5 11v5M14.5 11v5M8 20v1.5M16 20v1.5" /></svg>);
export const Trash = (p: P) => (<svg {...base(p)}><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" /></svg>);
export const Calculator = (p: P) => (<svg {...base(p)}><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M8.5 7h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" /></svg>);
