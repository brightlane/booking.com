const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT_DIRS = [
  path.join(ROOT, 'output'),
  path.join(ROOT, 'output-2'),
];

function readHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html') && f.startsWith('hotels-in-'))
    .map(f => ({
      name: f,
      src: path.join(dir, f),
      dest: path.join(ROOT, f),
    }));
}

function copyArticles() {
  const files = OUT_DIRS.flatMap(readHtmlFiles);
  files.forEach(file => {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.name}`);
  });
  return files;
}

function buildIndex(files) {
  const items = files
    .map(f => {
      const label = f.name
        .replace(/^hotels-in-/, '')
        .replace(/\.html$/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      return `<li><a href="./${f.name}">${label}</a></li>`;
    })
    .join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hotel Deals. — New Pages</title>
  <meta name="description" content="Hotel articles and destination pages." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://brightlane.github.io/booking.com/" />
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <main class="container">
    <h1>Hotel Deals.</h1>
    <p>Choose an article below.</p>
    <ul>
      ${items}
    </ul>
  </main>
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
  console.log('Wrote index.html');
}

function buildNoJekyll() {
  fs.writeFileSync(path.join(ROOT, '.nojekyll'), '', 'utf8');
  console.log('Wrote .nojekyll');
}

function build404() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0; url=https://brightlane.github.io/booking.com/" />
  <script>
    window.location.replace('https://brightlane.github.io/booking.com/');
  </script>
</head>
<body>
  <p>Redirecting to <a href="https://brightlane.github.io/booking.com/">Home</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, '404.html'), html, 'utf8');
  console.log('Wrote 404.html');
}

const copied = copyArticles();
buildIndex(copied);
buildNoJekyll();
build404();

console.log(`Done. ${copied.length} articles published to repo root.`);
