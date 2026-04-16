// generate-sitemap-simple.js
// Generates a single sitemap.xml from all HTML files in ./output/ + a few static pages

const fs = require("fs-extra");
const path = require("path");

const OUTPUT_DIR = path.resolve("./output");
const SITEMAP_FILE = path.resolve("sitemap.xml");
const BASE_URL = "https://brightlane.github.io/booking.com/";

async function buildSitemap() {
  const urls = [];

  // Static pages (you already have these)
  const staticUrls = [
    BASE_URL + "index.html",
    BASE_URL + "all-inclusive-resorts-worldwide.html",
    BASE_URL + "religious-destinations-worldwide.html",
    BASE_URL + "top-100-tourist-cities-hotels.html",
    BASE_URL + "hostels-europe.html",
  ];
  urls.push(...staticUrls);

  // Add ALL generated HTML files from output/ (ht-* etc.)
  if (await fs.pathExists(OUTPUT_DIR)) {
    const files = await fs.readdir(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith(".html")) {
        urls.push(`${BASE_URL}output/${file}`);
      }
    }
  }

  console.log("Will write %d URLs to %s", urls.length, SITEMAP_FILE);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((loc) => `  <url><loc>${loc.replace(/&/g, "&amp;")}</loc></url>`)
  .join("\n")}
</urlset>
`;

  await fs.writeFile(SITEMAP_FILE, xml);
  console.log("✅ Sitemap written: %d URLs", urls.length);
}

buildSitemap().catch((err) => {
  console.error("generate-sitemap-simple.js failed:", err);
  process.exit(1);
});
