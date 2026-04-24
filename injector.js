#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const AID = '8132800';

const BOOKING_HOST = 'booking.com';

const EXCLUDE = new Set(['node_modules', '.git', 'output']);

// -----------------------------
// WALK FILES
// -----------------------------
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE.has(entry.name)) continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, files);
    } else if (full.endsWith('.html') || full.endsWith('.htm')) {
      files.push(full);
    }
  }
  return files;
}

// -----------------------------
// AFFILIATE INJECTION (SAFE)
// -----------------------------
function injectAffiliate(url) {
  try {
    const u = new URL(url);

    if (u.hostname.includes(BOOKING_HOST)) {
      u.searchParams.set('aid', AID);
      return u.toString();
    }
  } catch {}

  return url;
}

// -----------------------------
// SMART CITY SEARCH BUILDER
// -----------------------------
function buildSearchLink(text) {
  const clean = text.trim();

  // crude but effective global detection (cities/countries appear in text)
  if (clean.length < 3) return null;

  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(clean)}&aid=${AID}`;
}

// -----------------------------
// SEO META INJECTION
// -----------------------------
function injectSEO(html, fileName) {
  if (html.includes('name="description"')) return html;

  const title = fileName
    .replace('.html', '')
    .replace(/[-_]/g, ' ')
    .replace(ROOT, '');

  const meta = `
<meta name="description" content="Find hotels, apartments, and resorts in ${title}. Compare prices and book your stay.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${fileName}">
`;

  return html.replace(/<head>/i, `<head>${meta}`);
}

// -----------------------------
// LINK INJECTION ENGINE
// -----------------------------
function processLinks(html) {
  return html.replace(
    /<a\b[^>]*href\s*=\s*([\"'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi,
    (match, q, href, text) => {

      const cleanText = text.replace(/<[^>]+>/g, '').trim();

      // 1. Already Booking link → inject affiliate
      if (href.includes(BOOKING_HOST)) {
        const updated = injectAffiliate(href);

        return `<a href="${updated}" target="_blank" rel="nofollow sponsored noopener noreferrer">${text}</a>`;
      }

      // 2. Detect travel intent in anchor text
      const lower = cleanText.toLowerCase();

      const isTravelIntent =
        lower.includes('hotel') ||
        lower.includes('resort') ||
        lower.includes('apart') ||
        lower.includes('stay') ||
        lower.includes('visit');

      if (isTravelIntent) {
        const link = buildSearchLink(cleanText);

        if (link) {
          return `<a href="${link}" target="_blank" rel="nofollow sponsored noopener noreferrer">${text}</a>`;
        }
      }

      return match;
    }
  );
}

// -----------------------------
// MAIN PROCESSOR
// -----------------------------
const files = walk(ROOT);

let changed = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');

  let updated = original;

  updated = processLinks(updated);
  updated = injectSEO(updated, file);

  if (updated !== original) {
    fs.writeFileSync(file, updated, 'utf8');
    changed.push(file);
  }
}

// -----------------------------
// REPORT
// -----------------------------
const report = {
  affiliate_id: AID,
  files_processed: files.length,
  files_changed: changed.length,
  changed_files: changed
};

console.log(JSON.stringify(report, null, 2));
