// twentytwo-file-specials.js
//
// 1. Scans all HTML files in ./output
// 2. For each file:
//    - Injects a safe, SEO‑friendly promo‑code guidance block
//      (Booking.com + Skyscanner instructions)
//    - Does NOT inject fake / working coupon codes
// 3. Safe, compliant, and informative for visitors

const fs = require("fs-extra");
const path = require("path");

const OUTPUT_DIR = path.resolve("./output");

// 1. Inject promo‑code guidance block
function addPromoCodeGuidance(content, lang = "en") {
  const body = /<body[^>]*>([\s\S]*)<\/body>/i;
  if (!body.test(content)) return content;

  const title =
    lang === "en" ? "How to apply promo codes on Booking.com and Skyscanner"
    : lang === "es" ? "Cómo aplicar códigos promocionales en Booking.com y Skyscanner"
    : lang === "de" ? "So wenden Sie Promo‑Codes auf Booking.com und Skyscanner an"
    : "How to apply promo codes on Booking.com and Skyscanner";

  const listItems =
    lang === "en"
      ? `<li>On <strong>Booking.com</strong>: After selecting your hotel, look for “Do you have a promo code?” or “Travel coupon / Wallet” at checkout and paste the code there.</li>
<li>If you have a <strong>Booking.com Genius / Wallet coupon</strong>, just sign in and the discount is applied automatically.</li>
<li>On <strong>Skyscanner</strong>: After clicking “Book”, you are redirected to the airline or OTA; use their promo‑code field during checkout, not on Skyscanner itself.</li>`
      : lang === "es"
      ? `<li>En <strong>Booking.com</strong>: Después de elegir tu hotel, busca “¿Tienes un código promocional?” o “Cupón de viaje / Wallet” durante el pago y pega el código allí.</li>
<li>Si tienes un cupón <strong>Booking.com Genius / Wallet</strong>, solo inicia sesión y el descuento se aplica automáticamente.</li>
<li>En <strong>Skyscanner</strong>: Al hacer clic en “Reservar”, se te redirige a la aerolínea u OTA; usa su campo de promo‑code durante el pago, no en Skyscanner.</li>`
      : lang === "de"
      ? `<li>Auf <strong>Booking.com</strong>: Nach der Hotelwahl Suche nach „Haben Sie einen Promo‑Code?“ oder „Travel coupon / Wallet“ bei der Zahlung und füge den Code dort ein.</li>
<li>Bei einem <strong>Booking.com‑Genius‑/Wallet‑Coupon</strong> reicht das Einloggen, der Rabatt wird automatisch angewendet.</li>
<li>Auf <strong>Skyscanner</strong>: Nach dem Klick auf „Buchen“ wirst du zur Airline oder OTA weitergeleitet; nutze dort das Promo‑Code‑Feld während des Checkouts, nicht direkt auf Skyscanner.</li>`
      : `<li>On <strong>Booking.com</strong>: After selecting your hotel, look for “Do you have a promo code?” or “Travel coupon / Wallet” at checkout and paste the code there.</li>
<li>If you have a <strong>Booking.com Genius / Wallet coupon</strong>, just sign in and the discount is applied automatically.</li>
<li>On <strong>Skyscanner</strong>: After clicking “Book”, you are redirected to the airline or OTA; use their promo‑code field during checkout.</li>`;

  const guidanceBlock = `
<p class="mt-4"><strong>${title}</strong></p>
<ul>
  ${listItems}
</ul>
`;

  return content.replace(
    body,
    (whole, bodyInner) => {
      return `<body>\n${bodyInner}${guidanceBlock}\n</body>`;
    }
  );
}

// 2. Scan all HTML files
async function scanAndRewrite() {
  const allFiles = await fs.readdir(OUTPUT_DIR, { recursive: true });

  let patched = 0;

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    const fullPath = path.join(OUTPUT_DIR, file);

    if (ext !== ".html") continue;

    const content = await fs.readFile(fullPath, "utf8");

    const lang =
      file.includes("/es/") ? "es" :
      file.includes("/de/") ? "de" :
      file.includes("/fr/") ? "fr" :
      file.includes("/zh/") ? "zh" :
      "en";

    const updated = addPromoCodeGuidance(content, lang);

    await fs.writeFile(fullPath, updated);

    console.log(`✓ Added promo‑code guidance to ${file}`);
    patched++;
  }

  console.log(`✅ twentytwo-file-specials.js: added safe promo‑code guidance to ${patched} files.`);
}

scanAndRewrite().catch((err) => {
  console.error("twentytwo-file-specials.js error:", err.message);
});
