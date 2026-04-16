// force-run-and-sitemap.js
// This will run the daemon, generate the sitemap, and push it

const fs = require("fs-extra");
const path = require("path");
const child = require("child_process");

const OUTPUT_DIR = path.resolve("./output");
const SITEMAP_FILE = path.resolve("sitemap.xml");
const BASE_URL = "https://brightlane.github.io/booking.com/";

function run(cmd) {
  console.log("RUNNING:", cmd);
  child.execSync(cmd, { stdio: "inherit" });
}

async function ensureOutputDir() {
  if (!(await fs.pathExists(OUTPUT_DIR))) {
    await fs.ensureDir(OUTPUT_DIR);
    console.log("✅ Created output/ directory");
  }
}

async function runDaemon() {
  console.log("Step 1: Run generate-pages-daemon.js");
  run("node generate-pages-daemon.js");
}

async function buildSitemap() {
  console.log("Step 2: Build sitemap from ./output/*.html");

  const urls = [];

  // Static index + list pages
  const staticUrls = [
    `${BASE_URL}index.html`,
    `${BASE_URL}all-inclusive-resorts-worldwide.html`,
    `${BASE_URL}religious-destinations-worldwide.html`,
    `${BASE_URL}top-100-tourist-cities-hotels.html`,
    `${BASE_URL}hostels-europe.html`,
  ];
  urls.push(...staticUrls);

  // ALL generated HTML files in output
  if (await fs.pathExists(OUTPUT_DIR)) {
    const files = await fs.readdir(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith(".html")) {
        urls.push(`${BASE_URL}output/${file}`);
      }
    }
  }

  console.log("✅ URLs to output:", urls.length);
  urls.forEach((url) => console.log(url));

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
}

function pushChanges() {
  console.log("Step 3: Commit and push sitemap + output");
  run("git add output/ sitemap.xml");
  run('git commit -m "Force: add generated sitemap with real pages" || echo "No changes"');
  run("git push origin main");
}

async function main() {
  try {
    await ensureOutputDir();
    await runDaemon();
    await buildSitemap();
    pushChanges();
    console.log("✅ ALL DONE. Now check:");
    console.log("https://brightlane.github.io/booking.com/sitemap.xml");
  } catch (err) {
    console.error("force-run-and-sitemap.js failed:", err.toString());
    process.exit(1);
  }
}

main();
