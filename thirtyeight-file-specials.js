// thirtyseven-file-specials.js
//
// 1. Generates 12,000,000 SEO‑friendly Japan travel pages
//    - One file per page
// 2. Targets:
//    - Japanese cities, regions, islands, and trip‑style pages
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

// 1. High‑search‑volume Japan‑specific locations
const JAPAN_LOCATIONS = [
  // Core cities
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Sapporo",
  "Yokohama",
  "Nagoya",
  "Fukuoka",
  "Kobe",
  "Hiroshima",
  "Sapporo",
  "Sendai",
  "Nagasaki",

  // Cities & culture‑rich areas
  "Kyoto",
  "Nara",
  "Nikko",
  "Kanazawa",
  "Matsushima",
  "Hakone",
  "Odaiba",
  "Shinjuku",
  "Shibuya",
  "Roppongi",
  "Akihabara",
  "Ueno",
  "Asakusa",
  "Ginza",
  "Tsukuba",
  "Chiba",
  "Kawasaki",

  // Islands & scenic spots
  "Hokkaido",
  "Okinawa",
  "Okinawa Island",
  "Naha",
  "Ishigaki",
  "Iriomote",
  "Yonaguni",
  "Shikoku",
  "Kochi",
  "Matsuyama",
  "Kyushu",
  "Beppu",
  "Yufuin",
  "Ibusuki",
  "Takachiho",
  "Yakushima",
  "Yakushima Island",
  "Aogashima",
  "Kesennuma",
  "Kashima",
  "Kujukushima",
  "Aso",

  // Nature & parks
  "Fuji Five Lakes",
  "Kawaguchiko",
  "Yamanakako",
  "Motosu",
  "Saiko",
  "Shojiko",
  "Kusatsu‑onsen",
  "Beppu",
  "Yufuin",
  "Ibusuki",
  "Takachiho gymnastics",
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
  "history tour",
  "nature tour",
  "on‑sen tour",
  "ski trip",
  "winter trip",
  "summer trip",
  "2026 travel",
  "2026 itinerary",
  "best time to visit",
  "how to get there",
  "public transport",
  "local cuisine",
  "hidden gems",
];

// 3. Hotel / property types
const HOTEL_TYPES = [
  "hotel",
  "ryokan",
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

// 4. Languages (regionally relevant: en, ja, zh, ko, hi)
const LANGS = ["en", "ja", "zh", "ko", "hi"];

// 5. Japan‑specific keywords (2026‑style)
const KEYWORDS = [
  "japan travel",
  "japan 2026",
  "visit japan 2026",
  "japan vacation",
  "japan trip",
  "japan tour",
  "japan itinerary",
  "japan guide",
  "japan tips",
  "japan deals",
  "japan budget",
  "japan luxury",
  "japan honeymoon",
  "japan family trip",
  "japan city break",
  "japan nature",
  "japan culture",
  "japan temples",
  "japan castles",
  "japan shrines",
  "japan cuisine",
  "japan ramen",
  "japan sushi",
  "japan onsen",
  "japan ryokan",
  "japan hot spring",
  "japan ski resort",
  "japan skiing",
  "japan winter",
  "japan spring",
  "japan fall",
  "japan summer",
  "japan hanami",
  "japan sakura",
  "japan geisha",
  "japan anime",
  "japan shopping",
  "tokyo travel",
  "tokyo 2026",
  "osaka travel",
  "osaka 2026",
  "kyoto travel",
  "kyoto 2026",
  "sapporo travel",
  "sapporo 2026",
  "hokkaido travel",
  "hokkaido 2026",
  "okinawa travel",
  "okinawa 2026",
  "yakushima travel",
  "yakushima 2026",
  "fuji five lakes travel",
  "kawaguchiko travel",
  "shinkansen travel",
  "japan 2026 tourism",
  "japan 2026 tourism guide",
  "japan 2026 travel tips",
  "japan 2026 itineraries",
  "japan 2026 tours",
  "japan 2026 food tours",
  "japan 2026 cultural tours",
  "japan 2026 nature tours",
  "japan 2026 onsen tours",
  "japan 2026 city breaks",
  "japan 2026 ski trips",
  "japan 2026 ryokan stays",
  "japan 2026 hotels",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to japan",
  "flights to tokyo",
  "flights to osaka",
  "flights from china to japan",
  "flights from india to japan",
  "flights from south korea to japan",
  "japan visa 2026",
  "japan visa requirements 2026",
];

// ==============================
// 1. SLUGIFY + JAPAN PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(loc, mod, type, lang = "en") {
  const locPart =
    lang === "en" ? `in ${loc}` :
    lang === "ja" ? `${loc}の` :
    lang === "zh" ? `在${loc}` :
    lang === "ko" ? `${loc}에서` :
    lang === "hi" ? `${loc} में`;

  if (lang === "ja") {
    return `${loc}の${mod} ${type} 2026 旅行ガイド`;
  } else if (lang === "zh") {
    return `${loc} 2026 ${mod} ${type} 旅游指南`;
  } else if (lang === "ko") {
    return `${loc}의 ${mod} ${type} 2026 여행 가이드`;
  } else if (lang === "hi") {
    return `${locPart} में ${mod} ${type} 2026 यात्रा गाइड`;
  } else {
    return `Travel guide to ${mod} ${type} ${locPart} Japan 2026`;
  }
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "ja") {
    return `${loc}の${mod} ${type} 2026 旅行ガイドです。日本は2026年にトップ7の国際旅行先の1つで、日本文化、自然、スキー、温泉、グルメが人気です。`;
  } else if (lang === "zh") {
    return `${loc} 2026 ${mod} ${type} 日本旅游指南，2026 年日本是全球排名前 7 的热门目的地，以文化、自然、滑雪和温泉吸引大量游客。`;
  } else if (lang === "ko") {
    return `${loc}의 ${mod} ${type} 2026 여행 가이드입니다. 일본은 2026년에 글로벌 7위권 여행지로, 문화, 자연, 스키, 온천, 미식에서 인기입니다.`;
  } else if (lang === "hi") {
    return `${loc} में ${mod} ${type} 2026 यात्रा गाइड। जापान 2026 में टॉप 7 अंतरराष्ट्रीय यात्रा गंतव्य में से एक है, जिसमें संस्कृति, प्रकृति, स्की, ऑन‑सेन और गैस्ट्रोनमिक अनुभव प्रमुख हैं।`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, Japan 2026, with tips for booking hotels and flights via Booking.com and Skyscanner. Japan is frequently ranked among the top‑7 global travel destinations in 2026, with strong inbound demand from China, India, ASEAN, and the Gulf.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/jp/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(loc, lang) {
  const base = KEYWORDS.join(", ");
  return base.replace("Japan", loc);
}

function renderJapanPage(loc, mod, type, lang = "en") {
  const slug = slugify(`jp‑${loc}.${mod}.${type}`);

  const filename = `jp-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
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
  <link rel="canonical" href="https://yourdomain.com/jp/${slug}/${lang}.html" />
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
      "name": "JapanGuide2026",
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
    Japan is often listed among the top‑7 global travel destinations for 2026, with strong inbound demand from China, India, ASEAN countries, the Gulf, and other short‑haul markets, and continues to attract visitors with its culture, food, scenery, and on‑sens.
  </p>

  <p>
    Use the following links to book stays in Japan and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Japan on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Japan (Tokyo, Osaka, Kyoto, Sapporo, Okinawa) (Skyscanner)
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
// 2. GENERATE 12,000,000 JAPAN PAGES
// ==============================

async function generateThirtysevenFileSpecials() {
  const total = 12000000;

  for (let i = 0; i < total; i++) {
    const loc = JAPAN_LOCATIONS[i % JAPAN_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderJapanPage(loc, mod, type, lang);
  }

  console.log(
    `✅ thirtyseven-file-specials.js finished: generated 12,000,000 Japan‑themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtysevenFileSpecials().catch((err) => {
  console.error("thirtyseven-file-specials.js error:", err.message);
});
