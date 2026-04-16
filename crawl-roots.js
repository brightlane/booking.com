// crawl-urls.js
const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");

const BASE = "https://brightlane.github.io/booking.com/";
const visited = new Set();
const queue = [BASE];
const discoveredUrls = new Set();

async function crawl() {
  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    try {
      const res = await axios.get(current, { timeout: 10000 });
      const $ = cheerio.load(res.data);

      $("a[href]").each((i, el) => {
        const href = $(el).attr("href");
        if (!href) return;

        // Resolve relative URL
        const resolved = new url.URL(href, current).href;

        // Only keep internal pages under your base
        if (!resolved.startsWith(BASE)) return;

        discoveredUrls.add(resolved);

        // If it’s a .html page or “looks” like a page, queue it
        if (
          resolved.endsWith(".html") ||
          !/\.[a-z0-9]{2,4}$/i.test(new URL(resolved).pathname)
        ) {
          queue.push(resolved);
        }
      });
    } catch (err) {
      console.warn("Skip error:", current, err.message);
    }
  }

  // Output clean URL list (sorted)
  console.log(Array.from(discoveredUrls).sort().join("\n"));
}

crawl();
