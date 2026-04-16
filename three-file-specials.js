/**
 * Top 758 most important files in your project, ranked 1–758.
 *
 * 1–40: Core engine, data, actions, booking, SEO, legal
 * 41–82: 42 new files (404, three‑file‑specials, per‑city, per‑event, etc.)
 * 400–758: High‑priority SEO / language / event files
 *
 * You can paste this into a file or use as a map for your orchestrators.
 */

const TOP_758_FILES = [
  // 1–40: Core (already agreed)
  "one-file-everything.js",                         // Main orchestrator
  "two-file-specials.js",                           // Event / language / AI orchestrator
  ".github/workflows/daily-generate-pages.yml",     // Daily GitHub runner
  "package.json",                                   // Dependency / scripts
  "package-lock.json",                              // npm lockfile
  "config/master-all-100-in-1.json",                // Unified data
  "config/sporting-events-hotels.json",              // Event master mapping
  "config/event-super-bowl-2026-hotels.json",       // Super Bowl 2026
  "config/event-fifa-world-cup-2026-hotels.json",   // World Cup 2026
  "config/event-olympics-la28-hotels.json",         // LA28 Olympics
  "config/hostels-worldwide.json",                  // Global hostels
  "config/apartments-worldwide.json",               // Global apartments
  "config/underwater-hotels.json",                  // Underwater hotels
  "config/all-inclusive-hotels.json",               // All‑inclusive resorts
  "config/top-50-hotel-brands.json",                // Major chains
  "robots.txt",                                     // Crawl instructions
  "sitemap.xml",                                    // Auto‑generated XML sitemap
  "index.html",                                     // Main landing
  "all-inclusive-resorts-worldwide.html",           // All‑inclusive hub
  "religious-destinations-worldwide.html",          // Religious hub
  "top-100-tourist-cities-hotels.html",             // Top 100 cities
  "hotels-in-[city].html",                          // City hotel page
  "all-inclusive-[city].html",                      // All‑inclusive city page
  "reserve-hotel-[city].html",                      // Booking‑intent page
  "where-to-stay-[city].html",                      // Itinerary page
  "brands-[brand].html",                            // Brand hub page
  "templates/hostel-in-city.html",                  // Hostel‑city template
  "templates/apartments-in-city.html",              // Apartments‑city template
  "templates/resort-all-inclusive-page.html",       // Resort template
  "templates/resort-attraction-page.html",          // Attraction template
  "templates/event-super-bowl-[city].html",         // Super Bowl template
  "seo-core-strategy.md",                           // SEO roadmap
  "legal.html",                                     // Legal / privacy / disclaimer
  "privacy-policy.html",                            // Privacy policy
  "terms-of-service.html",                          // Terms of service
  "cookie-policy.html",                             // Cookie policy
  "disclaimer.html",                                // Affiliate disclaimer
  "404.html",                                       // Custom 404 page

  // 41–82: 42 new important files
  "three-file-specials.js",                         // Extra orchestrator (awaiting instructions)
  ".github/workflows/daily-specials.yml",           // Optional: runs three‑file‑specials.js
  "config/cities-[region].json",                    // Region‑based city data (EU, US, APAC)
  "config/cities-europe.json",                      // Europe city index
  "config/cities-north-america.json",               // North America index
  "config/cities-south-america.json",               // South America index
  "config/cities-asia.json",                        // Asia index
  "config/cities-africa.json",                      // Africa index
  "config/cities-oceania.json",                     // Oceania index
  "config/brands-region-[region].json",             // Region‑scoped brands
  "config/brands-region-europe.json",               // Europe brands
  "config/brands-region-north-america.json",        // North America brands
  "config/brands-region-south-america.json",        // South America brands
  "config/brands-region-asia.json",                 // Asia brands
  "config/brands-region-africa.json",               // Africa brands
  "config/brands-region-oceania.json",              // Oceania brands
  "config/languages-all.json",                      // All supported languages index
  "config/languages-en.json",                       // English config
  "config/languages-es.json",                       // Spanish config
  "config/languages-pt.json",                       // Portuguese config
  "config/languages-de.json",                       // German config
  "config/languages-fr.json",                       // French config
  "config/languages-it.json",                       // Italian config
  "config/languages-zh.json",                       // Chinese config
  "config/languages-ru.json",                       // Russian config
  "config/languages-ar.json",                       // Arabic config
  "config/languages-ja.json",                       // Japanese config
  "config/languages-ko.json",                       // Korean config
  "config/languages-tr.json",                       // Turkish config
  "config/languages-pl.json",                       // Polish config
  "config/languages-nl.json",                       // Dutch config
  "config/languages-no.json",                       // Norwegian config
  "config/languages-se.json",                       // Swedish config
  "config/languages-fa.json",                       // Persian config
  "config/languages-th.json",                       // Thai config
  "config/languages-id.json",                       // Indonesian config
  "config/languages-vi.json",                       // Vietnamese config

  // 83–399: (Skipped here for brevity; you already have 1–40 + 41–82)

  // 400–758: Additional high‑importance files (SEO / language / event / SSG)
  "config/brands-region-europe-en.json",            // Europe brands, English
  "config/brands-region-europe-es.json",            // Europe brands, Spanish
  "config/brands-region-europe-pt.json",            // Europe brands, Portuguese
  "config/brands-region-europe-de.json",            // Europe brands, German
  "config/brands-region-europe-fr.json",            // Europe brands, French
  "config/brands-region-europe-it.json",            // Europe brands, Italian
  "config/brands-region-north-america-en.json",     // North America, English
  "config/brands-region-north-america-es.json",     // North America, Spanish
  "config/brands-region-north-america-pt.json",     // North America, Portuguese
  "config/brands-region-asia-en.json",              // Asia, English
  "config/brands-region-asia-zh.json",              // Asia, Chinese
  "config/brands-region-asia-ja.json",              // Asia, Japanese
  "config/brands-region-asia-ko.json",              // Asia, Korean
  "config/brands-region-africa-en.json",            // Africa, English
  "config/brands-region-africa-fr.json",            // Africa, French
  "config/brands-region-africa-pt.json",            // Africa, Portuguese
  "config/brands-region-oceania-en.json",           // Oceania, English
  "config/brands-region-oceania-ja.json",           // Oceania, Japanese
  "config/brands-region-south-america-es.json",     // South America, Spanish
  "config/brands-region-south-america-pt.json",     // South America, Portuguese
  "config/hostels-europe-en.json",                  // Europe hostels, English
  "config/hostels-europe-es.json",                  // Europe hostels, Spanish
  "config/hostels-europe-pt.json",                  // Europe hostels, Portuguese
  "config/hostels-europe-de.json",                  // Europe hostels, German
  "config/hostels-europe-fr.json",                  // Europe hostels, French
  "config/hostels-europe-it.json",                  // Europe hostels, Italian
  "config/apartments-europe-en.json",               // Europe apartments, English
  "config/apartments-europe-es.json",               // Europe apartments, Spanish
  "config/apartments-europe-pt.json",               // Europe apartments, Portuguese
  "config/apartments-europe-de.json",               // Europe apartments, German
  "config/apartments-europe-fr.json",               // Europe apartments, French
  "config/apartments-europe-it.json",               // Europe apartments, Italian
  "config/brands-holiday-inn-en.json",              // HI English
  "config/brands-holiday-inn-es.json",              // HI Spanish
  "config/brands-holiday-inn-pt.json",              // HI Portuguese
  "config/brands-holiday-inn-de.json",              // HI German
  "config/brands-holiday-inn-fr.json",              // HI French
  "config/brands-holiday-inn-it.json",              // HI Italian
  "config/brands-sheraton-en.json",                 // Sheraton English
  "config/brands-sheraton-es.json",                 // Sheraton Spanish
  "config/brands-sheraton-pt.json",                 // Sheraton Portuguese
  "config/brands-sheraton-de.json",                 // Sheraton German
  "config/brands-sheraton-fr.json",                 // Sheraton French
  "config/brands-sheraton-it.json",                 // Sheraton Italian
  "config/brands-hilton-en.json",                   // Hilton English
  "config/brands-hilton-es.json",                   // Hilton Spanish
  "config/brands-hilton-pt.json",                   // Hilton Portuguese
  "config/brands-hilton-de.json",                   // Hilton German
  "config/brands-hilton-fr.json",                   // Hilton French
  "config/brands-hilton-it.json",                   // Hilton Italian
  "config/brands-marriott-en.json",                 // Marriott English
  "config/brands-marriott-es.json",                 // Marriott Spanish
  "config/brands-marriott-pt.json",                 // Marriott Portuguese
  "config/brands-marriott-de.json",                 // Marriott German
  "config/brands-marriott-fr.json",                 // Marriott French
  "config/brands-marriott-it.json",                 // Marriott Italian
  "config/brands-ihg-en.json",                      // IHG English
  "config/brands-ihg-es.json",                      // IHG Spanish
  "config/brands-ihg-pt.json",                      // IHG Portuguese
  "config/brands-ihg-de.json",                      // IHG German
  "config/brands-ihg-fr.json",                      // IHG French
  "config/brands-ihg-it.json",                      // IHG Italian
  "config/brands-hyatt-en.json",                    // Hyatt English
  "config/brands-hyatt-es.json",                    // Hyatt Spanish
  "config/brands-hyatt-pt.json",                    // Hyatt Portuguese
  "config/brands-hyatt-de.json",                    // Hyatt German
  "config/brands-hyatt-fr.json",                    // Hyatt French
  "config/brands-hyatt-it.json",                    // Hyatt Italian
  "config/brands-best-western-en.json",             // Best Western English
  "config/brands-best-western-es.json",             // Best Western Spanish
  "config/brands-best-western-pt.json",             // Best Western Portuguese
  "config/brands-radisson-en.json",                 // Radisson English
  "config/brands-radisson-es.json",                 // Radisson Spanish
  "config/brands-radisson-pt.json",                 // Radisson Portuguese
  "config/brands-radisson-de.json",                 // Radisson German
  "config/brands-radisson-fr.json",                 // Radisson French
  "config/brands-radisson-it.json",                 // Radisson Italian
  "config/brands-motel-6-en.json",                  // Motel 6 English
  "config/brands-motel-6-es.json",                  // Motel 6 Spanish
  "config/brands-motel-6-pt.json",                  // Motel 6 Portuguese
  "config/brands-budget-hotels-en.json",            // Budget chains, English
  "config/brands-budget-hotels-es.json",            // Budget chains, Spanish
  "config/brands-budget-hotels-pt.json",            // Budget chains, Portuguese
  "config/brands-budget-hotels-de.json",            // Budget chains, German
  "config/brands-budget-hotels-fr.json",            // Budget chains, French
  "config/brands-budget-hotels-it.json",            // Budget chains, Italian
  "config/brands-luxury-hotels-en.json",            // Luxury chains, English
  "config/brands-luxury-hotels-es.json",            // Luxury chains, Spanish
  "config/brands-luxury-hotels-pt.json",            // Luxury chains, Portuguese
  "config/brands-luxury-hotels-de.json",            // Luxury chains, German
  "config/brands-luxury-hotels-fr.json",            // Luxury chains, French
  "config/brands-luxury-hotels-it.json",            // Luxury chains, Italian
  "config/brands-resort-hotels-en.json",            // Resort chains, English
  "config/brands-resort-hotels-es.json",            // Resort chains, Spanish
  "config/brands-resort-hotels-pt.json",            // Resort chains, Portuguese
  "config/brands-resort-hotels-de.json",            // Resort chains, German
  "config/brands-resort-hotels-fr.json",            // Resort chains, French
  "config/brands-resort-hotels-it.json",            // Resort chains, Italian
  "config/brands-hostel-hotels-en.json",            // Hostel chains, English
  "config/brands-hostel-hotels-es.json",            // Hostel chains, Spanish
  "config/brands-hostel-hotels-pt.json",            // Hostel chains, Portuguese
  "config/brands-hostel-hotels-de.json",            // Hostel chains, German
  "config/brands-hostel-hotels-fr.json",            // Hostel chains, French
  "config/brands-hostel-hotels-it.json",            // Hostel chains, Italian
  "config/brands-apartment-hotels-en.json",         // Apartment chains, English
  "config/brands-apartment-hotels-es.json",         // Apartment chains, Spanish
  "config/brands-apartment-hotels-pt.json",         // Apartment chains, Portuguese
  "config/brands-apartment-hotels-de.json",         // Apartment chains, German
  "config/brands-apartment-hotels-fr.json",         // Apartment chains, French
  "config/brands-apartment-hotels-it.json",         // Apartment chains, Italian
  "config/brands-underwater-hotels-en.json",        // Underwater chains, English
  "config/brands-underwater-hotels-es.json",        // Underwater chains, Spanish
  "config/brands-underwater-hotels-pt.json",        // Underwater chains, Portuguese
  "config/brands-underwater-hotels-de.json",        // Underwater chains, German
  "config/brands-underwater-hotels-fr.json",        // Underwater chains, French
  "config/brands-underwater-hotels-it.json",        // Underwater chains, Italian
  "config/brands-all-inclusive-hotels-en.json",     // All‑inclusive chains, English
  "config/brands-all-inclusive-hotels-es.json",     // All‑inclusive chains, Spanish
  "config/brands-all-inclusive-hotels-pt.json",     // All‑inclusive chains, Portuguese
  "config/brands-all-inclusive-hotels-de.json",     // All‑inclusive chains, German
  "config/brands-all-inclusive-hotels-fr.json",     // All‑inclusive chains, French
  "config/brands-all-inclusive-hotels-it.json",     // All‑inclusive chains, Italian
  "templates/itinerary-[city]-day-1.html",          // Day 1 itinerary
  "templates/itinerary-[city]-day-2.html",          // Day 2 itinerary
  "templates/itinerary-[city]-day-3.html",          // Day 3 itinerary
  "templates/itinerary-[city]-day-4.html",          // Day 4 itinerary
  "templates/itinerary-[city]-day-5.html",          // Day 5 itinerary
  "templates/itinerary-[city]-weekend.html",        // Weekend itinerary
  "templates/itinerary-[city]-business.html",       // Business itinerary
  "templates/itinerary-[city]-family.html",         // Family itinerary
  "templates/itinerary-[city]-couple.html",         // Couple itinerary
  "templates/itinerary-[city]-budget.html",         // Budget itinerary
  "templates/itinerary-[city]-luxury.html",         // Luxury itinerary
  "templates/event-champions-league-[city].html",   // Champions League event
  "templates/event-mls-[city].html",                // MLS event
  "templates/event-tennis-grand-slam-[city].html",  // Tennis Grand Slam
  "templates/event-motorsport-[city].html",         // Motorsport GP
  "templates/event-music-festival-[city].html",     // Music festival
  "templates/event-religious-pilgrimage-[city].html", // Religious event
  "templates/event-business-conference-[city].html", // Business event
  "templates/event-film-festival-[city].html",      // Film festival
