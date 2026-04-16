// thirtyfive-file-specials.js
//
// 1. Generates 11,000,000 SEO‑friendly Thailand travel pages
//    - One file per page
// 2. Targets:
//    - Thai cities, regions, islands, and trip‑style pages
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

// 1. High‑search‑volume Thailand‑specific locations
const THAILAND_LOCATIONS = [
  // Islands & beaches
  "Phuket",
  "Phuket Island",
  "Patong Beach",
  "Kata Beach",
  "Karon Beach",
  "Ko Phi Phi",
  "Maya Bay",
  "Ko Lanta",
  "Ko Lipe",
  "Ko Samui",
  "Chaweng Beach",
  "Bophut",
  "Lamai",
  "Ko Chang",
  "Ko Phangan",
  "Ko Tao",
  "Railay Beach",
  "Ao Nang",
  "Krabi",
  "Krabi Province",
  "Phang Nga Bay",
  "Rayong",
  "Pattaya",
  "Hua Hin",
  "Cha‑am",
  "Samut Prakan",
  "Chonburi",

  // Cities & culture
  "Bangkok",
  "Chiang Mai",
  "Chiang Rai",
  "Chiang Mai Province",
  "Kanchanaburi",
  "Erawan Falls",
  "Kanchanaburi River",
  "Kanchanaburi Waterfalls",
  "Kanchanaburi Bridge",
  "Damnoen Saduak Floating Market",
  "Sukhothai",
  "Ayutthaya",
  "Ayutthaya Historical Park",
  "Saraburi",
  "Nakhon Pathom",
  "Nakhon Ratchasima",
  "Buriram",
  "Ubon Ratchathani",
  "Udon Thani",
  "Khon Kaen",
  "Srhoi",
  
  // Nature & parks
  "Khao Sok National Park",
  "Doi Inthanon",
  "Doi Suthep",
  "Erawan National Park",
  "Khnanchanaburi National Park",
  "Phu Chi Fa",
  "Doi Angusak",
  "Mae Hong Son",
  "Pai",
  "Loei",
  "Phrae",
  "Nan",
  "Chiang Mai",
  "Chiang Mai Province",
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
  "island hop",
  "island hopping",
  "beach holiday",
  "resort stay",
  "2026 travel",
  "2026 itinerary",
  "best time to visit",
  "how to get there",
  "public transport",
  "local cuisine",
  "street food",
  "halal food",
  "hidden gems",
  "Thai cooking class",
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

// 4. Languages (regionally relevant: en, th, zh, ms, hi)
const LANGS = ["en", "th", "zh", "ms", "hi"];

// 5. Thailand‑specific keywords (2026‑style)
const KEYWORDS = [
  "thailand travel",
  "thailand 2026",
  "visit thailand 2026",
  "thailand vacation",
  "thailand trip",
  "thailand tour",
  "thailand itinerary",
  "thailand guide",
  "thailand tips",
  "thailand deals",
  "thailand budget",
  "thailand luxury",
  "thailand honeymoon",
  "thailand family trip",
  "thailand street food",
  "thailand street food tour",
  "thailand culture",
  "thailand temples",
  "thailand islands",
  "thailand beaches",
  "thailand northern thailand",
  "thailand southern thailand",
  "bangkok travel",
  "bangkok 2026",
  "bangkok itinerary",
  "bangkok food",
  "bangkok temples",
  "bangkok nightlife",
  "bangkok shopping",
  "phuket travel",
  "phuket 2026",
  "phuket beaches",
  "phuket island hop",
  "phuket island hopping",
  "ko samui travel",
  "ko samui 2026",
  "ko phangan travel",
  "ko phangan full moon",
  "ko phi phi travel",
  "ko phi phi 2026",
  "krabi travel",
  "krabi 2026",
  "krabi railay",
  "krabi ao nang",
  "chiang mai travel",
  "chiang mai 2026",
  "chiang mai food tour",
  "chiang mai mountains",
  "khao sok national park travel",
  "khao sok national park 2026",
  "do inthanon travel",
  "do inthanon 2026",
  "tha ailand cultural tour",
  "thailand historical tour",
  "thailand nature tour",
  "thailand beach holiday",
  "thailand city break",
  "thailand resort stays",
  "thailand wellness retreat",
  "thailand spa holiday",
  "thailand 2026 tourism",
  "thailand 2026 tourism guide",
  "thailand 2026 travel tips",
  "thailand 2026 itineraries",
  "thailand 2026 tours",
  "thailand 2026 food tours",
  "thailand 2026 island tours",
  "thailand 2026 beach holidays",
  "thailand 2026 city breaks",
  "thailand 2026 resort stays",
  "thailand 2026 all‑inclusive",
  "thailand 2026 apartments",
  "thailand 2026 villas",
  "thailand 2026 hotels",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to thailand",
  "flights to bangkok",
  "flights to phuket",
  "flights from india to thailand",
  "flights from china to thailand",
  "flights from south korea to thailand",
  "thailand visa 2026",
  "thailand visa on arrival 2026",
];

// ==============================
// 1. SLUGIFY + THAILAND PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(loc, mod, type, lang = "en") {
  const locPart =
    lang === "en" ? `in ${loc}` :
    lang === "th" ? `${loc} 2026` :
    lang === "zh" ? `在${loc}` :
    lang === "ms" ? `di ${loc}` :
    lang === "hi" ? `${loc} में`;

  if (lang === "th") {
    return `${mod} ${type} ${locPart} คู่มือท่องเที่ยว 2026`;
  } else if (lang === "zh") {
    return `${loc} 2026 ${mod} ${type} 旅游指南`;
  } else if (lang === "ms") {
    return `Panduan perjalanan ${mod} ${type} ${locPart} 2026`;
  } else if (lang === "hi") {
    return `${locPart} में ${mod} ${type} 2026 यात्रा गाइड`;
  } else {
    return `Travel guide to ${mod} ${type} ${locPart} Thailand 2026`;
  }
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "th") {
    return `คู่มือท่องเที่ยว ${mod} ${type} ${loc} ปี 2026 ในประเทศไทย ใช้ Booking.com และ Skyscanner เพื่อจองที่พักและเที่ยวบิน.`;
  } else if (lang === "zh") {
    return `2026 年${loc} ${mod} ${type} 泰国旅游指南，使用 Booking.com 和 Skyscanner 预订酒店及航班。`;
  } else if (lang === "ms") {
    return `Panduan perjalanan ${mod} ${type} ${loc} 2026 di Thailand. Gunakan Booking.com dan Skyscanner untuk tempahan penginapan dan penerbangan.`;
  } else if (lang === "hi") {
    return `${loc} में ${mod} ${type} 2026 यात्रा गाइड। थाईलैंड में जाने वाले भारतीय यात्रियों के लिए बुकिंग.कॉम और स्काईस्कैनर के लिंक।`;
  } else {
    return `Travel guide to ${mod} ${type} in ${loc}, Thailand 2026, with tips for booking hotels and flights via Booking.com and Skyscanner.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/thai/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(loc, lang) {
  const base = KEYWORDS.join(", ");
  return base.replace("Thailand", loc);
}

function renderThailandPage(loc, mod, type, lang = "en") {
  const slug = slugify(`thai‑${loc}.${mod}.${type}`);

  const filename = `th-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
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
  <link rel="canonical" href="https://yourdomain.com/thai/${slug}/${lang}.html" />
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
      "name": "ThailandGuide2026",
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
    Thailand is one of the top‑6 global destinations for 2026, with strong inbound demand from China, India, Malaysia, Russia, South Korea, and other short‑haul markets, and is projected to welcome around 35 million international arrivals by the end of 2026. [web:328][web:334][web:337]
  </p>

  <p>
    Use the following links to book stays in Thailand and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Thailand on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Thailand (Bangkok, Phuket, Chiang Mai) (Skyscanner)
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
// 2. GENERATE 11,000,000 THAILAND PAGES
// ==============================

async function generateThirtyfiveFileSpecials() {
  const total = 11000000;

  for (let i = 0; i < total; i++) {
    const loc = THAILAND_LOCATIONS[i % THAILAND_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderThailandPage(loc, mod, type, lang);
  }

  console.log(
    `✅ thirtyfive-file-specials.js finished: generated 11,000,000 Thailand‑themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtyfiveFileSpecials().catch((err) => {
  console.error("thirtyfive-file-specials.js error:", err.message);
});
