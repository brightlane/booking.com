// thirtynine-specials.js
//
// 1. Generates 25,000,000 SEO‑friendly "hotel near / hotels near" pages
// 2. Uses Booking.com + Skyscanner affiliate links
// 3. Targets:
//    - "hotel near [thing]" / "hotels near [thing]"
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

// 1. Big list of “near” targets
const NEAR_TARGETS = [
  "airport",        // "hotel near airport"
  "downtown",       // "hotels near downtown"
  "city center",    // "hotel near city center"
  "beach",          // "hotel near beach"
  "railway station","train station",
  "metro station",  // "hotel near metro station"
  "shopping mall", "shopping center",
  "university", "college campus",
  "conference center","convention center",
  "amusement park","theme park",
  "stadium", "sports stadium",
  "hospital", "medical center",
  "shopping district",
  "business district",
  "landmark", "famous landmark",
  "tourist attraction", "tourist spot",
  "airport terminal", "airport departures",
  "airport arrivals",
  "cruise terminal",
  "ferry terminal",
  "bus station",
  "airport shuttle drop‑off",
];

// 2. City / region list (to combine with “near X”)
const CITIES = [
  "New York",
  "Los Angeles",
  "Tokyo",
  "London",
  "Paris",
  "Dubai",
  "Sydney",
  "Bangkok",
  "Rome",
  "Barcelona",
  "Singapore",
  "Istanbul",
  "Mumbai",
  "Cairo",
  "Mexico City",
  "Toronto",
  "Rio de Janeiro",
  "Moscow",
  "Berlin",
  "Amsterdam",
  "Madrid",
  "Seoul",
  "Osaka",
  "Hong Kong",
  "Kuala Lumpur",
  "Cape Town",
  "Phuket",
  "Hanoi",
  "Ho Chi Minh City",
  "Sao Paulo",
  "Beijing",
  "Shanghai",
];

// 3. Trip‑style modifiers
const MODIFIERS = [
  "cheap",
  "luxury",
  "budget",
  "romantic",
  "family",
  "business",
  "airport",
  "city center",
  "nearby",
  "best",
  "top",
  "all inclusive",
  "pet friendly",
  "eco",
  "green",
  "apartment",
  "villa",
  "ryokan",
];

// 4. Languages
const LANGS = ["en", "es", "zh", "ja", "ar"];

// 5. SEO‑style keyword base: "hotel near X" / "hotels near X"
const KEYWORD_BASES = [
  "hotel near",
  "hotels near",
  "cheap hotel near",
  "luxury hotel near",
  "budget hotel near",
  "best hotels near",
  "tourist hotels near",
  "family hotel near",
  "business hotel near",
  "airport hotel near",
  "city center hotel near",
  "airport hotels near",
  "city center hotels near",
  "apartments near",
  "villas near",
  "resorts near",
];

// 6. Full keyword‑style block (additional safety‑padding)
const KEYWORDS = KEYWORD_BASES
  .flatMap((base) =>
    NEAR_TARGETS.map(
      (t) => `${base} ${t.toLowerCase()} 2026 booking deals`
    )
  );

// ==============================
// 1. SLUGIFY + PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(city, near, mod, lang = "en") {
  const base = Math.random() < 0.5 ? "hotel near" : "hotels near";
  const langTitle =
    lang === "en" ? `Best ${mod} ${base} ${near} in ${city} 2026`
    : lang === "es" ? `Mejores hoteles cerca de ${near} en ${city} ${mod} 2026`
    : lang === "zh" ? `${city} 附近${near} ${mod} 2026 最佳酒店`
    : lang === "ja" ? `${city} ${near} ${mod} 2026 おすすめホテル`
    : lang === "ar" ? `أفضل ${mod} ${base} ${near} ${city} 2026`;

  return langTitle;
}

function generateDescription(city, near, mod, lang = "en") {
  const base = Math.random() < 0.5 ? "hotel near" : "hotels near";

  if (lang === "en") {
    return `Find the best ${mod} ${base} ${near} in ${city} 2026 with deals and reviews. Use Booking.com and Skyscanner to book your stay and compare flights.`;
  } else if (lang === "es") {
    return `Encuentra los mejores hoteles cerca de ${near} en ${city} ${mod} 2026 con ofertas y reseñas. Usa Booking.com y Skyscanner para reservar tu estadía y comparar vuelos.`;
  } else if (lang === "zh") {
    return `寻找 2026 年${city} 附近${near} ${mod} 最佳${base}，带优惠和点评。使用 Booking.com 和 Skyscanner 预订和比较航班。`;
  } else if (lang === "ja") {
    return `${city} 2026 年の${near} 付近${mod} ${base}をお探しですか。割引と口コミを見て、Booking.com と Skyscanner で宿泊と便を比較・予約できます。`;
  } else if (lang === "ar") {
    return `ابحث عن أفضل ${mod} ${base} ${near} في ${city} 2026 مع العروض والتعليقات. استخدم Booking.com وSkyscanner للحجز ومقارنة الرحلات.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/hotel-near/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(city, near, mod, lang) {
  return KEYWORDS
    .map((k) => k.replace(near, near).replace("city", city))
    .slice(0, 100)
    .join(", ");
}

function renderHotelNearPage(city, near, mod, lang = "en") {
  const base = Math.random() < 0.5 ? "hotel-near" : "hotels-near";
  const slug = slugify(`${base}-${city}.${near}.${mod}`);

  const filename = `hn-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(city, near, mod, lang);
  const description = generateDescription(city, near, mod, lang);
  const keywordStr = generateKeywords(city, near, mod, lang);

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
  <link rel="canonical" href="https://yourdomain.com/hotel-near/${slug}/${lang}.html" />
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
      "name": "HotelNearDeals",
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
    When people search for where to stay near ${near}, they often type phrases like <strong>“hotel near ${near} in ${city}”</strong> or <strong>“hotels near ${near} in ${city}”</strong>. This page helps you find the best options for 2026.
  </p>

  <p>
    Use the following links to book stays near ${near} in ${city} and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels near ${near}, ${city} on Booking.com (aid=1858279)
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
// 2. GENERATE 25,000,000 HOTEL‑NEAR/HOTELS‑NEAR PAGES
// ==============================

async function generateThirtynineSpecials() {
  const total = 25000000;

  for (let i = 0; i < total; i++) {
    const city = CITIES[i % CITIES.length];
    const near = NEAR_TARGETS[i % NEAR_TARGETS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderHotelNearPage(city, near, mod, lang);
  }

  console.log(
    `✅ thirtynine-specials.js finished: generated 25,000,000 "hotel near / hotels near" style pages for Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtynineSpecials().catch((err) => {
  console.error("thirtynine-specials.js error:", err.message);
});
