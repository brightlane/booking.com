// fourteen-file-specials.js
//
// 1. Generates:
//    - 1000 penthouse‑style hotel pages
//    - 100 all‑inclusive resort pages
//    - 100 casino hotel pages
//    - 1000 beachfront / beach hotel pages
//
// 2. Uses:
//    - BOOKING.HOME (aid=1858279)
//    - SKY.HOME (offer_id=29465&aff_id=21885)
// 3. Designed for Booking.com‑style SEO + affiliate EPC

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

// Major high‑value cities + destinations
const MAJOR_CITIES = [
  "New York", "Los Angeles", "Las Vegas", "Tokyo", "Dubai", "London",
  "Paris", "Barcelona", "Madrid", "Rome", "Istanbul", "Singapore",
  "Bangkok", "Miami", "Sydney", "Los Angeles", "Toronto", "Vancouver",
  "Rio de Janeiro", "Sao Paulo", "Mexico City",
];

const BEACH_CITIES = [
  "Miami", "Cancun", "Punta Cana", "Malibu", "Miami Beach", "Barbados",
  "Phuket", "Bali", "Cancun", "Atlantis", "Mykonos", "Santorini", "Capri",
  "Naish", "Sharm El Sheikh", "Ibiza", "Sunny Beach",
];

const ALL_INCLUSIVE_RESORTS = [
  "Beaches Resorts - Turks & Caicos",
  "Hilton Rose Hall Resort & Spa",
  "Hyatt Ziva Los Cabos",
  "Dreams Royal Beach Punta Cana",
  "Dreams Riviera Cancun",
  "The Westin Reserva Conchal",
  "Riu Palace",
  "Club Med Punta Cana",
  "Iberostar Playa Paraíso",
  "Barceló Maya Palace",
];

// Casino‑hotel style entries
const CASINO_CITIES = [
  "Las Vegas",
  "Atlantic City",
  "Macau",
  "Singapore",
  "Monte Carlo",
  "Baden‑Baden",
  "Dubai (future integrated resort)",
];

// ==============================
// 1. PAGE TEMPLATE (MULTI‑TYPE)
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function renderPage(name, city, type, suffix, lang = "en") {
  const slug = slugify(name + " " + city);
  const typeMap = {
    "penthouse"      : "Penthouse Suite",
    "all-inclusive"  : "All‑Inclusive Resort",
    "casino"         : "Casino Hotel",
    "beach"          : "Beachfront Resort",
  };
  const typeName = typeMap[type] || "Hotel";

  const modifiers = [
    "Exclusive",
    "Luxury",
    "Ultimate",
    "Premium",
    "VIP",
    "Ocean‑Front",
    "Sky‑High",
  ];

  const mod = modifiers[Math.floor(Math.random() * modifiers.length)];

  const h1 =
    lang === "en" ? `${mod} ${typeName}: ${name} – ${city}`
    : lang === "es" ? `${mod} ${typeName === "Penthouse Suite" ? "Penthouse" : typeName === "All‑Inclusive Resort" ? "Resort Todo Incluido" : "Hotel de Casino"}: ${name} – ${city}`
    : lang === "de" ? `${mod} ${typeName === "Penthouse Suite" ? "Penthouse‑Suite" : typeName} im ${name} – ${city}`
    : `${mod} ${typeName}: ${name} – ${city}`;

  const title =
    lang === "en" ? `${mod} ${typeName} at ${name} in ${city} 2026`
    : lang === "es" ? `${mod} ${typeName === "Penthouse Suite" ? "Suite Penthouse" : typeName} en ${name}, ${city} 2026`
    : lang === "de" ? `${mod} ${typeName === "Penthouse Suite" ? "Penthouse" : typeName} im ${name} in ${city} 2026`
    : `${mod} ${typeName} at ${name} in ${city} 2026`;

  const description =
    lang === "en" ? `Stay in a ${type === "penthouse" ? "sky‑high penthouse suite" : type === "all-inclusive" ? "all‑inclusive resort" : type === "casino" ? "casino hotel with gaming + rooms" : "beachfront resort"} at ${name} in ${city} 2026. Book with Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}).`
    : lang === "es" ? `Disfruta de un ${type === "penthouse" ? "penthouse de lujo" : type === "all-inclusive" ? "resort todo incluido" : type === "casino" ? "hotel de casino con juegos" : "hotel frente al mar"} en ${name}, ${city} 2026. Reserva con Booking.com (${BOOKING.HOME}).`
    : lang === "de" ? `Ein ${type === "penthouse" ? "Penthouse‑Suite" : type === "all-inclusive" ? "All‑Inclusive‑Resort" : type === "casino" ? "Casino‑Hotel" : "Strand‑Resort"} in ${name}, ${city} 2026. Buchen Sie mit Booking.com (${BOOKING.HOME}).`
    : `Stay in a ${typeName} at ${name} in ${city} 2026 with Booking.com (${BOOKING.HOME}).`;

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/${type}/${slug}/${l}.html" />`
    )
    .join("\n  ");

  const filename = `${type}-${slug}-${lang}${suffix ? `-${suffix}` : ""}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

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
  <meta name="keywords" content="${type === "penthouse" ? "penthouse suite" : type}, luxury hotel, ${name}, ${city}, 5 star hotel, all inclusive resort, casino hotel, beachfront resort, 2026 travel, Booking.com affiliate" />
  <link rel="canonical" href="https://yourdomain.com/${type}/${slug}/${lang}.html" />
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
      "name": "LuxBooking2026",
      "url": "https://yourdomain.com/"
    }
  }
  </script>
</head>
<body>
<div class="container py-4">

  <h1>${h1}</h1>

  <p>${description}</p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary" target="_blank">
      Check ${typeName} Deals on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary" target="_blank">
      Compare flights to ${city} (Skyscanner)
    </a>
  </p>

</div>
</body>
</html>
  `;

  fs.ensureFileSync(fullPath);
  fs.writeFileSync(fullPath, content);

  console.log(`✓ ${type}${suffix || ""} → ${filename}`);
}

// ==============================
// 2. GENERATE 1000 PENTHOUSE PAGES
// ==============================

function generatePenthouses() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)];
    const name = `Grand Sky Penthouse ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es", "de"][Math.floor(Math.random() * 3)];

    renderPage(name, city, "penthouse", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} penthouse‑style hotel pages.`);
}

// ==============================
// 3. GENERATE 100 ALL‑INCLUSIVE RESORTS
// ==============================

function generateAllInclusive() {
  let count = 0;

  for (let i = 0; i < 100; i++) {
    const city = MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)];
    const resort = ALL_INCLUSIVE_RESORTS[Math.floor(Math.random() * ALL_INCLUSIVE_RESORTS.length)];
    const name = `${resort} ${i + 1} in ${city}`;
    const lang = ["en", "es"][Math.floor(Math.random() * 2)];

    renderPage(name, city, "all-inclusive", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} all‑inclusive resort pages.`);
}

// ==============================
// 4. GENERATE 100 CASINO HOTELS
// ==============================

function generateCasinoHotels() {
  let count = 0;

  for (let i = 0; i < 100; i++) {
    const city = CASINO_CITIES[Math.floor(Math.random() * CASINO_CITIES.length)];
    const name = `Grand Casino Hotel ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es"][Math.floor(Math.random() * 2)];

    renderPage(name, city, "casino", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} casino hotel pages.`);
}

// ==============================
// 5. GENERATE 1000 BEACH HOTELS
// ==============================

function generateBeachHotels() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = BEACH_CITIES[Math.floor(Math.random() * BEACH_CITIES.length)];
    const name = `Grand Oceanfront Hotel ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es", "de"][Math.floor(Math.random() * 3)];

    renderPage(name, city, "beach", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} beachfront / beach hotel pages.`);
}

// ==============================
// 6. MAIN – fourteen-file-specials.js
// ==============================

async function generateFourteenFileSpecials() {
  await generatePenthouses();
  await generateAllInclusive();
  await generateCasinoHotels();
  await generateBeachHotels();

  console.log(
    "✅ fourteen-file-specials.js finished: 1000 penthouse + 100 all‑inclusive + 100 casino + 1000 beach hotel pages generated."
  );
}

generateFourteenFileSpecials().catch((err) => {
  console.error("fourteen-file-specials.js error:", err.message);
});
