// five-file-specials.js
//
// Orchestrator for "most important content in terms of volume + importance".
//
// Generates:
//   - Event‑city pages (Super Bowl, World Cup, Olympics, etc.)
//   - Multi‑language site trees (en/es/pt/de/fr/it/zh/ru/ar/ja/...)
//   - Bulk hotel‑type pages per city (budget, luxury, airport, family, business)
//
// Already wired to:
//   - BOOKING.HOME (aid=1858279)
//   - SKY.HOME (offer_id=29465&aff_id=21885)

const fs = require("fs-extra");
const path = require("path");

// Your Booking.com + Skyscanner affiliate IDs (already in place)
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

// Master data path (all our discussed JSONs)
const MASTER_DATA_PATH = "./config/master-all-100-in-1.json";

// Languages we care about (high‑volume searchers)
const LANGUAGES = [
  "en", "es", "pt", "de", "fr", "it", "zh", "ru", "ar", "ja",
  "ko", "tr", "pl", "nl", "no", "se", "fa", "th", "id", "vi"
];

// Cities that matter (can be auto‑detected later; here sample)
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

// Event types that matter
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

// ==============================
// 1. READ MASTER DATA
// ==============================

async function readMasterData() {
  if (await fs.pathExists(MASTER_DATA_PATH)) {
    const data = await fs.readJSON(MASTER_DATA_PATH);
    console.log(`five-file-specials.js: loaded ${data.length} entries from master data.`);
    return data;
  } else {
    console.error(`Master data not found: ${MASTER_DATA_PATH}`);
    return [];
  }
}

// ==============================
// 2. FILTER ENTRIES FOR [CITY] + [TYPE]
// ==============================

function filterForCityAndType(data, city, type) {
  return data.filter((entry) => {
    const cityMatch = entry.city.toLowerCase() === city.toLowerCase();

    if (type === "all" || !type) {
      return cityMatch;
    } else if (type === "budget") {
      return cityMatch && entry.tags.some((tag) =>
        ["budget", "cheap", "economy"].includes(tag.toLowerCase())
      );
    } else if (type === "luxury") {
      return cityMatch && entry.tags.some((tag) =>
        ["luxury", "premium", "5-star"].includes(tag.toLowerCase())
      );
    } else if (type === "airport") {
      return cityMatch && entry.tags.includes("airport");
    } else if (type === "business") {
      return cityMatch && entry.tags.includes("business");
    } else if (type === "family") {
      return cityMatch && entry.tags.includes("family");
    } else if (type === "hostel") {
      return cityMatch && entry.type === "hostel";
    } else if (type === "apartment") {
      return cityMatch && entry.type === "apart-hotel";
    } else {
      return cityMatch;
    }
  });
}

// ==============================
// 3. RENDER CITY‑TYPE PAGE TEMPLATE
// ==============================

function renderCityTypePage(city, type, entries, lang = "en") {
  const typeNames = {
    budget: "Budget",
    luxury: "Luxury",
    airport: "Airport",
    business: "Business",
    family: "Family",
    hostel: "Hostel",
    apartment: "Apartments",
    all: "",
  };

  const typeName = typeNames[type] || typeNames.all;
  const typePhrase = typeName ? `${typeName} ` : "";

  let h1,
      intro;

  if (lang === "en") {
    h1 = `Best ${typePhrase}Hotels in ${city} | 2026`;
    intro = `
      Looking for ${typePhrase.toLowerCase()}hotels in ${city} for 2026?
      Here are highly rated options with Booking.com links (${BOOKING.HOME}) and Skyscanner flight options (${SKY.HOME}).
    `;
  } else {
    h1 = `Mejores hoteles ${typePhrase.toLowerCase()}en ${city} | 2026`;
    intro = `
      Buscando hoteles ${typePhrase.toLowerCase()}en ${city} para 2026?
      Aquí tienes opciones bien valoradas con enlaces a Booking.com (${BOOKING.HOME}) y vuelos en Skyscanner (${SKY.HOME}).
    `;
  }

  const rows = entries
    .slice(0, 20) // keep it dense, not spammy
    .map(
      (entry) => `
  <tr>
    <td><a href="${entry.booking_link}" target="_blank">${entry.name}</a></td>
    <td>${entry.type === "hostel" ? "Hostel" : "Hotel"}</td>
    <td>
      <ul>
        ${entry.tags
          .map(
            (tag) =>
              `<li><strong>${tag}</strong></li>`
          )
          .join("")}
      </ul>
    </td>
    <td>
      <p><small>${entry.description_en.substring(0, 200)}...</small></p>
    </td>
  </tr>`
    )
    .join("\n");

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Best ${typePhrase}Hotels in ${city} 2026</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Compare the best ${typePhrase.toLowerCase()}hotels in ${city} for 2026 with Booking.com affiliate links and Skyscanner flights.">
</head>
<body>
<div class="container py-4">

  <h1>${h1}</h1>

  <p>${intro}</p>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Hotel Name</th>
        <th>Type</th>
        <th>Tags</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <p>
    All hotels link to Booking.com with your affiliate ID (${BOOKING.HOME}) embedded in the URL.
    Use Skyscanner (${SKY.HOME}) to compare flight prices to ${city}.
  </p>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best ${typePhrase}Hotels in ${city} 2026",
    "description": "Comparison of ${typePhrase.toLowerCase()} hotels in ${city} with Booking.com affiliate links."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 4. RENDER EVENT‑CITY PAGE
// ==============================

function renderEventCityPage(city, event, entries, lang = "en") {
  const rows = entries
    .slice(0, 15)
    .map(
      (entry) => `
  <tr>
    <td><a href="${entry.booking_link}" target="_blank">${entry.name}</a></td>
    <td>${entry.tags
      .map(
        (tag) => `<span class="badge bg-primary">${tag}</span>`
      )
      .join(" ")}</td>
    <td>
      <p><small>${entry.description_en.substring(0, 150)}...</small></p>
    </td>
  </tr>`
    )
    .join("\n");

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Best Hotels for ${event.replace("-", " ")} in ${city} 2026</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Find the best hotels for ${event.replace("-", " ")} in ${city} 2026 with Booking.com affiliate links and Skyscanner flights.">
</head>
<body>
<div class="container py-4">

  <h1>Best Hotels for ${event.replace("-", " ")} in ${city} 2026</h1>

  <p>
    ${city} is a key host city for the ${event.replace("-", " ")}. This guide lists
    top hotels within short distance from the stadium and fan zones. All links lead to
    Booking.com with your affiliate ID (${BOOKING.HOME}), and you can use Skyscanner (${SKY.HOME})
    to compare flights to ${city}.
  </p>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Hotel</th>
        <th>Tags</th>
        <th>Why Choose It</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best Hotels for ${event.replace("-", " ")} in ${city} 2026",
    "description": "Hotel guide for ${event.replace("-", " ")} in ${city} with Booking.com affiliate links."
  }
  </script>

</div>
</body>
</html>
  `;
}

// ==============================
// 5. GENERATE LANGUAGE TREES
// ==============================

function generateLanguageTrees(lang) {
  const cities = CITIES_OF_IMPORTANCE;

  cities.forEach((city) => {
    const dir = path.join(OUTPUT_DIR, lang, "hotels-in-" + city.toLowerCase().replace(" ", "-"));
    fs.ensureDirSync(dir);

    // All types for this city
    const types = ["all", "budget", "luxury", "airport", "business", "family", "hostel", "apartment"];

    types.forEach((type) => {
      const filename = path.join(dir, `hotels-in-${city.toLowerCase().replace(" ", "-")}-${type}.html`);
      const page = renderCityTypePage(city, type, cityEntries, lang);
      fs.writeFileSync(filename, page);
      console.log(`✓ Generated ${filename}`);
    });
  });

  const langIndex = path.join(OUTPUT_DIR, lang, "index.html");
  const langPage = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Hotel Guides in ${lang}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Hotel guides in ${lang} for travelers booking via Booking.com and Skyscanner.">
</head>
<body>
<div class="container py-4">

  <h1>Hotel Guides in ${lang}</h1>

  <p>
    Select a city or event to see hotel listings with Booking.com links (${BOOKING.HOME}) and Skyscanner flight options (${SKY.HOME}).
  </p>

  <ul>
    ${CITIES_OF_IMPORTANCE
      .slice(0, 10)
      .map(
        (city) =>
          `<li><a href="/${lang}/hotels-in-${city.toLowerCase().replace(" ", "-")}/">${city}</a></li>`
      )
      .join("\n")}
  </ul>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hotel Guides in ${lang}",
    "url": "https://yourdomain.com/${lang}/"
  }
  </script>

</div>
</body>
</html>
  `;

  fs.writeFileSync(langIndex, langPage);
  console.log(`✓ Generated ${langIndex}`);
}

// ==============================
// 6. MAIN GENERATOR: five-file-specials.js
// ==============================

async function generateVolumeAndImportance() {
  const data = await readMasterData();

  if (data.length === 0) {
    console.log("No data to generate for five-file-specials.js; exiting.");
    return;
  }

  // 1. City‑type pages (budget, luxury, airport, family, etc.)
  CITIES_OF_IMPORTANCE.forEach((city) => {
    const cityEntries = filterForCityAndType(data, city, "all");
    if (cityEntries.length === 0) return;

    const types = ["all", "budget", "luxury", "airport", "business", "family", "hostel", "apartment"];

    types.forEach((type) => {
      const filtered = filterForCityAndType(data, city, type);
      if (filtered.length === 0) return;

      const page = renderCityTypePage(city, type, filtered, "en");
      const safeCity = city.toLowerCase().replace(" ", "-");
      const filename = path.join(
        OUTPUT_DIR,
        `hotels-in-${safeCity}-${type}-en.html`
      );

      fs.ensureFileSync(filename);
      fs.writeFileSync(filename, page);
      console.log(`✓ Generated ${filename}`);
    });
  });

  // 2. Event‑city pages (Super Bowl, World Cup, Olympics, etc.)
  CITIES_OF_IMPORTANCE.forEach((city) => {
    EVENTS_OF_IMPORTANCE.forEach((event) => {
      const eventEntries = data.filter(
        (entry) =>
          entry.city.toLowerCase() === city.toLowerCase() &&
          entry.event_type === event
      );

      if (eventEntries.length === 0) return;

      const page = renderEventCityPage(city, event, eventEntries, "en");
      const safeCity = city.toLowerCase().replace(" ", "-");
      const filename = path.join(
        OUTPUT_DIR,
        `event-${event}-${safeCity}.html`
      );

      fs.ensureFileSync(filename);
      fs.writeFileSync(filename, page);
      console.log(`✓ Generated ${filename}`);
    });
  });

  // 3. Multi‑language site trees
  LANGUAGES.forEach((lang) => {
    generateLanguageTrees(lang);
  });

  console.log("✅ five-file-specials.js finished generating high‑volume, high‑importance content.");
}

// ==============================
// 7. RUN (Daily‑style)
// ==============================

generateVolumeAndImportance().catch((err
