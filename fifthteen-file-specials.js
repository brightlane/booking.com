// fifteen-file-specials.js
//
// 1. Generates:
//    - 1000 extended‑stay hotel pages
//    - 1000 group‑hotel / bulk‑booking pages
//    - 1000 luxury villa pages
//    - 1000 oceanfront resort pages
//
// 2. Uses:
//    - BOOKING.HOME (aid=1858279)
//    - SKY.HOME (offer_id=29465&aff_id=21885)
// 3. Designed for travel + long‑stay + group + luxury EPC

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

// Cities + destinations (high‑volume)
const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Atlanta",
  "Miami", "Orlando", "Dallas", "Seattle", "San Francisco",
  "London", "Paris", "Berlin", "Rome", "Barcelona", "Madrid",
  "Tokyo", "Singapore", "Dubai", "Bangkok", "Sydney", "Toronto",
  "Mumbai", "Johannesburg", "Cape Town", "Mexico City",
];

const BEACH_CITIES = [
  "Miami", "Cancun", "Phuket", "Bali", "Malibu", "Barcelona",
  "Mykonos", "Santorini", "Capri", "Marbella", "Ibiza",
  "Punta Cana", "Boracay", "Maldives", "Cancun", "Turks and Caicos",
];

const VILLA_DESTINATIONS = [
  "Tuscany", "Amalfi Coast", "Cotswolds", "Porto Heli", "Saint‑Tropez",
  "Mykonos", "Phuket", "Maldives", "Bali", "Cape Town", "Capri",
  "Lake Como", "French Riviera",
];

const GROUP_CITIES = [
  "Orlando",
  "Las Vegas",
  "Las Vegas",
  "New York",
  "London",
  "Paris",
  "Barcelona",
  "Madrid",
  "Rome",
  "Tokyo",
];

// ==============================
// 1. URL / FILE SLUG HELPER
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

// ==============================
// 2. SEO PAGE TEMPLATE (MULTI‑TYPE)
// ==============================

function renderPage(name, city, type, suffix, lang = "en") {
  const slug = slugify(name + " " + city);

  const typeMap = {
    "extended-stay" : "Extended‑Stay Hotel",
    "group"         : "Group Hotel / Bulk Booking",
    "villa"         : "Luxury Villa",
    "oceanfront"    : "Oceanfront Resort",
  };
  const typeName = typeMap[type] || "Hotel";

  const modifiers = [
    "Best",
    "Luxury",
    "Extended‑Stay",
    "Group‑Friendly",
    "Private‑Luxury",
    "Exclusive‑Beachfront",
  ];
  const mod = modifiers[Math.floor(Math.random() * modifiers.length)];

  const h1 =
    lang === "en" ? `${mod} ${typeName}: ${name} – ${city}`
    : lang === "es" ? `${mod} ${typeName === "Extended‑Stay Hotel" ? "Hotel Estancia Prolongada" : typeName} ${name} – ${city}`
    : lang === "de" ? `${mod} ${typeName === "Extended‑Stay Hotel" ? "Langzeitaufenthalt" : typeName} im ${name} – ${city}`
    : `${mod} ${typeName}: ${name} – ${city}`;

  const title =
    lang === "en" ? `${mod} ${typeName} at ${name} in ${city} 2026`
    : lang === "es" ? `${mod} ${typeName === "Extended‑Stay Hotel" ? "Estancia Prolongada" : typeName} en ${name} ${city} 2026`
    : lang === "de" ? `${mod} ${typeName === "Extended‑Stay Hotel" ? "Langzeitaufenthalt" : typeName} im ${name} ${city} 2026`
    : `${mod} ${typeName} at ${name} in ${city} 2026`;

  const description =
    lang === "en" ? `Stay at a ${type === "extended-stay" ? "fully‑equipped extended‑stay apartment‑style hotel" : type === "group" ? "group‑oriented hotel for conferences, sports teams, and tours" : type === "villa" ? "private luxury villa with full amenities" : "oceanfront resort with private beach access"} at ${name} in ${city} 2026. Book with Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}).`
    : lang === "es" ? `Alojamiento en un ${type === "extended-stay" ? "hotel de estancia prolongada con cocina y Wi‑Fi" : type === "group" ? "hotel para grupos y eventos" : type === "villa" ? "villa de lujo privada" : "resort frente al mar"} en ${name}, ${city} 2026. Reserva con Booking.com (${BOOKING.HOME}).`
    : lang === "de" ? `Übernachtung in einem ${type === "extended-stay" ? "Langzeitaufenthalt mit Küche und WLAN" : type === "group" ? "gruppentauglichen Hotel" : type === "villa" ? "privaten Luxus‑Villa" : "Ozeanresort"} im ${name} in ${city} 2026. Buchen Sie mit Booking.com (${BOOKING.HOME}).`
    : `Stay in a ${typeName === "Extended‑Stay Hotel" ? "fully‑equipped extended‑stay hotel" : typeName === "Group Hotel / Bulk Booking" ? "group‑oriented hotel" : typeName} located at ${name}, ${city} 2026.`;

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
  <meta name="keywords" content="${type === "extended-stay" ? "extended stay hotel" : type}, luxury hotel, ${name}, ${city}, 5 star hotel, extended stay suite, group hotel booking, luxury villa, private villa, oceanfront resort, beachfront resort, 2026 travel, Booking.com affiliate" />
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
      "name": "StayBooking2026",
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
// 3. 1000 EXTENDED STAY HOTEL PAGES
// ==============================

function generateExtendedStayHotels() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const name = `Extended Stay America ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es", "de"][Math.floor(Math.random() * 3)];

    renderPage(name, city, "extended-stay", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} extended‑stay hotel pages.`);
}

// ==============================
// 4. 1000 GROUP HOTEL PAGES
// ==============================

function generateGroupHotels() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = GROUP_CITIES[Math.floor(Math.random() * GROUP_CITIES.length)];
    const brand = [
      "Hilton",
      "Marriott",
      "Hyatt",
      "Holiday Inn",
      "Sheraton",
      "Radisson",
    ][Math.floor(Math.random() * 6)];
    const name = `${brand} Conference & Group Hotel ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es"][Math.floor(Math.random() * 2)];

    renderPage(name, city, "group", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} group hotel / bulk‑booking pages.`);
}

// ==============================
// 5. 1000 LUXURY VILLA PAGES
// ==============================

function generateLuxuryVillas() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = VILLA_DESTINATIONS[Math.floor(Math.random() * VILLA_DESTINATIONS.length)];
    const name = `Villa ${["Serena", "Celeste", "Oasi", "Lumina", "Edera"][i % 5]} in ${city}`;
    const lang = ["en", "es", "de"][Math.floor(Math.random() * 3)];

    renderPage(name, city, "villa", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} luxury villa pages.`);
}

// ==============================
// 6. 1000 OCEANFRONT RESORT PAGES
// ==============================

function generateOceanfrontResorts() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = BEACH_CITIES[Math.floor(Math.random() * BEACH_CITIES.length)];
    const brand = [
      "Marriott",
      "Hyatt Ziva",
      "Barceló",
      "Club Med",
      "RIU",
      "Sandals",
      "Beaches",
    ][Math.floor(Math.random() * 7)];
    const name = `${brand} Oceanfront Resort ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es", "zh", "de"][Math.floor(Math.random() * 4)];

    renderPage(name, city, "oceanfront", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} oceanfront resort pages.`);
}

// ==============================
// 7. MAIN – fifteen-file-specials.js
// ==============================

async function generateFifteenFileSpecials() {
  await generateExtendedStayHotels();
  await generateGroupHotels();
  await generateLuxuryVillas();
  await generateOceanfrontResorts();

  console.log(
    "✅ fifteen-file-specials.js finished: 1000 extended‑stay + 1000 group + 1000 luxury villa + 1000 oceanfront resort pages."
  );
}

generateFifteenFileSpecials().catch((err) => {
  console.error("fifteen-file-specials.js error:", err.message);
});
