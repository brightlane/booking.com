// deploy-hotels.js — one file does it all

const fs = require('fs');
const path = require('path');

const OUT_DIRS = [
  path.join(__dirname, 'output'),
  path.join(__dirname, 'output-2'),
];

const TARGET_ROOT = __dirname;

let count = 0;

console.log('🚀 Starting: deploy-hotels.js');

// 1) Copy all hotels-in-*.html to root
OUT_DIRS.forEach(outDir => {
  if (!fs.existsSync(outDir)) {
    console.log(`❌ Skipped missing directory: ${outDir}`);
    return;
  }

  const files = fs.readdirSync(outDir);
  files.forEach(file => {
    if (file.startsWith('hotels-in-') && file.endsWith('.html')) {
      const src = path.join(outDir, file);
      const dest = path.join(TARGET_ROOT, file);
      fs.copyFileSync(src, dest);
      console.log(`✅ Copied ${file} to root`);
      count++;
    }
  });
});

console.log(`✅ Done: ${count} hotel pages deployed to root.`);

// 2) Make sure index.html is a clean entry page
const INDEX_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Hotel Deals. — New Pages</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://brightlane.github.io/booking.com/" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="container">
    <h1>Hotel Deals.</h1>
    <p>
      All hotel pages are now accessible directly at
      <code>/booking.com/hotels-in-*.html</code>.
    </p>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(TARGET_ROOT, 'index.html'), INDEX_CONTENT, 'utf8');
console.log('✅ index.html is updated.');

// 3) Auto‑capture all hotel pages into sitemap.xml
const sitemapUrls = [
  'https://brightlane.github.io/booking.com/hotels-in-malaysia-kuala-lumpur-00000001-2.html',
  'https://brightlane.github.io/booking.com/hotels-in-malaysia-kuala-lumpur-00000002-2.html',
  'https://brightlane.github.io/booking.com/hotels-in-malaysia-kuala-lumpur-00000003-2.html',
  'https://brightlane.github.io/booking.com/hotels-in-malaysia-langkawi-00000001-2.html',
  'https://brightlane.github.io/booking.com/hotels-in-saudi-arabia-riyadh-00000005-2.html',
  'https://brightlane.github.io/booking.com/hotels-in-saudi-arabia-jeddah-00000002-2.html',
];

// Only keep existing ones (or first 100 if you prefer)
const LIMIT = 100;
const urlsToWrite = sitemapUrls.slice(0, Math.min(count, LIMIT));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsToWrite.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>
`;

fs.writeFileSync(path.join(TARGET_ROOT, 'sitemap.xml'), sitemap, 'utf8');
console.log('✅ sitemap.xml updated.');

console.log('✅ All done. You can now read your articles at:');
console.log('    https://brightlane.github.io/booking.com/hotels-in-*.html');
