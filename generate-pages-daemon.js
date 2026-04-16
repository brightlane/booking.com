// generate-pages-daemon.js (minimal debug version)
const fs = require("fs-extra");
const path = require("path");

console.log("✅ Step 1: fs-extra loaded.");

const { BOOKING, pickBooking } = require("./affiliates.js");
console.log("✅ Step 2: affiliates.js loaded.");

const OUTPUT_DIR = path.resolve("./output");

console.log("✅ Step 3: OUTPUT_DIR =", OUTPUT_DIR);

fs.ensureDirSync(OUTPUT_DIR);
console.log("✅ Step 4: output directory created / ensured.");

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
}

function generateHotelPage() {
  const city = "TestCity";
  const near = "airport";
  const mod = "cheap";
  const lang = "en";

  const base = "hotel-in";
  const slug = slugify(`${base}-${city}-${near}-${mod}`);

  const filename = `test-${slug}-${lang}.html`;
  const fullPath = path.join(OUTPUT_DIR, filename);

  const bookingUrl = pickBooking();

  const content = `
<!DOCTYPE html>
<html lang="en">
<head><title>Test</title></head>
<body>
  <h1>Test page for ${city}</h1>
  <a href="${bookingUrl}" target="_blank">Booking.com</a>
</body>
</html>
  `;

  fs.writeFileSync(fullPath, content);
  console.log("✅ Wrote test file:", fullPath);
}

console.log("✅ Step 5: starting loop...");
let i = 0;
setInterval(() => {
  i++;
  console.log("✅ Loop tick", i);
  generateHotelPage();
}, 1000);
