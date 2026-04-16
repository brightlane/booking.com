// deploy.js — make hotels-in-*.html visible under /booking.com/

const fs = require('fs');
const path = require('path');

const OUT_DIRS = [
  path.join(__dirname, 'output'),
  path.join(__dirname, 'output-2'),
];

const TARGET_ROOT = __dirname; // repo root

let count = 0;

OUT_DIRS.forEach(outDir => {
  if (!fs.existsSync(outDir)) return;

  const files = fs.readdirSync(outDir);
  files.forEach(file => {
    if (file.startsWith('hotels-in-') && file.endsWith('.html')) {
      const src = path.join(outDir, file);
      const dest = path.join(TARGET_ROOT, file);
      fs.copyFileSync(src, dest);
      console.log(`✅ Copied ${file} to root for GitHub Pages`);
      count++;
    }
  });
});

console.log(`✅ Done: ${count} hotel pages copied to root.`);

// Optional: re‑generate index.html that just points to /
const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Hotel Deals. — New Pages</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index, follow" />
</head>
<body>
  <div style="max-width:800px;margin:4rem auto;text-align:center">
    <h1>Hotel Deals.</h1>
    <p>Now all hotel pages are visible at <code>/booking.com/hotels-in-*.html</code>.</p>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(TARGET_ROOT, 'index.html'), indexContent, 'utf8');
console.log(`✅ Updated index.html.`);
