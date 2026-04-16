const fs = require("fs");

// ============================================
// CONFIG
// ============================================

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

  cities: [
    { city: "Bangkok", country: "Thailand", slug: "bangkok" },
    { city: "Istanbul", country: "Turkey", slug: "istanbul" },
    { city: "London", country: "United Kingdom", slug: "london" },
    { city: "Paris", country: "France", slug: "paris" },
    { city: "Dubai", country: "United Arab Emirates", slug: "dubai" },
    { city: "New York City", country: "United States", slug: "new-york-city" },
    { city: "Tokyo", country: "Japan", slug: "tokyo" },
    { city: "Barcelona", country: "Spain", slug: "barcelona" },
    { city: "Rome", country: "Italy", slug: "rome" },
    { city: "Jerusalem", country: "Israel", slug: "jerusalem" },
    { city: "Cancun", country: "Mexico", slug: "cancun" },
    { city: "Punta Cana", country: "Dominican Republic", slug: "punta-cana" },
    { city: "Lourdes", country: "France", slug: "lourdes" },
    { city: "Fatima", country: "Portugal", slug: "fatima" },
    { city: "Santiago de Compostela", country: "Spain", slug: "santiago-de-compostela" },
    { city: "Delhi", country: "India", slug: "delhi" },
    { city: "Mumbai", country: "India", slug: "mumbai" },
    { city: "Shanghai", country: "China", slug: "shanghai" },
    { city: "Marrakech", country: "Morocco", slug: "marrakech" },
  ].map((c, i) => ({ ...c, id: i + 1 })),
};

// ============================================
// RENDER TEMPLATE FUNCTION (no backticks = no href syntax error)
// ============================================

function renderTemplate({ slug, title, description, body, relativeToRoot }) {
  // Build navigation links the safe way
  const navLinks = config.global_nav
    .map((link) => {
      const href = relativeToRoot + link.href;
      // Use normal JS string concat, not template literal
      return "<a href=\"" + href + "\">" + link.label + "</a>";
    })
    .join(" | ");

  const bookingLink =
    "<a href=\"" + config.booking_url + "\" rel=\"sponsored\" target=\"_blank\">Book Your Stay on Booking.com</a>";
  const skyLink =
    "<a href=\"" + config.skyscanner_url + "\" rel=\"sponsored\" target=\"_blank\">Compare Flights on Skyscanner</a>";

  const ctaBox = `
    <div class="cta-box">
      <p>${bookingLink}</p>
      <p>${skyLink}</p>
    </div>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://brightlane.github.io/booking.com/${slug === "index" ? "" : slug}.html">

  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://brightlane.github.io/booking.com/${slug === "index" ? "" : slug}.html">
  <meta property="og:type" content="website">

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

<h1>${title}</h1>

<p>${description}</p>

${ctaBox}

${body}

<footer>
  <p>Navigation: ${navLinks}</p>
</footer>

</body>
</html>`;
}

// ============================================
// GENERATE HUB PAGES
// ============================================

function generateHubs() {
  const hubs = [
    {
      slug: "index",
      title: "Where to Stay Worldwide | Book Hotels & Flights",
      description:
        "Find and book hotels in any city, all‑inclusive resorts, religious destinations, and the top 100 tourist cities worldwide. Use this guide to book on Booking.com and compare flights on Skyscanner.",
      body: `
<h2>Explore by theme</h2>
<ul>
  <li><a href="all-inclusive-resorts-worldwide.html">All‑inclusive resorts worldwide</a></li>
  <li><a href="religious-destinations-worldwide.html">Hotels in high‑religious‑destination cities</a></li>
  <li><a href="top-100-tourist-cities-hotels.html">Hotels in the top 100 tourist destinations</a></li>
</ul>

<h2>Example cities</h2>
<ul>
  <li><a href="hotels-in-bangkok.html">Hotels in Bangkok</a></li>
  <li><a href="hotels-in-istanbul.html">Hotels in Istanbul</a></li>
  <li><a href="hotels-in-london.html">Hotels in London</a></li>
  <li><a href="hotels-in-paris.html">Hotels in Paris</a></li>
  <li><a href="hotels-in-dubai.html">Hotels in Dubai</a></li>
  <li><a href="hotels-in-new-york-city.html">Hotels in New York City</a></li>
</ul>
      `,
    },
    {
      slug: "all-inclusive-resorts-worldwide",
      title: "All‑Inclusive Resorts Worldwide | Book Your Vacation",
      description:
        "Discover all‑inclusive resorts worldwide in Cancun, Punta Cana, Maldives, Bali, Costa Rica, and more. Use this guide to book your stay on Booking.com and compare flights on Skyscanner.",
      body: `
<h2>Example all‑inclusive city pages</h2>
<ul>
  <li><a href="hotels-in-cancun.html">All‑inclusive hotels in Cancun</a></li>
  <li><a href="hotels-in-punta-cana.html">All‑inclusive resorts in Punta Cana</a></li>
  <li><a href="hotels-in-bali.html">All‑inclusive retreat‑style hotels in Bali</a></li>
  <li><a href="hotels-in-costa-rica.html">All‑inclusive and eco‑resorts in Costa Rica</a></li>
</ul>
      `,
    },
    {
      slug: "religious-destinations-worldwide",
      title:
        "Hotels in High‑Religious‑Destination Cities | Pilgrimage & Spiritual Stays",
      description:
        "Find hotels in high‑religious‑destination cities like Jerusalem, Rome, Fatima, Lourdes, and Santiago de Compostela. Use this guide to book your stay on Booking.com and compare flights on Skyscanner.",
      body: `
<h2>Example religious‑destination city pages</h2>
<ul>
  <li><a href="hotels-in-jerusalem.html">Hotels in Jerusalem</a></li>
  <li><a href="hotels-in-rome.html">Hotels in Rome</a></li>
  <li><a href="hotels-in-fatima.html">Hotels in Fatima</a></li>
  <li><a href="hotels-in-lourdes.html">Hotels in Lourdes</a></li>
  <li><a href="hotels-in-santiago-de-compostela.html">Hotels in Santiago de Compostela</a></li>
</ul>
      `,
    },
    {
      slug: "top-100-tourist-cities-hotels",
      title:
        "Hotels in the Top 100 Tourist Destinations | Most‑Visited Cities",
      description:
        "Book hotels in the top 100 tourist cities worldwide like Bangkok, Istanbul, London, Paris, Dubai, and New York City. Use this guide to book on Booking.com and compare flights on Skyscanner.",
      body: `
<h2>Example top tourist cities</h2>
<ul>
  <li><a href="hotels-in-bangkok.html">Hotels in Bangkok</a></li>
  <li><a href="hotels-in-istanbul.html">Hotels in Istanbul</a></li>
  <li><a href="hotels-in-london.html">Hotels in London</a></li>
  <li><a href="hotels-in-paris.html">Hotels in Paris</a></li>
  <li><a href="hotels-in-dubai.html">Hotels in Dubai</a></li>
  <li><a href="hotels-in-new-york-city.html">Hotels in New York City</a></li>
</ul>
      `,
    },
  ];

  hubs.forEach((hub) => {
    const html = renderTemplate({
      slug: hub.slug,
      title: hub.title,
      description: hub.description,
      body: hub.body,
      relativeToRoot: "./",
    });

    const outFile =
      hub.slug === "index" ? "index.html" : `${hub.slug}.html`;
    fs.writeFileSync(outFile, html);
    console.log("✅ Created hub:", outFile);
  });
}

// ============================================
// GENERATE CITY PAGES
// ============================================

function generateCityPages() {
  config.cities.forEach((city) => {
    const slug = `hotels-in-${city.slug}`;
    const title = `Hotels in ${city.city} | Book Your Stay Worldwide`;
    const description = `Find and book hotels in ${city.city}, ${city.country} on Booking.com. Use this page to compare hotels and flights on Skyscanner.`;

    const body = `
<h2>Explore by theme</h2>
<ul>
  <li><a href="index.html">Main hotel booking guide</a></li>
  <li><a href="all-inclusive-resorts-worldwide.html">All‑inclusive resorts worldwide</a></li>
  <li><a href="religious-destinations-worldwide.html">Hotels in religious destinations</a></li>
  <li><a href="top-100-tourist-cities-hotels.html">Hotels in top 100 tourist cities</a></li>
</ul>

<h2>Example related cities</h2>
<ul>
  <li><a href="hotels-in-bangkok.html">Hotels in Bangkok</a></li>
  <li><a href="hotels-in-istanbul.html">Hotels in Istanbul</a></li>
  <li><a href="hotels-in-london.html">Hotels in London</a></li>
  <li><a href="hotels-in-paris.html">Hotels in Paris</a></li>
  <li><a href="hotels-in-dubai.html">Hotels in Dubai</a></li>
  <li><a href="hotels-in-new-york-city.html">Hotels in New York City</a></li>
</ul>

<h2>About this page</h2>
<p>
This is an independent guide to hotels in <strong>${city.city}</strong>, 
${city.country}. It uses affiliate links to <strong>Booking.com</strong> 
and <strong>Skyscanner</strong>. We earn a small commission if you book via these links.
</p>
    `;

    const html = renderTemplate({
      slug: slug,
      title: title,
      description: description,
      body: body,
      relativeToRoot: "./",
    });

    const outFile = `${slug}.html`;
    fs.writeFileSync(outFile, html);
    console.log("✅ Created city page:", outFile);
  });
}

// ============================================
// RUN ENGINE
// ============================================

function main() {
  console.log("🚀 Generating entire booking.com site from one file...");
  generateHubs();
  generateCityPages();
  console.log("✅ Site generated.");
}

main();
