const fs = require('fs');
const path = require('path');

const OUT_DIRS = [
  path.join(__dirname, 'output'),
  path.join(__dirname, 'output-2'),
];

const INDEX_FILE = path.join(__dirname, 'index.html');
const SITEMAP_FILE = path.join(__dirname, 'sitemap.xml');

const HOST = 'https://brightlane.github.io/booking.com';

let links = [];
let sitemapUrls = [];

OUT_DIRS.forEach(outDir => {
  if (!fs.existsSync(outDir)) return;

  const files = fs.readdirSync(outDir);
  files.forEach(file => {
    if (file.startsWith('hotels-in-') && file.endsWith('.html')) {
      const slug = file.replace(/\.html$/, '');
      const href = `/booking.com/${slug}.html`;
      links.push(`<li><a href="${href}">${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a></li>`);
      sitemapUrls.push(`${HOST}/${slug}.html`);
    }
  });
});

let indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="google-site-verification" content="eWVDN3vbam9nnaZQu7wAQKyfmJJdM7zjI80l4DGeUrQ" />
  <meta name="msvalidate.01" content="574044E39556B8B8DAAF1D1F233C87B0" />
  <meta charset="utf-8" />
  <title>Hotel Deals. — New Pages</title>
  <meta name="description" content="Newly generated hotel pages for Booking.com (aid=8132800)." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="container">
    <h1>Hotel Deals. — New Pages</h1>
    <ul class="index-links">
      :::LINKS:::
    </ul>
  </div>
</body>
</html>
`.replace(':::LINKS:::', links.slice(-1000).join('\n'));

fs.writeFileSync(INDEX_FILE, indexContent, 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>
`;

fs.writeFileSync(SITEMAP_FILE, sitemap, 'utf8');

console.log(`✅ Updated index.html (latest 1000 links) and sitemap.xml (${sitemapUrls.length} URLs).`);
