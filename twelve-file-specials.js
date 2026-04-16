// twelve-file-specials.js
//
// 1. Generates exactly 1,000 high‑value pages optimized for:
//    - High Commission Probability (Booking.com + Skyscanner links)
//    - High Conversion Rate (single‑focus, low‑friction, high‑value CTA)
//
// 2. Uses:
//    - BOOKING.HOME (aid=1858279)
//    - SKY.HOME (offer_id=29465&aff_id=21885)
// 3. 100% file‑ready, no extra config
//
// 4. Designed to be the “top‑1000‑money‑makers” in your stack

const fs = require("fs-extra");
const path = require("path");

const BOOKING = {
  HOME: "https://www.booking.com/index.html?aid=1858279",
  APARTMENTS: "https://www.booking.com/apartments/index.html?aid=1858279",
  RESORTS: "https://www.booking.com/resorts/index.html?aid=1858279",
  VILLAS: "https://www.booking.com/villas/index.html?aid=1858279",
  BNB: "https://www.booking.com/bed-and-breakfast/index.html?aid=1858279",
  GUESTHOUSES: "https://www.booking.com/guest-house/index.html?aid=1858279",
};

const SKY = {
  HOME: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

const OUTPUT_DIR = path.resolve("./output");
const TARGET_PAGES = 1000; // top 1000 money‑makers

const MAIN_CITIES = [
  "New York City",
  "Los Angeles",
  "London",
  "Paris",
  "Tokyo",
  "Singapore",
  "Dubai",
  "Istanbul",
  "Sydney",
  "Rio de Janeiro",
  "Sao Paulo",
  "Moscow",
  "Cape Town",
];

const MAIN_EVENTS = [
  "super-bowl",
  "fifa-world-cup",
  "olympics",
  "tennis-grand-slam",
  "music-festival",
];

const TYPES = [
  "budget",         // travelers who compare price
  "luxury",         // travelers who spend more per night
  "all-inclusive",  // high‑value stay, good for Booking
  "airport",        // last‑minute, high‑intent travelers
  "family",         // 2‑room / longer stays, more value
  "business",       // corporate, often higher ADR
];

const LANGUAGES = ["en", "es", "pt", "de", "fr"];

// Hot conversion‑style headline modifiers
const CONVERSION_MODIFIERS = [
  "Best Deals",
  "Last Minute",
  "Exclusive Discounts",
  "Limited Time",
  "Top Rated",
  "Recommended by Travelers",
  "Verified by Guests",
];

// ==============================
// 2. SEO PAGE TEMPLATE (MAX‑CONVERSION)
// ==============================

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTitle(city, type, event, lang = "en") {
  const mod = randomChoice(CONVERSION_MODIFIERS);
  const cityPart = city;
  const typePart =
    type === "budget"
      ? "Affordable"
      : type === "luxury"
      ? "Premium"
      : type === "all-inclusive"
      ? "All‑Inclusive"
      : type === "airport"
      ? "Airport‑Convenient"
      : type === "family"
      ? "Family‑Friendly"
      : type === "business"
      ? "Business"
      : "Best";

  if (lang === "en") {
    return `${mod} ${typePart} Hotels in ${city} ${
      event ? `for ${event.replace("-", " ")}` : "2026"
    }`;
  } else if (lang === "es") {
    return `${mod} Hoteles ${
      type === "budget" ? "Económicos" : "De Lujo"
    } en ${city} ${event ? `para ${event.replace("-", " ")}` : ""}`;
  } else if (lang === "pt") {
    return `${mod} Hotéis ${
      type === "budget" ? "Baratos" : "De Luxo"
    } em ${city} ${event ? `para ${event.replace("-", " ")}` : ""}`;
  } else if (lang === "de") {
    return `${mod} ${
      type === "budget" ? "Günstige" : "Luxus"
    } Hotels in ${city} 2026`;
  } else if (lang === "fr") {
    return `${mod} ${
      type === "budget" ? "Hôtels bons marchés" : "Hôtels de luxe"
    } à ${city} ${event ? `pour ${event.replace("-", " ")}` : ""}`;
  }
  return `${mod} Hotels in ${city}`;
}

function generateDescription(city, type, event, lang = "en") {
  const typeWord =
    type === "budget"
      ? "cheap and budget"
      : type === "luxury"
      ? "luxury and premium"
      : type === "all-inclusive"
      ? "all‑inclusive resort"
      : type === "airport"
      ? "airport‑convenient business"
      : type === "family"
      ? "family‑friendly"
      : type === "business"
      ? "business‑class"
      : "top";

  if (lang === "en") {
    return `Find the best ${typeWord} hotels in ${city} ${
      event ? `during ${event.replace("-", " ")}` : "in 2026"
    } with Booking.com affiliate links (${BOOKING.HOME}). Book flights with Skyscanner (${SKY.HOME}) for the best deals.`;
  } else if (lang === "es") {
    return `Encuentra los mejores hoteles ${typeWord} en ${city} ${
      event ? `durante ${event.replace("-", " ")}` : "2026"
    } con enlaces afiliados a Booking.com (${BOOKING.HOME}). Reserva vuelos con Skyscanner (${SKY.HOME}).`;
  } else if (lang === "pt") {
    return `Encontre os melhores hotéis ${typeWord} em ${city} ${
      event ? `durante ${event.replace("-", " ")}` : "2026"
    } com links afiliados à Booking.com (${BOOKING.HOME}). Reserve voos com Skyscanner (${SKY.HOME}).`;
  } else if (lang === "de") {
    return `Finden Sie die besten ${typeWord} Hotels in ${city} ${
      event ? `während ${event.replace("-", " ")}` : "2026"
    } mit Booking.com‑Affiliate‑Links (${BOOKING.HOME}).`;
  } else if (lang === "fr") {
    return `Trouvez les meilleurs hôtels ${typeWord} à ${city} ${
      event ? `pendant ${event.replace("-", " ")}` : "2026"
    } avec les liens affiliés Booking.com (${BOOKING.HOME}).`;
  }
  return `Best ${typeWord} hotels in ${city} 2026`;
}

function renderPage(city, type, event, lang = "en") {
  const title = generateTitle(city, type, event, lang);
  const description = generateDescription(city, type, event, lang);
  const mod = randomChoice(CONVERSION_MODIFIERS);

  const citySafe = city.toLowerCase().replace(" ", "-");
  const eventSafe = event ? `-${event}` : "";
  const typeSafe = type === "budget" ? "-budget" : type === "all-inclusive" ? "-all-inclusive" : "";
  const langSafe = `-${lang}`;

  const filename = `topmoney-${citySafe}${eventSafe}${typeSafe}-2026${langSafe}.html`;
  const hreflangSet = LANGUAGES.map(
    (l) =>
      `<link rel="alternate" hreflang="${l}" href="https://yourdomain.com/topmoney-${citySafe}${eventSafe}${typeSafe}-2026-${l}.html" />`
  ).join("\n  ");

  const h1 = title;

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '\\"')}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="language" content="${lang}">
  <meta name="robots" content="index, follow">
  <meta name="keywords" content="best hotels in ${city}, cheap hotels in ${city}, luxury hotels in ${city}, all inclusive resort, family friendly hotel, airport hotel, business hotel, last minute hotel, near stadium, near airport, near city center" />
  <link rel="canonical" href="https://yourdomain.com/topmoney/${citySafe}${eventSafe}/${typeSafe}/${langSafe}/2026.html" />
  ${hreflangSet}
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "TopMoneyHotel2026",
      "url": "https://yourdomain.com/"
    }
  }
  </script>
</head>
<body>
<div class="container py-4">

  <h1>${h1}</h1>

  <p>${description}</p>

  <p class="mt-4">
    <strong class="text-primary">Save now</strong> — these are the best deals for ${type === "budget" ? "budget travelers" : type === "luxury" ? "luxury stays" : "family trips"} in ${city} in 2026.
  </p>

  <p>
    <a href="${BOOKING.HOME}" class="btn btn-lg btn-success mb-3" target="_blank">
      Check Hotel Deals on Booking.com ({aid=1858279})
    </a>
  </p>

  <p>
    <a href="${SKY.HOME}" class="btn btn-outline-primary mb-3" target="_blank">
      Compare Flights to ${city} (Skyscanner)
    </a>
  </p>

  <p>
    <small>
      <strong>Conversion hint:</strong> This page is optimized for high‑value picks, not just information.
    </small>
  </p>

</div>
</body>
</html>
  `;
}

// ==============================
// 3. GENERATE TOP 1000 PAGES (NOT DUPLICATES)
// ==============================

async function generateTwelveFileSpecials() {
  const combos = [];
  let count = 0;

  // Build all possible combos (city + type + event + lang)
  for (const city of MAIN_CITIES) {
    for (const type of TYPES) {
      for (const event of [...MAIN_EVENTS, null]) {
        for (const lang of LANGUAGES) {
          combos.push({ city, type, event, lang });
        }
      }
    }
  }

  // Shuffle combos (so you don’t just take the first 1000 alphabetical)
  for (let i = combos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combos[i], combos[j]] = [combos[j], combos[i]];
  }

  // Generate exactly TARGET_PAGES pages
  for (let i = 0; i < TARGET_PAGES && i < combos.length; i++) {
    const { city, type, event, lang } = combos[i];

    const page = renderPage(city, type, event, lang);

    const citySafe = city.toLowerCase().replace(" ", "-");
    const eventSafe = event ? `-${event}` : "";
    const typeSafe = type === "budget" ? "-budget" : type === "all-inclusive" ? "-all-inclusive" : type ? `-${type}` : "";
    const langSafe = `-${lang}`;

    const filename = `topmoney-${citySafe}${eventSafe}${typeSafe}-2026${langSafe}.html`;
    const fullPath = path.join(OUTPUT_DIR, filename);

    fs.ensureFileSync(fullPath);
    fs.writeFileSync(fullPath, page);

    console.log(`✓ tm${count++} → ${filename}`);
  }

  console.log(
    `✅ twelve-file-specials.js: generated ${TARGET_PAGES} top‑1000‑money‑making, high‑conversion pages.` +
    ` Each page is optimized for Booking.com + Skyscanner affiliate EPC and strong CTA.`
  );
}

// Run once per day (or as often as you want)
generateTwelveFileSpecials().catch((err) => {
  console.error("twelve-file-specials.js error:", err.message);
});
