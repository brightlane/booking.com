// thirtyfour-file-specials.js
//
// 1. Generates 8,000,000 SEO‑friendly UAE travel pages
//    - Focused on: UAE, especially Dubai
// 2. Each page:
//    - Is in 1 of 5 languages (en, hi, ta, te, ar)
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

// 1. UAE + Dubai focused locations
const UAE_LOCATIONS = [
  // Core emirates
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm al‑Quwain",
  "Ras Al Khaimah",
  "Fujairah",

  // Dubai‑centric areas
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Jumeirah Beach",
  "Burj Khalifa Area",
  "Dubai Mall Area",
  "Trade Centre Precinct",
  "Dubai Sports City",
  "Dubai Internet City",
  "Dubai Airport Freezone",
  "Dubai Science Park",
  "Dubai Hills Estate",
  "Jumeirah Golf Estates",
  "Al Barsha",
  "Al Nahda",
  "Silicon Oasis",
  "Dubailand",
  "Jumeirah Islands",

  // Major attractions (as destination‑style spots)
  "Burj Al Arab",
  "Burj Khalifa",
  "Dubai Creek",
  "Desert Safari Dubai",
  "Dubai Desert Safari",
  "Dubai Miracle Garden",
  "Dubai Frame",
  "Dubai Aquarium",
  "Dubai Mall",
  "Dubai Opera",
  "Dubai Fountain",
  "Dubai Creek Park",
  "Dubai Parks and Resorts",
  "Aquaventure Waterpark",
  "La Mer",
  "Kite Beach",
  "JBR Beach",
  "Umm Suqeim",

  // Nearby‑air‑hub / regional‑leaning
  "Dubai to Abu Dhabi",
  "Dubai to Sharjah",
  "Dubai to Fujairah",
  "Dubai to Ras Al Khaimah",
  "Dubai to Ajman",
  "Dubai to Umm al‑Quwain",
];

// 2. Trip‑style / visitor‑intent modifiers (India‑outbound style)
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
  "shopping tour",
  "desert safari",
  "beach holiday",
  "luxury trip",
  "budget trip",
  "2026 travel",
  "2026 itinerary",
  "best time to visit",
  "how to get there",
  "public transport",
  "local cuisine",
  "Indo‑Emirati food",
  "hidden gems",
];

// 3. Hotel / property types (Dubai‑style mix)
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
  "airport hotel near Dubai",
  "all‑inclusive resort",
];

// 4. Languages (India‑outbound + UAE‑friendly: en, hi, ta, te, ar)
const LANGS = ["en", "hi", "ta", "te", "ar"];

// 5. SEO‑style keywords (UAE + Dubai + India‑outbound)
const KEYWORDS = [
  "uae travel",
  "uae 2026",
  "visit uae 2026",
  "uae vacation",
  "uae trip",
  "uae tour",
  "uae itinerary",
  "uae guide",
  "uae tips",
  "uae deals",
  "uae budget",
  "uae luxury",
  "uae honeymoon",
  "uae family trip",
  "uae city break",
  "uae shopping",
  "uae desert safari",
  "uae beaches",
  "uae luxury resorts",
  "uae all‑inclusive",
  "dubai travel",
  "dubai 2026",
  "dubai shopping",
  "dubai deserts",
  "dubai beaches",
  "dubai family",
  "dubai honeymoon",
  "dubai budget",
  "dubai luxury",
  "abu dhabi travel",
  "sharjah travel",
  "fujairah travel",
  "ras al khaimah travel",
  "ajman travel",
  "ummalquwain travel",
  "burj khalifa visit",
  "burj al arab visit",
  "dubai mall visit",
  "dubai creek visit",
  "dubai desert safari",
  "dubai mirage garden",
  "dubai frame",
  "dubai aquarium",
  "dubai parks and resorts",
  "aquaventure waterpark",
  "indian travelers to uae",
  "indian travelers to dubai",
  "top destination for indians 2026",
  "uae number one destination for indians",
  "booking.com affiliate",
  "skyscanner deals",
  "flights to uae",
  "flights to dubai",
  "flights from india to dubai",
  "flights from india to uae",
  "cheapest flights to dubai from india",
];

// ==============================
// 1. SLUGIFY + UAE/DUBAI PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(loc, mod, type, lang = "en") {
  const locPart =
    lang === "en" ? `in ${loc}` :
    lang === "hi" ? `${loc} में` :
    lang === "ta" ? `${loc} இல்` :
    lang === "te" ? `${loc}లో` :
    lang === "ar" ? `في ${loc}`;

  if (lang === "hi") {
    return `${locPart} में ${mod} ${type} 2026 की यात्रा गाइड`;
  } else if (lang === "ta") {
    return `${loc} இல் ${mod} ${type} 2026 பயண வழிகாட்டி`;
  } else if (lang === "te") {
    return `${loc}లో ${mod} ${type} 2026 ప్రయాణ మార్గదర్శి`;
  } else if (lang === "ar") {
    return `دليل سفر ${mod} ${type} ${locPart} 2026`;
  } else {
    return `Travel guide to ${mod} ${type} ${locPart} UAE 2026`;
  }
}

function generateDescription(loc, mod, type, lang = "en") {
  if (lang === "hi") {
    return `संयुक्त अरब अमीरात (UAE), खासकर दुबई, भारत से बाहर जाने वाले यात्रियों का नंबर 1 इंटरनेशनल डेस्टिनेशन है 2026 में। इस पृष्ठ पर ${loc} में ${mod} ${type} के लिए गाइड और डील्स देखें।`;
  } else if (lang === "ta") {
    return `ஐக்கிய அரபு அமீரகம் (UAE), குறிப்பாக துபாய், 2026 இல் இந்திய பயணிகளுக்கு முதல் எண் சர்வதேச இடமாகும். ${loc}ல் ${mod} ${type} 2026 பயண வழிகாட்டி மற்றும் சௌகரியங்கள்।`;
  } else if (lang === "te") {
    return `ఐక్య అరబ్ ఎమిరేట్స్ (UAE), ముఖ్యంగా దుబాయ్, 2026 లో భారతీయ ప్రయాణీకులకు నంబర్ 1 అంతర్జాతీయ గమ్యస్థానం. ${loc}లో ${mod} ${type} 2026 ప్రయాణ మార్గదర్శి.`;
  } else if (lang === "ar") {
    return `الإمارات العربية المتحدة، وخاصة دبي، هي الوجهة الدولية رقم 1 للمسافرين من الهند عام 2026. دليل لـ ${type} ${mod} في ${loc} 2026 مع عروض الفنادق والرحلات.`);
  } else {
    return `The United Arab Emirates (UAE), especially Dubai, is the #1 international travel destination for people from India in 2026. Guide to ${mod} ${type} in ${loc} 2026, with deals and booking links to Booking.com and Skyscanner.`;
  }
}

function generateHreflangs(slug, langs) {
  return langs
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/uae/${slug}/${l}.html" />`
    )
    .join("\n  ");
}

function generateKeywords(loc, lang) {
  const base = KEYWORDS.join(", ");
  return base.replace("UAE", loc);
}

function renderUaePage(loc, mod, type, lang = "en") {
  const slug = slugify(`uae‑${loc}.${mod}.${type}`);

  const filename = `uae-${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
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
  <link rel="canonical" href="https://yourdomain.com/uae/${slug}/${lang}.html" />
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
      "name": "UAEDubaiGuide2026",
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
    The United Arab Emirates (UAE), especially Dubai, is the #1 international travel destination for people from India in 2026, with record‑breaking visitor numbers and strong demand from Indian markets. [web:288][web:293][web:297]
  </p>

  <p>
    Use the following links to book stays in the UAE and flights there:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels in UAE (Dubai, Abu Dhabi) on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to UAE (Dubai, Abu Dhabi) (Skyscanner)
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
// 2. GENERATE 8,000,000 UAE/DUBAI PAGES
// ==============================

async function generateThirtyfourFileSpecials() {
  const total = 8000000;

  for (let i = 0; i < total; i++) {
    const loc = UAE_LOCATIONS[i % UAE_LOCATIONS.length];
    const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const type = HOTEL_TYPES[Math.floor(Math.random() * HOTEL_TYPES.length)];
    const lang = LANGS[Math.floor(Math.random() * LANGS.length)];

    renderUaePage(loc, mod, type, lang);
  }

  console.log(
    `✅ thirtyfour-file-specials.js finished: generated 8,000,000 UAE (especially Dubai) pages for India‑outbound travelers, with Booking.com + Skyscanner affiliate links.`
  );
}

generateThirtyfourFileSpecials().catch((err) => {
  console.error("thirtyfour-file-specials.js error:", err.message);
});
