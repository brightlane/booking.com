// twentysix-file-specials.js
//
// 1. Generates 1,000,000 SEO‑friendly France travel pages
//    - One file per page
// 2. Targets:
//    - French cities, regions, departments, coastlines, islands, and trip‑style pages
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

// 1. High‑search‑volume French cities and regions
const FRANCE_LOCATIONS = [
  "Paris",
  "Lyon",
  "Marseille",
  "Nice",
  "Bordeaux",
  "Toulouse",
  "Lille",
  "Nantes",
  "Strasbourg",
  "Montpellier",
  "Rennes",
  "Reims",
  "Dijon",
  "Grenoble",
  "Toulon",
  "Aix‑en‑Provence",
  "Saint‑Étienne",
  "Nantes",
  "Bordeaux",
  "Angers",
  "Rouen",
  "Limoges",
  "Clermont‑Ferrand",
  "Brest",
  "La Rochelle",
  "Tours",
  "Orléans",
  "Amiens",
  "Caen",
  "Poitiers",
  "Perpignan",
  "Annecy",
  "Biarritz",
  "Bayonne",
  "Cannes",
  "Saint‑Tropez",
  "Avignon",
  "Arles",
  "Mont Saint‑Michel",
  "Rouen",
  "Colmar",
  "Épernay",
  "Reims",
  "Mulhouse",
  "Besançon",
  "Metz",
  "Nancy",
  "Orléans",
  "Le Mans",
  "Compiègne",
  "Chantilly",
  "Versailles",
  "Dinan",
  "Concarneau",
  "Saint‑Malo",
  "Dinard",
  "Cap‑Ferret",
  "Arcachon",
  "Royan",
  "Biarrtiz",
  "Bordeaux‑Côte",
  "Côte d'Azur",
  "Provence‑Alpes‑Côte d'Azur",
  "Alsace",
  "Brittany",
  "Normandy",
  "Auvergne‑Rhône‑Alpes",
  "Burgundy‑Franche‑Comté",
  " Pays de la Loire",
  "Occitanie",
  "Grand Est",
  "Nouvelle‑Aquitaine",
  "Corsica",
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
  "wine tour",
  "food tour",
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
  "Luxembourg",
  "Belgium",
  "Spain",
  "Italy",
  "Germany",
  "Switzerland",
  "Monaco",
  "Andorra",
  "UK",
  "Morocco",
  "Tunisia",
  "Algeria",
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
  "château hotel",
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

// 4. France‑specific keywords (2026‑style)
const KEYWORDS = [
  "france travel",
  "france 2026",
  "visit france 2026",
  "france vacation",
  "france trip",
  "france tour",
  "france itinerary",
  "france guide",
  "france tips",
  "france deals",
  "france budget",
  "france luxury",
  "france honeymoon",
  "france family trip",
  "france culture",
  "france food",
  "france wine",
  "france history",
  "france food tour",
  "france wine tour",
  "france walking tour",
  "france city break",
  "france islands",
  "france islands 2026",
  "france coast",
  "france côte d'azur",
  "france normandy",
  "france provence",
  "france burgundy",
  "france alsace",
  "france bretagne",
  "france languedoc",
  "france loire valley",
  "france bordeaux",
  "france lyon",
  "france montpellier",
  "france toulouse",
  "france reims",
  "france strasbourg",
  "france nantes",
  "france toulon",
  "france saint‑étienne",
  "france limoges",
  "france clermont‑ferrand",
  "france biarritz",
  "france la rochelle",
  "france le mans",
  "france tours",
  "france orléans",
  "france angers",
  "france mulhouse",
  "france metz",
  "france nancy",
  "france versailles",
  "france château tour",
  "france champagne region",
  "france champagne tour",
  "france ski resorts",
  "france alps",
  "france pyrénées",
  "france corsica",
  "france rural tourism",
  "france cottages",
  "france gites",
  "france villas",
  "france apartments",
  "france hotels 2026",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to france",
];

// ==============================
// 1. SLUGIFY + FRANCE PAGE TEMPLATE
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

  return `${mod} ${type} ${locPart} France 2026`;
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "en") {
    return `Travel guide to ${mod} ${type} in ${loc}, France 2026, with tips for booking hotels, apartments, and villas. Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to find best deals and flights to France.`;
  } else if (lang === "es") {
    return `Guía de viaje para ${mod} ${type} en ${loc}, Francia 2026, con consejos para reservar hoteles, apartamentos y villas. Usa Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Reiseführer für ${mod} ${type} in ${loc}, Frankreich 2026, mit Tipps zur Buchung von Hotels, Apartments und Villen. Nutzen Sie Booking.com (${BOOKING.HOME}).`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, France 2026, using Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) for hotels and flights.`;
  }
}

function renderFrancePage(loc, mod, type, lang = "en") {
  const slug = slugify(`france‑${loc}.${mod}.${type}`);

  const filename = `fr-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(loc, mod, type, lang);
  const description = generateDescription(loc, mod, type, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/fr/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const keywordStr = KEYWORDS.join(", ").replace("France", loc);

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
  <link rel="canonical" href="https://yourdomain.com/fr/${slug}/${lang}.html" />
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
      "name": "FranceTravelGuide2026",
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
    Use the following links to book stays in France and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in France on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to France (Skyscanner)
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
// 2. GENERATE 1,000,000 FRANCE PAGES
// ==============================

async function generateTwentysixFileSpecials() {
  const combos = [];

  // 1. Cross locations × modifiers × types to 1,000,000 pages
  const total = 1000000;

  for (let i = 0; i < total; i++) {
    const loc = FRANCE_LOCATIONS[i % FRANCE_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = ["en", "es", "de", "fr", "zh"][Math.floor(Math.random() * 5)];

    renderFrancePage(loc, mod, type, lang);
  }

  console.log(
    `✅ twentysix-file-specials.js finished: generated 1,000,000 France‑themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateTwentysixFileSpecials().catch((err) => {
  console.error("twentysix-file-specials.js error:", err.message);
});
