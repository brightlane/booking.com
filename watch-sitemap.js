// watch-sitemap.js
//
// 1. Watches ./output for new HTML files
// 2. Automatically writes sitemap.xml
// 3. Run in parallel with generate-pages-daemon.js

const fs = require("fs-extra");
const path = require("path");
const chokidar = require("chokidar"); // npm install chokidar

const OUTPUT_DIR = path.resolve("./output");
const SITEMAP_FILE = path.resolve("sitemap.xml");

const BASE_URL = "https://brightlane.github.io/booking.com/";

// Internal URLs we want in sitemap (plus index)
const STATIC_URLS = [
  `${BASE_URL}index.html`,
  `${BASE_URL}all-inclusive-resorts-worldwide.html`,
  `${BASE_URL}religious-destinations-worldwide.html`,
  `${BASE_URL}top-100-tourist-cities-hotels.html`,
  `${BASE_URL}hostels-europe.html`,
];

function generateSitemapXML(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) =>
      `  <url><loc>${loc.replace(/&/g, "&amp;")}</loc></url>`
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(SITEMAP_FILE, xml);
  console.log(`✅ sitemap.xml updated with ${urls.length} URLs.`);
  console.log(`   → Open: https://brightlane.github.io/booking.com/sitemap.xml`);
}

async function gatherUrls() {
  let urls = [...STATIC_URLS];

  if (await fs.pathExists(OUTPUT_DIR)) {
    const files = await fs.readdir(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith(".html")) {
        urls.push(`${BASE_URL}output/${file}`);
      }
    }
  }

  return urls;
}

async function init() {
  const watcher = chokidar.watch(OUTPUT_DIR, {
    ignored: /^\./,
    persistent: true,
  });

  // Initial write
  const initialUrls = await gatherUrls();
  generateSitemapXML(initialUrls);

  watcher.on("add", async (filePath) => {
    if (!filePath.endsWith(".html")) return;

    const urls = await gatherUrls();
    generateSitemapXML(urls);
  });

  watcher.on("unlink", async (filePath) => {
    if (!filePath.endsWith(".html")) return;

    const urls = await gatherUrls();
    generateSitemapXML(urls);
  });

  console.log("✅ watch-sitemap.js started – watching ./output for changes.");
}

init().catch((err) => {
  console.error("watch-sitemap.js error:", err);
});
