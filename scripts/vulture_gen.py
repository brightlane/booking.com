import json
import os
import random  # Added for the rotation logic

# Configuration
DATA_FILE = 'data/affiliate.json'
OUTPUT_DIR = 'blog'

def generate_pages():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    with open(DATA_FILE, 'r') as f:
        data = json.load(f)

    for partner in data['partners']:
        # --- ROTATION LOGIC START ---
        # If 'urls' list exists, pick one at random. Otherwise, use the single 'url'.
        if 'urls' in partner:
            target_url = random.choice(partner['urls'])
        else:
            target_url = partner.get('url', '#')
        # --- ROTATION LOGIC END ---

        description_text = partner.get('description', 'Expert strategic analysis and infrastructure protocol.')
        
        filename = f"{partner['id']}-analysis.html"
        filepath = os.path.join(OUTPUT_DIR, filename)

        # Using your Navy Blue professional template
        content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>{partner['name']} | Nexus Stack</title>
            <style>
                body {{ background-color: #0a192f; color: #ccd6f6; font-family: sans-serif; padding: 40px; }}
                .card {{ max-width: 700px; margin: auto; border: 1px solid #233554; padding: 30px; border-radius: 8px; }}
                h1 {{ color: #64ffda; }}
                .cta {{ margin-top: 25px; display: inline-block; padding: 12px 20px; border: 1px solid #64ffda; color: #64ffda; text-decoration: none; }}
            </style>
        </head>
        <body>
            <div class="card">
                <h1>{partner['name']} Strategy</h1>
                <p>{description_text}</p>
                <a href="{target_url}" class="cta">Deploy Protocol →</a>
            </div>
        </body>
        </html>
        """

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
    print("Vulture 10K: All landing pages updated with rotation logic.")

if __name__ == "__main__":
    generate_pages()
