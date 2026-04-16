#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const AFFILIATE = 'https://www.booking.com/index.html?aid=1858279';
const INTERNAL_HOST = 'brightlane.github.io/booking.com';
const EXTENSIONS = new Set(['.html', '.htm']);
const EXCLUDE = new Set(['index.html']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'output') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function harden(html) {
  let out = html;

  out = out.replace(/<a\b[^>]*href\s*=\s*([\"'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi, (m, q, href, text) => {
    const plain = text.replace(/<[^>]+>/g, '').trim().toLowerCase();
    const isInternal = href.includes(INTERNAL_HOST) || href.startsWith('/') || href.endsWith('.html') || href.endsWith('.htm');
    if (href.includes('booking.com') || plain.includes('booking.com') || href.includes('aid=')) {
      return `<a href="${AFFILIATE}" target="_blank" rel="nofollow sponsored noopener noreferrer" referrerpolicy="no-referrer" data-affiliate="booking">${text}</a>`;
    }
    if (isInternal) {
      return `<a href="${href}" rel="noopener noreferrer">${text}</a>`;
    }
    return m;
  });

  out = out.replace(/\bhttps?:\/\/[^\s"'<>]*booking\.com[^\s"'<>]*/gi, AFFILIATE);
  out = out.replace(/\bbooking\.com\b/gi, 'Booking.com');
  return out;
}

const files = walk(ROOT).filter(f => EXTENSIONS.has(path.extname(f).toLowerCase()) && !EXCLUDE.has(path.basename(f).toLowerCase()));
const changed = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = harden(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed.push(path.relative(ROOT, file));
  }
}

const report = {
  affiliate: AFFILIATE,
  changed_files: changed.length,
  files: changed
};

fs.writeFileSync(path.join(ROOT, 'output', 'booking_hardening_report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
