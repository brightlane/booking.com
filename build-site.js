const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SOURCES = [path.join(ROOT, 'output'), path.join(ROOT, 'output-2')];

function collectArticles() {
  const items = [];
  for (const dir of SOURCES) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.startsWith('hotels-in-') && file.endsWith('.html')) {
        items.push({ file, src: path.join(dir, file) });
      }
    }
  }
  return items;
}

function copyArticles(items) {
  for (const item of items) {
    fs.copyFileSync(item.src, path.join(ROOT, item.file));
  }
}

function writeIndex(items) {
  const links = items.map(item => {
    const label = item.file
      .replace(/^hotels-in-/, '')
      .replace(/\.html$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    return `<li><a href="./${item.file}">${label}</a></li>`;
  }).join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hotel Deals. — New Pages</title>
  <meta name="description" content="Hotel articles and destination pages." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://brightlane.github.io/booking.com/" />
</head>
<body>
  <main style="max-width:900px;margin:4rem auto;padding:1rem;">
    <h1>Hotel Deals.</h1>
    <ul>
      ${links}
    </ul>
  </main>
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
}

function ensureNoJekyll() {
  fs.writeFileSync(path.join(ROOT, '.nojekyll'), '', 'utf8');
}

function write404() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="0; url=https://brightlane.github.io/booking.com/" />
  <script>window.location.replace('https://brightlane.github.io/booking.com/');</script>
  <title>Redirecting</title>
</head>
<body>
  <p>Redirecting to <a href="https://brightlane.github.io/booking.com/">Home</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, '404.html'), html, 'utf8');
}

const items = collectArticles();
copyArticles(items);
writeIndex(items);
ensureNoJekyll();
write404();

console.log(`Published ${items.length} article pages.`);
