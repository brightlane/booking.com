const AFFILIATE_ID = "1858279";

function buildAffiliateLink(query) {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
    query
  )}&aid=${AFFILIATE_ID}`;
}

function buildHTML({ title, slug, query, description }) {
  const link = buildAffiliateLink(query);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>
body { font-family: Arial; background:#0f172a; color:white; margin:0; padding:40px; }
header { display:flex; justify-content:space-between; align-items:center; }
a { color:#60a5fa; text-decoration:none; }
.container { max-width:900px; margin:auto; }
.card { background:#1f2937; padding:20px; margin:20px 0; border-radius:12px; }
.btn { background:#f59e0b; padding:10px 16px; border-radius:8px; color:black; font-weight:bold; display:inline-block; }
footer { margin-top:50px; opacity:0.6; text-align:center; }
</style>

</head>

<body>

<header>
  <h2>StayLux</h2>
  <a href="${link}" target="_blank">Book Now</a>
</header>

<div class="container">

  <h1>${title}</h1>
  <p>${description}</p>

  <div class="card">
    <h3>Top Deals in ${query}</h3>
    <p>Compare hotels, resorts & apartments instantly.</p>
    <a class="btn" href="${link}" target="_blank">Search ${query} →</a>
  </div>

  <div class="card">
    <h3>Why Book Here</h3>
    <ul>
      <li>Free cancellation</li>
      <li>Verified reviews</li>
      <li>Best price deals</li>
    </ul>
  </div>

  <div class="card">
    <h3>Explore More</h3>
    <a href="paris.html">Paris</a> |
    <a href="london.html">London</a> |
    <a href="bali.html">Bali</a>
  </div>

</div>

<footer>
Affiliate ID: ${AFFILIATE_ID}
</footer>

</body>
</html>
`;
}

module.exports = { buildHTML };
