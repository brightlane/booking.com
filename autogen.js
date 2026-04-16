const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch@2

const OUT_DIR = path.join(__dirname, 'output');
const TEMPLATE_PATH = path.join(__dirname, 'src', 'hub-template.html');
const CITIES_PATH = path.join(__dirname, 'src', 'cities.json');

// Your AI API keys (rotate/rotate/rotate for rate‑limiting)
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

// 10,000,000 files flag (if you really want that)
const MAX_PAGES = 10_000_000;
const MAX_CHARS_PER_PAGE = 30_000; // roughly 5k–6k words

// Create dirs
fs.mkdirSync(OUT_DIR, { recursive: true });

// Read template (tiles only) + city list
const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
const cities = JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callAi(aiNum, prompt, maxTokens = 4000) {
  const key = AI_KEYS[`ai${aiNum}`];
  const endpoint = AI_KEYS[`endpoint${aiNum}`];

  const body = JSON.stringify({
    model: 'gpt-4-turbo', // or whatever model; adapt to each API
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

// Generate 5k‑word content for a city from 4 AIs
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
  const combined = texts.join('\n\n--- AI SET‑AND‑FORGET MERGE ---\n\n');

  // Basic dedup, trim, and enforce length
  let clean = combined.replace(/\r?\n\s*\r?\n/g, '\n\n');
  clean = clean.substring(0, MAX_CHARS_PER_PAGE);

  return clean;
}

function generateHubHtml(fullContent, city, country, slug) {
  const title = `Hotels in ${city} ${country} ${new Date().getFullYear()} | Hotel Deals.`;
  const description = `Ultimate guide to hotels in ${city} ${country} in 2026. Find the best Booking.com deals, apartments, resorts, and villas with our curated lists.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://brightlane.github.io/booking.com/hotels-in-${slug}.html" />
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
  <div class="container">
    <article class="article-content">
      ${fullContent.split('\n\n').map(para => `<p>${para}</p>`).join('')}
    </article>

    <div class="row">
      :::TILES:::
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

      // Gentle throttle to avoid API bans
      await sleep(10_000); // 10s per page; you can reduce if your keys are big
    } catch (err) {
      console.error(`Failed for ${city}:`, err.message);
    }

    // Optional: stop at a smaller sample in dev
    if (pageCounter >= MAX_PAGES) break;
  }

  console.log(`🎬 Set‑and‑forget done: ${pageCounter} pages generated.`);
}

runGenerator().catch(console.error);
