import json
import os
import random
from datetime import datetime

# Configuration
DATA_FILE = 'data/affiliate.json'
OUTPUT_DIR = 'daily-updates'

def generate_daily_post():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # 1. Load partner data
    with open(DATA_FILE, 'r') as f:
        data = json.load(f)
    
    # 2. Select a featured partner
    partner = random.choice(data['partners'])
    
    # Handle the URL rotation logic for Booking.com or single URLs for others
    if 'urls' in partner:
        target_url = random.choice(partner['urls'])
    else:
        target_url = partner.get('url', '#')

    date_str = datetime.now().strftime("%Y-%m-%d")
    title = f"System Update: {partner['pillar']} Strategy for {date_str}"
    
    # 3. Professional Navy Template
    content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        <style>
            body {{ background-color: #0a192f; color: #ccd6f6; font-family: sans-serif; padding: 50px; line-height: 1.8; }}
            .post-card {{ max-width: 800px; margin: auto; background: #112240; padding: 40px; border-radius: 10px; border: 1px solid #233554; }}
            h1 {{ color: #64ffda; }}
            .meta {{ color: #8892b0; font-family: monospace; margin-bottom: 20px; }}
            .cta-link {{ display: inline-block; margin-top: 30px; padding: 15px 25px; border: 1px solid #64ffda; color: #64ffda; text-decoration: none; font-weight: bold; }}
        </style>
    </head>
    <body>
        <div class="post-card">
            <div class="meta">PROTOCOL: {partner['pillar']} // DATE: {date_str}</div>
            <h1>{title}</h1>
            <p>{partner.get('description', 'Operational analysis in progress.')}</p>
            <p>Current data suggests high-conversion potential for {partner['name']} integrations within the current 2026 market window.</p>
            <a href="{target_url}" class="cta-link">View {partner['name']} Logistics →</a>
        </div>
    </body>
    </html>
    """

    filename = f"post-{date_str}.html"
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    with open(filepath, "w", encoding='utf-8') as f:
        f.write(content)
    
    print(f"Daily post generated: {filename}")
    return title, filename

if __name__ == "__main__":
    generate_daily_post()
