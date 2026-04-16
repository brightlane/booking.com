// generate-sitemap.js
//
// 1. Reads master-2000-hotels.json
// 2. Generates sitemap.xml listing:
//    - index.html
//    - all hotels-in-[city].html
//    - example URL patterns for 20M/25M "hotel in" / "hotel near" layers
// 3. Output: sitemap.xml in repo root

const fs = require("fs-extra");
const path = require("path");

const BASE_URL = "https://brightlane.github.io/booking.com/";

const CITIES_JSON = path.resolve("master-2000-hotels.json");
const OUTPUT_SITEMAP = path.resolve("sitemap.xml");

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/ +/g, "-")
    .replace(/-+/g, "-");
}

function generateHotelInUrls(city) {
  const slug = slugify(city);
  return [
    `${BASE_URL}hotel-in-${slug}.html`,
    `${BASE_URL}hotels-in-${slug}.html`,
  ];
}

function generateHotelNearUrls(city) {
  const slug = slugify(city);
  return [
    `${BASE_URL}hotel-near-airport-in-${slug}.html`,
    `${BASE_URL}hotels-near-downtown-in-${slug}.html`,
    `${BASE_URL}hotel-near-beach-in-${slug}.html`,
  ];
}

async function generateSitemapXML() {
  const raw = await fs.readFile(CITIES_JSON, "utf8");
  const cities = JSON.parse(raw).map((c) => c.name || c);

  const urls = [];

  // 1. Main index
  urls.push(`${BASE_URL}index.html`);

  // 2. hotels‑in‑[city].html (2,000+ files)
  for (const city of cities) {
    const normalizedCity = city.trim();
    if (!normalizedCity) continue;

    const slug = slugify(normalizedCity);
    urls.push(`${BASE_URL}hotels-in-${slug}.html`);
  }

  // 3. 20M‑style "hotel in / hotels in [city]" patterns (1 per city as representative)
  for (const city of cities) {
    const normalizedCity = city.trim();
    if (!normalizedCity) continue;

    const variants = generateHotelInUrls(normalizedCity);
    urls.push(...variants);
  }

  // 4. 25M‑style "hotel near / hotels near [place] in [city]" patterns (1–3 per city as representative)
  for (const city of cities) {
    const normalizedCity = city.trim();
    if (!normalizedCity) continue;

    const variants = generateHotelNearUrls(normalizedCity);
    urls.push(...variants);
  }

  // 5. Other static files you want in sitemap
  const staticFiles = [
    "all-inclusive-resorts-worldwide.html",
    "religious-destinations-worldwide.html",
    "top-100-tourist-cities-hotels.html",
  ].map((f) => `${BASE_URL}${f}`);

  urls.push(...staticFiles);

  // 6. Generate XML string
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc, i) =>
      `  <url><loc>${loc.replace(/&/g, "&amp;")}</loc>${i === 0 ? "" : ""}</url>`
  )
  .join("\n")}
</urlset>
`;

  await fs.writeFile(OUTPUT_SITEMAP, xml);
  console.log(
    `✅ sitemap.xml generated with ${urls.length.toLocaleString()} URLs.`
  );
}

generateSitemapXML().catch((err) => {
  console.error("generate-sitemap.js error:", err);
});
