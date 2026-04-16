const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const BOOKING = {
  HOME: 'https://www.booking.com/index.html?aid=1858279',
  APARTMENTS: 'https://www.booking.com/apartments/index.html?aid=1858279',
  RESORTS: 'https://www.booking.com/resorts/index.html?aid=1858279',
  VILLAS: 'https://www.booking.com/villas/index.html?aid=1858279',
  BNB: 'https://www.booking.com/bed-and-breakfast/index.html?aid=1858279',
  GUESTHOUSES: 'https://www.booking.com/guest-house/index.html?aid=1858279'
};

const SKY = 'https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885';

const pages = [
  { file: 'hotels-in-london.html', city: 'London' },
  { file: 'hotels-in-paris.html', city: 'Paris' },
  { file: 'hotels-in-rome.html', city: 'Rome' },
  { file: 'hotels-in-barcelona.html', city: 'Barcelona' },
  { file: 'hotels-in-madrid.html', city: 'Madrid' },
  { file: 'hotels-in-new-york-city.html', city: 'New York City' },
  { file: 'hotels-in-tokyo.html', city: 'Tokyo' },
  { file: 'hotels-in-singapore-singapore-00000004-2.html', city: 'Singapore' }
];

function header() {
  return `
<header style="padding:18px 0 12px;border-bottom:1px solid #e5e7eb;margin-bottom:20px;background:#fff">
  <div style="max-width:1100px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">
    <a href="index.html" style="text-decoration:none;color:#111;font-weight:800;font-size:20px">Hotel Deals</a>
    <nav style="display:flex;gap:14px;flex-wrap:wrap;font-size:14px">
      <a href="${BOOKING.HOME}" target="_blank" rel="nofollow sponsored noopener">Booking</a>
      <a href="${BOOKING.APARTMENTS}" target="_blank" rel="nofollow sponsored noopener">Apartments</a>
      <a href="${BOOKING.RESORTS}" target="_blank" rel="nofollow sponsored noopener">Resorts</a>
      <a href="${BOOKING.VILLAS}" target="_blank" rel="nofollow sponsored noopener">Villas</a>
      <a href="${BOOKING.BNB}" target="_blank" rel="nofollow sponsored noopener">B&amp;B</a>
      <a href="${BOOKING.GUESTHOUSES}" target="_blank" rel="nofollow sponsored noopener">Guesthouses</a>
    </nav>
  </div>
</header>`;
}

function indexPage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hotel Deals and Booking Guides</title>
  <meta name="description" content="Save money and compare live hotel deals.">
  <style>
    body{font-family:Arial,sans-serif;max-width:1100px;margin:0 auto;padding:0 0 40px;line-height:1.5;background:#f8fafc;color:#111}
    main{padding:0 24px}
    .promo{background:#fff7d6;border:1px solid #f1d36b;border-radius:16px;padding:16px 18px;margin:18px 0 24px}
    .promo strong{display:block;font-size:1.05rem;margin-bottom:6px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
    .card{display:block;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:18px;text-decoration:none;color:inherit;box-shadow:0 1px 2px rgba(0,0,0,.04);transition:.15s}
    .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
    .card h2{margin:0 0 8px;font-size:1.2rem}
    .btn{display:inline-block;margin-top:10px;background:#0b63f6;color:#fff;padding:10px 14px;border-radius:10px;font-weight:700}
    .links{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:20px}
    .links a{display:block;padding:12px 14px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;text-decoration:none;color:#111}
    .note{margin-top:20px;color:#666;font-size:.95rem}
  </style>
</head>
<body>
  ${header()}
  <main>
    <h1>Save money on hotel stays</h1>
    <p>Click any headline to open a Booking.com deal page and compare live prices fast.</p>

    <div class="promo">
      <strong>Promo tip: compare live rates first</strong>
      Use the right landing page below to check availability, compare prices, and save money.
    </div>

    <div class="grid">
      <a class="card" href="${BOOKING.HOME}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Home page</h2>
        <p>Start with the main Booking.com search page.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.APARTMENTS}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Apartments</h2>
        <p>Find apartment stays for longer trips and families.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.RESORTS}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Resorts</h2>
        <p>Browse resort options with easy booking flow.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.VILLAS}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Villas</h2>
        <p>Explore private villa stays for group and luxury trips.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.BNB}" target="_blank" rel="nofollow sponsored noopener">
        <h2>B&amp;B</h2>
        <p>Compare cozy bed and breakfast options.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.GUESTHOUSES}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Guesthouses</h2>
        <p>See guesthouse listings with simple pricing.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${SKY}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Flights with Skyscanner</h2>
        <p>Check flight deals before you finalize the trip.</p>
        <span class="btn">Search flights</span>
      </a>
    </div>

    <div class="links">
      ${pages.map(p => `<a href="${p.file}">${p.file.replace('.html','').replace(/-/g,' ')}</a>`).join('\n      ')}
    </div>
  </main>
  <script defer src="affiliate-check-and-exit-pop.js"></script>
</body>
</html>`;
}

function cityPage(city, file) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hotels in ${city}</title>
  <meta name="description" content="Save money and compare live hotel deals in ${city}.">
  <style>
    body{font-family:Arial,sans-serif;max-width:1100px;margin:0 auto;padding:0 0 40px;line-height:1.5;background:#f8fafc;color:#111}
    main{padding:0 24px}
    .promo{background:#fff7d6;border:1px solid #f1d36b;border-radius:16px;padding:16px 18px;margin:18px 0 24px}
    .promo strong{display:block;font-size:1.05rem;margin-bottom:6px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
    .card{display:block;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:18px;text-decoration:none;color:inherit;box-shadow:0 1px 2px rgba(0,0,0,.04);transition:.15s}
    .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
    .card h2{margin:0 0 8px;font-size:1.2rem}
    .btn{display:inline-block;margin-top:10px;background:#0b63f6;color:#fff;padding:10px 14px;border-radius:10px;font-weight:700}
    .links{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-top:20px}
    .links a{display:block;padding:12px 14px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;text-decoration:none;color:#111}
  </style>
</head>
<body>
  ${header()}
  <main>
    <h1>Save money in ${city}</h1>
    <p>Check live hotel deals and compare prices before you book.</p>

    <div class="promo">
      <strong>Promo tip: compare live rates first</strong>
      Use the right landing page below to check availability, compare prices, and save money on your trip to ${city}.
    </div>

    <div class="grid">
      <a class="card" href="${BOOKING.HOME}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Book ${city}</h2>
        <p>Open the main Booking.com page for ${city} travel planning.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.APARTMENTS}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Apartments</h2>
        <p>Find apartment stays for longer visits.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.RESORTS}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Resorts</h2>
        <p>Compare resort stays and package-style options.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.VILLAS}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Villas</h2>
        <p>Browse private villa options for groups and families.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.BNB}" target="_blank" rel="nofollow sponsored noopener">
        <h2>B&amp;B</h2>
        <p>Find smaller stays with local charm.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${BOOKING.GUESTHOUSES}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Guesthouses</h2>
        <p>See budget-friendly guesthouse deals.</p>
        <span class="btn">Check prices</span>
      </a>
      <a class="card" href="${SKY}" target="_blank" rel="nofollow sponsored noopener">
        <h2>Flights with Skyscanner</h2>
        <p>Check flight deals before you finalize the trip.</p>
        <span class="btn">Search flights</span>
      </a>
    </div>

    <div class="links">
      <a href="index.html">Back to home</a>
      ${pages.filter(p => p.file !== file).map(p => `<a href="${p.file}">${p.file.replace('.html','').replace(/-/g,' ')}</a>`).join('\n      ')}
    </div>
  </main>
  <script defer src="affiliate-check-and-exit-pop.js"></script>
</body>
</html>`;
}

fs.writeFileSync(path.join(ROOT, 'index.html'), indexPage(), 'utf8');
for (const p of pages) fs.writeFileSync(path.join(ROOT, p.file), cityPage(p.city, p.file), 'utf8');

console.log(`Built ${pages.length + 1} pages.`);
