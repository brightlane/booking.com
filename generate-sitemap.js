// generate-sitemap.js
const fs = require("fs-extra");
const path = require("path");

const OUTPUT_DIR = path.resolve("./output");
const SITEMAP_FILE = path.resolve("sitemap.xml");

const BASE_URL = "https://brightlane.github.io/booking.com/";

function generateSitemapXML(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((loc) => `  <url><loc>${loc.replace(/&/g, "&amp;")}</loc></url>`)
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(SITEMAP_FILE, xml);
  console.log(`✅ sitemap.xml written with ${urls.length} URLs.`);
}

async function buildSitemap() {
  const urls = [];

  // Add static index + list pages
  const staticUrls = [
    `${BASE_URL}index.html`,
    `${BASE_URL}all-inclusive-resorts-worldwide.html`,
    `${BASE_URL}religious-destinations-worldwide.html`,
    `${BASE_URL}top-100-tourist-cities-hotels.html`,
    `${BASE_URL}hostels-europe.html`,
  ];

  urls.push(...staticUrls);

  // Read all generated HTML files in output
  if (await fs.pathExists(OUTPUT_DIR)) {
    const files = await fs.readdir(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith(".html")) {
        urls.push(`${BASE_URL}output/${file}`);
      }
    }
  }

  generateSitemapXML(urls);
}

buildSitemap().catch((err) => {
  console.error("generate-sitemap.js error:", err);
});
