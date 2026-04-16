const fs = require("fs");
const path = require("path");

// ============================================
// CONFIG: your affiliate URLs + data
// ============================================

const config = {
  booking_url: "https://www.booking.com/index.html?aid=1858279",
  skyscanner_url:
    "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",

  global_nav: [
    { label: "Main hotel booking guide", href: "/booking.com/" },
    {
      label: "All‑inclusive resorts worldwide",
      href: "/booking.com/all-inclusive-resorts-worldwide.html",
    },
    {
      label: "Hotels in religious destinations",
      href: "/booking.com/religious-destinations-worldwide.html",
    },
    {
      label: "Top 100 tourist cities",
      href: "/booking.com/top-100-tourist-cities-hotels.html",
    },
  ],

  // 100+ cities (add as many as you want)
  cities: [
    { city: "Bangkok", country: "Thailand", slug: "bangkok" },
    { city: "Istanbul", country: "Turkey", slug: "istanbul" },
    { city: "London", country: "United Kingdom", slug: "london" },
    { city: "Paris", country: "France", slug: "paris" },
    { city: "Dubai", country: "United Arab Emirates", slug: "dubai" },
    { city: "New York City", country: "United States", slug: "new-york-city" },
    { city: "Tokyo", country: "Japan", slug: "tokyo" },
    { city: "Barcelona", country: "Spain", slug: "barcelona" },
    { city: "Rome", country: "Italy", slug: "rome" },
    { city: "Jerusalem", country: "Israel", slug: "jerusalem" },
    { city: "Cancun", country: "Mexico", slug: "cancun" },
    { city: "Punta Cana", country: "Dominican Republic", slug: "punta-cana" },
    { city: "Lourdes", country: "France", slug: "lourdes" },
    { city: "Fatima", country: "Portugal", slug: "fatima" },
    { city: "Santiago de Compostela", country: "Spain", slug: "santiago-de-compostela" },
    { city: "Delhi", country: "India", slug: "delhi" },
    { city: "Mumbai", country: "India", slug: "mumbai" },
    { city: "Shanghai", country: "China", slug: "shanghai" },
    { city: "Marrakech", country: "Morocco", slug: "marrakech" },
    { city: "Sydney", country: "Australia", slug: "sydney" },
    { city: "Singapore", country: "Singapore", slug: "singapore" },
    { city: "Kuala Lumpur", country: "Malaysia", slug: "kuala-lumpur" },
    { city: "Phuket", country: "Thailand", slug: "phuket" },
    { city: "Bali", country: "Indonesia", slug: "bali" },
    { city: "Rio de Janeiro", country: "Brazil", slug: "rio-de-janeiro" },
    { city: "Amsterdam", country: "Netherlands", slug: "amsterdam" },
    { city: "Prague", country: "Czech Republic", slug: "prague" },
    { city: "Vienna", country: "Austria", slug: "vienna" },
    { city: "Berlin", country: "Germany", slug: "berlin" },
    { city: "Berlin", country: "Germany", slug: "berlin" },
    { city: "Budapest", country: "Hungary", slug: "budapest" },
    { city: "Lisbon", country: "Portugal", slug: "lisbon" },
    { city: "Athens", country: "Greece", slug: "athens" },
    { city: "Cairo", country: "Egypt", slug: "cairo" },
    { city: "Cape Town", country: "South Africa", slug: "cape-town" },
    { city: "Milan", country: "Italy", slug: "milan" },
    { city: "Manchester", country: "United Kingdom", slug: "manchester" },
    { city: "Edinburgh", country: "United Kingdom", slug: "edinburgh" },
    { city: "Las Vegas", country: "United States", slug: "las-vegas" },
    { city: "Miami", country: "United States", slug: "miami" },
    { city: "Los Angeles", country: "United States", slug: "los-angeles" },
    { city: "San Francisco", country: "United States", slug: "san-francisco" },
    { city: "Chicago", country: "United States", slug: "chicago" },
    { city: "Boston", country: "United States", slug: "boston" },
    { city: "Toronto", country: "Canada", slug: "toronto" },
    { city: "Vancouver", country: "Canada", slug: "vancouver" },
    { city: "Mexico City", country: "Mexico", slug: "mexico-city" },
    { city: "Buenos Aires", country: "Argentina", slug: "buenos-aires" },
    { city: "Lima", country: "Peru", slug: "lima" },
    { city: "Sao Paulo", country: "Brazil", slug: "sao-paulo" },
    { city: "Quito", country: "Ecuador", slug: "quito" },
    { city: "Bogota", country: "Colombia", slug: "bogota" },
    { city: "Caracas", country: "Venezuela", slug: "caracas" },
    { city: "Panama City", country: "Panama", slug: "panama-city" },
    { city: "Santiago", country: "Chile", slug: "santiago" },
    { city: "Suva", country: "Fiji", slug: "suva" },
    { city: "Auckland", country: "New Zealand", slug: "auckland" },
    { city: "Reykjavik", country: "Iceland", slug: "reykjavik" },
    { city: "Helsinki", country: "Finland", slug: "helsinki" },
    { city: "Stockholm", country: "Sweden", slug: "stockholm" },
    { city: "Oslo", country: "Norway", slug: "oslo" },
    { city: "Copenhagen", country: "Denmark", slug: "copenhagen" },
    { city: "Brussels", country: "Belgium", slug: "brussels" },
    { city: "Bratislava", country: "Slovakia", slug: "bratislava" },
    { city: "Bucharest", country: "Romania", slug: "bucharest" },
    { city: "Belgrade", country: "Serbia", slug: "belgrade" },
    { city: "Zagreb", country: "Croatia", slug: "zagreb" },
    { city: "Dubrovnik", country: "Croatia", slug: "dubrovnik" },
    { city: "Split", country: "Croatia", slug: "split" },
    { city: "Sarajevo", country: "Bosnia and Herzegovina", slug: "sarajevo" },
    { city: "Tirana", country: "Albania", slug: "tirana" },
    { city: "Podgorica", country: "Montenegro", slug: "podgorica" },
    { city: "Almaty", country: "Kazakhstan", slug: "almaty" },
    { city: "Bishkek", country: "Kyrgyzstan", slug: "bishkek" },
    { city: "Tashkent", country: "Uzbekistan", slug: "tashkent" },
    { city: "Dushanbe", country: "Tajikistan", slug: "dushanbe" },
    { city: "Astana", country: "Kazakhstan", slug: "astana" },
    { city: "Baku", country: "Azerbaijan", slug: "baku" },
    { city: "Yerevan", country: "Armenia", slug: "yerevan" },
    { city: "Tbilisi", country: "Georgia", slug: "tbilisi" },
    { city: "Manila", country: "Philippines", slug: "manila" },
    { city: "Ho Chi Minh City", country: "Vietnam", slug: "ho-chi-minh-city" },
    { city: "Hanoi", country: "Vietnam", slug: "hanoi" },
    { city: "Bangkok", country: "Thailand", slug: "bangkok" },
    { city: "Phnom Penh", country: "Cambodia", slug: "phnom-penh" },
    { city: "Siem Reap", country: "Cambodia", slug: "siem-reap" },
    { city: "Kathmandu", country: "Nepal", slug: "kathmandu" },
    { city: "Colombo", country: "Sri Lanka", slug: "colombo" },
    { city: "Dhaka", country: "Bangladesh", slug: "dhaka" },
    { city: "Kuala Lumpur", country: "Malaysia", slug: "kuala-lumpur" },
    { city: "Bandung", country: "Indonesia", slug: "bandung" },
    { city: "Surabaya", country: "Indonesia", slug: "surabaya" },
    { city: "Jakarta", country: "Indonesia", slug: "jakarta" },
    { city: "Kigali", country: "Rwanda", slug: "kigali" },
    { city: "Nairobi", country: "Kenya", slug: "nairobi" },
    { city: "Dar es Salaam", country: "Tanzania", slug: "dar-es-salaam" },
    { city: "Addis Ababa", country: "Ethiopia", slug: "addis-ababa" },
    { city: "Khartoum", country: "Sudan", slug: "khartoum" },
    { city: "Tripoli", country: "Libya", slug: "tripoli" },
    { city: "Tunis", country: "Tunisia", slug: "tunis" },
    { city: "Algiers", country: "Algeria", slug: "algiers" },
    { city: "Casablanca", country: "Morocco", slug: "casablanca" },
    { city: "Rabat", country: "Morocco", slug: "rabat" },
    { city: "Agadir", country: "Morocco", slug: "agadir" },
    { city: "Marrakesh", country: "Morocco", slug: "marrakech" },
    { city: "Fes", country: "Morocco", slug: "fes" },
    { city: "Istanbul", country: "Turkey", slug: "istanbul" },
    { city: "Antalya", country: "Turkey", slug: "antalya" },
    { city: "Cappadocia", country: "Turkey", slug: "cappadocia" },
    { city: "Bodrum", country: "Turkey", slug: "bodrum" },
    { city: "Marmaris", country: "Turkey", slug: "marmaris" },
    { city: "Izmir", country: "Turkey", slug: "izmir" },
    { city: "Selcuk", country: "Turkey", slug: "selcuk" },
    { city: "Konya", country: "Turkey", slug: "konya" },
    { city: "Kayseri", country: "Turkey", slug: "kayseri" },
    { city: "Erzurum", country: "Turkey", slug: "erzurum" },
    { city: "Trabzon", country: "Turkey", slug: "trabzon" },
    { city: "Samsun", country: "Turkey", slug: "samsun" },
    { city: "Bursa", country: "Turkey", slug: "bursa" },
    { city: "Eskisehir", country: "Turkey", slug: "eskisehir" },
    { city: "Kayseri", country: "Turkey", slug: "kayseri" },
    { city: "Mersin", country: "Turkey", slug: "mersin" },
    { city: "Adana", country: "Turkey", slug: "adana" },
    { city: "Gaziantep", country: "Turkey", slug: "gaziantep" },
    { city: "Sanliurfa", country: "Turkey", slug: "sanliurfa" },
    { city: "Diyarbakir", country: "Turkey", slug: "diyarbakir" },
    { city: "Van", country: "Turkey", slug: "van" },
    { city: "Erzincan", country: "Turkey", slug: "erzincan" },
    { city: "Sivas", country: "Turkey", slug: "sivas" },
    { city: "Kars", country: "Turkey", slug: "kars" },
    { city: "Siirt", country: "Turkey", slug: "siirt" },
    { city: "Batman", country: "Turkey", slug: "batman" },
    { city: "Mardin", country: "Turkey", slug: "mardin" },
    { city: "Adana", country: "Turkey", slug: "adana" },
    { city: "Osmaniye", country: "Turkey", slug: "osmaniye" },
    { city: "Gaziantep", country: "Turkey", slug: "gaziantep" },
    { city: "Hatay", country: "Turkey", slug: "hatay" },
    { city: "Kahramanmaras", country: "Turkey", slug: "kahramanmaras" },
    { city: "Adiyaman", country: "Turkey", slug: "adiyaman" },
    { city: "Batman", country: "Turkey", slug: "Batman" },
    { city: "Siirt", country: "Turkey", slug: "siirt" },
    { city: "Mardin", country: "Turkey", slug: "mardin" },
    { city: "Sanliurfa", country: "Turkey", slug: "sanliurfa" },
    { city: "Diyarbakir", country: "Turkey", slug: "diyarbakir" },
    { city: "Van", country: "Turkey", slug: "van" },
    { city: "Erzincan", country: "Turkey", slug: "erzincan" },
    { city: "Sivas", country: "Turkey", slug: "sivas" },
    { city: "Kars", country: "Turkey", slug: "kars" },
    { city: "Agri", country: "Turkey", slug: "agri" },
    { city: "Erzurum", country: "Turkey", slug: "erzurum" },
    { city: "Tunceli", country: "Turkey", slug: "tunceli" },
    { city: "Malatya", country: "Turkey", slug: "malatya" },
    { city: "Elazig", country: "Turkey", slug: "elazig" },
    { city: "Kars", country: "Turkey", slug: "kars" },
    { city: "Erzurum", country: "Turkey", slug: "erzurum" },
    { city: "Tunceli", country: "Turkey", slug: "tunceli" },
    { city: "Malatya", country: "Turkey", slug: "malatya" },
  ].map((c, i) => ({ ...c, id: i + 1 })),
};

// 100% complete HTML template
function renderTemplate({ slug, title, description, body, relativeToRoot }) {
  const navLinks = config.global_nav
    .map((link) => {
      const href = relativeToRoot + link.href;
      return `<a href="${href}">${link.label}</a>`;
    })
    .join(" | ");

  const bookingLink = `<a href="${config.booking_url}" rel="sponsored" target="_blank">Book Your Stay on Booking.com</a>`;
  const skyLink = `<a href="${config.skyscanner_url}" rel="sponsored" target="_blank">Compare Flights on Skyscanner</a>`;

  const ctaBox = `
    <div class="cta-box">
      <p>${bookingLink}</p>
      <p>${skyLink}</p>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="
