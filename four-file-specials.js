// four-file-specials.js
// Orchestrator for "most important content on the internet":
//  - Event hubs (Super Bowl, World Cup, Olympics, music festivals, etc.)
//  - Multi‑language trees (en/es/pt/de/fr/it/zh/ru/ar/ja/...)
//  - High‑value tools / comparison pages (all‑inclusive tables, cost calculators, etc.)
// Booking.com + Skyscanner affiliate IDs are already in place.

const fs = require("fs-extra");
const path = require("path");

// Your Booking.com affiliate ID (already in place)
const BOOKING = {
  HOME: "https://www.booking.com/index.html?aid=1858279",
  APARTMENTS: "https://www.booking.com/apartments/index.html?aid=1858279",
  RESORTS: "https://www.booking.com/resorts/index.html?aid=1858279",
  VILLAS: "https://www.booking.com/villas/index.html?aid=1858279",
  BNB: "https://www.booking.com/bed-and-breakfast/index.html?aid=1858279",
  GUESTHOUSES: "https://www.booking.com/guest-house/index.html?aid=1858279",
};

// Your Skyscanner affiliate link (already in place)
const SKY = {
  HOME: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

// Output dir
const OUTPUT_DIR = path.resolve("./output");

// Input data paths (all files we discussed)
const MASTER_DATA_PATH = "./config/master-all-100-in-1.json";
const SPORTING_EVENTS_PATH = "./config/sporting-events-hotels.json";
const EVENT_SUPER_BOWL_PATH = "./config/event-super-bowl-2026-hotels.json";
const EVENT_FIFA_PATH = "./config/event-fifa-world-cup-2026-hotels.json";
const EVENT_OLYMPICS_PATH = "./config/event-olympics-la28-hotels.json";
const HOSTELS_WORLDWIDE_PATH = "./config/hostels-worldwide.json";
const APARTMENTS_WORLDWIDE_PATH = "./config/apartments-worldwide.json";
const UNDERWATER_HOTELS_PATH = "./config/underwater-hotels.json";
const ALL_INCLUSIVE_HOTELS_PATH = "./config/all-inclusive-hotels.json";
const TOP_50_BRANDS_PATH = "./config/top-50-hotel-brands.json";
const HOSTELS_EUROPE_PATH = "./config/hostels-europe.json";
const APARTMENTS_EUROPE_PATH = "./config/apartments-europe.json";
const HOSTELS_EUROPE_EN_PATH = "./config/hostels-europe-en.json";
const HOSTELS_EUROPE_ES_PATH = "./config/hostels-europe-es.json";
const APARTMENTS_EUROPE_EN_PATH = "./config/apartments-europe-en.json";
const APARTMENTS_EUROPE_ES_PATH = "./config/apartments-europe-es.json";
const BRANDS_HOLIDAY_INN_EN_PATH = "./config/brands-holiday-inn-en.json";
const BRANDS_HOLIDAY_INN_ES_PATH = "./config/brands-holiday-inn-es.json";
const BRANDS_SHERATON_EN_PATH = "./config/brands-sheraton-en.json";
const BRANDS_SHERATON_ES_PATH = "./config/brands-sheraton-es.json";
const BRANDS_HILTON_EN_PATH = "./config/brands-hilton-en.json";
const BRANDS_HILTON_ES_PATH = "./config/brands-hilton-es.json";
const BRANDS_MARRIOTT_EN_PATH = "./config/brands-marriott-en.json";
const BRANDS_MARRIOTT_ES_PATH = "./config/brands-marriott-es.json";
const BRANDS_IHG_EN_PATH = "./config/brands-ihg-en.json";
const BRANDS_IHG_ES_PATH = "./config/brands-ihg-es.json";
const BRANDS_HYATT_EN_PATH = "./config/brands-hyatt-en.json";
const BRANDS_HYATT_ES_PATH = "./config/brands-hyatt-es.json";
const BRANDS_BEST_WESTERN_EN_PATH = "./config/brands-best-western-en.json";
const BRANDS_BEST_WESTERN_ES_PATH = "./config/brands-best-western-es.json";
const BRANDS_RADISSON_EN_PATH = "./config/brands-radisson-en.json";
const BRANDS_RADISSON_ES_PATH = "./config/brands-radisson-es.json";
const BRANDS_MOTEL_6_EN_PATH = "./config/brands-motel-6-en.json";
const BRANDS_MOTEL_6_ES_PATH = "./config/brands-motel-6-es.json";
const BRANDS_BUDGET_EN_PATH = "./config/brands-budget-hotels-en.json";
const BRANDS_BUDGET_ES_PATH = "./config/brands-budget-hotels-es.json";
const BRANDS_LUXURY_EN_PATH = "./config/brands-luxury-hotels-en.json";
const BRANDS_LUXURY_ES_PATH = "./config/brands-luxury-hotels-es.json";
const BRANDS_RESORT_EN_PATH = "./config/brands-resort-hotels-en.json";
const BRANDS_RESORT_ES_PATH = "./config/brands-resort-hotels-es.json";
const BRANDS_HOSTEL_EN_PATH = "./config/brands-hostel-hotels-en.json";
const BRANDS_HOSTEL_ES_PATH = "./config/brands-hostel-hotels-es.json";
const BRANDS_APARTMENT_EN_PATH = "./config/brands-apartment-hotels-en.json";
const BRANDS_APARTMENT_ES_PATH = "./config/brands-apartment-hotels-es.json";
const BRANDS_UNDERWATER_EN_PATH = "./config/brands-underwater-hotels-en.json";
const BRANDS_UNDERWATER_ES_PATH = "./config/brands-underwater-hotels-es.json";

const LANGUAGES = [
  "en", "es", "pt", "de", "fr", "it", "zh", "ru", "ar", "ja", "ko", "tr", "pl", "nl", "no", "se", "fa", "th", "id", "vi"
];

// ==============================
// 1. MERGE ALL DATA FROM ALL FILES WE DISCUSSED
// ==============================

async function readAllData() {
  const files = [
    MASTER_DATA_PATH,
    SPORTING_EVENTS_PATH,
    EVENT_SUPER_BOWL_PATH,
    EVENT_FIFA_PATH,
    EVENT_OLYMPICS_PATH,
    HOSTELS_WORLDWIDE_PATH,
    APARTMENTS_WORLDWIDE_PATH,
    UNDERWATER_HOTELS_PATH,
    ALL_INCLUSIVE_HOTELS_PATH,
    TOP_50_BRANDS_PATH,
    HOSTELS_EUROPE_PATH,
    APARTMENTS_EUROPE_PATH,
    HOSTELS_EUROPE_EN_PATH,
    HOSTELS_EUROPE_ES_PATH,
    APARTMENTS_EUROPE_EN_PATH,
    APARTMENTS_EUROPE_ES_PATH,
    BRANDS_HOLIDAY_INN_EN_PATH,
    BRANDS_HOLIDAY_INN_ES_PATH,
    BRANDS_SHERATON_EN_PATH,
    BRANDS_SHERATON_ES_PATH,
    BRANDS_HILTON_EN_PATH,
    BRANDS_HILTON_ES_PATH,
    BRANDS_MARRIOTT_EN_PATH,
    BRANDS_MARRIOTT_ES_PATH,
    BRANDS_IHG_EN_PATH,
    BRANDS_IHG_ES_PATH,
    BRANDS_HYATT_EN_PATH,
    BRANDS_HYATT_ES_PATH,
    BRANDS_BEST_WESTERN_EN_PATH,
    BRANDS_BEST_WESTERN_ES_PATH,
    BRANDS_RADISSON_EN_PATH,
    BRANDS_RADISSON_ES_PATH,
    BRANDS_MOTEL_6_EN_PATH,
    BRANDS_MOTEL_6_ES_PATH,
    BRANDS_BUDGET_EN_PATH,
    BRANDS_BUDGET_ES_PATH,
    BRANDS_LUXURY_EN_PATH,
    BRANDS_LUXURY_ES_PATH,
    BRANDS_RESORT_EN_PATH,
    BRANDS_RESORT_ES_PATH,
    BRANDS_HOSTEL_EN_PATH,
    BRANDS_HOSTEL_ES_PATH,
    BRANDS_APARTMENT_EN_PATH,
    BRANDS_APARTMENT_ES_PATH,
    BRANDS_UNDERWATER_EN_PATH,
    BRANDS_UNDERWATER_ES_PATH,
  ];

  const merged = [];
  for (const file of files) {
    if (await fs.pathExists(file)) {
      const data = await fs.readJSON(file);
      if (Array.isArray(data) && data.length) {
        merged.push(...data);
      }
    } else {
      console.log(`File not found (optional): ${file}`);
    }
  }
  return merged;
}

// ==============================
// 2. EVENT HUBS (Super Bowl, World Cup, Olympics, etc.)
// ==============================

function renderEventHub(entries, event, year, titleAddition = "") {
  const events = [
    { event: "Super Bowl", dataPath: EVENT_SUPER_BOWL_PATH },
    { event: "FIFA World Cup", dataPath: EVENT_FIFA_PATH },
    { event: "Olympics", dataPath: EVENT_OLYMPICS_PATH },
  ];

  const byEvent = events.map((e) => {
    const matching = entries.filter(
      (entry) =>
        entry.event_type === e.event.toLowerCase() ||
        entry.tags.includes(e.event.toLowerCase())
    );
    return matching.length
      ? `
        <h3>${e.event}</h3>
        <p>There are ${matching.length} hotels near ${e.event} host cities in 2026.</p>
      `
      : "";
  }).join("\n");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Best ${event} ${titleAddition ? titleAddition + " " : ""}Hotels in 2026 | Booking.com Affiliate</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Find the best ${event} hotels in 2026 with Booking.com affiliate links and Skyscanner flight search.">
</head>
<body>
<div class="container py-4">

  <h1>Best Hotels for ${event} 2026</h1>

  <p>
    This ${event} hotel hub lists properties near official host cities, stadiums, and fan zones, all paired with Booking.com booking links (${BOOKING.HOME}) and Skyscanner flight options (${SKY.HOME}).
  </p>

  ${byEvent}

  <h2>How to use this page</h2>
  <p>
    Filter by city and hotel type, then click the Booking.com link to reserve your stay for ${year}.
  </p>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best ${event} ${titleAddition ? titleAddition + " " : ""}Hotels 2026",
    "description": "Hotel guide for ${event} 2026 travelers using Booking.com affiliate links."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 3. MULTI‑LANGUAGE SITE TREES (en/es/pt/de/fr/it/zh/ru/ar/ja/ko/tr/pl/nl/no/se/fa/th/id/vi)
// ==============================

function renderLangRoot(lang) {
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

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Hotel Guides in ${langNames[lang] || "language"}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Hotel and accommodation guides in ${langNames[lang] || "selected language"} from ${lang} to ${lang} travelers.">
</head>
<body>
<div class="container py-4">

  <h1>Hotel Guides in ${langNames[lang] || "Language"}</h1>

  <p>
    Select a city or event to see hotel listings with Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner flight searches (${SKY.HOME}).
  </p>

  <ul>
    <li><a href="/${lang}/hotels-in-new-york.html">New York City hotels in ${langNames[lang] || "language"}</a></li>
    <li><a href="/${lang}/hotels-in-london.html">London hotels in ${langNames[lang] || "language"}</a></li>
    <li><a href="/${lang}/event-super-bowl.html">Super Bowl 2026 hotels in ${langNames[lang] || "language"}</a></li>
    <li><a href="/${lang}/event-fifa.html">FIFA World Cup 2026 hotels in ${langNames[lang] || "language"}</a></li>
  </ul>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hotel Guides in ${langNames[lang] || "language"}",
    "url": "https://yourdomain.com/${lang}/"
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 4. HIGH‑VALUE COMPARISON / TOOL PAGES
// ==============================

function renderAllInclusiveComparison(entries) {
  const allInclusive = entries.filter(
    (entry) => entry.tags.includes("all-inclusive")
  );

  const rows = allInclusive
    .map(
      (entry) => `
  <tr>
    <td><a href="${entry.booking_link}" target="_blank">${entry.name}</a></td>
    <td>${entry.city}</td>
    <td>${entry.country}</td>
    <td><a href="https://yourdomain.com/${entry.city.replace(" ", "-")}-all-inclusive.html">All‑inclusive details</a></td>
  </tr>`
    )
    .join("\n");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Top All‑Inclusive Resort Comparison 2026</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Compare top all‑inclusive resorts worldwide with Booking.com affiliate links and Skyscanner integrations.">
</head>
<body>
<div class="container py-4">

  <h1>All‑Inclusive Resort Comparison</h1>

  <p>
    Compare 2026 all‑inclusive resorts by city, brand, and family‑friendliness.
    Click the Booking.com link for each hotel to reserve directly with affiliate ID ${BOOKING.HOME} embedded.
  </p>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Hotel Name</th>
        <th>City</th>
        <th>Country</th>
        <th>More Details</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <p>
    Use Skyscanner (${SKY.HOME}) to compare flights to these destinations.
  </p>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "All‑Inclusive Resort Comparison 2026",
    "description": "Comparison table of all‑inclusive resorts worldwide using Booking.com affiliate links."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 5. GENERATE ALL
// ==============================

async function generateAllInFourFileSpecials() {
  const data = await readAllData();
  console.log(`Loaded ${data.length} entries into four-file-specials.js`);

  // 1. Event hubs
  [
    ["Super Bowl", "2026"],
    ["FIFA World Cup", "2026"],
    ["Olympics", "2028"],
  ].forEach(([event, year]) => {
    const page = renderEventHub(
      data,
      event,
      year,
      event === "Super Bowl" ? "Stadium" : ""
    );
    const filename = path.join(
      OUTPUT_DIR,
      `event-${event.toLowerCase().replace(" ", "-")}-hub.html`
    );
    fs.ensureFileSync(filename);
    fs.writeFileSync(filename, page);
    console.log(`✓ Generated ${filename}`);
  });

  // 2. Multi‑language roots
  LANGUAGES.forEach((lang) => {
    const page = renderLangRoot(lang);
    const dir = path.join(OUTPUT_DIR, lang);
    fs.ensureDirSync(dir);
    const filename = path.join(dir, "index.html");
    fs.writeFileSync(filename, page);
    console.log(`✓ Generated ${filename}`);
  });

  // 3. Comparison / tool pages
  const comparisonPage = renderAllInclusiveComparison(data);
  const comparisonFile = path.join(
    OUTPUT_DIR,
    "all-inclusive-resort-comparison.html"
  );
  fs.writeFileSync(comparisonFile, comparisonPage);
  console.log(`✓ Generated ${comparison
