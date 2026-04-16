require('dotenv').config();

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // v2

const OUT_DIR = path.join(__dirname, 'output');
const CITIES_PATH = path.join(__dirname, 'src', 'cities.json');

const BOOKING_AID = "8132800";

const BOOKING = {
  HOME: `https://www.booking.com/index.html?aid=${BOOKING_AID}`,
  APARTMENTS: `https://www.booking.com/apartments/index.html?aid=${BOOKING_AID}`,
  RESORTS: `https://www.booking.com/resorts/index.html?aid=${BOOKING_AID}`,
  VILLAS: `https://www.booking.com/villas/index.html?aid=${BOOKING_AID}`,
  BNB: `https://www.booking.com/bed-and-breakfast/index.html?aid=${BOOKING_AID}`,
  GUESTHOUSES: `https://www.booking.com/guest-house/index.html?aid=${BOOKING_AID}`,
};

const SKY = {
  MAIN: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

function pickBooking() {
  const options = [
    BOOKING.HOME,
    BOOKING.APARTMENTS,
    BOOKING.RESORTS,
    BOOKING.VILLAS,
    BOOKING.BNB,
    BOOKING.GUESTHOUSES,
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function pickSky() {
  return SKY.MAIN;
}

const AI_KEYS = {
  ai1: process.env.AI1_KEY,
  ai2: process.env.AI2_KEY,
  ai3: process.env.AI3_KEY,
  ai4: process.env.AI4_KEY,
  endpoint1: 'https://api.ai-provider-1.com/v1/chat',
  endpoint2: 'https://api.ai-provider-2.com/v1/completions',
  endpoint3: 'https://api.ai-provider-3.com/v1/chat',
  endpoint4: 'https://api.ai-provider-4.com/v1/completions',
};

const MAX_PAGES = 10_000_000;          // or set smaller for testing
const MAX_CHARS_PER_PAGE = 30_000;     // ~5k–6k words
const RETRY_MS = 60_000;               // back‑off if AI quota hit

let cities = [];
let seenSlugs = new Set();
let pageCounter = 0;
let lastErrorTime = 0;
let lastPageTimestamp = 0;

fs.mkdirSync(OUT_DIR, { recursive: true });

function loadCities() {
  cities = JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'));
  console.log(`✅ Loaded ${cities.length} cities.`);
}

function loadSeenSlugs() {
  const file = path.join(OUT_DIR, 'generated-slugs.txt');
  if (fs.existsSync(file)) {
    const list = fs.readFileSync(file, 'utf8').trim().split('\n');
    seenSlugs = new Set(list);
  }
}

function markGenerated(slug) {
  seenSlugs.add(slug);
  const file = path.join(OUT_DIR, 'generated-slugs.txt');
  fs.writeFileSync(file, [...seenSlugs].join('\n'));
}

function generateSlug(city, country, id) {
  return `${country}-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${id.toString().padStart(8, '0')}`;
}

function generateContentStable(city, country, slug) {
  const keyword = `hotels in ${city} ${country} 2026`;

  return `
<p>
  <strong>Ultimate guide to hotels in ${city}, ${country} – 2026 Edition.</strong>
</p>

<p>
  Every page on Hotel Deals. leads you to a Booking.com link with aid=${BOOKING_AID}
  to help you save on every stay. In this guide, you’ll find the best hotels in ${city},
  hotels near ${city}, apartments, resorts, villas, and B&amp;Bs on Booking.com.
</p>

<p>
  From luxury five‑star hotels to budget‑friendly stays, our guide helps you pick the
  perfect area and type of accommodation for your trip. Use our Booking.com search
  box below to instantly compare prices and book your stay.
</p>

<p>
  For your flights, use Skyscanner to compare prices before you arrive.
</p>

<!-- This is your minimal 5k‑word‑style placeholder,
     but you can plug the real AI calls back in the same structure
     if you want fully AI‑generated content every second -->
`;
}

function generatePageHtml(city, country, slug) {
  const bookingUrl = pickBooking();
  const skyscannerUrl = pickSky();
  const title = `Hotels in ${city} ${country} ${new Date().getFullYear()} | Hotel Deals.`;
  const description = `Guide to hotels in ${city} ${country} in 2026. Find the best Booking.com deals.`;

  const article = generateContentStable(city, country, slug)
    .split('\n\n')
    .map(p => `<p>${p.trim()}</p>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="google-site-verification" content="eWVDN3vbam9nnaZQu7wAQKyfmJJdM7zjI80l4DGeUrQ" />
  <meta name="msvalidate.01" content="574044E39556B8B8DAAF1D1F233C87B0" />
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://brightlane.github.io/booking.com/hotels-in-${slug}.html" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>

<div class="clickable-top-half" onclick="window.open('${bookingUrl}', '_blank');">

  <nav class="navbar">
    <div class="logo" onclick="window.open('${bookingUrl}', '_blank'); return false;">
      Hotel Deals.
    </div>
    <div>
      <a href="https://brightlane.github.io/booking.com/">Home</a>
      <a href="https://brightlane.github.io/booking.com/affiliates.html">Affiliates</a>
    </div>
  </nav>

  <section class="hero">
    <h1 onclick="window.open('${bookingUrl}', '_blank'); return false;">
      Save Big on Hotels at Booking.com
    </h1>
    <p>
      Every page on Hotel Deals. leads you to a Booking.com link with aid=${BOOKING_AID}.
    </p>
    <a href="#" class="cta"
       onclick="window.open('${bookingUrl}', '_blank'); return false;">
      Book on Booking.com and Save Money (aid=${BOOKING_AID}, GitHub)
    </a>
  </section>

</div>

<div class="container">
  <article class="article-content">
    ${article}
  </article>

  <form
    action="https://www.booking.com/searchresults.html"
    method="GET"
    target="_blank"
    style="margin:2rem 0;">
    <input type="hidden" name="aid" value="${BOOKING_AID}" />
    <input type="text" name="ss" value="${city}" />
    <button type="submit">Search hotels in ${city} on Booking.com</button>
  </form>

  <div class="sky-block">
    <p>
      <a href="${skyscannerUrl}" target="_blank">
        Compare flights with Skyscanner
      </a>
    </p>
  </div>
</div>

</body>
</html>`;
}

function generateOnePage() {
  if (pageCounter >= MAX_PAGES) {
    console.log(`✅ Reached limit ${MAX_PAGES}, stopping generator.`);
    return;
  }

  const now = Date.now();
  const cityItem = cities[Math.floor(Math.random() * cities.length)];
  const { city, country } = cityItem;
  const slug = generateSlug(city, country, pageCounter + 1);

  if (seenSlugs.has(slug)) {
    console.log(`🔁 Already generated: ${slug}`);
    return;
  }

  try {
    const html = generatePageHtml(city, country, slug);
    const filepath = path.join(OUT_DIR, `hotels-in-${slug}.html`);
    fs.writeFileSync(filepath, html, 'utf8');
    pageCounter += 1;
    markGenerated(slug);
    console.log(`✅ Generated ${pageCounter}: ${slug}`);
    lastPageTimestamp = now;
  } catch (err) {
    console.error(`❌ Generate failed: ${err.message}`);
    lastErrorTime = now;
  }
}

function loopTick() {
  try {
    generateOnePage();
  } catch (err) {
    console.error(`Tick failed: ${err.message}`);
    lastErrorTime = Date.now();
  }

  const delayMs = 1_000; // 1 second
  setTimeout(loopTick, delayMs);
}

function startGenerator() {
  console.log(`🚀 Starting 24/7 hotel content generator (1 page per second if possible)...`);
  loadCities();
  loadSeenSlugs();
  loopTick();
}

startGenerator();
