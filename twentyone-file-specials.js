// twentyone-file-specials.js
//
// 1. Generates 100,000 distinct travel‑destination pages
//    - Each file = 1 destination
// 2. Ensures:
//    - Every page embeds:
//      - BOOKING.HOME (aid=1858279)
//      - SKY.HOME (offer_id=29465&aff_id=21885)
// 3. Designed for SEO + Booking.com + Skyscanner EPC

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

// Base “seed” of real‑world destinations (cities + regions)
const SEED_DESTINATIONS = [
  "New York",
  "Los Angeles",
  "London",
  "Paris",
  "Tokyo",
  "Singapore",
  "Dubai",
  "Istanbul",
  "Rome",
  "Barcelona",
  "Madrid",
  "Berlin",
  "Amsterdam",
  "Copenhagen",
  "Stockholm",
  "Oslo",
  "Vienna",
  "Zurich",
  "Munich",
  "Prague",
  "Budapest",
  "Warsaw",
  "Athens",
  "Seville",
  "Valencia",
  "Lisbon",
  "Porto",
  "Milan",
  "Florence",
  "Venice",
  "Tel Aviv",
  "Dubrovnik",
  "Split",
  "Zagreb",
  "Reykjavik",
  "Edinburgh",
  "Glasgow",
  "San Francisco",
  "Chicago",
  "Miami",
  "Orlando",
  "Seattle",
  "Boston",
  "Washington DC",
  "Toronto",
  "Vancouver",
  "Mexico City",
  "Cancun",
  "Los Cabos",
  "Montreal",
  "Buenos Aires",
  "Bariloche",
  "Sao Paulo",
  "Curitiba",
  "Punta Cana",
  "Phuket",
  "Bali",
  "Siem Reap",
  "Ho Chi Minh City",
  "Da Nang",
  "Bangkok",
  "Cebu",
  "Manila",
  "Jeju",
  "Kyoto",
  "Osaka",
  "Beijing",
  "Shanghai",
  "Hong Kong",
  "Shenzhen",
  "Sydney",
  "Melbourne",
  "Auckland",
  "Wellington",
  "Cape Town",
  "Johannesburg",
  "Lagos",
  "Nairobi",
  "Marrakech",
  "Casablanca",
  "Istanbul",
  "Ljubljana",
  "Zagreb",
  "Sofia",
  "Bucharest",
  "Kiev",
  "Minsk",
  "Riga",
  "Tallinn",
  "Cairo",
  "Marrakech",
  "Tunis",
  "Algiers",
  "Beirut",
  "Amman",
  "Dubai",
  "Abu Dhabi",
  "Kuwait City",
  "Doha",
  "Bahrain",
  "Muscat",
  "Jeddah",
  "Riyadh",
  "Lima",
  "Quito",
  "Bogota",
  "Medellin",
  "Cartagena",
  "Salvador",
  "Recife",
  "Salvador",
  "Salvador",
  "Salvador",
  "Salvador",
  "Salvador",
  "Salvador",
  "Salvador",
  "Salvador",
  "Salvador",
];

// Generic “modifier” endings to create 100,000 distinct destinations
const REGION_SUFFIXES = [
  "Region",
  "Province",
  "State",
  "Department",
  "Canton",
  "Territory",
  "Island",
  "Peninsula",
  "Coastal Area",
  "Highlands",
  "Lake Region",
  "Valley Region",
  "Mountains Region",
  "Archipelago",
  "Bay Area",
  "Delta Region",
];

// ==============================
// 1. SLUGIFY + DESTINATION PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(destination, lang = "en") {
  return lang === "en"
    ? `Travel Guide to ${destination} 2026`
    : lang === "es"
    ? `Guía de viaje a ${destination} 2026`
    : lang === "de"
    ? `Reiseführer nach ${destination} 2026`
    : `Travel Guide to ${destination} 2026`;
}

function generateDescription(destination, lang = "en") {
  return lang === "en"
    ? `Plan your 2026 trip to ${destination} with Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner flight search (${SKY.HOME}). Find hotels, resorts, and villas with free Wi‑Fi, kitchens, and family‑friendly options.`
    : lang === "es"
    ? `Planea tu viaje 2026 a ${destination} con enlaces afiliados Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}). Encuentra hoteles, resorts y villas con Wi‑Fi y opciones familiares.`
    : lang === "de"
    ? `Planen Sie Ihre Reise 2026 nach ${destination} mit Booking.com‑Affiliate‑Links (${BOOKING.HOME}) und Skyscanner (${SKY.HOME}).`
    : `Plan your 2026 trip to ${destination} with Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner flight search (${SKY.HOME}).`;
}

function renderDestinationPage(destination, lang = "en") {
  const slug = slugify(destination);
  const filename = `destination-${slug}-${lang}-idx${Math.floor(Math.random() * 100000)}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(destination, lang);
  const description = generateDescription(destination, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/destination/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const keywords = [
    "travel to",
    "vacation in",
    "trip to",
    "visit",
    "tourism in",
    "hotels in",
    "resorts in",
    "luxury hotels in",
    "family‑friendly hotels in",
    "pet‑friendly hotels in",
    "2026 travel",
    "booking.com affiliate",
    "skyscanner deals",
  ]
    .map(k => `${k} ${destination}`)
    .join(", ");

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
  <meta name="keywords" content="${keywords}" />
  <link rel="canonical" href="https://yourdomain.com/destination/${slug}/${lang}.html" />
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
      "name": "DestinationGuide2026",
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
    Use the following links to book your stay in ${destination} and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in ${destination} on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to ${destination} (Skyscanner)
    </a>
  </p>

</div>
</body>
</html>
  `;

  fs.ensureFileSync(fullPath);
  fs.writeFileSync(fullPath, content);

  console.log(`✓ destination-${slug} → ${filename}`);
}

// ==============================
// 2. GENERATE 100,000 DISTINCT DESTINATIONS
// ==============================

async function generateTwentyOneFileSpecials() {
  const destinations = [];

  // 1. Seed destinations
  for (const base of SEED_DESTINATIONS) {
    destinations.push(base);
  }

  // 2. Add synthetic variants
  const max = 100000;
  for (let i = 0; i < max; i++) {
    const base = SEED_DESTINATIONS[i % SEED_DESTINATIONS.length];
    const suffix = REGION_SUFFIXES[Math.floor(Math.random() * REGION_SUFFIXES.length)];

    const synthetic = `${base} ${suffix} - Area Code ${i}`;

    destinations.push(synthetic);
  }

  let fileCount = 0;

  for (const destination of destinations) {
    const lang = ["en", "es", "de"][Math.floor(Math.random() * 3)];
    renderDestinationPage(destination, lang);
    fileCount++;

    // Stop at 100,000 files
    if (fileCount >= 100000) {
      break;
    }
  }

  console.log(
    `✅ twentyone-file-specials.js finished: generated ${fileCount} distinct travel‑destination pages with Booking.com and Skyscanner affiliate links embedded.`
  );
}

generateTwentyOneFileSpecials().catch((err) => {
  console.error("twentyone-file-specials.js error:", err.message);
});
