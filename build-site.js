const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_URL = 'https://brightlane.github.io/booking.com/';

const hotels = [
  'london',
  'paris',
  'rome',
  'barcelona',
  'madrid'
];

function makePage(city) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hotels in ${city}</title>
  <meta name="description" content="Find hotels in ${city}.">
</head>
<body>
  <main>
    <h1>Hotels in ${city}</h1>
    <p>Sample generated page for ${city}.</p>
    <a href="index.html">Home</a>
  </main>
</body>
</html>`;
}

function makeIndex() {
  const links = hotels.map(city => `<li><a href="hotels-in-${city}.html">Hotels in ${city}</a></li>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Booking.com Pages</title>
  <meta name="description" content="Generated hotel pages.">
</head>
<body>
  <main>
    <h1>Booking.com Pages</h1>
    <ul>
      ${links}
    </ul>
  </main>
</body>
</html>`;
}

fs.writeFileSync(path.join(ROOT, 'index.html'), makeIndex(), 'utf8');

for (const city of hotels) {
  fs.writeFileSync(path.join(ROOT, `hotels-in-${city}.html`), makePage(city), 'utf8');
}

fs.writeFileSync(path.join(ROOT, '404.html'), `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Not Found</title></head>
<body><h1>Page not found</h1></body>
</html>`, 'utf8');

const pages = fs.readdirSync(ROOT)
  .filter(file => file.endsWith('.html') && file !== '404.html')
  .map(file => `<url><loc>${SITE_URL}${file}</loc></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

console.log('Generated site pages and sitemap.xml');
