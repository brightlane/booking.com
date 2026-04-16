// 1‑file‑everything.js
// All data + code in one file; generates 2,000 pages per run

const fs = require("fs-extra");
const path = require("path");

// ==============================
// 1. AFFILIATE CONFIG
// ==============================

const BOOKING = {
  HOME: "https://www.booking.com/index.html?aid=1858279",
  APARTMENTS: "https://www.booking.com/apartments/index.html?aid=1858279",
  RESORTS: "https://www.booking.com/resorts/index.html?aid=1858279",
  VILLAS: "https://www.booking.com/villas/index.html?aid=1858279",
  BNB: "https://www.booking.com/bed-and-breakfast/index.html?aid=1858279",
  GUESTHOUSES: "https://www.booking.com/guest-house/index.html?aid=1858279",
};

const SKY = {
  HOME:
    "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

// ==============================
// 2. EMBEDDED DATASET
// (This is your "master‑all‑100‑in‑1" INSIDE this file)
// Add as many entries as you want; keep this JSON block
// ==============================

const MASTER_DATA_ARRAY = [
  {
    id: "1",
    name: "Hotel Example One",
    chain: "BigGlobalChain",
    brand: "BudgetWings",
    city: "New York City",
    country: "United States",
    lat: 40.7585,
    lng: -73.9834,
    type: "hotel",
    subset_type: "city-center",
    tags: ["city-center", "business", "airport", "family", "all-inclusive"],
    is_popular: true,
    website: "https://www.bigglobalchain.com/example-one",
    booking_link: `https://www.booking.com/index.html?aid=1858279&ss=Hotel+Example+One+New+York+City`,
    skyscanner_link: `https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885&city=New+York+City`,
    template: "hotel-in-city.html",
    languages_offered: [
      "en", "es", "pt", "de", "fr", "it", "zh", "ru", "ar", "ja"
    ],
    description_en: "Hotel Example One in New York City offers comfortable rooms close to the city center and major attractions.",
    description_es: "Hotel Example One en Nueva York ofrece habitaciones cómodas cerca del centro y de las principales atracciones.",
    description_pt: "Hotel Example One em Nova Iorque oferece quartos confortáveis perto do centro e das principais atrações.",
    description_de: "Hotel Example One in New York City bietet komfortable Zimmer in der Nähe des Stadtzentrums und wichtiger Sehenswürdigkeiten.",
    description_fr: "Hotel Example One à New York City offre des chambres confortables à proximité du centre‑ville et des principales attractions.",
    description_it: "Hotel Example One a New York City offre camere confortevoli vicino al centro e alle principali attrazioni.",
    description_zh: "New York City的Hotel Example One 提供舒适的客房，靠近市中心和主要景点。",
    description_ru: "Отель Example One в Нью‑Йорке предлагает комфортабельные номера недалеко от центра и главных достопримечательностей.",
    description_ar: "يوفر Hotel Example One في مدينة نيويورك غرفًا مريحة بالقرب من وسط المدينة والمعالم السياحية الرئيسية.",
    description_ja: "ニューヨーク市のHotel Example Oneは、街の中心部と主要観光地の近くにある快適な客室を提供しています。"
  },
  {
    id: "2",
    name: "Hostel Europe Example 1",
    chain: "Generator Hostels",
    brand: "Generator",
    city: "Berlin",
    country: "Germany",
    lat: 52.52,
    lng: 13.405,
    type: "hostel",
    subset_type: "hostel",
    tags: ["dorm","social","bar","city-center","budget"],
    is_popular: true,
    website: "https://generatorhostels.com/berlin",
    booking_link: `https://www.booking.com/index.html?aid=1858279&ss=Generator+Hostel+Berlin`,
    skyscanner_link: `https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885&city=Berlin`,
    template: "hostel-in-city.html",
    languages_offered: [
      "en", "de", "fr", "it", "es", "pt", "ru", "pl", "tr", "ar"
    ],
    description_en: "Generator Hostel Berlin offers dorms and private rooms in a design‑driven property steps from the city center.",
    description_de: "Generator Hostel Berlin bietet Schlafsäle und Privatzimmer in einem Design‑hostel im Herzen der Stadt.",
    description_fr: "Generator Hostel Berlin propose des dortoirs et chambres privées dans un établissement au design moderne près du centre‑ville.",
    description_it: "Generator Hostel Berlin offre dormitori e camere private in un ostello dallo stile moderno vicino al centro.",
    description_es: "Generator Hostel Berlin ofrece dormitorios y habitaciones privadas en un albergue con diseño moderno cerca del centro.",
    description_pt: "Generator Hostel Berlin oferece dormitórios e quartos privados num albergue de design moderno perto do centro.",
    description_ru: "Generator Hostel Berlin предлагает общие и отдельные номера в современном хостеле рядом с центром города.",
    description_pl: "Generator Hostel Berlin oferuje dormitoria i pokoje prywatne w nowoczesnym hostelu blisko centrum miasta.",
    description_tr: "Generator Hostel Berlin, şehir merkezine yakın, modern bir hostelinde hem yatak odaları hem de özel odalar sunar.",
    description_ar: "يوفر Generator Hostel Berlin غرف نوم مشتركة وأخرى خاصة في مبنى بتصميم عصري بالقرب من وسط المدينة."
  },
  {
    id: "3",
    name: "Apartments Europe Example 1",
    chain: "Citadines",
    brand: "Citadines",
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    type: "apart-hotel",
    subset_type: "apart-hotel",
    tags: ["apart-hotel","long-stay","kitchenettes","mid-range"],
    is_popular: true,
    website: "https://www.citadines.com",
    booking_link: `https://www.booking.com/index.html?aid=1858279&ss=Citadines+Paris`,
    skyscanner_link: `https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885&city=Paris`,
    template: "apartments-in-city.html",
    languages_offered: [
      "en","fr","de","es","it","zh","ru","pt","ar","ja"
    ],
    description_en: "Citadines Paris offers serviced apartments with kitchens, ideal for stays longer than a few nights.",
    description_fr: "Citadines Paris offre des appartements avec cuisine, parfaits pour des séjours de plusieurs nuits.",
    description_de: "Citadines Paris bietet Wohnungen mit Küche, ideal für längere Aufenthalte.",
    description_es: "Citadines Paris ofrece apartamentos con cocina, ideales para estancias de varios días.",
    description_it: "Citadines Paris offre appartamenti con cucina, ideali per soggiorni di più notti.",
    description_zh: "巴黎的Citadines提供带厨房的服务式公寓，非常适合多晚住宿。",
    description_ru: "Citadines Paris предлагает апартаменты с кухней, подходящие для длительных поездок.",
    description_pt: "Citadines Paris oferece apartamentos com cozinha, ideais para estadias mais longas.",
    description_ar: "توفر Citadines Paris شققًا مع مطبخ، مثالية للإقامة لعدة ليالٍ.",
    description_ja: "ParisのCitadinesはキッチン付きのサービスアパートを提供し、数泊以上の滞在に最適です。"
  }
];

// ==============================
// 3. OUTPUT DIR
// ==============================

const OUTPUT_DIR = path.resolve("./output");

// ==============================
// 4. TEMPLATE RENDERER
// ==============================

function renderPage(entry) {
  const langBlocks = entry.languages_offered
    .map(
      (lang) =>
        `<p><strong>${lang.toUpperCase()}:</strong> ${
          entry[`description_${lang}`] || entry.description_en
        }</p>`
    )
    .join("\n");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${entry.name} in ${entry.city} – Booking.com &amp; Skyscanner</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${entry.description_en.slice(0, 200)}...">
</head>
<body>

<div class="container py-4">

  <h1>${entry.name} – ${entry.type === "hostel" ? "Hostel" : "Hotel/Apartment"} in ${entry.city}, ${entry.country}</h1>

  <p>
    <strong>Chain:</strong> ${entry.chain} – <strong>Brand:</strong> ${entry.brand}<br>
    <strong>Location:</strong> ${entry.lat.toFixed(4)}, ${entry.lng.toFixed(4)}
  </p>

  <p><strong>Tags:</strong> ${entry.tags.join(", ")}</p>

  <p>
    <a href="${entry.website}" target="_blank">Official site</a><br>
    <a href="${entry.booking_link}" target="_blank">Book on Booking.com (your ID)</a><br>
    <a href="${entry.skyscanner_link}" target="_blank">Check flights on Skyscanner (your ID)</a>
  </p>

  <section class="my-4">
    <h2>Descriptions</h2>
    ${langBlocks}
  </section>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "${entry.name}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${entry.city}",
      "addressCountry": "${entry.country}"
    },
    "latitude": ${entry.lat},
    "longitude": ${entry.lng},
    "url": "https://${entry.city.toLowerCase().replace(/ /g, "-")}-hotel-${entry.id}.example.com"
  }
  </script>

</div>

</body>
</html>
  `.trim();
}

// ==============================
// 5. GENERATOR
// ==============================

async function generatePages() {
  const data = MASTER_DATA_ARRAY;

  if (!data.length) {
    console.log("No entries in embedded dataset.");
    return;
  }

  await fs.ensureDir(OUTPUT_DIR);

  // Daily target: 2000 pages
  const totalTarget = 2000;

  for (let i = 0; i < totalTarget; i++) {
    const idx = i % data.length;
    const entry = { ...data[idx], id: `${data[idx].id}-${i + 1}` };

    const safeCity = entry.city.toLowerCase().replace(/\s/g, "-");
    const filename = path.join(
      OUTPUT_DIR,
      `hotel-${safeCity}-${entry.id}.html`
    );

    const html = renderPage(entry);
    await fs.writeFile(filename, html);
  }

  console.log(
    `✅ Generated ${totalTarget} pages from ${data.length} embedded entries.`
  );
}

// ==============================
// 6. RUN THIS FILE DAILY
// ==============================

generatePages().catch(console.error);
