// forever-generator.js
const fs = require("fs");
const path = require("path");
const os = require("os");

const AID = "8132800";
const BASE_URL = "https://brightlane.github.io/booking.com/";

const BOOKING_HOME = `https://www.booking.com/index.html?aid=${AID}`;
const BOOKING_APARTMENTS = `https://www.booking.com/apartments/index.html?aid=${AID}`;
const BOOKING_RESORTS = `https://www.booking.com/resorts/index.html?aid=${AID}`;
const BOOKING_VILLAS = `https://www.booking.com/villas/index.html?aid=${AID}`;
const BOOKING_BNB = `https://www.booking.com/bed-and-breakfast/index.html?aid=${AID}`;
const BOOKING_GUESTHOUSE = `https://www.booking.com/guest-house/index.html?aid=${AID}`;
const SKY_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

const OUT_DIR = path.join(__dirname, "pages");
const LOCK_FILE = path.join(__dirname, "generator.lock");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Some “seed” cities; you can expand this into a huge CSV later
const CITIES = [
  "paris", "rome", "london", "tokyo", "new-york-city",
  "barcelona", "shanghai", "mumbai", "dubai", "punta-cana",
  "bangkok", "delhi", "istanbul", "jerusalem", "fatima",
  "lourdes", "santiago-de-compostela", "marrakech", "cancun",
].map(c => c.toLowerCase());

function capitalize(text) {
  return text
    .split("-")
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join(" ");
}

function generateCityArticle({ city }) {
  const cityCap = capitalize(city);
  const fileName = `hotels-in-${city}.html`;
  const filePath = path.join(OUT_DIR, fileName);

  const title = `Hotels in ${cityCap} – 2026 Guide | HotelInDeals`;
  const description = `Find the best hotels, apartments, resorts, and villas in ${cityCap} using Booking.com and Skyscanner.`;
  const canonical = `${BASE_URL}hotels-in-${city}.html`;

  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="${canonical}" />
  <link rel="sitemap" href="${BASE_URL}sitemap.xml" />
  <link rel="robots" href="${BASE_URL}robots.txt" />

  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />

  <style>
    :root {
      --bc-blue: #003580;
      --bc-cyan: #009fe3;
      --bc-yellow: #feba02;
      --bc-white: #fff;
      --bc-bg: #f2f6fa;
      --bc-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      line-height: 1.65;
      background: var(--bc-bg);
      color: #333;
    }
    .navbar {
      background: var(--bc-blue);
      color: white;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .navbar a {
      color: white;
      text-decoration: none;
      font-size: 0.95rem;
    }
    .search-box {
      background: linear-gradient(180deg, #003580, #000000);
      color: white;
      padding: 1.5rem 1rem;
      margin: 0 -1rem 1.5rem;
      text-align: center;
    }
    .search-form input {
      padding: 0.8rem 1rem;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.4);
      background: rgba(255,255,255,0.15);
      color: white;
    }
    .search-form button {
      padding: 0.8rem 1.2rem;
      background: var(--bc-yellow);
      color: var(--bc-blue);
      border: none;
      border-radius: 6px;
      margin-left: 0.5rem;
      font-weight: 600;
      cursor: pointer;
    }
    .container {
      max-width: 960px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }
    h1, h2, h3 {
      color: var(--bc-blue);
    }
    h2 {
      margin-top: 2.2rem;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }
    p {
      margin: 0.6rem 0 0.8rem;
    }
    ul {
      margin: 0.5rem 0 1rem 1.2rem;
      line-height: 1.6;
    }
    a {
      color: var(--bc-blue);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .card {
      background: var(--bc-white);
      border-radius: 8px;
      padding: 1.2rem;
      margin: 1.2rem 0;
      box-shadow: var(--bc-shadow);
    }
    .footer {
      background: #f8f9fa;
      padding: 2rem 0;
      margin-top: 3rem;
      color: #666;
    }
  </style>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Hotels in ${cityCap}",
    "description": "${description}",
    "url": "${canonical}",
    "sameAs": [ "${BOOKING_HOME}" ]
  }
  </script>
</head>
<body>

  <nav class="navbar">
    <div>HotelInDeals</div>
    <div>
      <a href="${BASE_URL}index.html">Home</a>
      <a href="${BASE_URL}affiliates.html">Affiliates</a>
    </div>
  </nav>

  <section class="search-box">
    <h1>Hotels in ${cityCap} – 2026 Guide</h1>
    <p>A comprehensive guide to hotels, accommodation options, and how to book stays in ${cityCap}.</p>
    <form action="https://www.booking.com/searchresults.html" method="GET" target="_blank">
      <input type="hidden" name="aid" value="${AID}" />
      <input type="text" name="ss" value="${cityCap}" placeholder="Destination" required />
      <button type="submit">Search hotels in ${cityCap} on Booking.com (aid=${AID})</button>
    </form>
  </section>

  <main class="container">

    <h2>Why ${cityCap} is a top travel destination</h2>
    <p>
      ${cityCap} is a major destination for culture, history, architecture, and modern city life.
      Visitors come to see museums, landmarks, and local cuisine, while also enjoying a wide range of accommodation options.
    </p>

    <h2>Types of accommodation in ${cityCap}</h2>
    <p>
      ${cityCap} offers a mix of luxury hotels, boutique properties, apartments, resorts, villas, bed and breakfasts, and guesthouses.
      You can usually find a place that fits your budget and travel style.
    </p>

    <div class="card">
      <h3>Luxury and 5‑star hotels</h3>
      <p>
        Luxury hotels in ${cityCap} focus on comfort, service, and amenities such as spas, pools, and on‑site restaurants.
        These properties are often located in the city center or near major attractions.
      </p>
    </div>

    <div class="card">
      <h3>Boutique and design hotels</h3>
      <p>
        Boutique hotels are smaller, style‑focused properties that emphasize unique decor and personalized service.
        They’re ideal if you want a distinctive travel experience.
      </p>
    </div>

    <div class="card">
      <h3>Apartment and extended‑stay options</h3>
      <p>
        Apartments in ${cityCap} give you more space and privacy, often including a kitchen and living area.
        These are popular for longer stays and budget‑conscious travelers.
      </p>
    </div>

    <div class="card">
      <h3>Resorts and villas near ${cityCap}</h3>
      <p>
        Resorts and villas are usually located outside the busy city center, near beaches, lakes, or mountains.
        They offer on‑site activities and more space for families.
      </p>
    </div>

    <div class="card">
      <h3>Guesthouses, B&amp;Bs, and hostels</h3>
      <p>
        For lower budgets, guesthouses, bed and breakfasts, and hostels provide affordable lodging.
        Hostels are especially popular with solo travelers and backpackers.
      </p>
    </div>

    <h2>Best areas to stay in ${cityCap}</h2>
    <p>
      Choosing the right neighborhood can make or break your ${cityCap} trip.
    </p>
    <ul>
      <li><strong>City center:</strong> Close to attractions and transport, but often more expensive.</li>
      <li><strong>Airport‑adjacent zones:</strong> Useful for short stays and early flights.</li>
      <li><strong>Residential neighborhoods:</strong> Quieter and more local.</li>
    </ul>

    <h2>How to search and book on Booking.com</h2>
    <p>
      Use the search box above to:
      <ol>
        <li>Enter your destination (${cityCap}).</li>
        <li>Select dates and guests.</li>
        <li>Filter by price, type of property, and star rating.</li>
        <li>Click through to a hotel page and complete your booking on Booking.com.</li>
      </ol>
    </p>

    <div class="card">
      <h3>Important Booking.com links (all with aid=${AID})</h3>
      <ul>
        <li><a href="${BOOKING_HOME}" target="_blank">Hotels homepage</a></li>
        <li><a href="${BOOKING_APARTMENTS}" target="_blank">Apartments</a></li>
        <li><a href="${BOOKING_RESORTS}" target="_blank">Resorts</a></li>
        <li><a href="${BOOKING_VILLAS}" target="_blank">Villas</a></li>
        <li><a href="${BOOKING_BNB}" target="_blank">Bed &amp; Breakfast</a></li>
        <li><a href="${BOOKING_GUESTHOUSE}" target="_blank">Guesthouses</a></li>
      </ul>
    </div>

    <h2>Flights to ${cityCap} via Skyscanner</h2>
    <p>
      You can compare flights to ${cityCap} using our affiliate link:
      <a href="${SKY_URL}" target="_blank">${SKY_URL}</a>.
    </p>

    <div class="card">
      <h3>More hubs on this site</h3>
      <ul>
        <li><a href="${BASE_URL}top-100-tourist-cities-hotels.html">Top 100 tourist cities – hotels</a></li>
        <li><a href="${BASE_URL}all-inclusive-resorts-worldwide.html">All‑inclusive resorts worldwide</a></li>
        <li><a href="${BASE_URL}religious-destinations-worldwide.html">Religious destinations worldwide</a></li>
        <li><a href="${BASE_URL}hostels-europe.html">Hostels in Europe</a></li>
        <li><a href="${BASE_URL}affiliates.html">Affiliate info</a></li>
      </ul>
    </div>

  </main>

  <footer class="footer text-center">
    <p>
      HotelInDeals – 1B+ Hotel Guides Worldwide – 2026.<br>
      All Booking.com links contain affiliate ID <code>aid=${AID}</code>.
    </p>
  </footer>

</body>
</html>
`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated: ${fileName}`);
  } else {
    console.log(`⏩ Skipped (already exists): ${fileName}`);
  }
}

// Simple “forever” loop (simulate continuous generation from a queue)
function startForeverLoop() {
  fs.writeFileSync(LOCK_FILE, "PID=" + process.pid + "\n" + new Date().toISOString());

  let cycle = 0;
  const interval = 1000;  // 1s per cycle

  console.log("🚀 Forever‑generator started (set‑and‑forget).");
  console.log("Press Ctrl+C to stop.");

  setInterval(() => {
    const city = CITIES[cycle % CITIES.length];
    generateCityArticle({ city });
    cycle++;

    // Reset counter so it’s memory‑friendly; you can expand CITIES into a big file
    if (cycle >= 10_000_000) cycle = 0;
  }, interval);
}

// Start on launch
startForeverLoop();

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping forever generator...");
  if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
  process.exit(0);
});
