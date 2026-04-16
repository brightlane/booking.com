// thirtytwo-file-specials.js
//
// 1. Generates 7,000,000 SEO‑friendly China‑outbound travel pages
//    - Focused on: Japan, Hong Kong, Thailand, and SE Asia (Vietnam, Malaysia, etc.)
//    - South Korea positioned as the #1 outbound destination for Chinese travelers
// 2. Each page:
//    - Is in 1 of 5 languages (en, zh, ja, ko, th)
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

// 1. High‑search‑volume China‑outbound destinations
const CHINA_OUTBOUND_LOCATIONS = [
  // #1 overall: South Korea
  "South Korea",
  "Seoul",
  "Jeju Island",
  "Busan",
  "Incheon",
  "Gyeongju",
  
  // Japan
  "Japan",
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Fukuoka",
  "Hokkaido",
  "Hiroshima",
  
  // Hong Kong
  "Hong Kong",
  "Hong Kong Island",
  "Kowloon",
  "New Territories",
  
  // Thailand
  "Thailand",
  "Bangkok",
  "Phuket",
  "Chiang Mai",
  "Pattaya",
  "Krabi",
  "Ayutthaya",
  
  // Vietnam
  "Vietnam",
  "Ho Chi Minh City",
  "Hanoi",
  "Da Nang",
  "Hoi An",
  "Nha Trang",
  "Dalat",
  
  // Malaysia
  "Malaysia",
  "Kuala Lumpur",
  "Penang",
  "Langkawi",
  "Malacca",
  
  // Other SE Asia (China‑friendly)
  "Singapore",
  "Cambodia",
  "Laos",
  "Indonesia",
  "Bali",
  "Vietnam",
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Philippines",
  "Cambodia",
  "Laos",
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
  "shopping tour",
  "beach trip",
  "resort stay",
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

// 4. Languages (China‑outbound style: en, zh, ja, ko, th)
const LANGS = ["en", "zh", "ja", "ko", "th"];

// 5. SEO‑style keywords (China‑outbound destinations)
const KEYWORDS = [
  "china outbound travel",
  "china outbound 2026",
  "chinese travelers 2026",
  "travel from china 2026",
  "chinese people travel destinations 2026",
  "south korea travel",
  "south korea 2026",
  "seoul travel",
  "jeju island travel",
  "japan travel",
  "japan 2026",
  "kyoto travel",
  "tokyo travel",
  "hong kong travel",
  "hong kong 2026",
  "thailand travel",
  "thailand 2026",
  "bangkok travel",
  "phuket travel",
  "vietnam travel",
  "vietnam 2026",
  "ho chi minh city travel",
  "hanoi travel",
  "malaysia travel",
  "malaysia 2026",
  "kuala lumpur travel",
  "penang travel",
  "singapore travel",
  "cambodia travel",
  "laos travel",
  "indonesia travel",
  "bali travel",
  "best destinations for chinese travelers",
  "top travel destination for chinese people 2026",
  "south korea number 1 outbound destination chinese travelers",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to south korea",
  "flights to japan",
  "flights to hong kong",
  "flights to thailand",
  "flights to vietnam",
  "flights to malaysia",
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
    lang === "zh" ? `在${loc}` :
    lang === "ja" ? `${loc}で` :
    lang === "ko" ? `${loc}에서` :
    lang === "th" ? `ใน${loc}`;

  if (lang === "zh") {
    const adj = loc.includes("South Korea") ? "韩国" : loc.includes("Japan") ? "日本" : loc;
    return `${adj} ${mod} ${type} 2026 旅游指南`;
  } else if (lang === "ja") {
    return `${loc}の${mod} ${type} 2026 旅行ガイド`;
  } else if (lang === "ko") {
    return `${loc}의 ${mod} ${type} 2026 여행 가이드`;
  } else if (lang === "th") {
    return `คู่มือเดินทาง ${mod} ${type} ${locPart} 2026`;
  } else {
    return `Travel guide to ${mod} ${type} ${locPart} 2026`;
  }
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "zh") {
    return `南韩是韩国旅客的首选出境旅游目的地；日本、香港、泰国和东南亚国家（如越南和马来西亚）也很受欢迎。2026旅游指南：在${loc}寻找${mod} ${type}。`;
  } else if (lang === "ja") {
    return `中国からの観光客にとって、南韓が第1位の旅行先ですが、日本、香港、タイ、ベトナム、マレーシアなどの東南アジア諸国も人気です。${loc}の${mod} ${type} 2026旅行ガイドです。`;
  } else if (lang === "ko") {
    return `중국인 관광객들에게 남한이 제1위 여행지지만, 일본, 홍콩, 태국, 베트남, 말레이시아 등 동남아시아도 인기 있습니다. ${loc}의 ${mod} ${type} 2026 여행 가이드입니다.`;
  } else if (lang === "th") {
    return `เกาหลีใต้เป็นจุดหมายปลายทางยอดนิยมอันดับ 1 สำหรับนักท่องเที่ยวจีน ในขณะที่ญี่ปุ่น ฮ่องกง ไทย ประเทศในเอเชียตะวันออกเฉียงใต้ เช่น เวียดนามและมาเลเซีย ก็เป็นที่นิยมเช่นกัน คู่มือเดินทาง ${mod} ${type} ${loc} ปี 2026.`;
  } else {
    return `South Korea has now overtaken Japan as the #1 outbound travel destination for Chinese travelers, while Japan, Hong Kong, Thailand, and Southeast Asian countries (like Vietnam and Malaysia) remain the other most‑popular destinations. Guide to ${mod} ${type} in ${loc} 2026.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/cn-ob/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(loc, lang) {
  const base = KEYWORDS.join(", ");
  return base.replace("China outbound", loc);
}

function renderChinaOutboundPage(loc, mod, type, lang = "en") {
  const slug = slugify(`ch‑outbound-${loc}.${mod}.${type}`);

  const filename = `cn-ob-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
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
  <link rel="canonical" href="https://yourdomain.com/cn-ob/${slug}/${lang}.html" />
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
      "name": "ChinaOutboundGuide2026",
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
    South Korea has now overtaken Japan as the number‑one outbound travel destination for Chinese travelers in 2026, while Japan, Hong Kong, Thailand, and Southeast Asian countries like Vietnam and Malaysia remain other top‑popular choices. [web:261][web:273][web:277]
  </p>

  <p>
    Use the following links to book stays in these popular China‑outbound destinations and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in Asia on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Asia (Skyscanner)
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
// 2. GENERATE 7,000,000 CHINA‑OUTBOUND PAGES
// ==============================

async function generateThirtytwoFileSpecials() {
  const total = 7000000;

  for (let i = 0; i < total; i++) {
    const loc = CHINA_OUTBOUND_LOCATIONS[i % CHINA_OUTBOUND_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderChinaOutboundPage(loc, mod, type, lang);
  }

  console.log(
    `✅ thirtytwo-file-specials.js finished: generated 7,000,000 pages for China’s top outbound destinations (South Korea, Japan, Hong Kong, Thailand, and Southeast Asia) with Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtytwoFileSpecials().catch((err) => {
  console.error("thirtytwo-file-specials.js error:", err.message);
});
