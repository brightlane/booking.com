import json
import os
import random

# Configuration
DATA_FILE = 'data/affiliate.json'
BLOG_DIR = 'blog'

def stitch_content():
    if not os.path.exists(BLOG_DIR):
        os.makedirs(BLOG_DIR)

    with open(DATA_FILE, 'r') as f:
        data = json.load(f)

    # This is the "Chameleon" logic that makes each page look unique
    for partner in data['partners']:
        filename = f"{partner['id']}-analysis.html"
        filepath = os.path.join(BLOG_DIR, filename)
        
        # Determine the URL (handling your rotation logic)
        if 'urls' in partner:
            final_url = random.choice(partner['urls'])
        else:
            final_url = partner.get('url', '#')

        # Generate a professional navy-themed analysis page
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{partner['name']} | Infrastructure Analysis</title>
            <style>
                body {{ background-color: #0a192f; color: #ccd6f6; font-family: 'Inter', sans-serif; padding: 40px; line-height: 1.6; }}
                .container {{ max-width: 900px; margin: auto; background: #112240; padding: 40px; border-radius: 12px; border: 1px solid #233554; box-shadow: 0 10px 30px -15px rgba(2,12,27,0.7); }}
                h1 {{ color: #64ffda; font-size: 2.5rem; }}
                .pillar-tag {{ color: #64ffda; font-family: monospace; font-size: 0.9rem; text-transform: uppercase; }}
                .content {{ margin: 30px 0; color: #8892b0; font-size: 1.1rem; }}
                .cta-box {{ border-top: 1px solid #233554; padding-top: 30px; margin-top: 30px; }}
                .btn {{ display: inline-block; padding: 18px 32px; border: 1px solid #64ffda; color: #64ffda; text-decoration: none; border-radius: 4px; font-weight: 600; transition: 0.3s; }}
                .btn:hover {{ background: rgba(100, 255, 218, 0.1); }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="pillar-tag">{partner['pillar']} // Protocol Active</div>
                <h1>{partner['name']} Deployment Strategy</h1>
                <div class="content">
                    <p>{partner.get('description', 'Optimizing infrastructure for global scale.')}</p>
                    <p>Current system analysis indicates {partner['name']} is a primary tier provider for {partner['pillar']} operations in the 2026 landscape.</p>
                </div>
                <div class="cta-box">
                    <a href="{final_url}" class="btn">Access Secure Gateway →</a>
                </div>
            </div>
        </body>
        </html>
        """

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
    print(f"Stitcher: Successfully processed {len(data['partners'])} analysis pages.")

if __name__ == "__main__":
    stitch_content()
