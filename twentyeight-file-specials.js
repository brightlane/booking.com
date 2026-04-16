// twentyeight-file-specials.js
//
// 1. Generates 3,000,000 SEO‑friendly U.S. travel pages
//    - One file per page
// 2. Targets:
//    - U.S. states, cities, regions, coastlines, and trip‑style pages
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

// 1. High‑search‑volume U.S. states and regions
const US_LOCATIONS = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Seattle",
  "Denver",
  "El Paso",
  "Washington DC",
  "Boston",
  "Las Vegas",
  "Nashville",
  "Portland",
  "Orlando",
  "Atlanta",
  "Miami",
  "Detroit",
  "Buffalo",
  "Raleigh",
  "Memphis",
  "Louisville",
  "Oklahoma City",
  "New Orleans",
  "Cleveland",
  "Tucson",
  "Albuquerque",
  "Fresno",
  "Sacramento",
  "Long Beach",
  "Kansas City",
  "Mesa",
  "Virginia Beach",
  "Atlanta",
  "Miami",
  "Las Vegas",
  "Nashville",
  "Orlando",
  "Honolulu",
  "Austin, Texas",
  "Portland, Oregon",
  "Raleigh, North Carolina",
  "Memphis, Tennessee",
  "New Orleans, Louisiana",
  "Cleveland, Ohio",
  "Tucson, Arizona",
  "Albuquerque, New Mexico",
  "Fresno, California",
  "Sacramento, California",
  "Kansas City, Missouri",
  "Virginia Beach, Virginia",
  "Dallas‑Fort Worth",
  "San Francisco Bay Area",
  "Greater Los Angeles",
  "Greater New York",
  "Greater Chicago",
  "Greater Boston",
  "Greater Seattle",
  "Greater Phoenix",
  "Greater Denver",
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
  "road trip",
  "city break",
  "beach trip",
  "national park trip",
  "hiking trip",
  "ski trip",
  "city tour",
  "food tour",
  "cultural tour",
  "history tour",
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
  "road trip itineraries",
  "coastal trip",
  "mountain trip",
  "lake trip",
];

// 3. Hotel / property types
const HOTEL_TYPES = [
  "hotel",
  "resort",
  "bed and breakfast",
  "apartment",
  "villa",
  "cabin",
  "cottage",
  "lodge",
  "guesthouse",
  "city center hotel",
  "airport hotel",
  "pet‑friendly",
  "family‑friendly",
  "luxury hotel",
  "budget hotel",
  "spa hotel",
  "all‑inclusive",
];

// 4. U.S.‑specific keywords (2026‑style)
const KEYWORDS = [
  "united states travel",
  "united states 2026",
  "visit united states 2026",
  "united states vacation",
  "united states trip",
  "united states tour",
  "united states itinerary",
  "united states guide",
  "united states tips",
  "united states deals",
  "united states budget",
  "united states luxury",
  "united states honeymoon",
  "united states family trip",
  "united states road trip",
  "united states city break",
  "united states national parks",
  "united states beaches",
  "united states ski resorts",
  "united states cities",
  "united states states",
  "united states national parks 2026",
  "united states road trips 2026",
  "united states city breaks 2026",
  "united states beach holidays 2026",
  "united states ski trips 2026",
  "united states cultural tours",
  "united states food tours",
  "united states history tours",
  "united states universities tours",
  "united states business travel",
  "united states remote work",
  "united states digital nomad",
  "united states extend stay",
  "united states airport hotels",
  "united states city hotels",
  "united states beachfront hotels",
  "united states lodge",
  "united states cabin",
  "united states cottage",
  "united states resort",
  "united states all‑inclusive resort",
  "united states pet friendly",
  "united states family friendly",
  "united states luxury hotel",
  "united states budget hotel",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to united states",
];

// ==============================
// 1. SLUGIFY + U.S. PAGE TEMPLATE
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

  return `${mod} ${type} ${locPart} United States 2026`;
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "en") {
    return `Travel guide to ${mod} ${type} in ${loc}, United States 2026, with tips for booking hotels, apartments, and villas. Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to find best deals and flights to the United States.`;
  } else if (lang === "es") {
    return `Guía de viaje para ${mod} ${type} en ${loc}, Estados Unidos 2026, con consejos para reservar hoteles, apartamentos y villas. Usa Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Reiseführer für ${mod} ${type} in ${loc}, Vereinigte Staaten 2026, mit Tipps zur Buchung von Hotels, Apartments und Villen. Nutzen Sie Booking.com (${BOOKING.HOME}).`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, United States 2026, using Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) for hotels and flights.`;
  }
}

function renderUsPage(loc, mod, type, lang = "en") {
  const slug = slugify(`us‑${loc}.${mod}.${type}`);

  const filename = `us-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(loc, mod, type, lang);
  const description = generateDescription(loc, mod, type, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/us/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const keywordStr = KEYWORDS.join(", ").replace("United States", loc);

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
  <link rel="canonical" href="https://yourdomain.com/us/${slug}/${lang}.html" />
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
      "name": "USTravelGuide2026",
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
    Use the following links to book stays in the United States and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in the United States on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to the United States (Skyscanner)
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
// 2. GENERATE 3,000,000 U.S. PAGES
// ==============================

async function generateTwentyeightFileSpecials() {
  const combos = [];

  // 1. Cross locations × modifiers × types to 3,000,000 pages
  const total = 3000000;

  for (let i = 0; i < total; i++) {
    const loc = US_LOCATIONS[i % US_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = ["en", "es", "de", "fr", "zh"][Math.floor(Math.random() * 5)];

    renderUsPage(loc, mod, type, lang);
  }

  console.log(
    `✅ twentyeight-file-specials.js finished: generated 3,000,000 United States–themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateTwentyeightFileSpecials().catch((err) => {
  console.error("twentyeight-file-specials.js error:", err.message);
});
