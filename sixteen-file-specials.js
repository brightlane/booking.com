// sixteen-file-specials.js
//
// 1. Generates:
//    - 1000 pet‑friendly hotel pages
//    - 1000 family resort pages
//    - 1000 spa hotel pages
//    - 1000 all‑inclusive resort pages
// 2. Ensures:
//    - Every page has:
//      - BOOKING.HOME (aid=1858279)
//      - SKY.HOME (offer_id=29465&aff_id=21885)
//
// 3. Designed for 2026 SEO + 2026‑style guest expectations (Wi‑Fi, kitchens, amenities)

const fs = require("fs-extra");
const path = require("path");

// Your affiliate links (already in previous files)
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

// High‑volume destinations
const CITIES = [
  "New York", "Los Angeles", "Chicago", "Denver", "Seattle",
  "Miami", "Orlando", "Dallas", "Atlanta", "Philadelphia",
  "London", "Paris", "Barcelona", "Rome", "Madrid",
  "Tokyo", "Singapore", "Dubai", "Bangkok", "Sydney",
  "Toronto", "Vancouver", "Mexico City", "Rio de Janeiro",
];

const BEACH_CITIES = [
  "Miami", "Cancun", "Phuket", "Bali", "Malibu",
  "Barcelona", "Mykonos", "Santorini", "Punta Cana",
  "Maldives", "Boracay", "Lloret de Mar", "Ibiza",
];

const VILLA_DESTINATIONS = [
  "Tuscany", "Lake Como", "Amalfi Coast", "Cotswolds",
  "Saint‑Tropez", "Mykonos", "Capri", "French Riviera",
  "Porto Heli", "Phuket", "Bali", "Maldives", "Cape Town",
];

// ==============================
// 1. SLUGIFY + SEO PAGE TEMPLATE (WITH MANDATORY LINKS)
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function renderPage(name, city, type, suffix, lang = "en") {
  const slug = slugify(name + " " + city);

  const typeMap = {
    "pet-friendly"        : "Pet‑Friendly Hotel",
    "family"              : "Family‑Friendly Resort",
    "spa"                 : "Spa Hotel",
    "all-inclusive-resort": "All‑Inclusive Resort",
  };
  const typeName = typeMap[type] || "Hotel";

  const mods = [
    "Best",
    "Luxury",
    "Pet‑Friendly",
    "Family‑Focused",
    "Premium‑Spa",
    "All‑Inclusive‑Luxury",
  ];
  const mod = mods[Math.floor(Math.random() * mods.length)];

  const h1 =
    lang === "en" ? `${mod} ${typeName}: ${name} – ${city}`
    : lang === "es" ? `${mod} ${typeName === "Pet‑Friendly Hotel" ? "Hotel con Mascotas" : typeName === "Family‑Friendly Resort" ? "Resort Familia" : typeName} en ${name} – ${city}`
    : lang === "de" ? `${mod} ${typeName === "Pet‑Friendly Hotel" ? "Tierfreundliches Hotel" : typeName === "Family‑Friendly Resort" ? "Familienresort" : typeName} im ${name} – ${city}`
    : `${mod} ${typeName}: ${name} – ${city}`;

  const title =
    lang === "en" ? `${mod} ${typeName} at ${name} in ${city} 2026`
    : lang === "es" ? `${mod} ${typeName === "Pet‑Friendly Hotel" ? "Hotel con Mascotas" : typeName} en ${name} ${city} 2026`
    : lang === "de" ? `${mod} ${typeName === "Pet‑Friendly Hotel" ? "Tierfreundliches Hotel" : typeName} im ${name} ${city} 2026`
    : `${mod} ${typeName} at ${name} in ${city} 2026`;

  const description =
    lang === "en" ? `Stay at a ${type === "pet-friendly" ? "pet‑friendly hotel with free Wi‑Fi and kitchenettes" : type === "family" ? "family‑friendly resort with kids' pool and cots" : type === "spa" ? "spa hotel with in‑room Wi‑Fi and large bathroom" : "all‑inclusive resort with free Wi‑Fi and kitchen‑style villas"} at ${name} in ${city} 2026. Book with Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}).`
    : lang === "es" ? `Alojamiento en un ${type === "pet-friendly" ? "hotel con mascotas y Wi‑Fi gratis" : type === "family" ? "resort familiar con piscina infantil" : type === "spa" ? "hotel de spa con Wi‑Fi" : "resort todo incluido con Wi‑Fi y cocina"} en ${name}, ${city} 2026. Reserva con Booking.com (${BOOKING.HOME}).`
    : lang === "de" ? `Übernachtung in einem ${type === "pet-friendly" ? "haustierfreundlichen Hotel mit WLAN und Küchenzeile" : type === "family" ? "familienfreundlichen Resort mit Kinderbecken" : type === "spa" ? "Spa‑Hotel mit WLAN" : "All‑Inclusive‑Resort mit WLAN"} im ${name} in ${city} 2026. Buchen Sie mit Booking.com (${BOOKING.HOME}).`
    : `Stay in a ${typeName === "Pet‑Friendly Hotel" ? "pet‑friendly hotel" : typeName === "Family‑Friendly Resort" ? "family‑friendly resort" : typeName === "Spa Hotel" ? "spa‑oriented hotel" : typeName} featuring free Wi‑Fi and kitchen‑style amenities at ${name} in ${city} 2026.`;

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
  <meta name="keywords" content="${type === "pet-friendly" ? "pet-friendly hotel" : type === "family" ? "family-friendly resort" : type === "spa" ? "spa hotel" : "luxury all-inclusive resort"}, luxury hotel, ${name}, ${city}, hotel with Wi-Fi and kitchen, 2026 travel, Booking.com affiliate, Skyscanner" />
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
      "name": "FamilyPetSpa2026",
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
    <strong>2026 expectations:</strong>
    Free high‑speed Wi‑Fi, in‑room or kitchen‑style amenities, and family‑/pet‑friendliness built into your stay.
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Check ${typeName} Deals on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
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
// 2. 1000 PET‑FRIENDLY HOTEL PAGES
// ==============================

function generatePetFriendlyHotels() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const name = `PetFriendly Inn ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es", "de"][Math.floor(Math.random() * 3)];

    renderPage(name, city, "pet-friendly", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} pet‑friendly hotel pages.`);
}

// ==============================
// 3. 1000 FAMILY RESORT PAGES
// ==============================

function generateFamilyResorts() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const name = `Family Paradise Resort ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es"][Math.floor(Math.random() * 2)];

    renderPage(name, city, "family", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} family resort pages.`);
}

// ==============================
// 4. 1000 SPA HOTEL PAGES
// ==============================

function generateSpaHotels() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const name = `${["Serene", "Oasis", "Lumina", "Harmony"][i % 4]} Spa Hotel ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es", "zh", "de"][Math.floor(Math.random() * 4)];

    renderPage(name, city, "spa", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} spa hotel pages.`);
}

// ==============================
// 5. 1000 ALL‑INCLUSIVE RESORT PAGES (ADDITIONAL)
// ==============================

function generateAllInclusiveResorts() {
  let count = 0;

  for (let i = 0; i < 1000; i++) {
    const city = BEACH_CITIES[Math.floor(Math.random() * BEACH_CITIES.length)];
    const brand = [
      "Sandals",
      "Beaches",
      "Barceló",
      "Club Med",
      "RIU",
      "Dreams",
      "Sunwing",
    ][Math.floor(Math.random() * 7)];
    const name = `${brand} All‑Inclusive Resort ${Math.floor(1000 + Math.random() * 9000)} in ${city}`;
    const lang = ["en", "es", "de"][Math.floor(Math.random() * 3)];

    renderPage(name, city, "all-inclusive-resort", i, lang);
    count++;
  }

  console.log(`✅ Generated ${count} all‑inclusive resort pages.`);
}

// ==============================
// 6. MAIN – sixteen-file-specials.js
// ==============================

async function generateSixteenFileSpecials() {
  await generatePetFriendlyHotels();
  await generateFamilyResorts();
  await generateSpaHotels();
  await generateAllInclusiveResorts();

  console.log(
    "✅ sixteen-file-specials.js finished: 1000 pet‑friendly + 1000 family + 1000 spa + 1000 all‑inclusive resort pages generated."
  );
}

generateSixteenFileSpecials().catch((err) => {
  console.error("sixteen-file-specials.js error:", err.message);
});
