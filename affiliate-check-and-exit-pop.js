(function () {
  const bookingNeedles = [
    'https://www.booking.com/index.html?aid=1858279',
    'https://www.booking.com/apartments/index.html?aid=1858279',
    'https://www.booking.com/resorts/index.html?aid=1858279',
    'https://www.booking.com/villas/index.html?aid=1858279',
    'https://www.booking.com/bed-and-breakfast/index.html?aid=1858279',
    'https://www.booking.com/guest-house/index.html?aid=1858279'
  ];
  const skyNeedle = 'https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885';

  function checkLinks() {
    const html = document.documentElement.outerHTML;
    const missing = [];
    bookingNeedles.forEach(u => { if (!html.includes(u)) missing.push(u); });
    if (!html.includes(skyNeedle)) missing.push(skyNeedle);
    if (missing.length) console.warn('Missing affiliate links on this page:', missing);
  }

  function makePopup() {
    if (document.getElementById('exit-pop-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'exit-pop-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;z-index:999999;padding:20px;';
    overlay.innerHTML = `
      <div style="max-width:420px;width:100%;background:#fff;border-radius:18px;padding:24px;box-shadow:0 18px 60px rgba(0,0,0,.25);font-family:Arial,sans-serif;color:#111;">
        <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#666;margin-bottom:8px;">Save money before you go</div>
        <h2 style="margin:0 0 10px;font-size:24px;line-height:1.2;">Check deals one last time</h2>
        <p style="margin:0 0 18px;color:#444;line-height:1.5;">Browse the best hotel options and compare prices before you leave.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href="https://www.booking.com/index.html?aid=1858279" target="_blank" rel="nofollow sponsored noopener" style="background:#0b63f6;color:#fff;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:700;">Check prices</a>
          <button id="exit-pop-close" type="button" style="background:#eef2f7;color:#111;border:0;padding:12px 16px;border-radius:10px;font-weight:700;cursor:pointer;">No thanks</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const close = () => overlay.style.display = 'none';
    document.getElementById('exit-pop-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    let shown = false;
    document.addEventListener('mouseout', e => {
      if (shown) return;
      if (!e.relatedTarget && e.clientY <= 0) {
        shown = true;
        overlay.style.display = 'flex';
      }
    });
  }

  function init() {
    checkLinks();
    makePopup();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
