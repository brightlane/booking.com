name: Build Booking.com site

on:
  push:
    branches:
      - main   # runs on every push to main
  workflow_dispatch:  # also allow manual runs

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # 1. Check out the repo
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      # 2. Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      # 3. Install dependencies (if you ever add package.json)
      - name: Install dependencies
        run: |
          npm ci || echo "No package.json; skipping install"

      # 4. Run your generator
      - name: Generate 2000+ hotel pages
        run: |
          node generate-site-files.js

      # 5. Commit and push regenerated files
      - name: Commit files
        run: |
          git config --local user.email "actions@github.com"
          git config --local user.name "GitHub Actions"
          
          # Add generated HTML files
          git add ./*.html
          git add ./*.js
          
          # Only commit if there are changes (don't force‑push empty)
          if [ -n "$(git status --porcelain)" ]; then
            git commit -m "🤖 Autogenerate hotel pages from generate-site-files.js
            - Includes 2000+ high‑quality hotel/booking pages for SEO.
            - Booking.com + Skyscanner affiliate links preserved.
            - Full cross‑linking and schema markup applied."
            git push
          else
            echo "No changes to commit."
          fi
