// thirtyone-file-specials.js
//
// 1. Generates 6,000,000 SEO‑friendly Turkey travel pages
//    - One file per page
// 2. Targets:
//    - Turkish cities, regions, coasts, and trip‑style pages
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

// 1. High‑search‑volume Turkish cities, regions, and coasts
const TURKEY_LOCATIONS = [
  "Istanbul",
  "Antalya",
  "Cappadocia",
  "Bodrum",
  "Ephesus",
  "Pamukkale",
  "Izmir",
  "Marmaris",
  "Fethiye",
  "Oludeniz",
  "Kas",
  "Datca",
  "Kalkan",
  "Fethiye",
  "Gocek",
  "Olympos",
  "Belek",
  "Alanya",
  "Marmaris",
  "Rhodes nearby",
  "Black Sea Coast",
  "Trabzon",
  "Sumela",
  "Gaziantep",
  "Göbeklitepe",
  "Harran",
  "Diyarbakir",
  "Mount Nemrut",
  "Hasankeyf",
  "Turkish Riviera",
  "Turquoise Coast",
  "Aegean Coast",
  "Mediterranean Coast",
  "Eastern Anatolia",
  "Southeastern Anatolia",
  "Cappadocia Region",
  "Istanbul Province",
  "Izmir Province",
  "Antalya Province",
  "Mugla Province",
  "Bursa",
  "Canakkale",
  "Pergamon",
  "Bergama",
  "Çeşme",
  "Alaçatı",
  "İzmir",
  "Aydin",
  "Kuşadası",
  "Bodrum",
  "Marmaris",
  "Fethiye",
  "Alanya",
  "Belek",
  "Side",
  "Kemer",
  "Kalkan",
  "Göcek",
  "Demre",
  "Kas",
  "Olympos",
  "Patara",
  "Fethiye",
  "Marmaris",
  "Bodrum",
  "Istanbul",
  "Antalya",
  "Cappadocia",
  "Pamukkale",
  "Bodrum",
  "Izmir",
  "Marmaris",
  "Fethiye",
  "Oludeniz",
  "Kas",
  "Datca",
  "Gocek",
  "Olympos",
  "Belek",
  "Alanya",
  "Kalkan",
  "Diyarbakir",
  "Gaziantep",
  "Göbeklitepe",
  "Harran",
  "Mount Nemrut",
  "Hasankeyf",
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
  "city tour",
  "food tour",
  "hiking tour",
  "beach trip",
  "resort stay",
  "long‑stay",
  "luxury trip",
  "budget trip",
  "2026 travel",
  "2026 itinerary",
  "best time to visit",
  "how to get there",
  "public transport",
  "local cuisine",
  "hidden gems",
];

// 3. Hotel / property types
const HOTEL_TYPES = [
  "hotel",
  "resort",
  "apartment",
  "villa",
  "guesthouse",
  "city hotel",
  "airport hotel",
  "pet‑friendly",
  "family‑friendly",
  "luxury hotel",
  "budget hotel",
  "spa hotel",
  "all‑inclusive",
];

// 4. Turkey‑specific keywords (2026‑style)
const KEYWORDS = [
  "turkey travel",
  "turkey 2026",
  "visit turkey 2026",
  "turkey vacation",
  "turkey trip",
  "turkey tour",
  "turkey itinerary",
  "turkey guide",
  "turkey tips",
  "turkey deals",
  "turkey budget",
  "turkey luxury",
  "turkey honeymoon",
  "turkey family trip",
  "turkey cultural tour",
  "turkey history tour",
  "turkey city break",
  "turkey beach holiday",
  "turkey national parks",
  "turkey mountains",
  "turkey Mediterranean coast",
  "turkey Aegean coast",
  "turkey Black Sea coast",
  "turkey Turkish Riviera",
  "turkey Turquoise Coast",
  "turkey Istanbul",
  "turkey Cappadocia",
  "turkey Antalya",
  "turkey Bodrum",
  "turkey Izmir",
  "turkey Marmaris",
  "turkey Fethiye",
  "turkey Oludeniz",
  "turkey Kas",
  "turkey Datca",
  "turkey Gocek",
  "turkey Olympos",
  "turkey Belek",
  "turkey Alanya",
  "turkey Kalkan",
  "turkey Pamukkale",
  "turkey Ephesus",
  "turkey Göbeklitepe",
  "turkey Harran",
  "turkey Diyarbakir",
  "turkey Mount Nemrut",
  "turkey Hasankeyf",
  "turkey Black Sea region",
  "turkey Southeastern Anatolia",
  "turkey Eastern Anatolia",
  "turkey Aegean region",
  "turkey Mediterranean region",
  "turkey 2026 tourism",
  "turkey 2026 tourism guide",
  "turkey 2026 travel tips",
  "turkey 2026 itineraries",
  "turkey 2026 tours",
  "turkey 2026 food tours",
  "turkey 2026 cultural tours",
  "turkey 2026 beach holidays",
  "turkey 2026 city breaks",
  "turkey 2026 resort stays",
  "turkey 2026 all‑inclusive",
  "turkey 2026 apartments",
  "turkey 2026 villas",
  "turkey 2026 hotels",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to turkey",
];

// ==============================
// 1. SLUGIFY + TURKEY PAGE TEMPLATE
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

  return `${mod} ${type} ${locPart} Turkey 2026`;
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "en") {
    return `Travel guide to ${mod} ${type} in ${loc}, Turkey 2026, with tips for booking hotels, apartments, and villas. Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to find best deals and flights to Turkey.`;
  } else if (lang === "es") {
    return `Guía de viaje para ${mod} ${type} en ${loc}, Turquía 2026, con consejos para reservar hoteles, apartamentos y villas. Usa Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Reiseführer für ${mod} ${type} in ${loc}, Türkei 2026, mit Tipps zur Buchung von Hotels, Apartments und Villen. Nutzen Sie Booking.com (${BOOKING.HOME}).`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, Turkey 2026, using Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) for hotels and flights.`;
  }
}

function renderTurkeyPage(loc, mod, type, lang = "en") {
  const slug = slugify(`turkey‑${loc}.${mod}.${type}`);

  const filename = `tr-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(loc, mod, type, lang);
  const description = generateDescription(loc, mod, type, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/tr/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const keywordStr = KEYWORDS.join(", ").replace("Turkey", loc);

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
  <link rel="canonical" href="https://yourdomain.com/tr/${slug}/${lang}.html" />
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
      "name": "TurkeyTravelGuide2026",
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
    Use the following links to book stays in Turkey and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Turkey on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Turkey (Skyscanner)
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
// 2. GENERATE 6,000,000 TURKEY PAGES
// ==============================

async function generateThirtyoneFileSpecials() {
  const combos = [];

  // 1. Cross locations × modifiers × types to 6,000,000 pages
  const total = 6000000;

  for (let i = 0; i < total; i++) {
    const loc = TURKEY_LOCATIONS[i % TURKEY_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = ["en", "es", "de", "fr", "zh"][Math.floor(Math.random() * 5)];

    renderTurkeyPage(loc, mod, type, lang);
  }

  console.log(
    `✅ thirtyone-file-specials.js finished: generated 6,000,000 Turkey‑themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtyoneFileSpecials().catch((err) => {
  console.error("thirtyone-file-specials.js error:", err.message);
});
