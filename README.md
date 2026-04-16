# Booking.com SEO Affiliate Site

Static affiliate site for Booking.com hotel pages, with automatic sitemap generation and Booking.com + Skyscanner tracking links.

## 🎯 Purpose

- Generate thousands of SEO‑friendly hotel pages (cities, categories, specials).  
- Serve a valid `sitemap.xml` so Google can index all pages.  
- Use **your** Booking.com affiliate ID (`aid=8132800`) and Skyscanner URL on every page for cookie and commission tracking.

## 📂 Key files

- `generate-site-files.js` – generates city hotel pages (e.g., `hotels-in-paris.html`).  
- `generate-site-and-sitemap.js` – generates per‑hotel `output/ht-*` pages and builds `sitemap.xml` in one step.  
- `sitemap.xml` – submits all static and generated URLs to Google Search Console.  
- `affiliates.js` – configures Booking.com / Skyscanner links.  
- `run-site-and-sitemap.sh` – bash script to regenerate everything.

## ⚙️ Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. If you use config files, place them in `./data/` (optional):

   - `master-2000-hotels.json`  
   - `hostels-europe.json`  

## 🚀 Regenerate pages + sitemap

Run once (from repo root):

```bash
rm -f sitemap.xml
rm -rf output/

node generate-site-files.js
node generate-site-and-sitemap.js
node append-new-pages-to-sitemap.js

git add .
git commit -m "Regenerate pages and sitemap.xml"
git push origin main
```

Or use the helper script:

```bash
./run-site-and-sitemap.sh
```

## 🗺️ Sitemap URL

After pushing, open:

```text
https://brightlane.github.io/booking.com/sitemap.xml
```

This file keeps:

- Your Booking.com affiliate URLs (`aid=8132800`)  
- Your Skyscanner affiliate URL  
- All static and generated hotel pages

## 🔍 Submit to Google

1. Go to Google Search Console.  
2. Add property: `https://brightlane.github.io/booking.com/`.  
3. Submit sitemap: `sitemap.xml`.

## 🤝 Affiliates

- Booking.com partner ID: `8132800` (used in all `aid=...` links).  
- Skyscanner offer ID: `offer_id=29465` with `aff_id=21885`.  

These IDs are embedded in:
- `sitemap.xml`  
- `generate-site-and-sitemap.js`  
- `affiliates.js`

## 📜 License

MIT 
