// generate-pages-daemon.js
//
// 1. Runs forever, continuously generating high‑quality hotel pages
// 2. Uses affiliates.js (BOOKING + SKY, all URLs intact)
// 3. Writes into ./output
// 4. Home page → https://www.booking.com/index.html?aid=8132800 (GitHub)
// 5. Skyscanner → https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885

const fs = require("fs-extra");
const path = require("path");
const { BOOKING, SKY, pickBooking, pickSky } = require("./affiliates.js");

const OUTPUT_DIR = path.resolve("./output");

// 1. Big list of cities and “near” targets
const CITIES = [
  "New York", "London", "Paris", "Tokyo", "Dubai", "Los Angeles",
  "Sydney", "Bangkok", "Rome", "Barcelona", "Amsterdam", "Berlin",
  "Istanbul", "Mumbai", "Cairo", "Mexico City", "Toronto", "Singapore",
  "Moscow", "Madrid", "Seoul", "Osaka", "Hong Kong", "Kuala Lumpur",
  "Cape Town", "Phuket", "Hanoi", "Ho Chi Minh City", "Sao Paulo",
  "Shanghai", "Beijing", "Jerusalem", "Delhi", "Marrakech",
  "Luxor", "Bali", "Las Vegas", "Venice", "Prague", "Vienna",
  "Lisbon", "Dublin", "Zurich", "Munich", "Athens", "Split",
  "Milan", "Florence", "Naples", "Palermo", "Valencia", "Málaga",
  "Seville", "Lyon", "Marseille", "Nice", "Gothenburg", "Copenhagen",
  "Oslo", "Stockholm", "Helsinki", "Warsaw", "Budapest", "Brussels",
  "Luxembourg", "Dubrovnik", "Santorini",
];

const NEAR_TARGETS = [
  "airport", "downtown", "city center", "beach", "railway station",
  "train station", "metro station", "shopping mall", "shopping center",
  "university", "college campus", "conference center", "convention center",
  "amusement park", "theme park", "stadium", "sports stadium",
  "hospital", "medical center", "shopping district", "business district",
  "landmark", "famous landmark", "tourist attraction", "tourist spot",
  "airport terminal", "airport departures", "airport arrivals", "cruise terminal",
  "ferry terminal", "bus station", "airport shuttle drop‑off",
];

// 2. Modifiers for quality variation
const MODIFIERS = [
  "cheap", "luxury", "budget", "romantic", "family", "business",
  "airport", "city center", "nearby", "best", "top", "all inclusive",
  "pet friendly", "eco", "green", "apartment", "villa", "resort",
  "boutique", "design", "hostel", "motel", "ryokan",
];

// 3. Languages (you can expand later)
const LANGS = ["en"];

// 4. Slugify helper
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
}

// 5. Generate a single high‑quality hotel page
function generateHotelPage(city, near, mod, lang = "en") {
  const base = Math.random() < 0.5 ? "hotel-in" : "hotels-in";
  const nearStr = near || "";
  const in_city_str = nearStr ? `near ${nearStr}` : `in ${city}`;

  const slug = slugify(
    `${base}-${city}-${nearStr}-${mod}-${Math.floor(
      Math.random() * 999999
    )}`
  );

  const filename = `ht-${Math.floor(1000000 + Math.random() * 9000000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = `Best ${mod} ${base} ${in_city_str} in ${city} 2026`;

  const description =
    `Find the best ${mod} ${base} ${in_city_str} in ${city} 2026 with deals and reviews. ` +
    `Use Booking.com and Skyscanner to book your stay and compare flights.`;

  // Randomly pick one of your 6 Booking.com URLs
  const bookingUrl = pickBooking();

  // Pick Skyscanner URL (you can add rotation later if you get more SKY IDs)
  const skyscannerUrl = pickSky();

  const hreflang = lang === "en"
    ? ""
    : `<link rel="alternate" hreflang="${lang}" href="https://yourdomain.com/hotel-in/${slug}/${lang}.html" />`;

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
  <link rel="canonical" href="https://yourdomain.com/hotel-in/${slug}/${lang}.html" />
  ${hreflang}
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "HotelInDeals",
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
    When people search for where to stay <strong>${base} ${in_city_str} in ${city}</strong>, 
    they often type phrases like <code>${base} ${in_city_str} in ${city}</code> or 
    <code>hotels ${base} ${in_city_str} in ${city}</code>.
  </p>

  <p>
    Use the following links to book stays and flights:
  </p>

  <p>
    <a href="${bookingUrl}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book ${base} ${in_city_str}, ${city} on Booking.com (aid=8132800, GitHub)
    </a>
  </p>

  <p>
    <a href="${skyscannerUrl}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare flights to ${city} (Skyscanner)
    </a>
  </p>

</div>
</body>
</html>
`;

  fs.ensureFileSync(fullPath);
  fs.writeFileSync(fullPath, content);

  return filename;
}

// 6. Infinite‑loop “daemon”
async function runDaemon() {
  console.log("✅ generate-pages-daemon.js started – writing high‑quality pages non‑stop.");

  // Ensure output directory exists
  fs.ensureDirSync(OUTPUT_DIR);

  let pageCounter = 0;

  while (true) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const near = NEAR_TARGETS[Math.floor(Math.random() * NEAR_TARGETS.length)];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    const filename = generateHotelPage(city, near, mod, lang);
    pageCounter++;

    if (pageCounter % 1000 === 0) {
      console.log(`✅ ${pageCounter.toLocaleString()} pages generated so far.`);
    }

    // Tiny pause so Node doesn’t melt your disk in one burst
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
}

runDaemon().catch((err) => {
  console.error("generate-pages-daemon.js error:", err);
});
