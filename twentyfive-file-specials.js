// twentyfive-file-specials.js
//
// 1. Generates 500,000 SEO‑friendly Italy travel pages
//    - One file per page
// 2. Targets:
//    - Italian cities, regions, provinces, coastlines, islands, and trip‑style pages
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

// 1. High‑search‑volume Italian cities and regions
const ITALY_LOCATIONS = [
  "Rome",
  "Milan",
  "Florence",
  "Venice",
  "Naples",
  "Turin",
  "Genoa",
  "Bologna",
  "Verona",
  "Padua",
  "Trieste",
  "Bari",
  "Palermo",
  "Sicily",
  "Sardinia",
  "Puglia",
  "Tuscany",
  "Liguria",
  "Lombardy",
  "Lazio",
  "Campania",
  "Emilia‑Romagna",
  "Veneto",
  "Sicily",
  "Apulia",
  "Calabria",
  "Marche",
  "Umbria",
  "Abruzzo",
  "Basilicata",
  "Friuli‑Venezia Giulia",
  "Trentino‑Alto Adige",
  "L'Aquila",
  "Pisa",
  "Siena",
  "Arezzo",
  "Perugia",
  "Como",
  "Cortina",
  "Taormina",
  "Panarea",
  "Ponza",
  "Amalfi Coast",
  "Dolomites",
  "Lake Como",
  "Lake Garda",
  "Lake Maggiore",
  "Lake Iseo",
  "Lake Trasimeno",
  "Lake Orta",
  "Riviera di Ponente",
  "Costa Smeralda",
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
  "food tour",
  "wine tour",
  "cultural tour",
  "history tour",
  "first‑time",
  "off‑season",
  "off‑peak",
  "budget trip",
  "luxury trip",
  "2026 travel",
  "2026 itinerary",
  "why visit",
  "best time to visit",
  "how to get there",
  "public transport",
  "local cuisine",
  "hidden gems",
  "day trips",
  "coastal trip",
  "mountain trip",
  "island hopping",
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

// 4. Italian‑specific keywords (2026‑style)
const KEYWORDS = [
  "italy travel",
  "italy 2026",
  "visit italy 2026",
  "italy vacation",
  "italy trip",
  "italy tour",
  "italy itinerary",
  "italy guide",
  "italy tips",
  "italy deals",
  "italy budget",
  "italy luxury",
  "italy honeymoon",
  "italy family trip",
  "italy culture",
  "italy food",
  "italy wine",
  "italy history",
  "italy food tour",
  "italy wine tour",
  "italy walking tour",
  "italy city break",
  "italy islands",
  "italy islands 2026",
  "italy coast",
  "italy amalfi coast",
  "italy dolomites",
  "italy lakes",
  "italy lake como",
  "italy lake garda",
  "italy tuscan countryside",
  "italy sardinia",
  "italy sicily",
  "italy puglia",
  "italy liguria",
  "italy venice",
  "italy rome",
  "italy florence",
  "italy naples",
  "italy verona",
  "italy bologna",
  "italy padua",
  "italy genoa",
  "italy bari",
  "italy palermo",
  "italy hotels",
  "italy hotels 2026",
  "italy apartments 2026",
  "italy villas 2026",
  "italy resorts 2026",
  "italy all‑inclusive resorts",
  "italy pet‑friendly hotels",
  "italy family‑friendly hotels",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to italy",
];

// ==============================
// 1. SLUGIFY + ITALY PAGE TEMPLATE
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

  return `${mod} ${type} ${locPart} Italy 2026`;
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "en") {
    return `Travel guide to ${mod} ${type} in ${loc}, Italy 2026, with tips for booking hotels, apartments, and villas. Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to find best deals and flights to Italy.`;
  } else if (lang === "es") {
    return `Guía de viaje para ${mod} ${type} en ${loc}, Italia 2026, con consejos para reservar hoteles, apartamentos y villas. Usa Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Reiseführer für ${mod} ${type} in ${loc}, Italien 2026, mit Tipps zur Buchung von Hotels, Apartments und Villen. Nutzen Sie Booking.com (${BOOKING.HOME}).`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, Italy 2026, using Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) for hotels and flights.`;
  }
}

function renderItalyPage(loc, mod, type, lang = "en") {
  const slug = slugify(`italy‑${loc}.${mod}.${type}`);

  const filename = `it-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(loc, mod, type, lang);
  const description = generateDescription(loc, mod, type, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/it/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const keywordStr = KEYWORDS.join(", ").replace("Italy", loc);

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
  <link rel="canonical" href="https://yourdomain.com/it/${slug}/${lang}.html" />
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
      "name": "ItalyTravelGuide2026",
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
    Use the following links to book stays in Italy and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Italy on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Italy (Skyscanner)
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
// 2. GENERATE 500,000 ITALY PAGES
// ==============================

async function generateTwentyFiveFileSpecials() {
  const combos = [];

  // 1. Cross locations × modifiers × types to 500,000 pages
  const total = 500000;

  for (let i = 0; i < total; i++) {
    const loc = ITALY_LOCATIONS[i % ITALY_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = ["en", "es", "de", "fr", "zh"][Math.floor(Math.random() * 5)];

    renderItalyPage(loc, mod, type, lang);
  }

  console.log(
    `✅ twentyfive-file-specials.js finished: generated 500,000 Italy‑themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateTwentyFiveFileSpecials().catch((err) => {
  console.error("twentyfive-file-specials.js error:", err.message);
});
