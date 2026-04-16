// affiliates.js
//
// 1. Booking.com: 6 landing pages, all using aid=8132800 (GitHub)
// 2. Skyscanner: main affiliate URL (change aff_id if yours is different)
// 3. All URLs stay 100% intact; helpers pick which one to use

exports.BOOKING = {
  HOME: "https://www.booking.com/index.html?aid=8132800",
  APARTMENTS: "https://www.booking.com/apartments/index.html?aid=8132800",
  RESORTS: "https://www.booking.com/resorts/index.html?aid=8132800",
  VILLAS: "https://www.booking.com/villas/index.html?aid=8132800",
  BNB: "https://www.booking.com/bed-and-breakfast/index.html?aid=8132800",
  GUESTHOUSES: "https://www.booking.com/guest-house/index.html?aid=8132800",
};

// === 2. Skyscanner affiliate URL ===
// Replace 21885 with your actual aff_id if different
exports.SKY = {
  MAIN: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

// === 3. Helper functions ===

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
