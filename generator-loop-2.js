// generator-loop-2.js
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // v2

const OUT_DIR = path.join(__dirname, 'output-2');
const CITIES_PATH = path.join(__dirname, 'src', 'cities-2.json');

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

function generateContentStable(city, country, slug) {
  const keyword = `hotels in ${city} ${country} 2026`;
  return `
<p>
  <strong>Ultimate guide to hotels in ${city}, ${country} – 2026 Edition (Stream 2).</strong>
</p>

<p>
  Every page on Hotel Deals. leads you to a Booking.com link with aid=${BOOKING_AID}
  to help you save on every stay. Use this page to find the best hotels in ${city},
  hotels near ${city}, apartments, resorts, villas, and B&amp;Bs on Booking.com.
</p>

<p>
  For your flights, use Skyscanner to compare prices before you arrive.
</p>
`;
}

function generatePageHtml(city, country, slug) {
  const bookingUrl = pickBooking();
  const skyscannerUrl = pickSky();
  const title = `Hotels in ${city} ${country} ${new Date().getFullYear()} | Hotel Deals (2)`;
  const description = `Guide to hotels in ${city} ${country} in 2026 (Stream 2). Find the best Booking.com deals.`;

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
  <link rel="canonical" href="https://brightlane.github.io/booking.com/hotels-in-${slug}-2.html" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>

<div class="clickable-top-half" onclick="window.open('${bookingUrl}', '_blank');">

  <nav class="navbar">
    <div class="logo" onclick="window.open('${bookingUrl}', '_blank'); return false;">
      Hotel Deals. (2)
    </div>
    <div>
      <a href="https://brightlane.github.io/booking.com/">Home</a>
      <a href="https://brightlane.github.io/booking.com/affiliates.html">Affiliates</a>
    </div>
  </nav>

  <section class="hero">
    <h1 onclick="window.open('${bookingUrl}', '_blank'); return false;">
      Save Big on Hotels at Booking.com — Stream 2
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

const MAX_PAGES_PER_RUN = 500;
const MAX_CHARS_PER_PAGE = 30_000;

let cities = [];
let pageCounterThisRun = 0;
let totalPageCount = 0;

fs.mkdirSync(OUT_DIR, { recursive: true });

if (fs.existsSync(CITIES_PATH)) {
  cities = JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'));
  console.log(`✅ Loaded ${cities.length} cities (Stream 2).`);
} else {
  console.log(`⚠️  No cities‑2.json found; using dummy.`);
  cities = [
    { city: "Kuala Lumpur", country: "Malaysia" },
    { city: "Langkawi", country: "Malaysia" },
    { city: "Riyadh", country: "Saudi Arabia" },
    { city: "Jeddah", country: "Saudi Arabia" },
    { city: "Singapore", country: "Singapore" },
  ];
}

function generateSlug(city, country, id) {
  return `${country.toLowerCase()}-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${id.toString().padStart(8, '0')}-2`;
}

function generateOnePage() {
  if (pageCounterThisRun >= MAX_PAGES_PER_RUN) {
    return false;
  }

  const cityItem = cities[Math.floor(Math.random() * cities.length)];
  const { city, country } = cityItem;
  const slug = generateSlug(city, country, totalPageCount + 1);

  const html = generatePageHtml(city, country, slug);
  const filepath = path.join(OUT_DIR, `hotels-in-${slug}.html`);
  fs.writeFileSync(filepath, html, 'utf8');

  pageCounterThisRun += 1;
  totalPageCount += 1;

  console.log(`✅ [${new Date().toISOString()}] Generated ${totalPageCount} (Stream 2): ${slug}`);
  return true;
}

function loopTick() {
  const keepGoing = generateOnePage();
  if (!keepGoing) {
    console.log(`⛔ Reached limit ${MAX_PAGES_PER_RUN} for this run (Stream 2).`);
    return;
  }

  const delayMs = 1_500;
  setTimeout(() => {
    setImmediate(loopTick);
  }, delayMs);
}

console.log(`🚀 SECOND generator started (output-2/).`);
loopTick();
