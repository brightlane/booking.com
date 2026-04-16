// generate-site-and-sitemap.js
// Generates hotel pages into ./output/ AND builds sitemap.xml
const fs   = require("fs-extra");
const path = require("path");

const OUTPUT_DIR   = path.resolve("./output");
const SITEMAP_FILE = path.resolve("sitemap.xml");
const BASE_URL     = "https://brightlane.github.io/booking.com/";

// Your Booking.com affiliate URLs
const BOOKING_COM_LINKS = {
  hotels: "https://www.booking.com/index.html?aid=8132800",
  apartments: "https://www.booking.com/apartments/index.html?aid=8132800",
  resorts: "https://www.booking.com/resorts/index.html?aid=8132800",
  villas: "https://www.booking.com/villas/index.html?aid=8132800",
  "bed-and-breakfast": "https://www.booking.com/bed-and-breakfast/index.html?aid=8132800",
  "guest-house": "https://www.booking.com/guest-house/index.html?aid=8132800",
};

// Replace this with your real hotel‑data array later
const hotels = [
  { id: "ht-1000000", city: "paris",      slug: "hotel-deluxe-paris" },
  { id: "ht-1000001", city: "rome",       slug: "rome-luxury-hotel" },
  { id: "ht-1000002", city: "barcelona",  slug: "beach-hotel-barcelona" },
  { id: "ht-1000003", city: "amsterdam",  slug: "canal-view-hotel" },
  { id: "ht-1000004", city: "london",     slug: "central-london-hotel" },
  { id: "ht-1000005", city: "tokyo",      slug: "tokyo-skyline-hotel" },
];

// Skyscanner affiliate URL
const SKYSCANNER_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

async function ensureOutputDir() {
  await fs.ensureDir(OUTPUT_DIR);
  console.log("✅ OUTPUT_DIR:", OUTPUT_DIR);
}

function generateHtml(id, city, slug) {
  const hotelLink        = `https://www.booking.com/hotel/${city}/${slug}.html?aid=8132800`;
  const apartmentsLink   = BOOKING_COM_LINKS.apartments;
  const resortsLink      = BOOKING_COM_LINKS.resorts;
  const villasLink       = BOOKING_COM_LINKS.villas;
  const bedbreakfastLink = BOOKING_COM_LINKS["bed-and-breakfast"];
  const guesthouseLink   = BOOKING_COM_LINKS["guest-house"];
  const hotelsLink       = BOOKING_COM_LINKS.hotels;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${city} - ${slug} - Booking.com Affiliate Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>
    (function() {
      const img = new Image();
      img.src = "https://images.booking.com/pixel?aid=8132800&amp;ts=" + Date.now();
    })();
  </script>
</head>
<body>
  <h1>Hotel ID: ${id}</h1>
  <p>City: ${city}</p>
  <p>Slug: ${slug}</p>

  <hr>

  <h2>_booking.com_links_(aid=8132800)</h2>
  <ul>
    ><a href="${hotelsLink}" target="_blank" rel="noopener noreferrer">Hotels homepage</a></li>
    ><a href="${apartmentsLink}" target="_blank" rel="noopener noreferrer">Apartments</a></li>
    ><a href="${resortsLink}" target="_blank" rel="noopener noreferrer">Resorts</a></li>
    ><a href="${villasLink}" target="_blank" rel="noopener noreferrer">Villas</a></li>
    ><a href="${bedbreakfastLink}" target="_blank" rel="noopener noreferrer">Bed &amp; Breakfast</a></li>
    ><a href="${guesthouseLink}" target="_blank" rel="noopener noreferrer">Guesthouses</a></li>
  </ul>

  <p><a href="${hotelLink}" target="_blank" rel="noopener noreferrer">Book this hotel on Booking.com</a></p>

  <h2>✈️ Skyscanner search</h2>
  <p>
    <a href="${SKYSCANNER_URL}" target="_blank" rel="noopener noreferrer">
      Search flights
    </a>
  </p>

  <p style="font-size:12px;color:#888;">
    Booking.com affiliate ID: 8132800
  </p>
</body>
</html>`;
}

async function buildSitemap(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((loc) => `  <url>oc>${loc.replace(/&/g, "&amp;")}</loc></url>`)
  .join("\n")}
</urlset>
`;
  await fs.writeFile(SITEMAP_FILE, xml);
  console.log("✅ Sitemap written: %d URLs", urls.length);
}

async function main() {
  try {
    await ensureOutputDir();

    const pageUrls = [];

    console.log("Generating test hotel pages into %s...", OUTPUT_DIR);
    for (const { id, city, slug } of hotels) {
      const filename = `${id}-${slug}.html`;
      const filepath = path.join(OUTPUT_DIR, filename); // This line writes to ./output/
      const html = generateHtml(id, city, slug);

      await fs.writeFile(filepath, html);
      console.log("✅ Wrote:", filepath);

      pageUrls.push(`${BASE_URL}output/${filename}`);
    }

    const staticUrls = [
      BASE_URL + "index.html",
      BASE_URL + 
