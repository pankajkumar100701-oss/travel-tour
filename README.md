# Safarnama Journeys — tour & travel website

A modern, clean travel agency site built with Next.js 16 (App Router, Cache Components) and Tailwind CSS 4.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Pages

- `/` — hero with trip search, popular destinations, trip styles, featured packages, why us, how it works, reviews, FAQ
- `/packages` — all packages with filters (region, destination, trip type, duration, sort) kept in the URL
- `/packages/[slug]` — gallery, day-by-day itinerary, inclusions, quote form
- `/destinations`, `/destinations/[slug]` — India and international destinations
- `/about`, `/contact`
- `/trip-finder` — 5-question quiz that ranks packages and shows a match %
- `/when-to-go` — pick a month, see which destinations are in season
- `/compare` — up to 3 packages side by side with the best value per row highlighted
- `/wishlist` — saved (hearted) trips, shareable on WhatsApp

## Planning tools on package and destination pages

- Upcoming fixed departures with seats left (demo dates generated from each destination's best months)
- Trip cost calculator: adults/children, hotel class, flights and insurance add-ons, 25% advance and 6/12-month EMI
- Share button, save button, recently viewed trips
- Destination travel essentials (visa, flight time, currency, language), best-month bar and a packing checklist

Saved trips, compare list, recently viewed and packing ticks are stored in the visitor's browser (localStorage).

## Editing content

- Brand name, phone, WhatsApp, email, address: `lib/site.ts` (phone and WhatsApp are empty, so call/WhatsApp buttons are hidden until you fill them; email and address are demo placeholders)
- Destinations, packages, reviews, FAQs: `lib/data.ts`
- Colours and fonts: `app/globals.css` and `app/layout.tsx`

Forms have no backend: a submitted enquiry turns into a pre-filled WhatsApp message. Photos come from Unsplash.
