const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch@2

const OUT_DIR = path.join(__dirname, 'output');
const TEMPLATE_PATH = path.join(__dirname, 'src', 'hub-template.html');
const CITIES_PATH = path.join(__dirname, 'src', 'cities.json');

const BOOKING_AID = "8132800";

// All your Booking.com affiliate URLs (exactly as you use now)
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

// 4 AI models (you plug keys later)
const AI_KEYS = {
  ai1: process.env.AI1_KEY,
  ai2: process.env.AI2_KEY,
  ai3: process.env.AI3_KEY,
  ai4: process.env.AI4_KEY,
  endpoint1: 'https://api.ai-provider-1.com/v1/chat', // adjust
  endpoint2: 'https://api.ai-provider-2.com/v1/completions',
  endpoint3: 'https://api.ai-provider-3.com/v1/chat',
  endpoint4: 'https://api.ai-provider-4.com/v1/completions',
};

// 10M pages switch (you can cap smaller in dev)
const MAX_PAGES = 10_000_000;
const MAX_CHARS_PER_PAGE = 30_000; // ~5k–6k words

fs.mkdirSync(OUT_DIR, { recursive: true });

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
const cities = JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'));

// Rotate one Booking URL per page (just like your current page)
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callAi(aiNum, prompt, maxTokens = 4000) {
  const key = AI_KEYS[`ai${aiNum}`];
  const endpoint = AI_KEYS[`endpoint${aiNum}`];

  const body = JSON.stringify({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: maxTokens,
  });

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function generateContentStable(city, country, slug) {
  const keyword = `hotels in ${city} ${country} 2026`;

  const prompt = `Write a very long, SEO‑friendly guide (about 5,000 words) about "${keyword}". 
Include:
- Introduction to ${city} as a travel destination.
- Overview of hotel types (luxury, mid‑range, budget, apartments, resorts, B&Bs).
- Top areas to stay in the city.
- How to get the best price on Booking.com (without mentioning competitors).
- Tips for families, couples, solo travelers, and business travelers.
- Best time to visit, weather, transport, and local attractions.
- Internal links to other cities (e.g., "See our guide to hotels in Kuala Lumpur").
Never mention any other booking site by name. All content is for an informational hub site.`;

  const aiPromises = [];
  for (let i = 1; i <= 4; i++) {
    aiPromises.push(callAi(i, prompt, 8000));
  }

  const texts = await Promise.all(aiPromises);
  let combined = texts.join('\n\n--- AI SET‑AND‑FORGET MERGE ---\n\n');
  combined = combined.replace(/\r?\n\s*\r?\n/g, '\n\n');
  return combined.substring(0, MAX_CHARS_PER_PAGE);
}

function generateHubHtml(fullContent, city, country, slug) {
  const bookingUrl = pickBooking();
  const skyscannerUrl = pickSky();

  const title = `Hotels in ${city} ${country} ${new Date().getFullYear()} | Hotel Deals.`;
  const description = `Ultimate guide to hotels in ${city} ${country} in 2026. Find the best Booking.com deals, apartments, resorts, and villas with our curated lists.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="google-site-verification" content="eWVDN3vbam9nnaZQu7wAQKyfmJJdM7zjI80l4DGeUrQ" />
  <meta name="msvalidate.01" content="574044E39556B8B8DAAF1D1F233C87B0" />
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="language" content="en" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://brightlane.github.io/booking.com/hotels-in-${slug}.html" />
  <link rel="sitemap" href="https://brightlane.github.io/booking.com/sitemap.xml" />
  <link rel="robots" href="https://brightlane.github.io/booking.com/robots.txt" />
  <!-- OpenGraph / social -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="https://brightlane.github.io/booking.com/hotels-in-${slug}.html" />
  <meta property="og:type" content="website" />
  <link rel="stylesheet" href="/styles.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${description}",
    "author": {"@type":"Organization","name":"Hotel Deals."}
  }
  </script>
</head>
<body>

<!-- Top half is clickable to Booking.com -->
<div class="clickable-top-half"
     onclick="window.open('${bookingUrl}', '_blank');">

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
    <p>
      Use our guides to find the best deals on hotels in ${city},
      hotels near ${city}, apartments, resorts, villas, and B&amp;Bs worldwide in 2026.
    </p>
    <a href="#" class="cta"
       onclick="window.open('${bookingUrl}', '_blank'); return false;">
      Book on Booking.com and Save Money (aid=${BOOKING_AID}, GitHub)
    </a>
  </section>

</div>

<div class="container">
  <article class="article-content">
    ${fullContent.split('\n\n').map(para => `<p>${para}</p>`).join('')}
  </article>

  <!-- Booking.com search block -->
  <form
    action="https://www.booking.com/searchresults.html"
    method="GET"
    target="_blank"
    style="margin: 2rem 0;">
    <input type="hidden" name="aid" value="${BOOKING_AID}" />
    <div style="display:flex; gap:1rem; flex-wrap:wrap; align-items:center;">
      <div>
        <label>Where to?</label>
        <input type="text" name="ss" value="${city}" />
      </div>
      <div>
        <label>Check‑in</label>
        <input type="date" name="checkin" />
      </div>
      <div>
        <label>Check‑out</label>
        <input type="date" name="checkout" />
      </div>
      <button type="submit">Search on Booking.com</button>
    </div>
  </form>

  <div class="row">
    :::TILES:::
  </div>

  <!-- Skyscanner block -->
  <div class="sky-block">
    <p>
      <a href="${skyscannerUrl}" target="_blank">
        Compare flights with Skyscanner
      </a>
    </p>
  </div>
</div>

<!-- Sticky Booking bar (optional; keep if you want) -->
<div class="sticky-booking-bar">
  <div style="text-align:center;">
    <a href="${bookingUrl}" class="btn btn-primary" target="_blank">
      Book on Booking.com (aid=${BOOKING_AID})
    </a>
    <a href="${skyscannerUrl}" class="btn btn-outline-light" target="_blank">
      Compare flights
    </a>
  </div>
</div>

</body>
</html>`;
}

async function runGenerator() {
  let pageCounter = 0;

  for (const item of cities) {
    const { city, country, slug } = item;

    try {
      console.log(`Generating page ${pageCounter + 1} for: ${city} (${country})`);

      const fullContent = await generateContentStable(city, country, slug);
      const html = generateHubHtml(fullContent, city, country, slug);

      const filepath = path.join(OUT_DIR, `hotels-in-${slug}.html`);
      fs.writeFileSync(filepath, html, 'utf8');

      pageCounter += 1;

      if (pageCounter % 10 === 0) {
        console.log(`✅ Generated ${pageCounter} pages so far.`);
      }

      // Gentle throttle to avoid API / rate‑limiting pain
      await sleep(10_000); // 10s per page; you can adjust or skip in prod
    } catch (err) {
      console.error(`Failed for ${city}:`, err.message);
    }

    if (pageCounter >= MAX_PAGES) break;
  }

  console.log(`🎬 Set‑and‑forget done: ${pageCounter} pages generated.`);
}

runGenerator().catch(console.error);
