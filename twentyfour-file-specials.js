// twentyfour-file-specials.js
//
// 1. Generates 200,000 SEO‑friendly Las Vegas travel pages
//    - One file per page
// 2. Targets:
//    - Las Vegas hotels, casinos, resorts, events, neighborhoods, and trip‑style pages
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

// 1. Core Las Vegas areas and clusters
const LAS_VEGAS_AREAS = [
  "Las Vegas Strip",
  "Downtown Las Vegas",
  "Summerlin",
  "Henderson",
  "Paradise",
  "Spring Valley",
  "Winchester",
  "Centennial Hills",
  "Aliante",
  "North Las Vegas",
  "South Las Vegas",
];

// 2. Hotel / property types
const HOTEL_TYPES = [
  "hotel",
  "resort",
  "casino hotel",
  "luxury hotel",
  "budget hotel",
  "barcelona style hotel",
  "family‑friendly hotel",
  "pet‑friendly hotel",
  "spa hotel",
  "all‑inclusive hotel",
  "apartment‑style hotel",
  "extended‑stay hotel",
  "airport hotel",
  "business hotel",
];

// 3. Trip‑style / visitor‑intent modifiers
const MODIFIERS = [
  "planning",
  "planner",
  "guide",
  "tips",
  "deals",
  "packages",
  "weekend",
  "long‑weekend",
  "family trip",
  "honeymoon",
  "romantic getaway",
  "bachelor party",
  "bachelorette",
  "conference",
  "business trip",
  "remote‑work",
  "budget trip",
  "luxury trip",
  "2026 travel",
  "2026 itinerary",
  "first‑time",
  "seasonal",
  "off‑season",
  "off‑peak",
  "all‑inclusive",
];

// 4. SEO‑style keywords (Las Vegas)
const KEYWORDS = [
  "las vegas",
  "las vegas strip",
  "las vegas hotels",
  "las vegas resorts",
  "las vegas casinos",
  "las vegas 2026",
  "las vegas travel",
  "las vegas guide",
  "las vegas tips",
  "las vegas deals",
  "las vegas budget",
  "las vegas luxury",
  "las vegas family",
  "las vegas honeymoon",
  "las vegas bachelor party",
  "las vegas bachelorette",
  "las vegas weekend",
  "las vegas weekend getaway",
  "las vegas hotels near the strip",
  "las vegas hotels near airport",
  "las vegas extended stay",
  "las vegas apartments",
  "las vegas all‑inclusive",
  "las vegas events 2026",
  "las vegas concerts 2026",
  "las vegas sports events 2026",
  "las vegas wedding venue",
  "las vegas nightlife 2026",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to las vegas",
];

// ==============================
// 1. SLUGIFY + LSV PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(area, type, mod, lang = "en") {
  const areaPart =
    lang === "en" ? `in Las Vegas` :
    lang === "es" ? `en Las Vegas` :
    lang === "de" ? `in Las Vegas` :
    `in Las Vegas`;

  const typePart =
    lang === "en" ? type :
    lang === "es" ? type === "hotel" ? "hotel" : "resort" :
    lang === "de" ? type === "hotel" ? "Hotel" : "Resort" :
    type;

  return `${mod} ${typePart} ${areaPart} ${area} 2026`;
}

function generateDescription(area, type, mod, lang = "en") {
  if (lang === "en") {
    return `Guide to ${mod} ${type} in Las Vegas ${area} 2026, with tips to find the best hotel deals, casino packages, shows, and events. Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to book stays and flights.`;
  } else if (lang === "es") {
    return `Guía de ${mod} ${type} en Las Vegas ${area} 2026, con consejos para encontrar mejores hoteles, paquetes de casino y eventos. Reserva con Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Leitfaden für ${mod} ${type} in Las Vegas ${area} 2026, mit Tipps für Hotel‑Deals, Casino‑Pakete und Events. Buchen Sie mit Booking.com (${BOOKING.HOME}).`;
  } else {
    return `Guide to ${mod} ${type} in Las Vegas ${area} 2026, using Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) for hotels and flights.`;
  }
}

function renderLvPage(area, type, mod, lang = "en") {
  const slug = slugify(`las‑vegas‑${area}.${type}.${mod}`);

  const filename = `lv-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(area, type, mod, lang);
  const description = generateDescription(area, type, mod, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/lv/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const keywordStr = KEYWORDS.join(", ").replace("Las Vegas", area);

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
  <link rel="canonical" href="https://yourdomain.com/lv/${slug}/${lang}.html" />
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
      "name": "LasVegasGuide2026",
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
    Use the following links to book hotels in Las Vegas and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Las Vegas on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Las Vegas (Skyscanner)
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
// 2. GENERATE 200,000 LAS VEGAS PAGES
// ==============================

async function generateTwentyFourFileSpecials() {
  const combos = [];

  // 1. Cross all areas × types × modifiers to get 200,000 permutations
  const total = 200000;

  for (let i = 0; i < total; i++) {
    const area = LAS_VEGAS_AREAS[i % LAS_VEGAS_AREAS.length];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const lang = ["en", "es", "de", "fr", "zh"][Math.floor(Math.random() * 5)];

    renderLvPage(area, type, mod, lang);
  }

  console.log(
    `✅ twentyfour-file-specials.js finished: generated 200,000 Las Vegas–themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateTwentyFourFileSpecials().catch((err) => {
  console.error("twentyfour-file-specials.js error:", err.message);
});
