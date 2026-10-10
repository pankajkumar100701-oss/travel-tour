import { unsplash } from "./site";

export const img = {
  ladakhRoad: unsplash("1581793745862-99fde7fa73d2"),
  keralaHouseboat: unsplash("1602216056096-3b40cc0c9944"),
  keralaCanal: unsplash("1590050752117-238cb0fb12b1"),
  goaBeach: unsplash("1512343879784-a960bf40e7f2"),
  hawaMahal: unsplash("1477587458883-47145ed94245"),
  amberFort: unsplash("1599661046289-e31897846e41"),
  tajReflect: unsplash("1564507592333-c60657eea523"),
  tajArch: unsplash("1548013146-72479768bada"),
  tajGarden: unsplash("1524492412937-b28074a5d7da"),
  delhi: unsplash("1592639296346-560c37a0f711"),
  himachalSnow: unsplash("1626621341517-bbf3d9990a23"),
  himachalRange: unsplash("1605649487212-47bdab064df7"),
  parvatiRiver: unsplash("1609920658906-8223bd289001"),
  beachSunset: unsplash("1507525428034-b723cf961d3e"),
  islandShade: unsplash("1589979481223-deb893043163"),
  bali: unsplash("1537996194471-e657df975ab4"),
  dubai: unsplash("1512453979798-5ea266f8880c"),
  maldivesVillas: unsplash("1514282401047-d79a71a590e8"),
  maldivesAerial: unsplash("1540202404-a2f29016b523"),
  swissValley: unsplash("1530122037265-a5f1f91d3b99"),
  alpineLake: unsplash("1501785888041-af3ef285b470"),
  thailand: unsplash("1552465011-b4e21bf6e79a"),
  nepalStupa: unsplash("1544735716-392fe2489ffa"),
  himalayaDusk: unsplash("1585409677983-0f6c41ca9c3b"),
  seaOfClouds: unsplash("1506905925346-21bda4d32df4"),
  lakeBoat: unsplash("1476514525535-07fb3b4ae5f1"),
  roadTrip: unsplash("1469854523086-cc02fe5d8800"),
  planning: unsplash("1488646953014-85cb44e25828"),
};

export type Region = "India" | "International";

export type Destination = {
  slug: string;
  name: string;
  region: Region;
  place: string;
  tagline: string;
  image: string;
  about: string;
  bestTime: string;
  idealDays: string;
  thingsToDo: string[];
  /** Months (1 = January) when we recommend going. Drives "When to go" and departure dates. */
  bestMonths: number[];
  facts: { visa: string; currency: string; flight: string; language: string };
  packing: string[];
};

type DestinationExtras = Pick<Destination, "bestMonths" | "facts" | "packing">;

const baseDestinations: Omit<Destination, keyof DestinationExtras>[] = [
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "India",
    place: "Union Territory of Ladakh",
    tagline: "High passes, blue lakes, endless roads",
    image: img.ladakhRoad,
    about:
      "A cold desert on the roof of India where monasteries cling to cliffs and the road itself is the destination. Ladakh rewards slow travel — we build in acclimatisation days so the altitude never spoils the view.",
    bestTime: "May – September",
    idealDays: "7 – 9 days",
    thingsToDo: ["Ride over Khardung La", "Camp beside Pangong Tso", "Sunrise at Thiksey Monastery", "Double-humped camels in Nubra"],
  },
  {
    slug: "himachal",
    name: "Himachal",
    region: "India",
    place: "Himachal Pradesh",
    tagline: "Pine forests, river valleys, snow lines",
    image: img.himachalSnow,
    about:
      "From the cafés of Kasol to the snowfields above Manali, Himachal is the mountains made easy. Short drives, cosy stays and trails for every fitness level — it is where most of our travellers start.",
    bestTime: "March – June and October, December – February for snow",
    idealDays: "5 – 7 days",
    thingsToDo: ["Snow day at Solang Valley", "Riverside walks in Kasol", "Toy train to Shimla", "Short trek to Kheerganga"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    region: "India",
    place: "Kerala",
    tagline: "Backwaters, tea hills and slow mornings",
    image: img.keralaHouseboat,
    about:
      "Houseboats drifting past paddy fields, misty tea estates in Munnar and Ayurvedic massages that make you forget your phone. Kerala is the honeymoon favourite for good reason.",
    bestTime: "September – March",
    idealDays: "5 – 7 days",
    thingsToDo: ["Overnight houseboat in Alleppey", "Tea garden walk in Munnar", "Kathakali show in Kochi", "Sunset at Varkala cliff"],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "India",
    place: "Rajasthan & the Golden Triangle",
    tagline: "Forts, palaces and desert nights",
    image: img.hawaMahal,
    about:
      "Pink Jaipur, blue Jodhpur, golden Jaisalmer and lakeside Udaipur — Rajasthan is colour at full volume. Pair it with Delhi and Agra for the classic Golden Triangle.",
    bestTime: "October – March",
    idealDays: "6 – 9 days",
    thingsToDo: ["Elephant-free sunrise at Amber Fort", "Dune camp in Jaisalmer", "Boat ride on Lake Pichola", "Taj Mahal at first light"],
  },
  {
    slug: "goa",
    name: "Goa",
    region: "India",
    place: "Goa",
    tagline: "Beaches, Portuguese lanes, long lunches",
    image: img.goaBeach,
    about:
      "Busy north beaches for the energy, quiet south coves for the calm, and old Latin quarters in between. Goa is the easiest long weekend in India.",
    bestTime: "November – February",
    idealDays: "3 – 5 days",
    thingsToDo: ["Fontainhas heritage walk", "Dolphin cruise at sunrise", "Beach shack dinners at Palolem", "Spice plantation lunch"],
  },
  {
    slug: "andaman",
    name: "Andaman",
    region: "India",
    place: "Andaman & Nicobar Islands",
    tagline: "Turquoise water and white-sand islands",
    image: img.beachSunset,
    about:
      "Some of Asia's best beaches without a passport. Snorkel over coral at Elephant Beach, watch the sun set at Radhanagar and hop between islands on fast ferries.",
    bestTime: "October – May",
    idealDays: "5 – 7 days",
    thingsToDo: ["Radhanagar Beach sunset", "Scuba dive at Havelock", "Cellular Jail light show", "Kayak through mangroves"],
  },
  {
    slug: "bali",
    name: "Bali",
    region: "International",
    place: "Indonesia",
    tagline: "Temples, rice terraces and villas",
    image: img.bali,
    about:
      "Bali mixes jungle villas in Ubud with beach clubs in Seminyak and cliff temples at Uluwatu. Visa on arrival for Indians and direct flights make it an easy first international trip.",
    bestTime: "April – October",
    idealDays: "6 – 8 days",
    thingsToDo: ["Ulun Danu Beratan temple", "Tegallalang rice terraces", "Nusa Penida day trip", "Kecak dance at Uluwatu"],
  },
  {
    slug: "dubai",
    name: "Dubai",
    region: "International",
    place: "United Arab Emirates",
    tagline: "Skylines, souks and dune drives",
    image: img.dubai,
    about:
      "Four hours from most Indian cities, Dubai packs record-breaking towers, desert safaris and theme parks into a short break the whole family will enjoy.",
    bestTime: "November – March",
    idealDays: "4 – 6 days",
    thingsToDo: ["At the Top, Burj Khalifa", "Desert safari with BBQ dinner", "Dhow cruise on the Marina", "Abu Dhabi day trip"],
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "International",
    place: "Republic of Maldives",
    tagline: "Overwater villas and lagoon blues",
    image: img.maldivesVillas,
    about:
      "One island, one resort, nothing to do but swim. We pick resorts by the quality of their house reef and how they treat Indian guests — not just by the brochure.",
    bestTime: "November – April",
    idealDays: "4 – 6 days",
    thingsToDo: ["Snorkel the house reef", "Seaplane transfer", "Sandbank picnic", "Bioluminescent beach walk"],
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    region: "International",
    place: "Switzerland",
    tagline: "Alpine villages and scenic trains",
    image: img.swissValley,
    about:
      "Glacier views from Jungfraujoch, lakeside Lucerne and the Glacier Express across the Alps. We handle the Swiss Travel Pass, visas and vegetarian-friendly hotels.",
    bestTime: "May – September, December – February for snow",
    idealDays: "7 – 10 days",
    thingsToDo: ["Jungfraujoch — Top of Europe", "Lake Lucerne cruise", "Glacier Express ride", "Cheese and chocolate in Gruyères"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "International",
    place: "Thailand",
    tagline: "Island hops, street food, night markets",
    image: img.thailand,
    about:
      "Bangkok's energy, Phuket's beaches and the limestone islands of Krabi — Thailand is great value, visa-friendly and fun at any age.",
    bestTime: "November – April",
    idealDays: "5 – 7 days",
    thingsToDo: ["Phi Phi island speedboat tour", "Railay Beach rock views", "Bangkok floating market", "Street food tour in Chinatown"],
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "International",
    place: "Nepal",
    tagline: "Himalayan views and old temple towns",
    image: img.nepalStupa,
    about:
      "No visa, no currency stress and the highest mountains on earth. Kathmandu's stupas, Pokhara's lakes and an Everest view flight make Nepal a gentle, soulful getaway.",
    bestTime: "October – December, March – May",
    idealDays: "6 – 8 days",
    thingsToDo: ["Everest mountain flight", "Boudhanath stupa at dusk", "Sunrise at Sarangkot", "Paragliding over Phewa Lake"],
  },
];

const extras: Record<string, DestinationExtras> = {
  ladakh: {
    bestMonths: [5, 6, 7, 8, 9],
    facts: { visa: "Not needed — Inner Line Permit arranged by us", currency: "Indian Rupee (₹)", flight: "1h 20m Delhi → Leh", language: "Ladakhi, Hindi" },
    packing: ["Thermal inner layers", "Down jacket", "Sunglasses with UV protection", "SPF 50 sunscreen and lip balm", "Riding gloves", "Original ID for permits"],
  },
  himachal: {
    bestMonths: [3, 4, 5, 6, 10, 12, 1, 2],
    facts: { visa: "Not needed", currency: "Indian Rupee (₹)", flight: "Overnight Volvo or 1h 15m to Kullu", language: "Hindi, Pahari" },
    packing: ["Warm jacket and woollens", "Trekking shoes", "Rain poncho", "Power bank", "Basic medicines", "Reusable water bottle"],
  },
  kerala: {
    bestMonths: [9, 10, 11, 12, 1, 2, 3],
    facts: { visa: "Not needed", currency: "Indian Rupee (₹)", flight: "3h 15m Delhi → Kochi", language: "Malayalam, English" },
    packing: ["Light cotton clothes", "Umbrella", "Mosquito repellent", "Modest wear for temples", "Sandals", "Light shawl for Munnar evenings"],
  },
  rajasthan: {
    bestMonths: [10, 11, 12, 1, 2, 3],
    facts: { visa: "Not needed", currency: "Indian Rupee (₹)", flight: "1h Delhi → Jaipur", language: "Hindi, Rajasthani" },
    packing: ["Breathable cottons", "Light jacket for desert nights", "Scarf for sun and dust", "Comfortable walking shoes", "Sunglasses and hat", "Cash for local bazaars"],
  },
  goa: {
    bestMonths: [11, 12, 1, 2],
    facts: { visa: "Not needed", currency: "Indian Rupee (₹)", flight: "2h 30m Delhi → Goa", language: "Konkani, English" },
    packing: ["Swimwear", "Flip-flops", "Reef-safe sunscreen", "Driving licence for scooters", "Light evening wear", "Waterproof phone pouch"],
  },
  andaman: {
    bestMonths: [10, 11, 12, 1, 2, 3, 4, 5],
    facts: { visa: "Not needed for Indians", currency: "Indian Rupee (₹)", flight: "~5h from Delhi with one stop", language: "Hindi, Bengali, Tamil" },
    packing: ["Swimwear and rash guard", "Reef-safe sunscreen", "Water shoes", "Seasickness tablets", "Cash — ATMs are few on islands", "Original ID for ferries"],
  },
  bali: {
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    facts: { visa: "Visa on arrival for Indians", currency: "Indonesian Rupiah (IDR)", flight: "~8h from Delhi with one stop", language: "Indonesian, English" },
    packing: ["Sarong for temples", "Swimwear", "Light rain jacket", "Universal plug adapter", "Mosquito repellent", "Passport valid 6+ months"],
  },
  dubai: {
    bestMonths: [11, 12, 1, 2, 3],
    facts: { visa: "Tourist e-visa — we apply for you", currency: "UAE Dirham (AED)", flight: "3h 30m Delhi → Dubai", language: "Arabic, English, Hindi widely spoken" },
    packing: ["Modest clothes for mosques", "Sunglasses and hat", "Light jacket for malls", "Comfortable sneakers", "Universal plug adapter", "Passport valid 6+ months"],
  },
  maldives: {
    bestMonths: [11, 12, 1, 2, 3, 4],
    facts: { visa: "Free 30-day visa on arrival", currency: "US Dollar / Maldivian Rufiyaa", flight: "~4h Delhi → Malé", language: "Dhivehi, English" },
    packing: ["Swimwear", "Reef-safe sunscreen", "Snorkel mask (resorts lend too)", "Light linen outfits", "Waterproof phone pouch", "Return ticket and hotel confirmation"],
  },
  switzerland: {
    bestMonths: [5, 6, 7, 8, 9, 12, 1, 2],
    facts: { visa: "Schengen visa — documents guided by us", currency: "Swiss Franc (CHF)", flight: "~9h Delhi → Zurich", language: "German, French, Italian, English" },
    packing: ["Layered warm clothing", "Waterproof jacket", "Comfortable walking shoes", "Type J plug adapter", "Sunglasses for glacier days", "Travel insurance papers for visa"],
  },
  thailand: {
    bestMonths: [11, 12, 1, 2, 3, 4],
    facts: { visa: "Entry rules change — we confirm before you book", currency: "Thai Baht (THB)", flight: "4h 30m Delhi → Bangkok", language: "Thai, English in tourist areas" },
    packing: ["Light breathable clothes", "Covered shoulders for temples", "Swimwear", "Dry bag for island tours", "Mosquito repellent", "Passport valid 6+ months"],
  },
  nepal: {
    bestMonths: [10, 11, 12, 3, 4, 5],
    facts: { visa: "Not needed — passport or voter ID", currency: "Nepali Rupee (₹ INR accepted)", flight: "1h 30m Delhi → Kathmandu", language: "Nepali, Hindi understood" },
    packing: ["Warm fleece for mornings", "Comfortable walking shoes", "Modest wear for temples", "Original photo ID", "Small INR notes (no ₹500+ notes)", "Basic medicines"],
  },
};

export const destinations: Destination[] = baseDestinations.map((d) => ({ ...d, ...extras[d.slug] }));

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export type Category = "adventure" | "honeymoon" | "family" | "beach" | "heritage" | "luxury";

export const categories: { slug: Category; label: string; blurb: string; image: string }[] = [
  { slug: "adventure", label: "Adventure", blurb: "Treks, rides and high passes", image: img.ladakhRoad },
  { slug: "honeymoon", label: "Honeymoon", blurb: "Private, slow and romantic", image: img.maldivesAerial },
  { slug: "family", label: "Family", blurb: "Easy pace, something for all", image: img.swissValley },
  { slug: "beach", label: "Beach", blurb: "Sun, sand and island hops", image: img.thailand },
  { slug: "heritage", label: "Heritage", blurb: "Forts, temples and old towns", image: img.amberFort },
  { slug: "luxury", label: "Luxury", blurb: "The very best, no compromises", image: img.maldivesVillas },
];

export const durations = [
  { value: "short", label: "Up to 5 days", test: (d: number) => d <= 5 },
  { value: "week", label: "6 – 7 days", test: (d: number) => d >= 6 && d <= 7 },
  { value: "long", label: "8+ days", test: (d: number) => d >= 8 },
];

export type Day = { title: string; detail: string };

export type TourPackage = {
  slug: string;
  title: string;
  destination: string;
  route: string;
  categories: Category[];
  days: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  summary: string;
  highlights: string[];
  itinerary: Day[];
  inclusions: string[];
  exclusions: string[];
  groupSize: string;
  featured?: boolean;
};

const commonExclusions = ["Flights or trains to the start point", "Lunch unless mentioned", "Personal expenses and tips", "Travel insurance"];

export const packages: TourPackage[] = [
  {
    slug: "ladakh-bike-expedition",
    title: "Ladakh Bike Expedition",
    destination: "ladakh",
    route: "Leh · Nubra · Pangong · Leh",
    categories: ["adventure"],
    days: 8,
    price: 32999,
    originalPrice: 38999,
    rating: 4.9,
    reviews: 312,
    image: img.ladakhRoad,
    gallery: [img.ladakhRoad, img.himalayaDusk, img.seaOfClouds],
    summary:
      "Royal Enfield Himalayans, a backup vehicle carrying your bags, a mechanic on every ride and two acclimatisation days in Leh. The bucket-list ride, done safely.",
    highlights: ["Khardung La, one of the highest motorable passes", "Night in a Swiss tent beside Pangong Tso", "Bactrian camel ride in Hunder dunes", "Backup vehicle, mechanic and oxygen on every ride"],
    itinerary: [
      { title: "Arrive in Leh", detail: "Airport pickup and a full day of rest to acclimatise. Evening stroll to Leh Market." },
      { title: "Leh local sights", detail: "Shanti Stupa, Leh Palace and Hall of Fame. Bike allocation and a short test ride." },
      { title: "Leh → Nubra via Khardung La", detail: "Ride over Khardung La to the sand dunes of Hunder. Camel ride at sunset." },
      { title: "Nubra → Pangong via Shyok", detail: "The wild Shyok river road to Pangong Tso. Overnight in lakeside camps." },
      { title: "Pangong → Leh via Chang La", detail: "Morning by the lake, then ride back to Leh over Chang La." },
      { title: "Sham Valley loop", detail: "Magnetic Hill, Gurudwara Pathar Sahib and the Indus–Zanskar confluence." },
      { title: "Free day in Leh", detail: "Café hopping, shopping or an optional rafting run on the Zanskar." },
      { title: "Departure", detail: "Drop at Leh airport with memories and a sunburn." },
    ],
    inclusions: ["7 nights hotels and camps", "Breakfast and dinner daily", "Royal Enfield Himalayan with fuel", "Backup vehicle and mechanic", "Inner Line permits", "Experienced road captain"],
    exclusions: commonExclusions,
    groupSize: "8 – 14 riders",
    featured: true,
  },
  {
    slug: "manali-kasol-escape",
    title: "Manali & Kasol Escape",
    destination: "himachal",
    route: "Manali · Solang · Kasol · Kheerganga",
    categories: ["adventure", "family"],
    days: 6,
    price: 14499,
    originalPrice: 16999,
    rating: 4.8,
    reviews: 541,
    image: img.parvatiRiver,
    gallery: [img.parvatiRiver, img.himachalSnow, img.himachalRange],
    summary:
      "Snow at Solang, cafés by the Parvati river and an easy overnight trek to the hot springs of Kheerganga. Ideal for first-timers and friend groups.",
    highlights: ["Overnight trek to Kheerganga hot springs", "Solang Valley snow and ropeway", "Riverside stay in Kasol", "Volvo from Delhi included"],
    itinerary: [
      { title: "Overnight Volvo from Delhi", detail: "Board a semi-sleeper Volvo from Delhi in the evening." },
      { title: "Arrive in Manali", detail: "Check in, rest, then Hadimba Temple and Old Manali cafés." },
      { title: "Solang Valley", detail: "Snow activities, ropeway and paragliding (optional). Evening on Mall Road." },
      { title: "Manali → Kasol", detail: "Drive along the Beas to Kasol. Walk to Manikaran Gurudwara and its hot springs." },
      { title: "Kheerganga trek", detail: "A 12 km forest trail to Kheerganga. Soak in the hot spring and camp under the stars." },
      { title: "Return to Delhi", detail: "Trek down after breakfast and board the overnight Volvo back to Delhi." },
    ],
    inclusions: ["Delhi–Manali–Delhi Volvo", "4 nights hotel and camp stays", "Breakfast and dinner daily", "Local cab for sightseeing", "Trek guide for Kheerganga"],
    exclusions: commonExclusions,
    groupSize: "Private or group of 10 – 20",
    featured: true,
  },
  {
    slug: "shimla-manali-family",
    title: "Shimla Manali Family Holiday",
    destination: "himachal",
    route: "Shimla · Kufri · Manali · Solang",
    categories: ["family"],
    days: 7,
    price: 21999,
    rating: 4.7,
    reviews: 228,
    image: img.himachalRange,
    gallery: [img.himachalRange, img.himachalSnow, img.parvatiRiver],
    summary:
      "A private cab, kid-friendly hotels and short drive days. The classic hill-station loop paced for grandparents and toddlers alike.",
    highlights: ["Private cab for the whole trip", "Toy train ride on the Kalka–Shimla line", "Snow day at Solang Valley", "Family rooms in 3★ and 4★ hotels"],
    itinerary: [
      { title: "Chandigarh → Shimla", detail: "Pickup from Chandigarh and a scenic drive to Shimla. Evening on The Ridge." },
      { title: "Kufri & Mall Road", detail: "Kufri adventure park in the morning, Christ Church and Mall Road after." },
      { title: "Shimla → Manali", detail: "Drive through Kullu valley with stops for river rafting and shawl factories." },
      { title: "Solang Valley", detail: "Snow play, ropeway and an easy day out for all ages." },
      { title: "Manali sightseeing", detail: "Hadimba Temple, Vashisht hot springs and the Tibetan monastery." },
      { title: "Leisure day", detail: "Free day — optional Atal Tunnel and Sissu excursion." },
      { title: "Departure", detail: "Drive back to Chandigarh for your onward journey." },
    ],
    inclusions: ["6 nights family rooms", "Breakfast and dinner daily", "Private cab with driver", "All tolls, parking and permits"],
    exclusions: commonExclusions,
    groupSize: "Private trip",
  },
  {
    slug: "kerala-backwaters-honeymoon",
    title: "Kerala Backwaters Honeymoon",
    destination: "kerala",
    route: "Kochi · Munnar · Thekkady · Alleppey",
    categories: ["honeymoon"],
    days: 6,
    price: 27499,
    originalPrice: 31999,
    rating: 4.9,
    reviews: 406,
    image: img.keralaHouseboat,
    gallery: [img.keralaHouseboat, img.keralaCanal, img.beachSunset],
    summary:
      "Tea hills, a spice-scented jungle and a private houseboat with a candlelight dinner. Flower-bed decoration and a couple's massage included.",
    highlights: ["Private houseboat with candlelight dinner", "Couple's Ayurvedic massage", "Tea estate walk in Munnar", "Honeymoon room decoration"],
    itinerary: [
      { title: "Arrive in Kochi", detail: "Pickup and Fort Kochi walk — Chinese fishing nets and Jew Town." },
      { title: "Kochi → Munnar", detail: "Drive past waterfalls into the tea hills. Evening at leisure." },
      { title: "Munnar sightseeing", detail: "Eravikulam National Park, tea museum and Mattupetty dam." },
      { title: "Munnar → Thekkady", detail: "Spice plantation tour and an optional boat ride on Periyar Lake." },
      { title: "Alleppey houseboat", detail: "Board your private houseboat and cruise the backwaters till sunset." },
      { title: "Departure", detail: "Disembark after breakfast and transfer to Kochi airport." },
    ],
    inclusions: ["4 nights hotels + 1 night houseboat", "Breakfast daily, all meals on houseboat", "Private cab with driver", "Couple's massage and room decoration"],
    exclusions: commonExclusions,
    groupSize: "Private trip for two",
    featured: true,
  },
  {
    slug: "royal-rajasthan",
    title: "Royal Rajasthan",
    destination: "rajasthan",
    route: "Jaipur · Jodhpur · Jaisalmer · Udaipur",
    categories: ["heritage", "family"],
    days: 8,
    price: 29999,
    rating: 4.8,
    reviews: 274,
    image: img.amberFort,
    gallery: [img.amberFort, img.hawaMahal],
    summary:
      "Four royal cities, one heritage-hotel night and a desert camp under the stars. Local guides at every fort so the stories come alive.",
    highlights: ["Night in a Jaisalmer dune camp", "Heritage haveli stay in Jodhpur", "Sunset boat on Lake Pichola", "Licensed guide at every fort"],
    itinerary: [
      { title: "Arrive in Jaipur", detail: "Check in and evening at Chokhi Dhani for Rajasthani food and folk music." },
      { title: "Jaipur forts", detail: "Amber Fort, Hawa Mahal, City Palace and Jantar Mantar with a guide." },
      { title: "Jaipur → Jodhpur", detail: "Drive to the Blue City. Sunset from Mehrangarh's ramparts." },
      { title: "Jodhpur → Jaisalmer", detail: "Into the Thar. Patwon ki Haveli and Gadisar Lake." },
      { title: "Sam sand dunes", detail: "Jaisalmer Fort in the morning, camel ride and dune camp at night." },
      { title: "Jaisalmer → Udaipur", detail: "A long but beautiful drive to the City of Lakes." },
      { title: "Udaipur", detail: "City Palace, Saheliyon ki Bari and a sunset boat on Lake Pichola." },
      { title: "Departure", detail: "Drop at Udaipur airport or railway station." },
    ],
    inclusions: ["7 nights hotels, haveli and camp", "Breakfast daily, dinner at the camp", "Private AC cab with driver", "Local guides at forts"],
    exclusions: [...commonExclusions, "Monument entry tickets"],
    groupSize: "Private trip",
    featured: true,
  },
  {
    slug: "golden-triangle",
    title: "Golden Triangle Classic",
    destination: "rajasthan",
    route: "Delhi · Agra · Jaipur",
    categories: ["heritage", "family"],
    days: 5,
    price: 17999,
    rating: 4.7,
    reviews: 389,
    image: img.tajReflect,
    gallery: [img.tajReflect, img.delhi, img.hawaMahal],
    summary:
      "The Taj Mahal at sunrise, Mughal Delhi and the pink city of Jaipur — India's best-known circuit in five unhurried days.",
    highlights: ["Taj Mahal at sunrise", "Old Delhi rickshaw ride", "Fatehpur Sikri en route", "Jaipur's Amber Fort"],
    itinerary: [
      { title: "Delhi", detail: "Qutub Minar, Humayun's Tomb and India Gate. Rickshaw ride through Chandni Chowk." },
      { title: "Delhi → Agra", detail: "Expressway to Agra. Agra Fort and Mehtab Bagh at sunset." },
      { title: "Taj Mahal → Jaipur", detail: "Sunrise at the Taj, then Fatehpur Sikri on the way to Jaipur." },
      { title: "Jaipur", detail: "Amber Fort, City Palace and the bazaars of the Pink City." },
      { title: "Return to Delhi", detail: "Drive back to Delhi for your onward journey." },
    ],
    inclusions: ["4 nights 4★ hotels", "Breakfast daily", "Private AC cab with driver", "Guide at the Taj Mahal"],
    exclusions: [...commonExclusions, "Monument entry tickets"],
    groupSize: "Private trip",
  },
  {
    slug: "goa-beach-break",
    title: "Goa Beach Break",
    destination: "goa",
    route: "North Goa · Panjim · South Goa",
    categories: ["beach"],
    days: 4,
    price: 11999,
    originalPrice: 13999,
    rating: 4.6,
    reviews: 618,
    image: img.goaBeach,
    gallery: [img.goaBeach, img.beachSunset, img.islandShade],
    summary: "A pool resort near Baga, a scooter for the beaches and one day in the quiet south. Perfect for a long weekend.",
    highlights: ["Resort with pool near Baga", "Scooter for two days", "Dolphin-spotting cruise", "Sunset at Palolem"],
    itinerary: [
      { title: "Arrive in Goa", detail: "Airport pickup, check in, evening at Baga and Calangute." },
      { title: "North Goa", detail: "Fort Aguada, Anjuna flea market (Wednesdays) and Vagator cliffs." },
      { title: "Panjim & South Goa", detail: "Fontainhas lanes, Old Goa churches, then sunset at Palolem." },
      { title: "Departure", detail: "Lazy breakfast, then airport drop." },
    ],
    inclusions: ["3 nights resort stay", "Daily breakfast", "Airport transfers", "Scooter rental for 2 days", "Dolphin cruise"],
    exclusions: commonExclusions,
    groupSize: "Private trip",
  },
  {
    slug: "andaman-island-hopping",
    title: "Andaman Island Hopping",
    destination: "andaman",
    route: "Port Blair · Havelock · Neil",
    categories: ["beach", "honeymoon"],
    days: 6,
    price: 34999,
    rating: 4.8,
    reviews: 197,
    image: img.beachSunset,
    gallery: [img.beachSunset, img.islandShade],
    summary: "Fast ferries between three islands, a beginner scuba dive and the sunset at Radhanagar — voted one of Asia's best beaches.",
    highlights: ["Beginner scuba dive at Havelock", "Radhanagar Beach sunset", "Natural rock bridge at Neil", "Cellular Jail light and sound show"],
    itinerary: [
      { title: "Arrive in Port Blair", detail: "Corbyn's Cove beach and the Cellular Jail light show." },
      { title: "Port Blair → Havelock", detail: "Ferry to Havelock. Sunset at Radhanagar Beach." },
      { title: "Havelock", detail: "Scuba dive or snorkel at Elephant Beach." },
      { title: "Havelock → Neil", detail: "Ferry to Neil. Natural Bridge and Laxmanpur sunset." },
      { title: "Neil → Port Blair", detail: "Morning at Bharatpur beach, ferry back. Shopping in Aberdeen Bazaar." },
      { title: "Departure", detail: "Airport drop." },
    ],
    inclusions: ["5 nights beach resorts", "Breakfast daily", "Inter-island ferry tickets", "One scuba dive", "All transfers"],
    exclusions: commonExclusions,
    groupSize: "Private trip",
  },
  {
    slug: "bali-honeymoon",
    title: "Bali Honeymoon",
    destination: "bali",
    route: "Ubud · Kintamani · Nusa Penida · Seminyak",
    categories: ["honeymoon", "beach"],
    days: 7,
    price: 64999,
    originalPrice: 72999,
    rating: 4.9,
    reviews: 352,
    image: img.bali,
    gallery: [img.bali, img.islandShade, img.beachSunset],
    summary: "A private pool villa in Ubud, a day on Nusa Penida's cliffs and a floating breakfast. Flights from India can be added on request.",
    highlights: ["Private pool villa in Ubud", "Floating breakfast and candlelight dinner", "Nusa Penida day trip", "Kintamani volcano views"],
    itinerary: [
      { title: "Arrive in Bali", detail: "Pickup and transfer to your Ubud pool villa." },
      { title: "Ubud", detail: "Tegallalang rice terraces, Bali swing and Monkey Forest." },
      { title: "Kintamani & temples", detail: "Volcano views, coffee plantation and Ulun Danu Beratan temple." },
      { title: "Nusa Penida", detail: "Fast boat to Kelingking, Broken Beach and Angel's Billabong." },
      { title: "Ubud → Seminyak", detail: "Beach-side resort, sunset at Tanah Lot." },
      { title: "Uluwatu", detail: "Cliff temple and the Kecak fire dance at sunset." },
      { title: "Departure", detail: "Airport drop." },
    ],
    inclusions: ["3 nights pool villa + 3 nights beach resort", "Daily breakfast", "Private transfers and tours", "Nusa Penida fast boat", "Floating breakfast and candlelight dinner"],
    exclusions: ["International flights", "Visa on arrival fee", "Lunch and personal expenses", "Travel insurance"],
    groupSize: "Private trip for two",
    featured: true,
  },
  {
    slug: "dubai-city-desert",
    title: "Dubai City & Desert",
    destination: "dubai",
    route: "Dubai · Abu Dhabi",
    categories: ["family", "luxury"],
    days: 5,
    price: 54999,
    rating: 4.7,
    reviews: 263,
    image: img.dubai,
    gallery: [img.dubai],
    summary: "Burj Khalifa, a desert safari with BBQ, a Marina dhow cruise and a day in Abu Dhabi. Visa processing handled by us.",
    highlights: ["Burj Khalifa, level 124", "Desert safari with BBQ dinner", "Dhow cruise on Dubai Marina", "Abu Dhabi Grand Mosque"],
    itinerary: [
      { title: "Arrive in Dubai", detail: "Airport pickup and evening Marina dhow cruise with dinner." },
      { title: "City tour & Burj Khalifa", detail: "Old Dubai souks, abra ride, Dubai Mall and Burj Khalifa." },
      { title: "Desert safari", detail: "Free morning, afternoon dune bashing, camel ride and BBQ dinner." },
      { title: "Abu Dhabi", detail: "Sheikh Zayed Grand Mosque and an optional Ferrari World stop." },
      { title: "Departure", detail: "Last-minute shopping and airport drop." },
    ],
    inclusions: ["4 nights 4★ hotel", "Daily breakfast", "Dubai tourist visa", "Tours and transfers on sharing basis", "Burj Khalifa tickets"],
    exclusions: ["International flights", "Tourism Dirham fee", "Lunch and personal expenses", "Travel insurance"],
    groupSize: "Private or small group",
  },
  {
    slug: "maldives-overwater",
    title: "Maldives Overwater Villa",
    destination: "maldives",
    route: "Malé · Resort island",
    categories: ["honeymoon", "luxury", "beach"],
    days: 5,
    price: 124999,
    originalPrice: 139999,
    rating: 5.0,
    reviews: 141,
    image: img.maldivesAerial,
    gallery: [img.maldivesAerial, img.maldivesVillas, img.beachSunset],
    summary: "Four nights in a water villa with all meals, a seaplane transfer and a sandbank picnic. Hand-picked resort with a great house reef.",
    highlights: ["Overwater villa with lagoon access", "Seaplane transfers", "All meals included", "Private sandbank picnic"],
    itinerary: [
      { title: "Arrive in Malé", detail: "Seaplane to the resort. Welcome drink and settle into your water villa." },
      { title: "Reef day", detail: "Guided snorkel on the house reef. Spa in the afternoon." },
      { title: "Sandbank picnic", detail: "Boat out to a private sandbank for lunch." },
      { title: "At leisure", detail: "Sunset dolphin cruise and beach dinner." },
      { title: "Departure", detail: "Seaplane back to Malé." },
    ],
    inclusions: ["4 nights water villa", "All meals", "Return seaplane transfer", "Sandbank picnic and sunset cruise"],
    exclusions: ["International flights", "Green tax", "Spa and alcohol", "Travel insurance"],
    groupSize: "Private trip for two",
    featured: true,
  },
  {
    slug: "swiss-alps-explorer",
    title: "Swiss Alps Explorer",
    destination: "switzerland",
    route: "Zurich · Lucerne · Interlaken · Zermatt",
    categories: ["family", "luxury"],
    days: 8,
    price: 189999,
    rating: 4.8,
    reviews: 118,
    image: img.swissValley,
    gallery: [img.swissValley, img.alpineLake, img.lakeBoat],
    summary: "First-class Swiss Travel Pass, Jungfraujoch, Mount Titlis and a Glacier Express panorama ride. Visa paperwork guided end to end.",
    highlights: ["Jungfraujoch — Top of Europe", "Glacier Express panorama ride", "Mount Titlis and Lake Lucerne", "Swiss Travel Pass included"],
    itinerary: [
      { title: "Arrive in Zurich", detail: "Train to Lucerne. Chapel Bridge walk in the evening." },
      { title: "Mount Titlis", detail: "Rotating cable car and glacier park." },
      { title: "Lucerne → Interlaken", detail: "Golden Pass train via Brienz lake." },
      { title: "Jungfraujoch", detail: "Cog railway to the Top of Europe and the Ice Palace." },
      { title: "Lauterbrunnen & Grindelwald", detail: "Waterfall valley and the First Cliff Walk." },
      { title: "Interlaken → Zermatt", detail: "Train to the car-free village under the Matterhorn." },
      { title: "Glacier Express", detail: "Panorama train across the Alps to St. Moritz, then Zurich." },
      { title: "Departure", detail: "Train to Zurich airport." },
    ],
    inclusions: ["7 nights 3★/4★ hotels", "Daily breakfast", "8-day Swiss Travel Pass", "Jungfraujoch and Titlis tickets", "Visa documentation help"],
    exclusions: ["International flights", "Schengen visa fee", "Lunch and dinner", "Travel insurance"],
    groupSize: "Private trip",
  },
  {
    slug: "thailand-islands",
    title: "Thailand Islands & Bangkok",
    destination: "thailand",
    route: "Phuket · Krabi · Bangkok",
    categories: ["beach", "adventure"],
    days: 6,
    price: 48999,
    rating: 4.7,
    reviews: 305,
    image: img.thailand,
    gallery: [img.thailand, img.islandShade, img.beachSunset],
    summary: "Phi Phi by speedboat, Krabi's four islands and two nights in Bangkok for markets and rooftop bars.",
    highlights: ["Phi Phi islands speedboat tour", "Krabi four-island hop", "Bangkok floating market", "Rooftop dinner in Bangkok"],
    itinerary: [
      { title: "Arrive in Phuket", detail: "Transfer to Patong. Evening on Bangla Road." },
      { title: "Phi Phi islands", detail: "Speedboat to Maya Bay, Pileh Lagoon and Monkey Beach." },
      { title: "Phuket → Krabi", detail: "Four-island tour by longtail boat." },
      { title: "Krabi → Bangkok", detail: "Short flight to Bangkok. Evening at Asiatique." },
      { title: "Bangkok", detail: "Grand Palace, Wat Arun and the floating market." },
      { title: "Departure", detail: "Airport drop." },
    ],
    inclusions: ["5 nights 4★ hotels", "Daily breakfast", "Island tours and transfers", "Krabi–Bangkok domestic flight"],
    exclusions: ["International flights", "Visa if applicable", "Lunch and personal expenses", "Travel insurance"],
    groupSize: "Private or small group",
  },
  {
    slug: "nepal-himalaya",
    title: "Nepal Himalaya Retreat",
    destination: "nepal",
    route: "Kathmandu · Nagarkot · Pokhara",
    categories: ["adventure", "heritage"],
    days: 7,
    price: 39999,
    rating: 4.8,
    reviews: 176,
    image: img.nepalStupa,
    gallery: [img.nepalStupa, img.himalayaDusk, img.seaOfClouds],
    summary: "Stupas and old squares in Kathmandu, sunrise over the Himalaya at Nagarkot, and lakeside Pokhara with optional paragliding.",
    highlights: ["Everest mountain flight", "Sunrise at Nagarkot", "Paragliding over Phewa Lake (optional)", "Pashupatinath and Boudhanath"],
    itinerary: [
      { title: "Arrive in Kathmandu", detail: "Pickup and an evening walk in Thamel." },
      { title: "Kathmandu heritage", detail: "Pashupatinath, Boudhanath and Patan Durbar Square." },
      { title: "Everest flight & Nagarkot", detail: "Early mountain flight past Everest, then drive to Nagarkot." },
      { title: "Nagarkot → Pokhara", detail: "Sunrise over the Himalaya, then a scenic drive to Pokhara." },
      { title: "Pokhara", detail: "Sarangkot sunrise, World Peace Pagoda and boating on Phewa Lake." },
      { title: "Pokhara → Kathmandu", detail: "Drive back with a stop at Bandipur hill town." },
      { title: "Departure", detail: "Airport drop." },
    ],
    inclusions: ["6 nights hotels", "Daily breakfast", "Everest mountain flight", "Private transfers and sightseeing"],
    exclusions: ["Flights to Kathmandu", "Monument entry fees", "Paragliding", "Travel insurance"],
    groupSize: "Private trip",
  },
];

export type Departure = { date: string; seatsLeft: number };

/** Season start for the demo calendar; departures fall in the destination's best months after it. */
const SEASON_START = { year: 2026, month: 11 };

const hash = (str: string) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Deterministic demo departures: the next four best-season months, on a Saturday, with seats left. */
export function departuresFor(pkg: TourPackage): Departure[] {
  const best = extras[pkg.destination]?.bestMonths;
  const out: Departure[] = [];
  let { year, month } = SEASON_START;
  for (let i = 0; i < 24 && out.length < 4; i++) {
    if (best?.includes(month)) {
      const h = hash(`${pkg.slug}-${year}-${month}`);
      const first = new Date(Date.UTC(year, month - 1, 1));
      const firstSat = 1 + ((6 - first.getUTCDay() + 7) % 7);
      const day = firstSat + 7 * (h % 3);
      out.push({ date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, seatsLeft: 2 + (h % 11) });
    }
    month = month === 12 ? 1 : month + 1;
    if (month === 1) year += 1;
  }
  return out;
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const isInternational = (pkg: TourPackage) => getDestination(pkg.destination)?.region === "International";

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const packagesFor = (destination: string) => packages.filter((p) => p.destination === destination);
export const startingPrice = (destination: string) => Math.min(...packagesFor(destination).map((p) => p.price));
export const categoryLabel = (slug: Category) => categories.find((c) => c.slug === slug)?.label ?? slug;

export const testimonials = [
  {
    name: "Ananya & Rohit",
    city: "Pune",
    trip: "Kerala Backwaters Honeymoon",
    quote: "The houseboat dinner was magical, but what we loved most was that our trip manager checked in every evening without being pushy.",
  },
  {
    name: "Karan Mehta",
    city: "Delhi",
    trip: "Ladakh Bike Expedition",
    quote: "My bike's clutch cable snapped near Pangong and the mechanic fixed it in ten minutes. The backup team made the whole ride stress-free.",
  },
  {
    name: "The Iyer family",
    city: "Chennai",
    trip: "Swiss Alps Explorer",
    quote: "Two kids and a grandmother, and everything still ran on time. They even found us South Indian food in Interlaken!",
  },
  {
    name: "Sneha Kapoor",
    city: "Bengaluru",
    trip: "Bali Honeymoon",
    quote: "The villa was exactly like the photos. Pricing was transparent from the first quote — no surprise add-ons later.",
  },
];

export const faqs = [
  {
    q: "Can I customise a package?",
    a: "Yes — every trip is a starting point. Add days, change hotels, swap cities or turn a group tour into a private one. Tell us what you want and we'll send a revised quote within a few hours.",
  },
  {
    q: "How much do I pay to book?",
    a: "A 25% advance confirms your booking. The balance is due 15 days before departure for India trips and 30 days before for international ones. UPI, cards and bank transfer all work.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancel 30+ days before departure and you get the advance back minus a small processing fee. Closer to the date it depends on hotel and airline rules — we always share the exact amount in writing before you pay.",
  },
  {
    q: "Do you help with visas and flights?",
    a: "Yes. We book flights at the fare we find (no hidden markup) and guide you through visa paperwork for Dubai, Schengen, Thailand, Bali and more.",
  },
  {
    q: "Is someone available during the trip?",
    a: "Every traveller gets a trip manager on WhatsApp from the first call to the final drop, plus a 24×7 emergency number while you are travelling.",
  },
];
