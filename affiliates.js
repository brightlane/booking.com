// affiliates.js
//
// 1. Booking.com: 6 landing pages (all aid=8132800 → GitHub affiliate)
// 2. Skyscanner: 1 main affiliate URL (update aff_id if yours is different)
// 3. All URLs stay 100% intact; can be intermingled into pages

// === 1. Booking.com affiliate URLs (aid=8132800 = GitHub) ===
exports.BOOKING = {
  HOME: "https://www.booking.com/index.html?aid=8132800",
  APARTMENTS: "https://www.booking.com/apartments/index.html?aid=8132800",
  RESORTS: "https://www.booking.com/resorts/index.html?aid=8132800",
  VILLAS: "https://www.booking.com/villas/index.html?aid=8132800",
  BNB: "https://www.booking.com/bed-and-breakfast/index.html?aid=8132800",
  GUESTHOUSES: "https://www.booking.com/guest-house/index.html?aid=8132800",
};

// === 2. Skyscanner affiliate URL (example: aff_id=21885) ===
// Replace 21885 with your real aff_id if it's different
exports.SKY = {
  MAIN: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

// === 3. Helper functions (optional but handy) ===

// Randomly pick one of your 6 Booking.com URLs
exports.pickBooking = () => {
  const options = [
    exports.BOOKING.HOME,
    exports.BOOKING.APARTMENTS,
    exports.BOOKING.RESORTS,
    exports.BOOKING.VILLAS,
    exports.BOOKING.BNB,
    exports.BOOKING.GUESTHOUSES,
  ];
  return options[Math.floor(Math.random() * options.length)];
};

// Pick Skyscanner URL (you can add rotation later if you get more SKY IDs)
exports.pickSky = () => exports.SKY.MAIN;
