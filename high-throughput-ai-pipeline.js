// high-throughput-ai-pipeline.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// === CONFIG ===
const OPENAI_API_KEY = "sk-...";  // your key
const OPENAI_BASE = "https://api.openai.com/v1/chat/completions";

// 2k pages / day ≈ 0.083 pages/second
const DAILY_TARGET = 2000;
const MS_BETWEEN_PAGES = 1000 * 60 * 60 * 24 / DAILY_TARGET;

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
const LOG_DIR = path.join(__dirname, "logs");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const LOG_FILE = path.join(LOG_DIR, "throughput.log");
const ALERT_FILE = path.join(LOG_DIR, "throughput-alerts.log");

function capitalize(text) {
  return text
    .split("-")
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join(" ");
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  fs.appendFileSync(LOG_FILE, line);
}

function alert(msg) {
  const line = `[${new Date().toISOString()}] ALERT ${msg}\n`;
  console.warn("🚨 ALERT:", msg);
  fs.appendFileSync(ALERT_FILE, line);
}

// OpenAI call
async function openaiChat({ messages, model, temperature = 0.7, max_tokens = 4000 }) {
  const res = await axios.post(
    OPENAI_BASE,
    {
      model,
      messages,
      temperature,
      max_tokens,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.choices[0].message.content;
}

// 1) AI‑1: Generate raw long‑form article
async function generateArticleContent({ city, cityCap, model = "gpt-3.5-turbo" }) {
  log(`AI_1_generate(${model}): ${cityCap}`);

  const prompt = `
You are a travel writer writing a 3000–5000 word‑style hotel‑city guide for "${cityCap}".
OUTPUT FORMAT: only the article body as clean HTML, no extra notes.

STRUCTURE:
- H2: Why [CITY] is a top travel destination
- H2: Types of accommodation in [CITY] (luxury, boutique, apartments, resorts, villas, B&Bs, hostels)
- H2: Best areas to stay (city center, airport, residential)
- H2: How to search and book on Booking.com
- H2: Flights to [CITY] via Skyscanner

GUIDELINES:
- Use short paragraphs and subheadings.
- Keep it expert‑level: assume the visitor wants to be an expert on this city.
- Do NOT modify or invent URLs. Use these EXACT Booking.com links once:
  ${BOOKING_HOME}
  ${BOOKING_APARTMENTS}
  ${BOOKING_RESORTS}
  ${BOOKING_VILLAS}
  ${BOOKING_BNB}
  ${BOOKING_GUESTHOUSE}
- Mention that they all contain affiliate ID aid=${AID} once.
- Use this Skyscanner link:
  ${SKY_URL}
- No extra links; only these.
`;

  return await openaiChat({
    messages: [
      {
        role: "system",
        content: "You write expert‑level SEO‑friendly travel guides. Return only body HTML.",
      },
      { role: "user", content: prompt },
    ],
    model,
  });
}

// 2) AI‑2: Quality‑check + structure‑fix
async function qualityCheck({ cityCap, rawHtml, model = "gpt-4o" }) {
  log(`AI_2_quality_check(${model}): ${cityCap}`);

  const prompt = `
Improve this hotel‑city article so it reads like a high‑quality, expert‑level guide.

RULES:
- Keep ALL URLs exactly as written:
  ${BOOKING_HOME}
  ${BOOKING_APARTMENTS}
  ${BOOKING_RESORTS}
  ${BOOKING_VILLAS}
  ${BOOKING_BNB}
  ${BOOKING_GUESTHOUSE}
  ${SKY_URL}
- Do NOT add or remove any Booking.com or Skyscanner links.
- Break long paragraphs.
- Add a couple clear subheadings if missing.
- Remove repetition.

Return ONLY the revised HTML body (no extra notes).
`;

  return await openaiChat({
    messages: [
      {
        role: "system",
        content: "You are a senior editor who polishes long‑form travel content.",
      },
      { role: "user", content: rawHtml + "\n\n---\n" + prompt },
    ],
    model,
  });
}

// 3) AI‑3 (optional): super‑fast polish, cheapest model
async function ultraFastPolish({ cityCap, html, model = "gpt-3.5-turbo" }) {
  log(`AI_3_ultra_fast(${model}): ${cityCap}`);

  const prompt = `
Make this article slightly more readable and scannable.
- Add 2–3 more H3 subheadings if needed.
- Shorten any sentences that are too long.
- Keep all content factual and neutral.
- Do NOT change URLs or remove any links.

Return ONLY the revised HTML body.
`;

  return await openaiChat({
    messages: [
      { role: "system", content: "You are a fast copy‑editor." },
      { role: "user", content: html + "\n\n---\n" + prompt },
    ],
    model,
  });
}

// Generate HTML page (affiliate links in template, never via AI)
function generateHtmlTemplate({ city, cityCap, bodyHtml }) {
  const title = `Hotels in ${cityCap} – 2026 Guide | HotelInDeals`;
  const description = `Find the best hotels, apartments, resorts, and villas in ${cityCap} using Booking.com and Skyscanner.`;
  const canonical = `${BASE_URL}hotels-in-${city}.html`;

  return `<!DOCTYPE html>
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
      --bc-white: #fff;
      --bc-bg: #f2f6fa;
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
    }
    .navbar a {
      color: white;
      text-decoration: none;
    }
    .hero {
      background: linear-gradient(180deg, #003580, #000000);
      color: white;
      padding: 1.5rem 1rem;
      text-align: center;
    }
    .hero p {
      max-width: 700px;
      margin: 0 auto;
    }
    .container {
      max-width: 960px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }
    h1, h2, h3, h4, h5, h6 {
      color: var(--bc-blue);
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
  </style>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Hotels in ${cityCap}",
    "description": "${description}",
    "url": "${canonical}"
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

  <section class="hero">
    <h1>Hotels in ${cityCap} – 2026 Guide</h1>
    <p>A comprehensive expert‑level guide to hotels, accommodation options, and how to book stays in ${cityCap}.</p>
    <form action="https://www.booking.com/searchresults.html" method="GET" target="_blank">
      <input type="hidden" name="aid" value="${AID}" />
      <input type="text" name="ss" value="${cityCap}" placeholder="Destination" required />
      <button type="submit">Search hotels in ${cityCap} on Booking.com (aid=${AID})</button>
    </form>
  </section>

  <main class="container">
${bodyHtml}
  </main>

  <footer style="background:#f8f9fa; padding:2rem 0; margin-top:3rem; text-align:center; color:#666;">
    <p>
      HotelInDeals – 1B+ Hotel Guides Worldwide – 2026.<br>
      All Booking.com links contain affiliate ID <code>aid=${AID}</code>.
    </p>
  </footer>

</body>
</html>`;
}

// Main generator (can be AI‑1 → AI‑2 → optional AI‑3)
async function generateOnePage({ city, cityCap }) {
  const fileName = `hotels-in-${city}.html`;
  const filePath = path.join(OUT_DIR, fileName);

  if (fs.existsSync(filePath)) {
    log(`SKIPPED: ${fileName}`);
    return;
  }

  try {
    // 1) Generate
    const raw = await generateArticleContent({
      city,
      cityCap,
      model: "gpt-3.5-turbo", // change to "gpt-4o" if you want higher‑quality per page
    });

    // 2) Quality‑check
    const checked = await qualityCheck({
      cityCap,
      rawHtml: raw,
      model: "gpt-4o",
    });

    // 3) Optional ultra‑fast polish (cheapest model)
    const finalBody = await ultraFastPolish({
      cityCap,
      html: checked,
      model: "gpt-3.5-turbo",
    });

    const html = generateHtmlTemplate({ city, cityCap, bodyHtml: finalBody });

    fs.writeFileSync(filePath, html);
    log(`✅ 2K‑target_page: ${fileName}`);
  } catch (err) {
    alert(`FAILED_city='${city}': ${err.message}`);
  }
}

// Cities list (this is your seed; you’d expand to 10k+ later)
const CITIES = [
  "paris", "rome", "london", "tokyo", "new-york-city",
  "barcelona", "shanghai", "mumbai", "dubai", "punta-cana",
  "bangkok", "delhi", "istanbul", "jerusalem", "fatima",
  "lourdes", "santiago-de-compostela", "marrakech", "cancun",
  "amssterdam", "berlin", "madrid", "rome", "sydney",
  "cairo", "doha", "riyadh", "mexico-city", "sao-paulo",
].map(c => c.toLowerCase());

let cityIndex = 0;

function startHighThroughputLoop() {
  log(`🚀 High‑throughput pipeline started (target: 2,000 pages/day).`);
  log(`Approx interval: ${MS_BETWEEN_PAGES.toFixed(0)}ms per page.`);

  setInterval(async () => {
    const city = CITIES[cityIndex % CITIES.length];
    const cityCap = capitalize(city);
    await generateOnePage({ city, cityCap });
    cityIndex++;
  }, MS_BETWEEN_PAGES);
}

startHighThroughputLoop();

process.on("SIGINT", () => {
  log("🛑 Stopping 2K/day pipeline");
  process.exit(0);
});
