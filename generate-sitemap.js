// generate-sitemap.js
//
// 1. Reads all HTML files in ./output
// 2. Generates sitemap.xml listing EVERY generated page
// 3. Outputs to the repo root so GitHub Pages can serve it

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
  console.log(
    `✅ sitemap.xml written with ${urls.length} URLs.`
  );
  console.log(
    `   → Open: https://brightlane.github.io/booking.com/sitemap.xml`
  );
}

async function buildSitemap() {
  const urls = [];

  // 1. Static index + list pages (optional, keep them)
  const staticUrls = [
    `${BASE_URL}index.html`,
    `${BASE_URL}all-inclusive-resorts-worldwide.html`,
    `${BASE_URL}religious-destinations-worldwide.html`,
    `${BASE_URL}top-100-tourist-cities-hotels.html`,
    `${BASE_URL}hostels-europe.html`,
  ];

  urls.push(...staticUrls);

  // 2. ALL generated HTML files in ./output
  if (await fs.pathExists(OUTPUT_DIR)) {
    const files = await fs.readdir(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith(".html")) {
        urls.push(`${BASE_URL}output/${file}`);
      }
    }
  } else {
    console.log(
      "⚠️ OUTPUT_DIR does not exist; did you run generate-pages-daemon.js?"
    );
  }

  // 3. Write final sitemap
  generateSitemapXML(urls);
}

buildSitemap().catch((err) => {
  console.error("generate-sitemap.js error:", err);
});
