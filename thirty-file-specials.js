// thirty-file-specials.js
//
// 1. Generates 5,000,000 Asia‑Pacific travel pages
//    - Focused on: South Korea, Taiwan, Hawaii
//    - Hawaii treated as #1 in this group for Japanese‑style demand
// 2. Each page:
//    - Is in 1 of 5 languages (en, ja, ko, zh, es)
//    - Embeds:
//      - BOOKING.HOME (aid=1858279)
//      - SKY.HOME (offer_id=29465&aff_id=21885)
// 3. Designed for 2026 travel + SEO + affiliate EPC

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

// 1. Asia‑Pacific destinations (Hawaii #1, then SK, Taiwan)
const ASIA_PACIFIC_LOCATIONS = [
  "Hawaii",          // 1st
  "Oahu",           // Hawaii core
  "Maui",
  "Big Island",     // Hawaii
  "Kauai",          // Hawaii
  "South Korea",
  "Seoul",
  "Busan",
  "Jeju Island",
  "Incheon",
  "Taean",
  "Taiwan",
  "Taipei",
  "Kaohsiung",
  "Taichung",
  "Hualien",
  "Sun Moon Lake",
  "Taroko Gorge",
  "Taiwan East Coast",
  "Taiwan West Coast",
  "Taiwan Island",
  "South Korea Island Resorts",
];

// 2. Trip‑style modifiers
const MODIFIERS = [
  "planning",
  "planner",
  "guide",
  "tips",
  "itinerary",
  "deals",
  "packages",
  "weekend",
  "family trip",
  "honeymoon",
  "romantic getaway",
  "city tour",
  "food tour",
  "hiking tour",
  "beach trip",
  "resort stay",
  "long‑stay",
  "2026 travel",
  "2026 itinerary",
  "first‑time",
  "off‑season",
  "off‑peak",
  "budget trip",
  "luxury trip",
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

// 4. Languages (en, ja, ko, zh, es)
const LANGS = ["en", "ja", "ko", "zh", "es"];

// 5. SEO‑style keywords (Asia‑Pacific, Japanese‑travel style)
const KEYWORDS = [
  "asia pacific travel",
  "asia pacific 2026",
  "visit asia pacific 2026",
  "asia pacific vacation",
  "asia pacific trip",
  "asia pacific tour",
  "asia pacific itinerary",
  "asia pacific guide",
  "asia pacific tips",
  "asia pacific deals",
  "hawaii travel",
  "hawaii vacation",
  "hawaii 2026",
  "hawaii beaches",
  "hawaii resorts",
  "hawaii hotels",
  "south korea travel",
  "south korea 2026",
  "south korea tourism",
  "taiwan travel",
  "taiwan 2026",
  "taiwan tourism",
  "visit hawaii",
  "visit seoul",
  "visit tokyo nearby",
  "visit jeju island",
  "visit taipei",
  "visit taroko gorge",
  "visit hualien",
  "visit sun moon lake",
  "visit oahu",
  "visit maui",
  "visit kauai",
  "visit big island",
  "hawaii for japanese",
  "korean for japanese",
  "taiwan for japanese",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to asia pacific",
  "flights to hawaii",
  "flights to south korea",
  "flights to taiwan",
];

// ==============================
// 1. SLUGIFY + PAGE TEMPLATE PER LANGUAGE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function getTitle(loc, mod, type, lang = "en") {
  const locPart =
    lang === "en" ? `in ${loc}` :
    lang === "ja" ? `の${loc}で` :
    lang === "ko" ? `${loc}에서` :
    lang === "zh" ? `在${loc}` :
    lang === "es" ? `en ${loc}`;

  if (lang === "ja") {
    return `${mod} ${type} ${locPart} 2026 年の旅行ガイド`;
  } else if (lang === "ko") {
    return `${mod} ${type} ${locPart} 2026 여행 가이드`;
  } else if (lang === "zh") {
    return `${mod} ${type} ${locPart} 2026 旅游指南`;
  } else if (lang === "es") {
    return `Guía de viaje de ${mod} ${type} ${locPart} 2026`;
  } else {
    return `Travel Guide to ${mod} ${type} ${locPart} Asia‑Pacific 2026`;
  }
}

function getDescription(loc, mod, type, lang = "en") {
  const suffix = lang === "en" ? "Asia‑Pacific region" :
                 lang === "ja" ? "アジア太平洋地域" :
                 lang === "ko" ? "아시아·태평양 지역" :
                 lang === "zh" ? "亚太地区" :
                 "Asia‑Pacific region";

  if (lang === "ja") {
    return `番号 1 旅行先であるハワイ、韓国、台湾を含む ${loc} の ${type} 2026 旅行ガイド。Booking.com (${BOOKING.HOME}) と Skyscanner (${SKY.HOME}) を使ってホテルとフライトを見つけてください。`;
  } else if (lang === "ko") {
    return `${loc}의 ${type} 2026 여행 가이드입니다. 하와이, 한국, 타이완이 포함된 아시아·태평양 지역으로 여행하세요. Booking.com (${BOOKING.HOME}) 와 Skyscanner (${SKY.HOME}) 로 호텔과 항공권을 찾으세요.`;
  } else if (lang === "zh") {
    return `${loc} 2026 ${type} 旅行指南，包含夏威夷、韩国、台湾组成的亚太地区旅游。通过 Booking.com (${BOOKING.HOME}) 和 Skyscanner (${SKY.HOME}) 找到酒店与航班。`;
  } else if (lang === "es") {
    return `Guía de viaje de ${mod} ${type} en ${loc}, 2026, en la región de Asia‑Pacífico, incluyendo Hawái, Corea del Sur y Taiwán. Usa Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}) para encontrar hoteles y vuelos.`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, 2026, in the ${suffix} (including Hawaii #1, South Korea, and Taiwan). Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to find hotels and flights.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/ap/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(loc, lang) {
  const base = KEYWORDS.join(", ");
  return base.replace("Asia‑Pacific", loc);
}

function renderApPage(loc, mod, type, lang = "en") {
  const slug = slugify(`ap-${loc}.${mod}.${type}`);
  const filename = `ap-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = getTitle(loc, mod, type, lang);
  const description = getDescription(loc, mod, type, lang);
  const keywordStr = generateKeywords(loc, lang);

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
  <link rel="canonical" href="https://yourdomain.com/ap/${slug}/${lang}.html" />
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
      "name": "AsiaPacificTravel2026",
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
    Use the following links to book stays and flights to Asia‑Pacific destinations:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Asia‑Pacific on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Asia‑Pacific (Skyscanner)
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
// 2. GENERATE 5,000,000 ASIA‑PACIFIC PAGES
// ==============================

async function generateThirtyFileSpecials() {
  const total = 5000000;

  for (let i = 0; i < total; i++) {
    const loc = ASIA_PACIFIC_LOCATIONS[i % ASIA_PACIFIC_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderApPage(loc, mod, type, lang);
  }

  console.log(
    `✅ thirty-file-specials.js finished: generated 5,000,000 Asia‑Pacific (Hawaii, South Korea, Taiwan) pages in multiple languages with Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtyFileSpecials().catch((err) => {
  console.error("thirty-file-specials.js error:", err.message);
});
