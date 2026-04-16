// twentyseven-file-specials.js
//
// 1. Generates 2,000,000 SEO‑friendly Spain travel pages
//    - One file per page
// 2. Targets:
//    - Spanish cities, regions, provinces, coastlines, islands, and trip‑style pages
// 3. Embeds:
//    - BOOKING.HOME (aid=1858279)
//    - SKY.HOME (offer_id=29465&aff_id=21885)
// 4. Designed for 2026 tourism + SEO + affiliate EPC

const fs = require("fs-extra");
const path = require("path");

const BOOKING = {
  HOME: "https://www.booking.com/index.html?aid=1858279",
  APARTMENTS: "https://www.booking.com/apartments/index.html?aid=1858279",
  RESORTS: "https://www.booking.com/resorts/index.html?aid=1858279",
  VILLAS: "https://www.booking.com/villas/index.html?aid=1858279",
  BNB: "https://www.booking.com/bed-and-breakfast/index.html?aid=1858279",
  GUESTHOUSES: "https://www.booking.com/guest-house/index.html?aid=1858279",
};

const SKY = {
  HOME: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

const OUTPUT_DIR = path.resolve("./output");

// 1. High‑search‑volume Spanish cities and regions
const SPAIN_LOCATIONS = [
  "Madrid",
  "Barcelona",
  "Seville",
  "Granada",
  "Córdoba",
  "Valencia",
  "Málaga",
  "Zaragoza",
  "Las Palmas de Gran Canaria",
  "Bilbao",
  "Alicante",
  "Córdoba",
  "Ronda",
  "Almería",
  "Murcia",
  "Pamplona",
  "San Sebastián",
  "Valladolid",
  "Santiago de Compostela",
  "Girona",
  "Tarragona",
  "León",
  "Salamanca",
  "Oviedo",
  "Murcia",
  "Badajoz",
  "Huelva",
  "Jaén",
  "Cádiz",
  "Córdoba",
  "Seville",
  "Málaga",
  "Granada",
  "Almería",
  "Cádiz",
  "Barcelona",
  "Valencia",
  "Bilbao",
  "San Sebastián",
  "Pamplona",
  "Santiago de Compostela",
  "Oviedo",
  "Leon",
  "Salamanca",
  "Valladolid",
  "Badajoz",
  "Huelva",
  "Jaén",
  "Murcia",
  "Cartagena",
  "Almería",
  "Granada",
  "Seville",
  "Córdoba",
  "Ronda",
  "Marbella",
  "Estepona",
  "Torremolinos",
  "Nerja",
  "Puerto Banús",
  "Mijas",
  "Benalmádena",
  "Fuengirola",
  "Torrox",
  "Motril",
  "Vélez‑Málaga",
  "Guía de Isora",
  "Isla de Tenerife",
  "Isla de La Palma",
  "Isla de El Hierro",
  "Isla de La Gomera",
  "Isla de Fuerteventura",
  "Isla de Gran Canaria",
  "Isla de Lanzarote",
  "Isla de Ibiza",
  "Isla de Mallorca",
  "Isla de Menorca",
  "Isla de Formentera",
  "Andalusia",
  "Catalonia",
  "Basque Country",
  "Galicia",
  "Castile and León",
  "Castile‑La Mancha",
  "Aragon",
  "Valencia",
  "Murcia",
  "Balearic Islands",
  "Canary Islands",
  "Cantabria",
  "Asturias",
  "Extremadura",
  "La Rioja",
  "Navarre",
];

// 2. Trip‑style / visitor‑intent modifiers
const MODIFIERS = [
  "planning",
  "planner",
  "guide",
  "tips",
  "itinerary",
  "deals",
  "packages",
  "weekend",
  "long‑weekend",
  "family trip",
  "honeymoon",
  "romantic getaway",
  "walking tour",
  "cycling tour",
  "hiking tour",
  "food tour",
  "wine tour",
  "tapas tour",
  "river cruise",
  "road trip",
  "coastal trip",
  "island trip",
  "ski trip",
  "mountain trip",
  "village tour",
  "first‑time",
  "off‑season",
  "off‑peak",
  "budget trip",
  "luxury trip",
  "2026 travel",
  "2026 itinerary",
  "best time to visit",
  "how to get there",
  "public transport",
  "local cuisine",
  "hidden gems",
  "day trips",
];

// 3. Hotel / property types
const HOTEL_TYPES = [
  "hotel",
  "resort",
  "bed and breakfast",
  "apartment",
  "villa",
  "farmhouse",
  "guesthouse",
  "parador",
  "countryside hotel",
  "city center hotel",
  "airport hotel",
  "pet‑friendly",
  "family‑friendly",
  "luxury hotel",
  "budget hotel",
  "spa hotel",
  "all‑inclusive",
];

// 4. Spain‑specific keywords (2026‑style)
const KEYWORDS = [
  "spain travel",
  "spain 2026",
  "visit spain 2026",
  "spain vacation",
  "spain trip",
  "spain tour",
  "spain itinerary",
  "spain guide",
  "spain tips",
  "spain deals",
  "spain budget",
  "spain luxury",
  "spain honeymoon",
  "spain family trip",
  "spain culture",
  "spain food",
  "spain tapas",
  "spain wine",
  "spain sangria",
  "spain festivals",
  "spain flamenco",
  "spain road trip",
  "spain coastal trip",
  "spain island trip",
  "spain canary islands",
  "spain balearic islands",
  "spain andalusia",
  "spain catalonia",
  "spain basque country",
  "spain galicia",
  "spain madrid",
  "spain barcelona",
  "spain seville",
  "spain granada",
  "spain córdoba",
  "spain malaga",
  "spain valencia",
  "spain bilbao",
  "spain san sebastian",
  "spain pamplona",
  "spain santiago de compostela",
  "spain oveddo",
  "spain castile and leon",
  "spain castile‑la mancha",
  "spain aragon",
  "spain murcia",
  "spain cantabria",
  "spain asturias",
  "spain extremadura",
  "spain la rioja",
  "spain navarre",
  "spain parador",
  "spain tourism",
  "spain 2026 tourism",
  "spain 2026 tourism guide",
  "spain 2026 travel tips",
  "spain 2026 itineraries",
  "spain 2026 tours",
  "spain 2026 food tours",
  "spain 2026 wine tours",
  "spain 2026 tapas tours",
  "spain 2026 beach holidays",
  "spain 2026 city breaks",
  "spain 2026 mountain trips",
  "spain 2026 island trips",
  "spain 2026 ski resorts",
  "spain 2026 apartments",
  "spain 2026 villas",
  "spain 2026 hotels",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to spain",
];

// ==============================
// 1. SLUGIFY + SPAIN PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(loc, mod, type, lang = "en") {
  const locPart =
    lang === "en" ? `in ${loc}` :
    lang === "es" ? `en ${loc}` :
    lang === "de" ? `in ${loc}` :
    `in ${loc}`;

  return `${mod} ${type} ${locPart} Spain 2026`;
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "en") {
    return `Travel guide to ${mod} ${type} in ${loc}, Spain 2026, with tips for booking hotels, apartments, and villas. Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to find best deals and flights to Spain.`;
  } else if (lang === "es") {
    return `Guía de viaje para ${mod} ${type} en ${loc}, España 2026, con consejos para reservar hoteles, apartamentos y villas. Usa Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Reiseführer für ${mod} ${type} in ${loc}, Spanien 2026, mit Tipps zur Buchung von Hotels, Apartments und Villen. Nutzen Sie Booking.com (${BOOKING.HOME}).`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, Spain 2026, using Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) for hotels and flights.`;
  }
}

function renderSpainPage(loc, mod, type, lang = "en") {
  const slug = slugify(`spain‑${loc}.${mod}.${type}`);

  const filename = `sp-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(loc, mod, type, lang);
  const description = generateDescription(loc, mod, type, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/sp/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const keywordStr = KEYWORDS.join(", ").replace("Spain", loc);

  const content = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '\\"')}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="language" content="${lang}">
  <meta name="robots" content="index, follow">
  <meta name="keywords" content="${keywordStr}" />
  <link rel="canonical" href="https://yourdomain.com/sp/${slug}/${lang}.html" />
  ${hreflangSet}
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "SpainTravelGuide2026",
      "url": "https://yourdomain.com/"
    }
  }
  </script>
</head>
<body>
<div class="container py-4">

  <h1>${title}</h1>

  <p>${description}</p>

  <p>
    Use the following links to book stays in Spain and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Spain on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Spain (Skyscanner)
    </a>
  </p>

</div>
</body>
</html>
  `;

  fs.ensureFileSync(fullPath);
  fs.writeFileSync(fullPath, content);

  console.log(`✓ ${slug} → ${filename}`);
}

// ==============================
// 2. GENERATE 2,000,000 SPAIN PAGES
// ==============================

async function generateTwentysevenFileSpecials() {
  const combos = [];

  // 1. Cross locations × modifiers × types to 2,000,000 pages
  const total = 2000000;

  for (let i = 0; i < total; i++) {
    const loc = SPAIN_LOCATIONS[i % SPAIN_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = ["en", "es", "de", "fr", "zh"][Math.floor(Math.random() * 5)];

    renderSpainPage(loc, mod, type, lang);
  }

  console.log(
    `✅ twentyseven-file-specials.js finished: generated 2,000,000 Spain‑themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateTwentysevenFileSpecials().catch((err) => {
  console.error("twentyseven-file-specials.js error:", err.message);
});
