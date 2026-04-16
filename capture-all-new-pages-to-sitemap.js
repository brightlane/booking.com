// capture-all-new-pages-to-sitemap.js
// Finds all new HTML files in /output + other statics and appends to sitemap.xml

const fs   = require("fs-extra");
const path = require("path");

const OUTPUT_DIR   = path.resolve("./output");
const STATIC_DIR   = path.resolve("."); // your repo root
const SITEMAP_FILE = path.resolve("sitemap.xml");
const BASE_URL     = "https://brightlane.github.io/booking.com/";

// Extend as needed (e.g., additional output folders, etc.)
function getAllHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function captureAllNewPages() {
  // 1. Read current sitemap
  const xml = await fs.readFile(SITEMAP_FILE, "utf8");

  // 2. Extract already‑included URLs (clean list)
  const existingUrls = [];
  const urlMatch = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = urlMatch.exec(xml)) !== null) {
    existingUrls.push(match[1]);
  }

  // 3. Scan /output/* and repo root for new HTML files
  const newUrls = [];

  // 3.a /output/ folder (generated hotel pages)
  if (await fs.pathExists(OUTPUT_DIR)) {
    const files = await fs.readdir(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith(".html")) {
        const loc = `${BASE_URL}output/${file}`;
        if (!existingUrls.includes(loc)) {
          newUrls.push(loc);
        }
      }
    }
  }

  // 3.b Static HTML files in repo root (hotels‑in‑*.html, index.html, etc.)
  const statics = getAllHtmlFiles(STATIC_DIR);
  for (const filepath of statics) {
    const relpath = path.relative(STATIC_DIR, filepath).replace(/\\/g, "/");
    if (!relpath.startsWith("node_modules/") && !relpath.includes(".github/")) {
      const loc = `${BASE_URL}${relpath}`;
      if (!existingUrls.includes(loc)) {
        newUrls.push(loc);
      }
    }
  }

  if (newUrls.length === 0) {
    console.log("No new pages to add to sitemap.");
    return;
  }

  console.log("Appending %d new URLs to sitemap.xml", newUrls.length);

  // 4. Build XML blocks for new URLs
  const newUrlBlocks = newUrls
    .map((loc) => `  <url><loc>${loc.replace(/&/g, "&amp;")}</loc></url>`)
    .join("\n");

  // 5. Insert new URLs into the end of <urlset> (before closing tag only)
  const finalXml = xml
    .replace(/(<\/urlset>)/, `${newUrlBlocks}\n$1`);

  // 6. Write back the updated sitemap
  await fs.writeFile(SITEMAP_FILE, finalXml);

  console.log("✅ Added %d new URLs. Now open:", newUrls.length);
  console.log("https://brightlane.github.io/booking.com/sitemap.xml");
}

captureAllNewPages().catch((err) => {
  console.error("capture-all-new-pages-to-sitemap.js failed:", err.toString());
  process.exit(1);
});
