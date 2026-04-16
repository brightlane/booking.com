#!/usr/bin/env bash

echo "1. Generating site files..."
node generate-site-files.js

echo "2. Checking output/..."
ls -l output/

echo "3. Generating sitemap..."
node generate-sitemap-simple.js

echo "✅ Done. Open:"
echo "https://brightlane.github.io/booking.com/sitemap.xml"
