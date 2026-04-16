// thirtysix-nine-specials.js
//
// 1. Generates 20,000,000 SEO‑friendly "hotel in / hotels in" pages
// 2. Uses Booking.com + Skyscanner affiliate links
// 3. Every page is built on:
//    - "hotel in [city]" or "hotels in [city]" style intent
// 4. Languages: en, es, zh, ja, ar

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

// 1. Big list of cities/regions (can be expanded or replaced)
const CITIES = [
  "New York",
  "Tokyo",
  "Paris",
  "London",
  "Dubai",
  "Los Angeles",
  "Sydney",
  "Bangkok",
  "Rome",
  "Barcelona",
  "Amsterdam",
  "Berlin",
  "Istanbul",
  "Mumbai",
  "Cairo",
  "Mexico City",
  "Toronto",
  "Singapore",
  "Rio de Janeiro",
  "Seoul",
  "Madrid",
  "Chicago",
  "Frankfurt",
  "Munich",
  "Vienna",
  "Prague",
  "Lisbon",
  "Budapest",
  "Dublin",
  "Zurich",
  "Milan",
  "Venice",
  "Athens",
  "Split",
  "Valletta",
  "Cape Town",
  "Kuala Lumpur",
  "Phuket",
  "Cancun",
  "Las Vegas",
  "Bali",
  "Hanoi",
  "Ho Chi Minh City",
  "Sao Paulo",
  "Nairobi",
  "Marrakesh",
  "Lagos",
  "Karachi",
  "Beijing",
  "Shanghai",
  "Hong Kong",
  "Osaka",
  "Oslo",
  "Stockholm",
  "Copenhagen",
  "Brussels",
  "Vienna",
  "Warsaw",
  "Kraków",
  "Edinburgh",
  "Manchester",
  "Cardiff",
  "Glasgow",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Hamburg",
  "Marseille",
  "Lyon",
  "Nice",
  "Florence",
  "Naples",
  "Palermo",
  "Valencia",
  "Málaga",
  "Seville",
  "Zagreb",
  "Sarajevo",
  "Tbilisi",
  "Baku",
  "Almaty",
  "Astana",
  "Dubai",
  "Abu Dhabi",
  "Manila",
  "Cebu",
  "Jakarta",
  "Surabaya",
  "Istanbul",
  "Ankara",
  "Izmir",
  "Cape Town",
  "Durban",
  "Johannesburg",
  "Tel Aviv",
  "Jerusalem",
  "Amman",
  "Damascus",
  "Beirut",
];

// 2. Trip‑style / object modifiers
const MODIFIERS = [
  "cheap",
  "luxury",
  "budget",
  "romantic",
  "family",
  "business",
  "airport",
  "city center",
  "near",
  "best",
  "top",
  "all inclusive",
  "pet friendly",
];

// 3. Languages
const LANGS = ["en", "es", "zh", "ja", "ar"];

// 4. SEO‑style base keywords (core phrase: "hotel in" / "hotels in")
const KEYWORD_BASES = [
  "hotel in",
  "hotels in",
  "cheap hotel in",
  "luxury hotel in",
  "budget hotel in",
  "best hotels in",
  "tourist hotels in",
  "family hotel in",
  "business hotel in",
  "airport hotel in",
  "city center hotel in",
  "near hotel in",
  "near hotels in",
  "cheap hotels in",
  "luxury hotels in",
  "budget hotels in",
  "best hotels in",
  "tourist hotels in",
  "family hotels in",
  "business hotels in",
  "airport hotels in",
  "city center hotels in",
];

// 5. Full keyword‑phrase style (plus extra SEO flavor)
const KEYWORDS = KEYWORD_BASES
  .flatMap((base) =>
    CITIES.map(
      (c) => `${base} ${c.toLowerCase()} 2026 booking discounts`
    )
  );

// ==============================
// 1. SLUGIFY + PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(city, mod, lang = "en") {
  const base = Math.random() < 0.5 ? "hotel in" : "hotels in";
  const langTitle =
    lang === "en" ? `Best ${mod} ${base} ${city} – 2026 Deals`
    : lang === "es" ? `Mejores hoteles en ${city} ${mod} 2026`
    : lang === "zh" ? `${city} ${mod} 2026 最佳酒店`
    : lang === "ja" ? `${city} ${mod} 2026 おすすめホテル`
    : lang === "ar" ? `أفضل ${mod} ${base} ${city} 2026`;

  return langTitle;
}

function generateDescription(city, mod, lang = "en") {
  const base = Math.random() < 0.5 ? "hotel in" : "hotels in";

  if (lang === "en") {
    return `Find the best ${mod} ${base} ${city} 2026 with deals and reviews. Use Booking.com and Skyscanner to book your stay and compare flights.`;
  } else if (lang === "es") {
    return `Encuentra los mejores hoteles en ${city} ${mod} 2026 con ofertas y reseñas. Usa Booking.com y Skyscanner para reservar tu estadía y comparar vuelos.`;
  } else if (lang === "zh") {
    return `寻找 2026 年${city} ${mod} 最佳${base}，带优惠和点评。使用 Booking.com 和 Skyscanner 预订和比较航班。`;
  } else if (lang === "ja") {
    return `${city} 2026 年の${mod} ${base}をお探しですか。割引と口コミを見て、Booking.com と Skyscanner で宿泊と便を比較・予約できます。`;
  } else if (lang === "ar") {
    return `ابحث عن أفضل ${mod} ${base} ${city} 2026 مع العروض والتعليقات. استخدم Booking.com وSkyscanner للحجز ومقارنة الرحلات.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/hotel-in/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(city, mod, lang) {
  return KEYWORDS
    .map((k) => k.replace(city, city))
    .slice(0, 100)
    .join(", ");
}

function renderHotelInPage(city, mod, lang = "en") {
  const base = Math.random() < 0.5 ? "hotel-in" : "hotels-in";
  const slug = slugify(`${base}-${city}.${mod}`);

  const filename = `ht-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(city, mod, lang);
  const description = generateDescription(city, mod, lang);
  const keywordStr = generateKeywords(city, mod, lang);

  const hreflangSet = generateHreflangs(slug, LANGS);

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
  <link rel="canonical" href="https://yourdomain.com/hotel-in/${slug}/${lang}.html" />
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
    When people search for where to stay, they often type phrases like <strong>“hotel in ${city}”</strong> or <strong>“hotels in ${city}”</strong>. This page helps you find the best options for 2026.
  </p>

  <p>
    Use the following links to book stays in ${city} and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in ${city} on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to ${city} (Skyscanner)
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
// 2. GENERATE 20,000,000 HOTEL‑IN/HOTELS‑IN PAGES
// ==============================

async function generateThirtysixNineSpecials() {
  const total = 20000000;

  for (let i = 0; i < total; i++) {
    const city = CITIES[i % CITIES.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderHotelInPage(city, mod, lang);
  }

  console.log(
    `✅ thirtysix-nine-specials.js finished: generated 20,000,000 "hotel in / hotels in" style pages for Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtysixNineSpecials().catch((err) => {
  console.error("thirtysix-nine-specials.js error:", err.message);
});
