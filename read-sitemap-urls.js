// read-sitemap-urls.js
const axios = require("axios");
const cheerio = require("cheerio");

const SITEMAP_URL = "https://brightlane.github.io/booking.com/sitemap.xml";
const discoveredUrls = new Set();

async function readSitemap() {
  try {
    const res = await axios.get(SITEMAP_URL, { timeout: 10000 });

    const $ = cheerio.load(res.data, { xmlMode: true });

    $("url").each((i, urlElem) => {
      const loc = $(urlElem).find("loc").text().trim();
      if (loc) {
        discoveredUrls.add(loc);
      }
    });
  } catch (err) {
    console.error("Error reading sitemap:", err.message);
  }

  // Output clean URL list (sorted)
  console.log(Array.from(discoveredUrls).sort().join("\n"));
}

readSitemap();
