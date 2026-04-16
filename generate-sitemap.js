const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_URL = 'https://brightlane.github.io/booking.com/';
const PAGES = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && f !== '404.html')
  .map(f => ({
    url: SITE_URL + f,
    file: f,
  }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url>
    <loc>${p.url}</loc>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
console.log(`Wrote sitemap.xml with ${PAGES.length} URLs.`);
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_URL = 'https://brightlane.github.io/booking.com/';

const pages = fs.readdirSync(ROOT)
  .filter(file => file.endsWith('.html') && file !== '404.html')
  .map(file => `<url><loc>${SITE_URL}${file}</loc></url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml written');
