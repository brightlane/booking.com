const fs = require("fs");
const path = require("path");

// === 1. CONFIG (your affiliate URLs + nav) ===

const config = {
  booking_url: "https://www.booking.com/index.html?aid=1858279",
  skyscanner_url:
    "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",

  global_nav: [
    { label: "Main hotel booking guide", href: "/booking.com/" },
    {
      label: "All‑inclusive resorts worldwide",
      href: "/booking.com/all-inclusive-resorts-worldwide.html",
    },
    {
      label: "Hotels in religious destinations",
      href: "/booking.com/religious-destinations-worldwide.html",
    },
    {
      label: "Top 100 tourist cities",
      href: "/booking.com/top-100-tourist-cities-hotels.html",
    },
  ],

  max_pages_per_run: 2000,

  // Your data (can be loaded from JSON files)
  cities: [
    { city: "Bangkok", country: "Thailand", slug: "bangkok", type: "tourist" },
    { city: "Istanbul", country: "Turkey", slug: "istanbul", type: "tourist" },
    { city: "London", country: "United Kingdom", slug: "london", type: "tourist" },
    { city: "Paris", country: "France", slug: "paris", type: "tourist" },
    { city: "Dubai", country: "United Arab Emirates", slug: "dubai", type: "tourist" },
    { city: "New York City", country: "United States", slug: "new-york-city", type: "tourist" },
    { city: "Jerusalem", country: "Israel", slug: "jerusalem", type: "religious" },
    { city: "Rome", country: "Italy", slug: "rome", type: "religious" },
    { city: "Fatima", country: "Portugal", slug: "fatima", type: "religious" },
    { city: "Cancun", country: "Mexico", slug: "cancun", type: "all_inclusive" },
    { city: "Punta Cana", country: "Dominican Republic", slug: "punta-cana", type: "all_inclusive" },
  ],

  // Theme hubs (fixed files)
  themes: [
    {
      slug: "index",
      title: "Where to Stay Worldwide | Book Hotels & Flights",
      description:
        "Find and book hotels in any city, all‑inclusive resorts, religious destinations, and the top 100 tourist cities worldwide. Use this guide to book on Booking.com and compare flights on Skyscanner.",
      type: "hub",
    },
    {
      slug: "all-inclusive-resorts-worldwide",
      title: "All‑Inclusive Resorts Worldwide | Book Your Vacation",
      description:
        "Discover all‑inclusive resorts worldwide in Cancún, Punta Cana, Maldives, Bali, and more. Use this guide to book your stay on Booking.com and compare flights on Skyscanner.",
      type: "hub",
    },
    {
      slug: "religious-destinations-worldwide",
      title:
        "Hotels in High‑Religious‑Destination Cities | Pilgrimage & Spiritual Stays",
      description:
        "Find hotels in high‑religious‑destination cities like Jerusalem, Rome, Fatima, Lourdes, and Santiago de Compostela. Use this guide to book your stay on Booking.com and compare flights on Skyscanner.",
      type: "hub",
    },
    {
      slug: "top-100-tourist-cities-hotels",
      title:
        "Hotels in the Top 100 Tourist Destinations | Most‑Visited Cities",
      description:
        "Book hotels in the top 100 tourist cities worldwide like Bangkok, Istanbul, London, Paris, Dubai, and New York City on Booking.com.",
      type: "hub",
    },
  ],
};

// === 2. MASTER TEMPLATE (shared HTML structure) ===

function renderTemplate({ slug, title, description, bodyContent, relativeToRoot }) {
  const links = config.global_nav
    .map((link) => {
      const href = relativeToRoot + link.href;
      return `<a href="${href}">${link.label}</a>`;
    })
    .join(" | ");

  const bookingLink = `<a href="${config.booking_url}" rel="sponsored" target="_blank">Book Your Stay on Booking.com</a>`;
  const skyscannerLink = `<a href="${config.skyscanner_url}" rel="sponsored" target="_blank">Compare Flights on Skyscanner</a>`;

  const ctaBox = `
    <div class="cta-box">
      <p>${bookingLink}</p>
      <p>${skyscannerLink}</p>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://brightlane.github.io/booking.com/${slug === "index" ? "" : slug}.html">

  <!-- Open Graph / Social -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://brightlane.github.io/booking.com/${slug === "index" ? "" : slug}.html">
  <meta property="og:type" content="website">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title}",
    "url": "https://brightlane.github.io/booking.com/${slug === "index" ? "" : slug}.html"
  }
  </script>

  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    h2 {
      margin-top: 30px;
    }
    .cta-box {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      margin: 30px 0;
    }
    .cta-link {
      display: inline-block;
      padding: 12px 24px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 0 10px;
    }
    .cta-link:hover {
      background-color: #0056b3;
    }
    footer {
      margin-top: 40px;
      padding-top: 10px;
      border-top: 1px solid #eee;
      font-size: 0.9em;
      text-align: center;
    }
    footer a {
      margin: 0 8px;
    }
  </style>
</head>
<body>

<h1>${title.replace(" | ", "</h1><p><strong>", 1)}</strong></p>

<p>${description}</p>

${ctaBox}

${bodyContent}

<footer>
  <p>Global navigation: ${links}</p>
</footer>

</body>
</html>`;
}

// === 3. GENERATE HUB PAGES ===

function generateHubs() {
  config.themes.forEach((theme) => {
    let body = "";

    const rel = theme.slug === "index" ? "" : "../";

    switch (theme.slug) {
      case "index":
        body = `
<h2>Explore by theme</h2>
<ul>
  <li><a href="${rel}all-inclusive-resorts-worldwide.html">All‑inclusive resorts worldwide</a></li>
  <li><a href="${rel}religious-destinations-worldwide.html">Hotels in high‑religious‑destination cities</a></li>
  <li><a href="${rel}top-100-tourist-cities-hotels.html">Hotels in the top 100 tourist destinations</a></li>
</ul>

<h2>Example cities</h2>
<ul>
  <li><a href="${rel}hotels-in-bangkok.html">Hotels in Bangkok</a></li>
  <li><a href="${rel}hotels-in-istanbul.html">Hotels in Istanbul</a></li>
  <li><a href="${rel}hotels-in-london.html">Hotels in London</a></li>
  <li><a href="${rel}hotels-in-paris.html">Hotels in Paris</a></li>
  <li><a href="${rel}hotels-in-dubai.html">Hotels in Dubai</a></li>
  <li><a href="${rel}hotels-in-new-york-city.html">Hotels in New York City</a></li>
</ul>
`;
        break;

      case "all-inclusive-resorts-worldwide":
        body = `
<h2>Example all‑inclusive city pages</h2>
<ul>
  <li><a href="${rel}hotels-in-cancun.html">All‑inclusive hotels in Cancún</a></li>
  <li><a href="${rel}hotels-in-punta-cana.html">All‑inclusive resorts in Punta Cana</a></li>
  <li><a href="${rel}hotels-in-bali.html">All‑inclusive retreat‑style hotels in Bali</a></li>
  <li><a href="${rel}hotels-in-costa-rica.html">All‑inclusive and eco‑resorts in Costa Rica</a></li>
</ul>
`;
        break;

      case "religious-destinations-worldwide":
        body = `
<h2>Example religious‑destination city pages</h2>
<ul>
  <li><a href="${rel}hotels-in-jerusalem.html">Hotels in Jerusalem</a></li>
  <li><a href="${rel}hotels-in-rome.html">Hotels in Rome</a></li>
  <li><a href="${rel}hotels-in-fatima.html">Hotels in Fatima</a></li>
  <li><a href="${rel}hotels-in-lourdes.html">Hotels in Lourdes</a></li>
  <li><a href="${rel}hotels-in-santiago-de-compostela.html">Hotels in Santiago de Compostela</a></li>
</ul>
`;
        break;

      case "top-100-tourist-cities-hotels":
        body = `
<h2>Hotels in top tourist cities</h2>
<p>Book hotels in major cities like Bangkok, Istanbul, London, Paris, Dubai, and New York City on Booking.com.</p>
<ul>
  <li><a href="${rel}hotels-in-bangkok.html">Hotels in Bangkok</a></li>
  <li><a href="${rel}hotels-in-istanbul.html">Hotels in Istanbul</a></li>
  <li><a href="${rel}hotels-in-london.html">Hotels in London</a></li>
  <li><a href="${rel}hotels-in-paris.html">Hotels in Paris</a></li>
  <li><a href="${rel}hotels-in-dubai.html">Hotels in Dubai</a></li>
  <li><a href="${rel}hotels-in-new-york-city.html">Hotels in New York City</a></li>
</ul>
`;
        break;
    }

    body += `
<h2>About this page</h2>
<p>
This is an independent travel guide to ${theme.slug.replace(/-/g, " ").replace("hotels in the ", "").replace("resorts worldwide", "and all‑inclusive resorts")} worldwide. 
It uses affiliate links to <strong>Booking.com</strong> and <strong>Skyscanner</strong> to help you find and compare options. 
We earn a small commission if you book via these links, at no extra cost to you.
</p>
`;

    const html = renderTemplate({
      slug: theme.slug === "index" ? "" : theme.slug,
      title: theme.title,
      description: theme.description,
      bodyContent: body,
      relativeToRoot: rel,
    });

    const p = theme.slug === "index" ? "." : theme.slug;
    const outFile = path.join("pages", p + ".html");
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
    console.log("✅ Created hub:", outFile);
  });
}

// === 4. GENERATE CITY PAGES (hotels-in-[city].html) ===

function generateCityPages() {
  config.cities.forEach((city, i) => {
    if (i >= config.max_pages_per_run) return;

    const slug = `hotels-in-${city.slug}`;
    const title = `Hotels in ${city.city} | Book Your Stay Worldwide`;
    const description = `Find and book hotels in ${city.city}, ${city.country} on Booking.com. Use this page to book your stay and compare flights on Skyscanner.`;

    const rel = "../";

    const body = `
<h2>Explore other themes</h2>
<ul>
  <li><a href="${rel}index.html">Main hotel booking guide</a></li>
  <li><a href="${rel}all-inclusive-resorts-worldwide.html">All‑inclusive resorts worldwide</a></li>
  <li><a href="${rel}religious-destinations-worldwide.html">Hotels in religious destinations</a></li>
  <li><a href="${rel}top-100-tourist-cities-hotels.html">Hotels in the top 100 tourist cities</a></li>
</ul>

<h2>Example related cities</h2>
<p>See hotels in nearby or similar destinations:</p>
<ul>
  <li><a href="${rel}hotels-in-bangkok.html">Hotels in Bangkok</a></li>
  <li><a href="${rel}hotels-in-istanbul.html">Hotels in Istanbul</a></li>
  <li><a href="${rel}hotels-in-paris.html">Hotels in Paris</a></li>
  <li><a href="${rel}hotels-in-dubai.html">Hotels in Dubai</a></li>
</ul>

<h2>About this page</h2>
<p>
This is an independent travel guide to hotels in <strong>${city.city}</strong>, ${city.country}. 
It uses affiliate links to <strong>Booking.com</strong> and <strong>Skyscanner</strong> to help you find and compare hotels. 
We earn a small commission if you book via these links, at no extra cost to you.
</p>
`;

    const html = renderTemplate({
      slug: slug,
      title: title,
      description: description,
      bodyContent: body,
      relativeToRoot: rel,
    });

    const outFile = path.join("pages", slug + ".html");
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
    console.log("✅ Created city page:", outFile);
  });
}

// === 5. RUN THE ENGINE ===

function main() {
  console.log("🚀 Generating entire booking.com site from one file...");

  if (!fs.existsSync("pages")) {
    fs.mkdirSync("pages", { recursive: true });
  }

  generateHubs();
  generateCityPages();

  console.log("✅ Entire site generated. Run this script once per day for 2,000 pages/day.");
}

main();
