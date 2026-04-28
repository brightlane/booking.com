import os
from datetime import datetime

# Configuration
BASE_URL = "https://brightlane.github.io/booking.com" # Update if your repo name differs
BLOG_DIR = 'blog'
UPDATES_DIR = 'daily-updates'
SITEMAP_FILE = 'sitemap.xml'

def generate_sitemap():
    pages = []

    # 1. Add static/root pages if they exist
    pages.append({"loc": f"{BASE_URL}/", "lastmod": datetime.now().strftime("%Y-%m-%d")})

    # 2. Add Blog pages
    if os.path.exists(BLOG_DIR):
        for file in os.listdir(BLOG_DIR):
            if file.endswith(".html"):
                pages.append({
                    "loc": f"{BASE_URL}/{BLOG_DIR}/{file}",
                    "lastmod": datetime.now().strftime("%Y-%m-%d")
                })

    # 3. Add Daily Updates
    if os.path.exists(UPDATES_DIR):
        for file in os.listdir(UPDATES_DIR):
            if file.endswith(".html"):
                pages.append({
                    "loc": f"{BASE_URL}/{UPDATES_DIR}/{file}",
                    "lastmod": datetime.now().strftime("%Y-%m-%d")
                })

    # Build XML
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for page in pages:
        xml_content += '  <url>\n'
        xml_content += f'    <loc>{page["loc"]}</loc>\n'
        xml_content += f'    <lastmod>{page["lastmod"]}</lastmod>\n'
        xml_content += '    <changefreq>daily</changefreq>\n'
        xml_content += '    <priority>0.8</priority>\n'
        xml_content += '  </url>\n'

    xml_content += '</urlset>'

    with open(SITEMAP_FILE, 'w', encoding='utf-8') as f:
        f.write(xml_content)
    
    print(f"Sitemap generated with {len(pages)} URLs.")

if __name__ == "__main__":
    generate_sitemap()
