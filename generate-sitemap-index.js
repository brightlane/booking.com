// generate-sitemap-index.js
//
// 1. Reads master-2000-hotels.json
// 2. Generates 1B‑style URLs, splits into sitemaps (max 50k each)
// 3. Writes:
//    - sitemap-index.xml
//    - sitemap-hotel-in-1.xml, sitemap-hotel-in-2.xml, ...
//    - sitemap-hotel-near-1.xml, ...
// 4. Run once, then commit + push

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://brightlane.github.io/booking.com/";

// Capacity / limits
const MAX_URLS_PER_SITEMAP = 50_000; // sitemap.org max
const MAX_URLS = 1_000_000_000;       // 1B total
const URLS_PER_CITY = 500_000;        // 500K per city → 2,000×500K = 1B

const CITIES_JSON = path.resolve("master-2000-hotels.json");

const OUTPUT_DIR = path.resolve("."); // root of repo

// Output files
const SITEMAP_INDEX = path.resolve("sitemap-index.xml");
const SITEMAP_PREFIX = "sitemap-";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .trim()
    .replace(/ +/g, "-")
    .replace(/-+/g, "-");
}

function generateHotelInVariants(city, cityIndex) {
  const slug = slugify(city);
  const variants = [];

  const subpatterns = [
    "hotel-in",
    "hotels-in",
    "cheap-hotel-in",
    "luxury-hotel-in",
    "budget-hotel-in",
    "best-hotels-in",
  ];

  for (let i = 0; i < URLS_PER_CITY; i++) {
    const pattern = subpatterns[i % subpatterns.length];
    const numSuffix = (i % 999_999) + 1;

    variants.push(
      `${BASE_URL}${pattern}-${slug}-${numSuffix}.html`
    );
  }

  return variants;
}

function generateHotelNearVariants(city, cityIndex) {
  const slug = slugify(city);
  const variants = [];

  const nears = [
    "airport",
    "downtown",
    "city-center",
    "beach",
    "railway-station",
    "shopping-mall",
    "university",
    "stadium",
    "hospital",
    "business-district",
    "tourist-attraction",
  ];

  const prefixes = [
    "hotel-near",
    "hotels-near",
    "cheap-hotel-near",
    "luxury-hotel-near",
    "budget-hotel-near",
    "family-hotel-near",
    "business-hotel-near",
    "airport-hotel-near",
    "city-center-hotel-near",
  ];

  for (let i = 0; i < URLS_PER_CITY; i++) {
    const near = nears[i % nears.length];
    const prefix = prefixes[i % prefixes.length];
    const numSuffix = (i % 999_999) + 1;

    variants.push(
      `${BASE_URL}${prefix}-${near}-in-${slug}-${numSuffix}.html`
    );
  }

  return variants;
}

function writeSitemapFile(filename, urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((loc) => `  <url><loc>${loc.replace(/&/g, "&amp;")}</loc></url>`)
  .join("\n")}
</urlset>
`;

  const fullPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(fullPath, xml);

  console.log(`✅ ${filename} written with ${urls.length} URLs.`);
}

function generateSitemapIndex() {
  fs.writeFileSync(SITEMAP_INDEX, "");
}

async function generateSitemapIndexXML() {
  const raw = await fs.promises.readFile(CITIES_JSON, "utf8");
  const citiesRaw = JSON.parse(raw);

  const cities = Array.isArray(citiesRaw)
    ? citiesRaw.map((c) => c.name || c)
    : Object.values(citiesRaw).map((c) => c.name || c);

  const validCities = cities
    .map((c) => c?.trim())
    .filter((c) => c && c.length > 0);

  console.log(`Found ${validCities.length} cities.`);

  let hotelInUrls = [];
  let hotelNearUrls = [];

  let total = 0;

  for (let cityIndex = 0; cityIndex < validCities.length; cityIndex++) {
    const city = validCities[cityIndex];

    const hotelIn = generateHotelInVariants(city, cityIndex);
    const hotelNear = generateHotelNearVariants(city, cityIndex);

    hotelInUrls.push(...hotelIn);
    hotelNearUrls.push(...hotelNear);

    total += hotelIn.length + hotelNear.length;

    if (total >= MAX_URLS) {
      console.log(`Hit MAX_URLS (${MAX_URLS}) at city ${city}.`);
      break;
    }

    if (cityIndex % 10 === 0) {
      console.log(`Processed ${cityIndex} / ${validCities.length} cities.`);
    }
  }

  if (hotelInUrls.length > MAX_URLS) {
    hotelInUrls = hotelInUrls.slice(0, MAX_URLS);
  }
  if (hotelNearUrls.length > MAX_URLS) {
    hotelNearUrls = hotelNearUrls.slice(0, MAX_URLS);
  }

  // 1. Static files (index + list pages)
  const staticUrls = [
    `${BASE_URL}index.html`,
    `${BASE_URL}all-inclusive-resorts-worldwide.html`,
    `${BASE_URL}religious-destinations-worldwide.html`,
    `${BASE_URL}top-100-tourist-cities-hotels.html`,
    `${BASE_URL}hostels-europe.html`,
  ];

  // 2. Split into sitemap files
  const allSitemaps = [];

  const categories = [
    { name: "hotel-in", urls: hotelInUrls },
    { name: "hotel-near", urls: hotelNearUrls },
    { name: "static", urls: staticUrls },
  ];

  for (const cat of categories) {
    const chunks = [];
    for (let i = 0; i < cat.urls.length; i += MAX_URLS_PER_SITEMAP) {
      chunks.push(cat.urls.slice(i, i + MAX_URLS_PER_SITEMAP));
    }

    for (let j = 0; j < chunks.length; j++) {
      const shortName = `${SITEMAP_PREFIX}${cat.name}-${j + 1}.xml`;
      writeSitemapFile(shortName, chunks[j]);
      allSitemaps.push(shortName);
    }
  }

  // 3. Generate sitemap‑index.xml
  const indexUrls = allSitemaps.map((name) => {
    const loc = `${BASE_URL}${name}`;
    return `  <sitemap><loc>${loc.replace(/&/g, "&amp;")}</loc></sitemap>`;
  });

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexUrls.join("\n")}
</sitemapindex>
`;

  await fs.promises.writeFile(SITEMAP_INDEX, indexXml);
  console.log(
    `✅ sitemap-index.xml written with ${allSitemaps.length} sitemap files.`
  );

  console.log(
    `   → Open index: https://brightlane.github.io/booking.com/sitemap-index.xml`
  );
}

generateSitemapIndexXML().catch((err) => {
  console.error("generate-sitemap-index.js error:", err);
});
