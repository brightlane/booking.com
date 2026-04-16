// ai-long-article-pipeline.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// === CONFIG ===
const OPENAI_API_KEY = "sk-...";  // your key
const OPENAI_BASE = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o";          // or "gpt-4-turbo", "o3-mini" for cheaper runs

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

const LOG_FILE = path.join(LOG_DIR, "ai-generator.log");
const ALERT_FILE = path.join(LOG_DIR, "ai-alerts.log");

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

// Low‑level OpenAI call
async function openaiChat({ messages, model = MODEL, max_tokens = 4000 }) {
  const res = await axios.post(
    OPENAI_BASE,
    {
      model,
      messages,
      temperature: 0.7,
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

// 1) Primary AI generator: “Write 5000‑word‑style article”
async function generateArticleContent({ city, cityCap }) {
  log(`AI_1_generate: ${cityCap}`);

  const prompt = `
You are a world‑class travel writer writing a 5000‑word‑style hotel‑city guide for "${cityCap}".
Your goal is to make visitors feel like experts on this travel destination.

STRUCTURE (exact sections):
1. Why [CITY] is a top travel destination  
2. Types of accommodation in [CITY] (luxury hotels, boutique, apartments, resorts/villas, B&Bs, hostels)  
3. Best areas to stay (city center, airport‑adjacent, residential neighborhoods)  
4. How to search and book hotels using Booking.com  
5. Flights to [CITY] using Skyscanner  

CONTENT QUALITY RULES:
- Use clear, informative, and engaging prose, not bullet‑only lists.  
- Keep paragraphs 3–6 lines long.  
- Use subheadings and short, scannable sections.  
- Mention "Booking.com" naturally, including:
  ${BOOKING_HOME}
  ${BOOKING_APARTMENTS}
  ${BOOKING_RESORTS}
  ${BOOKING_VILLAS}
  ${BOOKING_BNB}
  ${BOOKING_GUESTHOUSE}
  All of these contain affiliate ID aid=${AID}; you may mention that explicitly once.
- Mention Skyscanner flight search:
  ${SKY_URL}
- Do NOT invent or change any URL; use them exactly as written above.
- Avoid overly promotional language; keep it informative and helpful.

Return ONLY the article body text, no extra instructions or notes.
`;

  return await openaiChat({
    messages: [
      {
        role: "system",
        content: "You are a professional travel content writer focused on SEO‑friendly, expert‑level guides.",
      },
      { role: "user", content: prompt },
    ],
  });
}

// 2) Quality‑check AI: double‑check structure + readability
async function qualityCheckArticle({ cityCap, rawText }) {
  log(`AI_2_quality_check: ${cityCap}`);

  const prompt = `
Review this hotel‑city article for "${cityCap}" and fix it so it reads like a high‑quality, 5000‑word‑style expert guide.

RULES:
- Keep ALL Booking.com links EXACTLY AS WRITTEN:
${BOOKING_HOME}
${BOOKING_APARTMENTS}
${BOOKING_RESORTS}
${BOOKING_VILLAS}
${BOOKING_BNB}
${BOOKING_GUESTHOUSE}
- Keep the Skyscanner URL EXACTLY:
${SKY_URL}
- Do NOT change any of these URLs or add new ones.

IMPROVE:
- Paragraph structure (no huge blocks, no wall‑of‑text).  
- Flow between sections.  
- Add a couple subheadings if missing.  
- Remove repetition or fluff.  
- Keep the tone informative and slightly conversational.

Return the FULL revised article body in plain Markdown‑style text, with no extra commentary.
Ask me if you have any questions about the task.
`;

  return await openaiChat({
    messages: [
      {
        role: "system",
        content: "You are a senior editor and SEO content reviewer.",
      },
      { role: "user", content: rawText + "\n\n---\n" + prompt },
    ],
  });
}

// 3) Generate HTML page (with affiliate links in template, never via AI )
function generateHtmlTemplate({ city, cityCap, bodyText }) {
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
${bodyText}
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

// 4) Generate one page end‑to‑end
async function generateOnePage({ city, cityCap }) {
  const fileName = `hotels-in-${city}.html`;
  const filePath = path.join(OUT_DIR, fileName);

  if (fs.existsSync(filePath)) {
    log(`SKIPPED: ${fileName} (already exists)`);
    return;
  }

  try {
    const rawArticle = await generateArticleContent({ city, cityCap });
    const qualityChecked = await qualityCheckArticle({ cityCap, rawText: rawArticle });

    const html = generateHtmlTemplate({ city, cityCap, bodyText: qualityChecked });

    fs.writeFileSync(filePath, html);
    log(`✅ AI‑double‑checked page: ${fileName}`);
  } catch (err) {
    alert(`FAILED_city='${city}': ${err.message}`);
  }
}

// 5) Forever generation loop (simulate endless pipeline)
const CITIES = [
  "paris", "rome", "london", "tokyo", "new-york-city",
  "barcelona", "shanghai", "mumbai", "dubai", "punta-cana",
  "bangkok", "delhi", "istanbul", "jerusalem", "fatima",
  "lourdes", "santiago-de-compostela", "marrakech", "cancun",
].map(c => c.toLowerCase());

function startForeverLoop() {
  let cycle = 0;
  log("🚀 AI‑double‑check pipeline started (endless expert‑level content).");

  setInterval(async () => {
    const city = CITIES[cycle % CITIES.length];
    const cityCap = capitalize(city);
    await generateOnePage({ city, cityCap });
    cycle++;
  }, 1000);  // 1s per city; increase in production
}

startForeverLoop();

process.on("SIGINT", () => {
  log("🛑 Stopping AI‑pipeline");
  process.exit(0);
});
