// generate-site-files.js
// Generates HTML pages into ./output/ so generate-sitemap-simple.js can pick them up

const fs  = require("fs-extra");
const path = require("path");

const OUTPUT_DIR = path.resolve("./output");
const BASE_URL = "https://brightlane.github.io/booking.com/";

// Example: pretend you have a list of “hotel IDs” or “city IDs”
// In your real setup you probably get this from a CSV / DB / API
const examplePages = [
  { id: "ht-1000000", slug: "hotel-1000000", title: "Beautiful Hotel 1000000" },
  { id: "ht-1000001", slug: "hotel-1000001", title: "Cozy Hotel 1000001" },
  { id: "ht-1000002", slug: "hotel-1000002", title: "Luxury Hotel 1000002" },
  { id: "ht-1000003", slug: "hotel-1000003", title: "Budget Hotel 1000003" },
  { id: "ht-1000004", slug: "hotel-1000004", title: "Beach Hotel 1000004" },
];

async function ensureOutputDir() {
  await fs.ensureDir(OUTPUT_DIR);
  console.log("✅ Created output/ directory:", OUTPUT_DIR);
}

function generateHtml(id, slug, title) {
  return `<!DOCTYPE html>
<html>
<head>
  <title>${title} - Booking.com Clone</title>
</head>
<body>
  <h1>${title}</h1>
  <p>Hotel ID: ${id}</p>
  <p>Slug: ${slug}</p>
  <p>Base URL: ${BASE_URL}</p>
  <p>This is a generated test page for sitemap testing.</p>
</body>
</html>`;
}

async function main() {
  try {
    await ensureOutputDir();

    console.log("Generating example pages into ./output/");

    for (const { id, slug } of examplePages) {
      const filename = `${id}-${slug}.html`;
      const filepath = path.join(OUTPUT_DIR, filename);
      const html = generateHtml(id, slug, `Generated Hotel Page: ${slug}`);

      await fs.writeFile(filepath, html);
      console.log("✅ Wrote:", filepath);
    }

    console.log("✅ Done generating pages.");
  } catch (err) {
    console.error("generate-site-files.js failed:", err.toString());
    process.exit(1);
  }
}

main();
