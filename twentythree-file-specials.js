// twentythree-file-specials.js
//
// 1. Generates 100,000 SEO‑friendly Disney World travel pages
//    - One file per page
// 2. Targets:
//    - High‑search‑volume Disney‑related keywords (Walt Disney World, Orlando, resorts, tickets, 2026 visits, etc.)
// 3. Embeds:
//    - BOOKING.HOME (aid=1858279)
//    - SKY.HOME (offer_id=29465&aff_id=21885)
// 4. Designed for 2026 family travel + SEO + affiliate EPC

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

// 100,000 files doesn’t need 100,000 real Disney‑named pages,
// but we will distribute around:
const ORLANDO_AREAS = [
  "Walt Disney World Orlando",
  "Walt Disney World Florida",
  "Orlando Disney World",
  "Walt Disney World Resort",
  "Magic Kingdom Orlando",
  "Epcot Orlando",
  "Hollywood Studios Orlando",
  "Animal Kingdom Orlando",
  "Disney Springs",
  "Disney World Theme Park",
  "All‑Star Resorts",
  "Caribbean Beach Resort",
  "Pop Century",
  "Art of Animation",
  "Animal Kingdom Villas",
  "Disney's Grand Floridian",
  "Disney's Yacht Club",
  "Disney's BoardWalk Inn",
  "Disney's Riviera Resort",
  "Disney's Contemporary Resort",
  "Disney's Polynesian",
  "Disney's Wilderness Lodge",
  "Disney's Fort Wilderness",
  "Disney World Value Resorts",
  "Disney World Moderate Resorts",
  "Disney World Deluxe Resorts",
  "Disney World Resorts",
  "Disney World Parks",
  "Disney World 2026",
  "Disney World 2026 Tickets",
  "Disney World 2026 Guide",
  "Disney World 2026 Planning",
  "Disney World 2026 Tips",
];

// SEO‑style modifiers (to create 100,000 unique slugs without spam)
const MODIFIERS = [
  "planning",
  "planner",
  "guide",
  "tips",
  "deals",
  "tickets",
  "prices",
  "2026",
  "first‑time",
  "family",
  "budget",
  "luxury",
  "all‑inclusive",
  "resort",
  "hotel",
  "apartment",
  "villa",
  "extended‑stay",
  "pet‑friendly",
  "spa",
  "kid‑friendly",
  "baby‑friendly",
  "couples",
  "honeymoon",
  "romantic",
  "date‑night",
  "business‑travel",
  "remote‑work",
  "digital‑nomad",
];

// ==============================
// 1. SLUGIFY + DISNEY PAGE TEMPLATE
// ==============================

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function generateTitle(area, lang = "en") {
  const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];

  if (lang === "en") {
    return `Walt Disney World ${mod} guide for ${area} 2026`;
  } else if (lang === "es") {
    return `Guía de ${mod} para Walt Disney World en ${area} 2026`;
  } else if (lang === "de") {
    return `Walt Disney World ${mod}‑Guide für ${area} 2026`;
  } else {
    return `Walt Disney World ${mod} travel guide for ${area} 2026`;
  }
}

function generateDescription(area, lang = "en") {
  if (lang === "en") {
    return `Plan your 2026 Walt Disney World trip to ${area} with hotels near Magic Kingdom, Epcot, and Disney parks. Use Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) to find the best deals and cheapest flights to Orlando.`;
  } else if (lang === "es") {
    return `Planifica tu viaje 2026 a Walt Disney World en ${area} con hoteles cerca de Magic Kingdom, Epcot y parques Disney. Usa enlaces afiliados Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Planen Sie Ihren 2026‑Trip nach Walt Disney World in ${area} mit Hotels in der Nähe von Magic Kingdom, Epcot und Disney‑Parks. Nutzen Sie Booking.com‑Affiliate‑Links (${BOOKING.HOME}).`;
  } else {
    return `Plan your 2026 Walt Disney World trip to ${area} with Booking.com (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}) for hotels and flights.`;
  }
}

function renderDisneyPage(area, modifier, lang = "en") {
  const slug = slugify(`walt‑disney‑world‑${area}.${modifier}`);
  const filename = `disney${Math.floor(100000 + Math.random() * 900000)}-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const title = generateTitle(area, lang);
  const description = generateDescription(area, lang);

  const hreflangSet = ["en", "es", "de", "fr", "zh"]
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/disney/${slug}/${l}.html" />`
    )
    .join("\n  ");

  // SEO keywords (from Disney‑travel demand)
  const keywords = [
    "walt disney world",
    "disney world orlando",
    "disney world florida",
    "magic kingdom orlando",
    "epcot orlando",
    "hollywood studios orlando",
    "animal kingdom orlando",
    "disney world 2026",
    "disney world tickets",
    "disney world planning",
    "disney world guide",
    "disney world family trip",
    "disney world hotels",
    "orlando hotels",
    "hotels near disney world",
    "booking.com affiliate",
    "skyscanner deals",
    "orlando flights",
    "family travel 2026",
  ].join(", ");

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
  <meta name="keywords" content="${keywords}" />
  <link rel="canonical" href="https://yourdomain.com/disney/${slug}/${lang}.html" />
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
      "name": "DisneyWorldGuide2026",
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
    Use the following links to book hotels near Walt Disney World and flights to Orlando:
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-primary mb-3" target="_blank">
      Book Hotels Near Walt Disney World on Booking.com (aid=1858279)
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-secondary mb-3" target="_blank">
      Compare Flights to Orlando (Skyscanner)
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
// 2. GENERATE 100,000 DISNEY WORLD PAGES
// ==============================

async function generateTwentyThreeFileSpecials() {
  const combos = [];

  // 1. Create 100,000 pseudo‑unique combos
  const total = 100000;

  for (let i = 0; i < total; i++) {
    const area = ORLANDO_AREAS[i % ORLANDO_AREAS.length];
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const lang = ["en", "es", "de", "fr", "zh"][Math.floor(Math.random() * 5)];

    renderDisneyPage(area, modifier, lang);
  }

  console.log(
    `✅ twentythree-file-specials.js finished: generated 100,000 Walt Disney World–themed pages with Booking.com + Skyscanner affiliate links.`
  );
}

generateTwentyThreeFileSpecials().catch((err) => {
  console.error("twentythree-file-specials.js error:", err.message);
});
