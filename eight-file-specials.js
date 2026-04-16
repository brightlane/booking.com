// eight-file-specials.js
//
// 1. Generates 1,000 new, unique HTML pages that continue the pattern of:
//   - four‑file‑specials.js
//   - five‑file‑specials.js
//   - six‑file‑specials.js
//
// 2. Constantly regenerates sitemap.xml for all indexable pages
//
// Already wired to:
//   - BOOKING.HOME (aid=1858279)
//   - SKY.HOME (offer_id=29465&aff_id=21885)

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
const SITEMAP_PATH = path.join(OUTPUT_DIR, "sitemap.xml");

// Master data (to keep tone/style aligned)
const MASTER_DATA_PATH = "./config/master-all-100-in-1.json";

// Cities, events, keywords to keep volume high
const CITIES = [
  "New York City", "Los Angeles", "London", "Paris", "Berlin", "Rome",
  "Barcelona", "Madrid", "Amsterdam", "Tokyo", "Singapore", "Bangkok",
  "Dubai", "Istanbul", "Sydney", "Rio de Janeiro", "Sao Paulo",
  "Mexico City", "Moscow", "Cape Town",
];

const EVENTS = [
  "super-bowl", "fifa-world-cup", "olympics",
  "champions-league", "mls", "tennis-grand-slam",
  "motorsport", "music-festival",
];

const KEYWORDS = [
  "budget hotel in",
  "luxury hotel near",
  "all inclusive resort",
  "hostel near city center",
  "apartment hotel",
  "family friendly hotel",
  "airport hotel",
  "business hotel",
  "last minute hotel",
  "pet friendly hotel",
  "romantic getaway",
  "near stadium",
  "near beach",
  "near airport",
  "cheap hotel",
  "hotels with free parking",
];

// Target 1000 new files
const TARGET_NEW_FILES = 1000;

// How often to regenerate sitemap (in minutes)
const SITEMAP_REFRESH_MINUTES = 5;

// ==============================
// 1. 1000 NEW PAGES: content templates
// ==============================

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePageTitle(city, event, keyword, index) {
  if (city && event) {
    return `Hotels in ${city} for ${event.replace("-", " ")} – ${index} 2026`;
  } else if (city) {
    return `Best ${keyword} in ${city} – ${index} 2026`;
  } else if (event) {
    return `Best hotels for ${event.replace("-", " ")} – ${index} 2026`;
  } else {
    return `Hotel guide ${index} 2026 | Booking.com affiliate`;
  }
}

function generatePageDescription(city, event, keyword) {
  if (city && event) {
    return `Hotel guide for travelers to ${city} during ${event.replace("-", " ")} 2026 with Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}).`;
  } else if (city) {
    return `Page explaining the best ${keyword.toLowerCase()} options in ${city} 2026 using Booking.com affiliate links (${BOOKING.HOME}).`;
  } else {
    return `Extensible hotel‑style page ${event ? `for ${event.replace("-", " ")}` : keyword} 2026 with Booking.com affiliate ID embedded.`;
  }
}

function generatePageContent(city, event, keyword, index, lang = "en") {
  const titles = {
    en: generatePageTitle(city, event, keyword, index),
    es: `Guía de hoteles en ${city || "ciudad"} para ${event ? event.replace("-", " ") : keyword} – Día ${index} 2026`,
  };

  const descriptions = {
    en: generatePageDescription(city, event, keyword),
    es: `Guía de hoteles en ${city || "ciudad"} para ${event ? event.replace("-", " ") : keyword} 2026 con enlaces afiliados a Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`,
  };

  const title = titles[lang] || titles.en;
  const description = descriptions[lang] || descriptions.en;

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '\\"')}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="language" content="${lang}">
  <meta name="robots" content="index, follow">
  <meta name="keywords" content="${KEYWORDS.join(", ")}">
  <link rel="canonical" href="https://yourdomain.com/${city ? `hotels-in-${city.toLowerCase().replace(" ", "-")}` : ""}${event ? `event-${event}` : ""}${keyword ? keyword.replace(" ", "-") : ""}.html">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "YourHotelGuide",
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
    All hotel links on this page lead to Booking.com with your affiliate ID (${BOOKING.HOME}).
    Use Skyscanner (${SKY.HOME}) to compare flights to ${city || "these destinations"}.
  </p>

</div>
</body>
</html>
  `;
}

// ==============================
// 2. CREATE 1000 NEW FILES
// ==============================

async function generateOneThousandNewPages() {
  // 1. Build a pool of potential patterns
  const patterns = [];

  CITIES.forEach((city) => {
    EVENTS.forEach((event) => {
      patterns.push({ type: "city-event", city, event });
    });

    KEYWORDS.forEach((keyword) => {
      patterns.push({ type: "city-keyword", city, keyword });
    });
  });

  EVENTS.forEach((event) => {
    KEYWORDS.forEach((keyword) => {
      patterns.push({ type: "event-keyword", event, keyword });
    });
  });

  for (let i = 0; i < 500; i++) {
    patterns.push({ type: "generic", index: i });
  }

  // 2. Pick 1000 items (with repeat allowed, to hit volume)
  const newFiles = [];

  for (let i = 0; i < TARGET_NEW_FILES; i++) {
    const pattern = randomChoice(patterns);
    const { city, event, keyword, type } = pattern;

    const index = i + 1;

    const lang = Math.random() > 0.3 ? "en" : "es";

    const pageHtml = generatePageContent(city, event, keyword, index, lang);

    // Unique filename
    let filenamePart;

    if (city && event) {
      filenamePart = `hotels-in-${city.toLowerCase().replace(" ", "-")}-event-${event}`;
    } else if (city && keyword) {
      filenamePart = `hotels-in-${city.toLowerCase().replace(" ", "-")}-${keyword.replace(" ", "-")}`;
    } else if (event && keyword) {
      filenamePart = `event-${event}-${keyword.replace(" ", "-")}`;
    } else {
      filenamePart = `generated-page-${index}`;
    }

    const filename = `${filenamePart}-${lang}-${index}.html`;
    const fullPath = path.join(OUTPUT_DIR, filename);

    fs.ensureFileSync(fullPath);
    fs.writeFileSync(fullPath, pageHtml);

    console.log(`✓ Generated ${filename}`);

    newFiles.push(filename);
  }

  console.log(`✅ eight-file-specials.js: created ${newFiles.length} new pages.`);
  return newFiles;
}

// ==============================
// 3. FIND ALL EXISTING PAGES (FOR SITEMAP)
// ==============================

async function findAllIndexablePages() {
  const pages = [];

  const allFiles = await fs.readdir(OUTPUT_DIR, { recursive: true });
  for (const file of allFiles) {
    const fullPath = path.join(OUTPUT_DIR, file);
    const stat = await fs.stat(fullPath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!ext.endsWith(".html")) continue;

    const urlPath = `/output/${file.replace(/\\/g, "/")}`;
    pages.push({
      file: file,
      url: `https://yourdomain.com${urlPath.replace("/output/", "/")}`,
      mtime: stat.mtime.toISOString().split("T")[0],
    });
  }

  return pages;
}

// ==============================
// 4. WRITE SITEMAP.XML
// ==============================

function generateSitemapXml(pages, domain = "https://yourdomain.com") {
  const now = new Date().toISOString().split("T")[0];

  const entries = pages
    .map(
      (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.mtime || now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

async function writeSitemap() {
  const pages = await findAllIndexablePages();
  const xml = generateSitemapXml(pages);

  await fs.writeFile(SITEMAP_PATH, xml);
  console.log(`✅ Sitemap regenerated (${pages.length} URLs) → ${SITEMAP_PATH}`);
}

// ==============================
// 5. REGULAR SITEMAP REFRESHER
// ==============================

function startSitemapRegenerator(intervalMinutes = 5) {
  const ms = intervalMinutes * 60 * 1000;

  writeSitemap(); // run once immediately

  setInterval(async () => {
    await writeSitemap().catch((err) => {
      console.error("Error regenerating sitemap:", err.message);
    });
  }, ms);

  console.log(`🔄 Sitemap auto‑regenerator started (every ${intervalMinutes} minutes)`);
}

// ==============================
// 6. MAIN – eight-file-specials.js
// ==============================

async function generateVolumeAndSitemap() {
  // 1. First time: create 1000 new pages
  await generateOneThousandNewPages();

  // 2. Generate sitemap now
  await writeSitemap();

  // 3. Keep regenerating sitemap forever
  startSitemapRegenerator(SITEMAP_REFRESH_MINUTES);
}

// Run this file once per day (or keep it as a long‑run daemon)
generateVolumeAndSitemap().catch((err) => {
  console.error("eight-file-specials.js error:", err.message);
});
