// thirtyfive-file-specials.js
//
// 1. Generates 10,000,000 SEO‑friendly travel pages
//    - Focused on: Malaysia, Saudi Arabia, Singapore
// 2. Each page:
//    - Is in 1 of 5 languages (en, hi, ms, ar, zh)
//    - Embeds:
//      - BOOKING.HOME (aid=1858279)
//      - SKY.HOME (offer_id=29465&aff_id=21885)
// 3. Designed for 2026 tourism + SEO + affiliate EPC

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

// 1. High‑search‑volume locations (Malaysia, Saudi Arabia, Singapore)
const LOCATIONS = [
  // Malaysia
  "Kuala Lumpur",
  "Penang",
  "Langkawi",
  "Melaka",
  "Cameron Highlands",
  "Ipoh",
  "Malacca",
  "Sabah",
  "Borneo",
  "Langkawi Island",
  "Penang Hill",
  "Perhentian Islands",
  "Redang Island",
  "Tioman Island",
  "Pulau Perhentian",
  "Pulau Redang",
  "Pulau Tioman",
  "Taman Negara",
  "Cameron Highlands",
  "Ipoh",
  "Kuantan",
  "Port Dickson",
  "Kuala Terengganu",
  "Kota Bharu",
  "Muar",

  // Saudi Arabia
  "Saudi Arabia",
  "Riyadh",
  "Makkah (Mecca)",
  "Medina",
  "Jeddah",
  "Taif",
  "Abha",
  "AlUla",
  "Neom",
  "Saudi Red Sea",
  "Diriyah",
  "Jubail",
  "Dammam",
  "Khobar",
  "Al Khobar",
  "Jubail Industrial City",
  "Taiba City",
  "Al Ula Old Town",
  "Asharqia",
  "Tabuk",
  "Hail",
  "Najran",
  "Qassim",
  "Al Bahah",
  "Jizan",
  "Bareq",

  // Singapore
  "Singapore",
  "Marina Bay",
  "Sentosa Island",
  "Changi Airport",
  "Gardens by the Bay",
  "Marina Bay Sands",
  "Orchard Road",
  "Chinatown",
  "Little India",
  "Kampong Glam",
  "Sentosa",
  "Jurong Bird Park",
  "Singapore Zoo",
  "River Safari",
  "Universal Studios Singapore",
  "Night Safari",
  "East Coast Park",
  "Sentosa",
  "Sentosa Island",
  "Jewel Changi Airport",
  "Suntec City",
  "Bugis",
  "Clarke Quay",
  "Raffles Place",
  "Beach Road",
  "Fullerton Bay",
  "Sandy Island",
  "Sisters' Islands",
  "Pulau Ubin",
  "Kusu Island",
  "St John's Island",
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
  "cultural tour",
  "pilgrimage tour",
  "beach holiday",
  "resort stay",
  "2026 travel",
  "2026 itinerary",
  "best time to visit",
  "how to get there",
  "public transport",
  "local cuisine",
  "halal food",
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
  "business hotel",
  "all‑inclusive",
];

// 4. Languages (regionally relevant: en, hi, ms, ar, zh)
const LANGS = ["en", "hi", "ms", "ar", "zh"];

// 5. SEO‑style keywords (Malaysia, Saudi Arabia, Singapore)
const KEYWORDS = [
  "malaysia travel",
  "malaysia 2026",
  "visit malaysia 2026",
  "malaysia vacation",
  "malaysia trip",
  "malaysia tour",
  "malaysia itinerary",
  "malaysia guide",
  "malaysia tips",
  "malaysia deals",
  "malaysia budget",
  "malaysia luxury",
  "malaysia honeymoon",
  "malaysia family trip",
  "malaysia beaches",
  "malaysia islands",
  "malaysia cities",
  "kuala lumpur travel",
  "penang travel",
  "langkawi travel",
  "melaka travel",
  "cameron highlands travel",

  "saudi arabia travel",
  "saudi arabia 2026",
  "visit saudi arabia 2026",
  "saudi arabia vacation",
  "saudi arabia trip",
  "saudi arabia tour",
  "saudi arabia itinerary",
  "saudi arabia guide",
  "saudi arabia tips",
  "saudi arabia deals",
  "saudi arabia budget",
  "saudi arabia luxury",
  "saudi arabia pilgrimage",
  "saudi arabia visa",
  "riyadh travel",
  "makkah travel",
  "medina travel",
  "jeddah travel",
  "alula travel",
  "neom travel",
  "saudi red sea travel",

  "singapore travel",
  "singapore 2026",
  "visit singapore 2026",
  "singapore vacation",
  "singapore trip",
  "singapore tour",
  "singapore itinerary",
  "singapore guide",
  "singapore tips",
  "singapore deals",
  "singapore budget",
  "singapore luxury",
  "singapore family trip",
  "singapore city break",
  "marina bay travel",
  "sentosa travel",
  "changi airport travel",
  "gardens by the bay travel",
  "marina bay sands travel",
  "orchard road travel",
  "chinatown travel",
  "little india travel",
  "sentosa island travel",
  "jewel changi airport travel",
  "universal studios singapore travel",

  "booking.com affiliate",
  "skyscanner deals",
  "flights to malaysia",
  "flights to saudi arabia",
  "flights to singapore",
  "flights from india to malaysia",
  "flights from india to saudi arabia",
  "flights from india to singapore",
];

// ==============================
// 1. SLUGIFY + PAGE TEMPLATE PER LANGUAGE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(loc, mod, type, lang = "en") {
  const locPart =
    lang === "en" ? `in ${loc}` :
    lang === "hi" ? `${loc} में` :
    lang === "ms" ? `di ${loc}` :
    lang === "ar" ? `في ${loc}` :
    lang === "zh" ? `在${loc}`;

  if (lang === "hi") {
    return `${locPart} में ${mod} ${type} 2026 यात्रा गाइड`;
  } else if (lang === "ms") {
    return `Panduan perjalanan ${mod} ${type} ${locPart} 2026`;
  } else if (lang === "ar") {
    return `دليل سفر ${mod} ${type} ${locPart} 2026`;
  } else if (lang === "zh") {
    return `${loc} 2026 ${mod} ${type} 旅游指南`;
  } else {
    return `Travel guide to ${mod} ${type} ${locPart} 2026`;
  }
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "hi") {
    return `मलेशिया, सऊदी अरब और सिंगापुर में ${loc} में ${mod} ${type} 2026 के लिए यात्रा गाइड। बुकिंग.कॉम और स्काईस्कैनर के लिंक से डील देखें।`;
  } else if (lang === "ms") {
    return `Panduan perjalanan untuk ${mod} ${type} ${loc} 2026, dengan tip booking hotel dan penerbangan di Malaysia, Arab Saudi, dan Singapura. Guna Booking.com dan Skyscanner untuk cari tawaran terbaik.`;
  } else if (lang === "ar") {
    return `دليل لرحلات ${mod} ${type} ${loc} 2026 في ماليزيا أو السعودية أو سنغافورة. استخدم Booking.com وSkyscanner لحجز الفنادق ومقارنة الرحلات.`;
  } else if (lang === "zh") {
    return `马来西亚、沙特阿拉伯和新加坡 2026 ${mod} ${type} 旅游指南，包含在${loc}的酒店与航班预订建议。`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, 2026, in Malaysia, Saudi Arabia, or Singapore, with tips for booking hotels and flights via Booking.com and Skyscanner.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/regional/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(loc, lang) {
  const base = KEYWORDS.join(", ");
  return base.replace(/Malaysia|Saudi Arabia|Singapore/g, loc);
}

function renderRegionalPage(loc, mod, type, lang = "en") {
  const slug = slugify(`regional-${loc}.${mod}.${type}`);

  const filename = `reg-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(loc, mod, type, lang);
  const description = generateDescription(loc, mod, type, lang);
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
  <link rel="canonical" href="https://yourdomain.com/regional/${slug}/${lang}.html" />
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
      "name": "AsiaGulfGuide2026",
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
    Use the following links to book stays in Malaysia, Saudi Arabia, and Singapore and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Malaysia, Saudi Arabia, and Singapore on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Malaysia, Saudi Arabia, and Singapore (Skyscanner)
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
// 2. GENERATE 10,000,000 PAGES FOR MALAYSIA, SAUDI ARABIA, SINGAPORE
// ==============================

async function generateThirtyfiveFileSpecials() {
  const total = 10000000;

  for (let i = 0; i < total; i++) {
    const loc = LOCATIONS[i % LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderRegionalPage(loc, mod, type, lang);
  }

  console.log(
    `✅ thirtyfive-file-specials.js finished: generated 10,000,000 pages for Malaysia, Saudi Arabia, and Singapore with Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtyfiveFileSpecials().catch((err) => {
  console.error("thirtyfive-file-specials.js error:", err.message);
});
