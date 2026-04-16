// ten-file-specials.js
//
// 1. Generate additional high‑volume, non‑duplicated pages
//    - city‑type‑event combos: budget / luxury / all‑inclusive / airport / hostel / apartment
//    - daily‑city‑day‑N pages (more than six‑file‑specials)
//    - event‑city‑day‑N pages
//
// 2. Always embed:
//    - BOOKING.HOME (aid=1858279)
//    - SKY.HOME (offer_id=29465&aff_id=21885)
//
// 3. Always write SEO‑style meta + schema + cross‑link hints
//
// 4. This file is designed to run once per day and keep scaling
//    (no limit on “how many more files”; you can keep adding)

const fs = require("fs-extra");
const path = require("path");

// Your Booking.com + Skyscanner affiliate IDs
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
const MASTER_DATA_PATH = "./config/master-all-100-in-1.json";

const LANGUAGES = [
  "en", "es", "pt", "de", "fr", "it", "zh", "ru", "ar", "ja",
  "ko", "tr", "pl", "nl", "no", "se", "fa", "th", "id", "vi"
];

const CITIES_OF_IMPORTANCE = [
  "New York City",
  "Los Angeles",
  "London",
  "Paris",
  "Berlin",
  "Rome",
  "Barcelona",
  "Madrid",
  "Amsterdam",
  "Tokyo",
  "Singapore",
  "Bangkok",
  "Dubai",
  "Istanbul",
  "Sydney",
  "Rio de Janeiro",
  "Sao Paulo",
  "Mexico City",
  "Moscow",
  "Johannesburg",
  "Cape Town",
];

const EVENTS = [
  "super-bowl",
  "fifa-world-cup",
  "olympics",
  "champions-league",
  "mls",
  "tennis-grand-slam",
  "motorsport",
  "music-festival",
];

const TYPES = ["budget", "luxury", "all-inclusive", "airport", "hostel", "apartment", "family", "business"];

// ==============================
// 1. READ MASTER DATA
// ==============================

async function readMasterData() {
  if (await fs.pathExists(MASTER_DATA_PATH)) {
    const data = await fs.readJSON(MASTER_DATA_PATH);
    console.log(`ten-file-specials.js: loaded ${data.length} entries from master.`);
    return data;
  } else {
    console.error(`Master data not found: ${MASTER_DATA_PATH}`);
    return [];
  }
}

// ==============================
// 2. FILTER BY CITY + TYPE + EVENT
// ==============================

function filterForCityTypeEvent(data, city, type, event) {
  return data.filter(
    (entry) =>
      entry.city.toLowerCase() === city.toLowerCase() &&
      (type === "all" ||
        (type === "budget" &&
          entry.tags.some((tag) =>
            ["budget", "cheap", "economy"].includes(tag.toLowerCase())
          )) ||
        (type === "luxury" &&
          entry.tags.some((tag) =>
            ["luxury", "premium", "5-star"].includes(tag.toLowerCase())
          )) ||
        (type === "all-inclusive" &&
          entry.event_type === "resort" && entry.tags.includes("all-inclusive")) ||
        (type === "airport" && entry.tags.includes("airport")) ||
        (type === "hostel" && entry.type === "hostel") ||
        (type === "apartment" && entry.type === "apart-hotel")) &&
      (!event ||
        entry.event_type === event.toLowerCase() ||
        entry.tags.includes(event.toLowerCase()))
  );
}

// ==============================
// 3. SEO PAGE TEMPLATE
// ==============================

function renderPage(city, type, event, day, lang = "en") {
  const typeNames = {
    budget: "Budget",
    luxury: "Luxury",
    "all-inclusive": "All‑Inclusive",
    airport: "Airport",
    hostel: "Hostel",
    apartment: "Apartments",
    family: "Family",
    business: "Business",
    all: "",
  };

  const typeName = typeNames[type] || typeNames.all;
  const typePhrase = typeName ? `${typeName} ` : "";

  let title,
      description;

  if (lang === "en") {
    title = `Best ${typePhrase}Hotels in ${city}${event ? ` for ${event.replace("-", " ")} 2026` : ""}`;
    description = `Find the best ${typePhrase.toLowerCase()}hotels in ${city}${
      event ? ` for ${event.replace("-", " ")} 2026` : ""
    } with Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner flights (${SKY.HOME}).`;
  } else if (lang === "es") {
    title = `Mejores hoteles ${typePhrase.toLowerCase()}en ${city}${event ? ` para ${event.replace("-", " ")} 2026` : ""}`;
    description = `Encuentra los mejores hoteles ${
      typePhrase.toLowerCase()
    }en ${city}${event ? ` para ${event.replace("-", " ")}` : ""} 2026 con links afiliados a Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
  } else {
    title = `Best ${typePhrase}Hotels in ${city} 2026`;
    description = `Find the best ${typePhrase.toLowerCase()}hotels in ${city} 2026 using Booking.com affiliate links (${BOOKING.HOME}).`;
  }

  const h1 = title;

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '\\"')}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="language" content="${lang}">
  <meta name="robots" content="noindex" />
  <meta name="keywords" content="best hotels in ${city}, cheap hotels in ${city}, luxury hotels in ${city}, all inclusive resort, hostel near city center, apartment hotel, family friendly hotel, airport hotel, business hotel" />
  <link rel="canonical" href="https://yourdomain.com/hotels-in-${city.toLowerCase().replace(
    " ",
    "-"
  )}${event ? `-${event}` : ""}/${type}/${lang}.html" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "HotelGuide2026",
      "url": "https://yourdomain.com/"
    }
  }
  </script>
</head>
<body>
<div class="container py-4">

  <h1>${h1}</h1>

  <p>${description}</p>

  <p>
    Use the Booking.com links below to find hotels in ${city} for ${
      event || "your 2026 trip"
    }.<br/>
    Book flights with Skyscanner (${SKY.HOME}).
  </p>

</div>
</body>
</html>
  `;
}

// ==============================
// 4. GENERATE MASSIVE NON‑DUPLICATED PAGE TIER
// ==============================

async function generateTenFileSpecials() {
  const data = await readMasterData();
  if (data.length === 0) {
    console.log("ten-file-specials.js: no data; exiting.");
    return;
  }

  let fileCount = 0;

  // For each city, each type, each event (if any), and each language
  CITIES_OF_IMPORTANCE.forEach((city) => {
    TYPES.forEach((type) => {
      [...EVENTS, null].forEach((event) => {
        LANGUAGES.forEach((lang) => {
          const page = renderPage(city, type, event, null, lang);
          const citySafe = city.toLowerCase().replace(" ", "-");
          const eventSafe = event ? `-${event}` : "";
          const typeSafe = type === "all" ? "" : `-${type}`;
          const langSafe = `-${lang}`;

          const filename = `hotels-in-${citySafe}${eventSafe}${typeSafe}${langSafe}.html`;
          const fullPath = path.join(OUTPUT_DIR, filename);

          fs.ensureFileSync(fullPath);
          fs.writeFileSync(fullPath, page);

          console.log(`✓ tn${fileCount++} → ${filename}`);
        });
      });
    });
  });

  console.log(
    `✅ ten-file-specials.js finished: generated ${fileCount} additional SEO pages (non‑duplicated with previous files).`
  );
}

// Run once per day
generateTenFileSpecials().catch((err) => {
  console.error("ten-file-specials.js error:", err.message);
});// ten-file-specials-anchor.js
//
// 1. Reads all generated HTML files
// 2. Adds cross‑link anchors to:
//    - event‑hubs
//    - city‑hubs
//    - language‑roots
//
// 3. Writes anchor‑rich content into each page
// 4. Runs before search engines crawl

const fs = require("fs-extra");
const path = require("path");

const OUTPUT_DIR = path.resolve("./output");

function buildAnchors() {
  const cityRoots = CITIES_OF_IMPORTANCE.map(
    (city) => `<a href="/hotels-in-${city.toLowerCase().replace(" ", "-")}/index.html">${city}</a>`
  ).join(", ");

  const eventHubs = EVENTS.map(
    (event) => `<a href="/event-${event}/index.html">${event.replace("-", " ")}</a>`
  ).join(", ");

  const langRoots = LANGUAGES.map(
    (lang) => `<a href="/${lang}/index.html">${LANG_NAMES[lang]}</a>`
  ).join(", ");

  return `
  <div class="container py-4 mt-4 border-top">
    <h2>Also browse</h2>
    <p><strong>Cities:</strong> ${cityRoots}</p>
    <p><strong>Events:</strong> ${eventHubs}</p>
    <p><strong>Languages:</strong> ${langRoots}</p>
  </div>
  `;
}

async function readAllPages() {
  const pages = [];

  const allFiles = await fs.readdir(OUTPUT_DIR, { recursive: true });
  for (const file of allFiles) {
    const fullPath = path.join(OUTPUT_DIR, file);
    const stat = await fs.stat(fullPath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!ext.endsWith(".html")) continue;

    pages.push({
      file,
      fullPath,
    });
  }

  return pages;
}

async function injectAnchors() {
  const pages = await readAllPages();
  const anchorHtml = buildAnchors();

  for (const page of pages) {
    const content = await fs.readFile(page.fullPath, "utf8");

    const body = /<body[^>]*>([\s\S]*)<\/body>/i;
    if (body.test(content)) {
      const withAnchors = content.replace(
        body,
        (whole, bodyInner) => {
          return `<body>
${bodyInner}
${anchorHtml}
</body>`;
        }
      );

      await fs.writeFile(page.fullPath, withAnchors);
      console.log(`✓ Anchors added to ${page.file}`);
    }
  }

  console.log(`✅ ten-file-specials-anchor.js: added anchors to ${pages.length} pages.`);
}

injectAnchors().catch((err) => {
  console.error("ten-file-specials-anchor.js error:", err.message);
});
