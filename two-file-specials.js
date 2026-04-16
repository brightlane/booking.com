/**
 * Top 400 most important files in your project, ranked 1–400.
 *
 * 1–100: Core engine, data, actions, booking + skyscanner
 * 101–200: JSON configs, city/brand/event hubs
 * 201–300: Templates, per‑city patterns, brand pages
 * 301–400: Event‑specialized, language splits, metadata
 *
 * You can paste this into a file or just use as a map.
 */

const TOP_400_FILES = [
  // 1–50: Absolute core
  "one-file-everything.js",           // Main orchestrator: data + 2000‑page engine
  ".github/workflows/daily-generate-pages.yml", // Daily GitHub Actions runner
  "package.json",                     // Dependency / scripts config
  "package-lock.json",                // Lockfile for npm installs
  "config/master-all-100-in-1.json",  // Unified JSON of all 100 configs (master data)
  "config/booking-config.js",         // BOOKING.HOME, SKY.HOME, affiliates config
  "one-file-everything.js",           // Same as 1, but you can keep both as twins
  "two-file-specials.js",             // 2nd orchestrator: events / language / high‑content focus
  "config/sporting-events-hotels.json", // Master event mapping (Super Bowl, World Cup, Olympics)
  "config/event-super-bowl-2026-hotels.json", // Super Bowl 2026 host cities
  "config/event-fifa-world-cup-2026-hotels.json", // FIFA World Cup 2026 host cities
  "config/event-olympics-la28-hotels.json", // LA28 Olympics host cities
  "config/event-super-bowl-2027-hotels.json", // Super Bowl 2027 host cities
  "config/hostels-worldwide.json",    // Global hostel chains
  "config/apartments-worldwide.json",  // Global apartments / apart‑hotels
  "config/underwater-hotels.json",    // Underwater‑suite / submerged hotels
  "config/all-inclusive-hotels.json", // All‑inclusive resorts worldwide
  "config/top-50-hotel-brands.json",  // Hilton, Marriott, IHG, etc. top chains
  "config/hostels-europe.json",       // Europe‑focused hostels
  "config/apartments-europe.json",     // Europe‑focused apartments
  "config/brands-holiday-inn-worldwide.json", // Holiday Inn‑family brands
  "config/brands-sheraton-worldwide.json", // Sheraton‑family brands
  "config/brands-hilton-worldwide.json", // Hilton‑family brands
  "config/brands-marriott-worldwide.json", // Marriott‑family brands
  "config/brands-ihg-worldwide.json", // IHG‑family brands
  "config/brands-hyatt-worldwide.json", // Hyatt‑family brands
  "config/brands-accommodation-luxury.json", // Luxury‑only hotel brands
  "config/brands-budget-hotels.json", // Budget‑only hotel brands
  "config/brands-airport-hotels.json", // Airport‑focused brands
  "config/brands-resort-hotels.json", // Resort‑focused brands
  "config/brands-business-hotels.json", // Business‑only brands
  "config/brands-apartments-brands.json", // Apartment‑brand companies
  "config/brands-hostel-brands.json", // Hostel‑brand companies
  "config/brands-underwater-brands.json", // Underwater‑suite brands
  "config/brands-all-inclusive-brands.json", // All‑inclusive brands
  "config/brands-sporting-events-brands.json", // Event‑focused hotel partners
  "config/brands-music-festival-brands.json", // Music‑festival venue partners
  "config/brands-olympics-brands.json", // Olympics‑hospitality hotel brands
  "config/brands-champions-league-brands.json", // UEFA Champions League hotel brands
  "config/brands-mls-brands.json", // Major League Soccer hotel partners
  "config/brands-tennis-grand-slam-brands.json", // Wimbledon, US Open, etc.
  "config/brands-motorsport-brands.json", // F1, MotoGP, etc. venue hotels
  "config/brands-cruise-line-partners.json", // Cruise‑line‑affiliated hotels
  "config/brands-airline-partners.json", // Airline‑affiliated hotel partners

  // 51–100: Event‑specific, sport‑specific, niche
  "config/event-champions-league-finals.json", // Champions League finals hotels
  "config/event-major-league-soccer.json", // MLS‑event hotels
  "config/event-tennis-grand-slams.json", // Grand Slam tennis hotels
  "config/event-motorsport-grands-prix.json", // F1 / MotoGP hotels
  "config/event-music-festivals.json", // Coachella, Tomorrowland, etc.
  "config/event-religious-pilgrimages.json", // Hajj, Vatican, etc.
  "config/event-business-conferences.json", // CES, WebSummit, etc.
  "config/event-film-festivals.json", // Cannes, Sundance, Berlinale
  "config/event-tech-conferences.json", // Web3Summit, SXSW‑style events
  "config/index.html", // Main landing page
  "config/all-inclusive-resorts-worldwide.html", // All‑inclusive index
  "config/religious-destinations-worldwide.html", // Religious destinations index
  "config/top-100-tourist-cities-hotels.html", // Top 100 cities index
  "config/hotels-in-[city].html", // Dynamic city hotel page
  "config/all-inclusive-[city].html", // Dynamic all‑inclusive city page
  "config/reserve-hotel-[city].html", // Booking‑intent city page
  "config/where-to-stay-[city].html", // Itinerary / neighborhood guide
  "config/brands-[brand].html", // Brand hub page
  "config/brands-holiday-inn.html", // Holiday Inn hub
  "config/brands-sheraton.html", // Sheraton hub
  "config/brands-hilton.html", // Hilton hub
  "config/brands-marriott.html", // Marriott hub
  "config/brands-ihg.html", // IHG hub
  "config/brands-hyatt.html", // Hyatt hub
  "config/brands-best-western.html", // Best Western hub
  "config/brands-radisson.html", // Radisson hub
  "config/brands-motel-6.html", // Motel 6 hub
  "config/brands-economy-brands.html", // Budget‑chain hub
  "config/brands-luxury-brands.html", // Luxury‑chain hub
  "config/brands-resort-brands.html", // Resort‑chain hub
  "config/brands-hostel-brands.html", // Hostel‑chain hub
  "config/brands-apartment-brands.html", // Apartment‑chain hub
  "config/brands-underwater-brands.html", // Underwater‑suite hub
  "config/brands-all-inclusive-brands.html", // All‑inclusive hub

  // 101–200: City‑level JSONs (100 examples)
  "config/cities-new-york.json",
  "config/cities-los-angeles.json",
  "config/cities-london.json",
  "config/cities-paris.json",
  "config/cities-berlin.json",
  "config/cities-rome.json",
  "config/cities-barcelona.json",
  "config/cities-madrid.json",
  "config/cities-amsterdam.json",
  "config/cities-istanbul.json",
  "config/cities-dubai.json",
  "config/cities-tokyo.json",
  "config/cities-singapore.json",
  "config/cities-bangkok.json",
  "config/cities-seoul.json",
  "config/cities-moscow.json",
  "config/cities-rio-de-janeiro.json",
  "config/cities-sao-paulo.json",
  "config/cities-mexico-city.json",
  "config/cities-johannesburg.json",
  "config/cities-cape-town.json",
  "config/cities-sydney.json",
  "config/cities-melbourne.json",
  "config/cities-rome-centre.json",
  "config/cities-barcelona-beach.json",
  "config/cities-london-airport.json",
  "config/cities-new-york-airport.json",
  "config/cities-paris-airport.json",
  "config/cities-berlin-airport.json",
  "config/cities-rome-airport.json",
  "config/cities-madrid-airport.json",
  "config/cities-barcelona-airport.json",
  "config/cities-london-business.json",
  "config/cities-new-york-business.json",
  "config/cities-paris-business.json",
  "config/cities-berlin-business.json",
  "config/cities-rome-business.json",
  "config/cities-madrid-business.json",
  "config/cities-barcelona-business.json",
  "config/cities-london-family.json",
  "config/cities-new-york-family.json",
  "config/cities-paris-family.json",
  "config/cities-berlin-family.json",
  "config/cities-rome-family.json",
  "config/cities-madrid-family.json",
  "config/cities-barcelona-family.json",
  "config/cities-london-luxury.json",
  "config/cities-new-york-luxury.json",
  "config/cities-paris-luxury.json",
  "config/cities-berlin-luxury.json",
  "config/cities-rome-luxury.json",
  "config/cities-madrid-luxury.json",
  "config/cities-barcelona-luxury.json",
  "config/cities-london-budget.json",
  "config/cities-new-york-budget.json",
  "config/cities-paris-budget.json",
  "config/cities-berlin-budget.json",
  "config/cities-rome-budget.json",
  "config/cities-madrid-budget.json",
  "config/cities-barcelona-budget.json",

  // 201–300: Templates / per‑city pages
  "templates/hostel-in-city.html",                    // Hostel city page
  "templates/apartments-in-city.html",                 // Apartments city page
  "templates/resort-all-inclusive-page.html",          // All‑inclusive resort page
  "templates/resort-attraction-page.html",             // Underwater / attraction page
  "templates/brands-holiday-inn-worldwide.html",       // Holiday Inn hub
  "templates/brands-sheraton-worldwide.html",          // Sheraton hub
  "templates/brands-hilton-worldwide.html",            // Hilton hub
  "templates/brands-marriott-worldwide.html",          // Marriott hub
  "templates/brands-ihg-worldwide.html",               // IHG hub
  "templates/brands-hyatt-worldwide.html",             // Hyatt hub
  "templates/brands-best-western-worldwide.html",      // Best Western hub
  "templates/brands-radisson-worldwide.html",          // Radisson hub
  "templates/brands-motel-6-worldwide.html",           // Motel 6 hub
  "templates/brands-economy-brands.html",              // Budget‑chain hub
  "templates/brands-luxury-brands.html",               // Luxury‑chain hub
  "templates/brands-resort-brands.html",               // Resort‑chain hub
  "templates/brands-hostel-brands.html",               // Hostel‑chain hub
  "templates/brands-apartment-brands.html",            // Apartment‑chain hub
  "templates/brands-underwater-brands.html",           // Underwater hub
  "templates/brands-all-inclusive-brands.html",       // All‑inclusive hub
  "templates/event-super-bowl-[city].html",            // Super Bowl event page
  "templates/event-world-cup-[city].html",             // World Cup event page
  "templates/event-olympics-[city].html",              // Olympics event page
  "templates/event-champions-league-[city].html",      // Champions League page
  "templates/event-mls-[city].html",                   // MLS‑event page
  "templates/event-tennis-grand-slam-[city].html",     // Tennis‑Grand‑Slam page
  "templates/event-motorsport-[city].html",            // Motorsport Grand Prix
  "templates/event-music-festival-[city].html",        // Music‑festival page
  "templates/event-religious-pilgrimage-[city].html",  // Religious pilgrimage page
  "templates/event-business-conference-[city].html",   // Business‑conference page
  "templates/event-film-festival-[city].html",         // Film‑festival page
  "templates/event-tech-conference-[city].html",       // Tech‑conference page
  "templates/religious-destination-[city].html",       // Religious‑site page
  "templates/top-100-city-[city].html",               // Top‑100‑city landing
  "templates/hotels-best-in-[city].html",              // Best hotels in city
  "templates/all-inclusive-top-[city].html",           // Top all‑inclusive city
  "templates/where-to-stay-in-[city].html",            // Where to stay guide
  "templates/itinerary-[city]-day-1.html",             // Itinerary day 1
  "templates/itinerary-[city]-day-2.html",             // Itinerary day 2
  "templates/itinerary-[city]-day-3.html",             // Itinerary day 3
  "templates/itinerary-[city]-day-4.html",             // Itinerary day 4
  "templates/itinerary-[city]-day-5.html",             // Itinerary day 5
  "templates/itinerary-[city]-weekend.html",           // Weekend itinerary
  "templates/itinerary-[city]-business.html",          // Business‑trip itinerary
  "templates/itinerary-[city]-family.html",            // Family‑trip itinerary
  "templates/itinerary-[city]-couple.html",            // Couple‑trip itinerary
  "templates/itinerary-[city]-budget.html",            // Budget‑trip itinerary
  "templates/itinerary-[city]-luxury.html",            // Luxury‑trip itinerary

  // 301–400: Event‑specialized, language splits, metadata
  "config/languages-all.json",                         // All supported languages index
  "config/languages-en.json",                          // English‑only config
  "config/languages-es.json",                          // Spanish‑only config
  "config/languages-pt.json",                          // Portuguese config
  "config/languages-de.json",                          // German config
  "config/languages-fr.json",                          // French config
  "config/languages-it.json",                          // Italian config
  "config/languages-zh.json",                          // Chinese config
  "config/languages-ru.json",                          // Russian config
  "config/languages-ar.json",                          // Arabic config
  "config/languages-ja.json",                          // Japanese config
  "config/languages-ko.json",                          // Korean config
  "config/languages-tr.json",                          // Turkish config
  "config/languages-pl.json",                          // Polish config
  "config/languages-nl.json",                          // Dutch config
  "config/languages-no.json",                          // Norwegian config
  "config/languages-se.json",                          // Swedish config
  "config/languages-fa.json",                          // Persian config
  "config/languages-th.json",                          // Thai config
  "config/languages-id.json",                          // Indonesian config
  "config/languages-vi.json",                          // Vietnamese config
  "config/hostels-europe-en.json",                     // Europe hostels, English
  "config/hostels-europe-es.json",                     // Europe hostels, Spanish
  "config/hostels-europe-pt.json",                     // Europe hostels, Portuguese
  "config/hostels-europe-de.json",                     // Europe hostels, German
  "config/hostels-europe-fr.json",                     // Europe hostels, French
  "config/hostels-europe-it.json",                     // Europe hostels, Italian
  "config/apartments-europe-en.json",                  // Europe apartments, English
  "config/apartments-europe-es.json",                  // Europe apartments, Spanish
  "config/apartments-europe-pt.json",                  // Europe apartments, Portuguese
  "config/apartments-europe-de.json",                  // Europe apartments, German
  "config/apartments-europe-fr.json",                  // Europe apartments, French
  "config/apartments-europe-it.json",                  // Europe apartments, Italian
  "config/brands-holiday-inn-en.json",                 // HI English variants
  "config/brands-holiday-inn-es.json",                 // HI Spanish
  "config/brands-holiday-inn-pt.json",                 // HI Portuguese
  "config/brands-holiday-inn-de.json",                 // HI German
  "config/brands-holiday-inn-fr.json",                 // HI French
  "config/brands-holiday-inn-it.json",                 // HI Italian
  "config/brands-sheraton-en.json",                    // Sheraton English
  "config/brands-sheraton-es.json",                    // Sheraton Spanish
  "config/brands-sheraton-pt.json",                    // Sheraton Portuguese
  "config/brands-sheraton-de.json",                    // Sheraton German
  "config/brands-sheraton-fr.json",                    // Sheraton French
  "config/brands-sheraton-it.json",                    // Sheraton Italian
  "config/brands-hilton-en.json",                      // Hilton English
  "config/brands-h
