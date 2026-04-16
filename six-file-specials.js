// six-file-specials.js
//
// Orchestrator for "volume + cadence".
//
// EVERY RUN:
//   - Generates **N new pages per city** (daily cadence)
//   - Generates **N new pages per event** (daily cadence)
//   - Generates **N generic keyword pages** (daily cadence)
//   - Generates **N per‑language city pages** (daily cadence)
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

// Output directory
const OUTPUT_DIR = path.resolve("./output");

// Master data (same data you already use)
const MASTER_DATA_PATH = "./config/master-all-100-in-1.json";

// Daily cadence: how many new pages per topic per run
const DAILY_PAGES_PER_CITY = 5;
const DAILY_PAGES_PER_EVENT = 3;
const DAILY_KEYWORD_PAGES = 10;
const DAILY_PAGES_PER_LANG = 2;

// Control: how many days we'll simulate (can be 1, 100, 1000)
const RUN_DAYS = 30;

// Cities and events (same as before)
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

const EVENTS_OF_IMPORTANCE = [
  "super-bowl",
  "fifa-world-cup",
  "olympics",
  "champions-league",
  "mls",
  "tennis-grand-slam",
  "motorsport",
  "music-festival",
];

const LANGUAGES = [
  "en", "es", "pt", "de", "fr", "it", "zh", "ru", "ar", "ja",
  "ko", "tr", "pl", "nl", "no", "se", "fa", "th", "id", "vi"
];

// ==============================
// 1. READ MASTER DATA
// ==============================

async function readMasterData() {
  if (await fs.pathExists(MASTER_DATA_PATH)) {
    const data = await fs.readJSON(MASTER_DATA_PATH);
    console.log(`six-file-specials.js: loaded ${data.length} entries from master.`);
    return data;
  } else {
    console.error(`Master data not found: ${MASTER_DATA_PATH}`);
    return [];
  }
}

// ==============================
// 2. FILTER FOR CITY / EVENT
// ==============================

function filterForCity(data, city) {
  return data.filter(
    (entry) => entry.city.toLowerCase() === city.toLowerCase()
  );
}

function filterForEvent(data, event) {
  return data.filter(
    (entry) => entry.event_type === event.toLowerCase()
  );
}

// ==============================
// 3. RENDER DAILY‑CITY PAGE
// ==============================

function renderDailyCityPage(city, day, entries) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hotels in ${city} Day ${day} 2026</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Daily hotel selection in ${city} (Day ${day}) 2026 using Booking.com affiliate links and Skyscanner flights.">
</head>
<body>
<div class="container py-4">

  <h1>Hotels in ${city} – Day ${day} 2026</h1>

  <p>
    This daily guide highlights a different set of hotels in ${city}
    for Day ${day} of 2026. All links lead to Booking.com with your
    affiliate ID (${BOOKING.HOME}) embedded.
  </p>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Hotel Name</th>
        <th>Type</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      ${entries
        .slice(0, 10)
        .map(
          (entry) => `
        <tr>
          <td><a href="${entry.booking_link}" target="_blank">${entry.name}</a></td>
          <td>${entry.type}</td>
          <td>${entry.tags
            .map(
              (tag) => `<span class="badge bg-primary">${tag}</span>`
            )
            .join(" ")}</td>
        </tr>`
        )
        .join("\n")}
    </tbody>
  </table>

  <p>
    Use Skyscanner (${SKY.HOME}) to compare flights to ${city}.
  </p>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Hotels in ${city} Day ${day} 2026",
    "description": "Daily hotel selection in ${city} using Booking.com affiliate links."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 4. RENDER DAILY‑EVENT PAGE
// ==============================

function renderDailyEventPage(event, day, entries) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hotels for ${event.replace("-", " ")} Day ${day} 2026</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Daily hotel selection for ${event.replace("-", " ")} (Day ${day}) 2026 with Booking.com affiliate links and Skyscanner flights.">
</head>
<body>
<div class="container py-4">

  <h1>Hotels for ${event.replace("-", " ")} – Day ${day} 2026</h1>

  <p>
    This is Day ${day} of our daily hotel guide for
    ${event.replace("-", " ")} 2026. All links lead to
    Booking.com with your affiliate ID (${BOOKING.HOME}).
  </p>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Hotel</th>
        <th>City</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      ${entries
        .slice(0, 10)
        .map(
          (entry) => `
        <tr>
          <td><a href="${entry.booking_link}" target="_blank">${entry.name}</a></td>
          <td>${entry.city}</td>
          <td>${entry.tags
            .map(
              (tag) => `<span class="badge bg-primary">${tag}</span>`
            )
            .join(" ")}</td>
        </tr>`
        )
        .join("\n")}
    </tbody>
  </table>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Hotels for ${event.replace("-", " ")} Day ${day} 2026",
    "description": "Daily hotel selection for ${event.replace("-", " ")} with Booking.com affiliate links."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 5. RENDER DAILY‑KEYWORD PAGE
// ==============================

function renderDailyKeywordPage(keyword, day, entries) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${keyword} – Day ${day} 2026</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Daily hotel selection for search term '${keyword}' (Day ${day}) 2026 with Booking.com affiliate links and Skyscanner flights.">
</head>
<body>
<div class="container py-4">

  <h1>${keyword} – Day ${day} 2026</h1>

  <p>
    This daily guide targets the keyword <strong>${keyword}</strong>
    on Day ${day} of 2026. All hotels link to Booking.com with
    your affiliate ID (${BOOKING.HOME}).
  </p>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Hotel</th>
        <th>City</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      ${entries
        .slice(0, 10)
        .map(
          (entry) => `
        <tr>
          <td><a href="${entry.booking_link}" target="_blank">${entry.name}</a></td>
          <td>${entry.city}</td>
          <td>${entry.tags
            .map(
              (tag) => `<span class="badge bg-primary">${tag}</span>`
            )
            .join(" ")}</td>
        </tr>`
        )
        .join("\n")}
    </tbody>
  </table>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${keyword} – Day ${day} 2026",
    "description": "Daily hotel selection for the keyword '${keyword}' with Booking.com affiliate links."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 6. RENDER DAILY‑LANG‑CITY PAGE
// ==============================

function renderDailyLangCityPage(city, lang, day, entries) {
  const langNames = {
    en: "English",
    es: "Español",
    pt: "Português",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
    zh: "中文",
    ru: "Русский",
    ar: "العربية",
    ja: "日本語",
    ko: "한국어",
    tr: "Türkçe",
    pl: "Polski",
    nl: "Nederlands",
    no: "Norsk",
    se: "Svenska",
    fa: "فارسی",
    th: "ไทย",
    id: "Indonesia",
    vi: "Tiếng Việt",
  };

  const citySafe = city.toLowerCase().replace(" ", "-");

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Hoteles en ${city} – Día ${day} 2026</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Guía diaria de hoteles en ${city} (Día ${day}) 2026 con enlaces afiliados a Booking.com y Skyscanner.">
</head>
<body>
<div class="container py-4">

  <h1>Hoteles en ${city} – Día ${day} 2026</h1>

  <p>
    Esta guía diaria destaca una selección diferente de hoteles en ${city}
    para el Día ${day} de 2026. Todos los enlaces dirigen a Booking.com
    con tu ID afiliado (${BOOKING.HOME}) integrado.
  </p>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Hotel</th>
        <th>Ciudad</th>
        <th>Etiquetas</th>
      </tr>
    </thead>
    <tbody>
      ${entries
        .slice(0, 10)
        .map(
          (entry) => `
        <tr>
          <td><a href="${entry.booking_link}" target="_blank">${entry.name}</a></td>
          <td>${entry.city}</td>
          <td>${entry.tags
            .map(
              (tag) => `<span class="badge bg-primary">${tag}</span>`
            )
            .join(" ")}</td>
        </tr>`
        )
        .join("\n")}
    </tbody>
  </table>

  <p>
    Usa Skyscanner (${SKY.HOME}) para comparar vuelos a ${city}.
  </p>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Hoteles en ${city} – Día ${day} 2026 (${langNames[lang]})",
    "description": "Guía diaria de hoteles en ${city} con enlaces afiliados a Booking.com."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 7. MAIN GENERATOR – six-file-specials.js
// ==============================

async function generateVolumeCadence() {
  const data = await readMasterData();
  if (data.length === 0) {
    console.log("No data to generate for six-file-specials.js; exiting.");
    return;
  }

  // Track how many files we actually generate
  let totalFiles = 0;

  // 1. Daily city pages
  for (let day = 1; day <= RUN_DAYS; day++) {
    CITIES_OF_IMPORTANCE.forEach((city) => {
      const cityEntries = filterForCity(data, city);
      if (cityEntries.length === 0) return;

      for (let i = 0; i < DAILY_PAGES_PER_CITY; i++) {
        const subset = cityEntries.slice(
          i * 10,
          i * 10 + 10
        );

        const page = renderDailyCityPage(city, day, subset);
        const safeCity = city.toLowerCase().replace(" ", "-");
        const filename = path.join(
          OUTPUT_DIR,
          `hotels-in-daily-${safeCity}-day-${day}-${i}.html`
        );

        fs.ensureFileSync(filename);
        fs.writeFileSync(filename, page);
        console.log(`✓ Generated ${filename}`);
        totalFiles++;
      }
    });
  }

  // 2. Daily event pages
  for (let day = 1; day <= RUN_DAYS; day++) {
    EVENTS_OF_IMPORTANCE.forEach((event) => {
      const eventEntries = filterForEvent(data, event);
      if (eventEntries.length === 0) return;

      for (let i = 0; i < DAILY_PAGES_PER_EVENT; i++) {
        const subset = eventEntries.slice(
          i * 10,
          i * 10 + 10
        );

        const page = renderDailyEventPage(event, day, subset);
        const filename = path.join(
          OUTPUT_DIR,
          `event-daily-${event}-day-${day}-${i}.html`
        );

        fs.ensureFileSync(filename);
        fs.writeFileSync(filename, page);
        console.log(`✓ Generated ${filename}`);
        totalFiles++;
      }
    });
  }

  // 3. Daily keyword pages
  const DAILY_KEYWORDS = [
    "budget hotel near me",
    "luxury hotel near airport",
    "family friendly hotel",
    "all inclusive resort",
    "hostel near city center",
    "apartment hotel",
    "cheap hotel last minute",
    "business
