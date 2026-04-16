// nine-file-specials.js
//
// 1. Add language‑aware content writing for all major SEO languages
//    (en, es, pt, de, fr, it, zh, ru, ar, ja, ko, tr, pl, nl, no, se, fa, th, id, vi)
//
// 2. Add light language‑detection scripts (no extra NPM; just JS heuristics)
//
// 3. Generate even more top‑volume, non‑duplicated HTML pages
//    (no overlap with eight‑file‑specials.js patterns)
//
// 4. Add SEO‑friendly hreflang‑like signals so search engines see language versions

const fs = require("fs-extra");
const path = require("path");

const BOOKING = {
  HOME: "https://www.booking.com/index.html?aid=1858279",
  APARTMENTS: "https://www.booking.com/apartments/index.html?aid=1858279",
  RESORTS: "https://www.booking.com/resorts/index.html?aid=1858279",
  VILLAS: "https://www.booking.com/villas/index.html?aid=1858279",
  BNB: "https://www.booking.com/bed-and-breakfast/index.html?aid=1858279",
  GUESTHOUSES: "https://www.booking.com/guest-house/index.html?aid=1858279",
};

const SKY = {
  HOME: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
};

const OUTPUT_DIR = path.resolve("./output");

// ==============================
// 1. LANGUAGES TO SUPPORT
// ==============================

const LANGUAGES = [
  "en", "es", "pt", "de", "fr", "it", "zh", "ru", "ar", "ja",
  "ko", "tr", "pl", "nl", "no", "se", "fa", "th", "id", "vi",
];

const LANGUAGES_TO_LOCALES = {
  en: "en-US",
  es: "es-ES",
  pt: "pt-BR",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  zh: "zh-CN",
  ru: "ru-RU",
  ar: "ar-SA",
  ja: "ja-JP",
  ko: "ko-KR",
  tr: "tr-TR",
  pl: "pl-PL",
  nl: "nl-NL",
  no: "no-NO",
  se: "sv-SE",
  fa: "fa-IR",
  th: "th-TH",
  id: "id-ID",
  vi: "vi-VN",
};

// Language‑friendly names
const LANG_NAMES = {
  en: "English",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  zh: "中文",
  ru: "Русский",
  ar: "العربية",
  ja: "日本語",
  ko: "한국어",
  tr: "Türkçe",
  pl: "Polski",
  nl: "Nederlands",
  no: "Norsk",
  se: "Svenska",
  fa: "فارسی",
  th: "ไทย",
  id: "Indonesia",
  vi: "Tiếng Việt",
};

// ==============================
// 2. LANGUAGE DETECT HELPER
// ==============================

function detectLanguageFromText(text) {
  const textLower = text.toLowerCase();

  const langIndicators = {
    es: /(hotel|reserva|ciudad|aeropuerto|familia|lujo)/i.test(textLower),
    pt: /(?:hotel|reserva|cidade|aeroporto|família|luxo)/i.test(textLower),
    de: /(?:hotel|stadt|flughafen|familie|luxus)/i.test(textLower),
    fr: /(?:hotel|ville|aéroport|famille|luxe)/i.test(textLower),
    it: /(?:hotel|città|aeroporto|famiglia|lusso)/i.test(textLower),
    zh: /(?:酒店|机场|城市|豪华|家庭)/i.test(textLower),
    ru: /(?:отель|город|аэропорт|семья|люкс)/i.test(textLower),
    ar: /(?:فندق|المدينة|مطار|عائلة|فاخر)/i.test(textLower),
    ja: /(?:ホテル|都市|空港|家族|高級)/i.test(textLower),
    ko: /(?:호텔|도시|공항|가족|럭셔리)/i.test(textLower),
    tr: /(?:otel|şehir|havalimanı|aile|lüks)/i.test(textLower),
    pl: /(?:hotel|miejscowość|lotnisko|rodzina|luksusowy)/i.test(textLower),
    nl: /(?:hotel|stad|luchthaven|familie|luxe)/i.test(textLower),
    no: /(?:hotell|by|flyplass|familie|luks)/i.test(textLower),
    se: /(?:hotell|stad|flygplats|familj|lyx)/i.test(textLower),
    fa: /(?:هتل|شهر|فرودگاه|خانواده|لوکس)/i.test(textLower),
    th: /(?:โรงแรม|เมือง|สนามบิน|ครอบครัว|หรูหรา)/i.test(textLower),
    id: /(?:hotel|kota|bandara|keluarga|mewah)/i.test(textLower),
    vi: /(?:khách sạn|thành phố|sân bay|gia đình|cao cấp)/i.test(textLower),
  };

  // Strong match?
  for (const [lang, matches] of Object.entries(langIndicators)) {
    if (matches) {
      return lang;
    }
  }

  // Default English
  return "en";
}

// Exported for front‑end / server use
const LANGUAGE_DETECTOR_SCRIPT = `
// language‑detector.js
// Lightweight language‑detection helper (no NPM needed)
window.LanguageDetector = {};

window.LanguageDetector.detect = function(text) {
  const lower = text.toLowerCase();

  const indicators = {
    es: (lower.match(/hotel|ciudad|familia|aeropuerto|lujo|reserva/gi) || []).length,
    pt: (lower.match(/hotel|cidade|família|aeroporto|luxo|reserva/gi) || []).length,
    de: (lower.match(/hotel|stadt|familie|flughafen|luxus|buchung/gi) || []).length,
    fr: (lower.match(/hotel|ville|famille|aéroport|luxe|reservation/gi) || []).length,
    it: (lower.match(/hotel|città|famiglia|aeroporto|lusso|prenota/gi) || []).length,
    zh: (lower.match(/酒店|机场|城市|豪华|家庭|预订/gi) || []).length,
    ru: (lower.match(/отель|город|семья|аэропорт|люкс|бронь/gi) || []).length,
    ar: (lower.match(/فندق|المدينة|العائلة|مطار|فاخر|حجز/gi) || []).length,
    ja: (lower.match(/ホテル|都市|家族|空港|高級|予約/gi) || []).length,
    ko: (lower.match(/호텔|도시|가족|공항|럭셔리|예약/gi) || []).length,
    tr: (lower.match(/otel|şehir|aile|havalimanı|lüks|rezervasyon/gi) || []).length,
    pl: (lower.match(/hotel|miejscowość|rodzina|lotnisko|luksusowy|rezerwacja/gi) || []).length,
    nl: (lower.match(/hotel|stad|familie|luchthaven|luxe|reserveren/gi) || []).length,
    no: (lower.match(/hotell|by|familie|flyplass|luks|reservasjon/gi) || []).length,
    se: (lower.match(/hotell|stad|familj|flygplats|lyx|bokning/gi) || []).length,
    fa: (lower.match(/هتل|شهر|خانواده|فرودگاه|لوکس|رزرو/gi) || []).length,
    th: (lower.match(/โรงแรม|เมือง|ครอบครัว|สนามบิน|หรูหรา|จอง/gi) || []).length,
    id: (lower.match(/hotel|kota|keluarga|bandara|mewah|pesan/gi) || []).length,
    vi: (lower.match(/khách sạn|thành phố|gia đình|sân bay|cao cấp|đặt phòng/gi) || []).length,
  };

  const sorted = Object.keys(indicators)
    .filter(lang => indicators[lang] > 0)
    .sort((a, b) => indicators[b] - indicators[a]);

  return sorted.length > 0 ? sorted[0] : "en";
};
`;

// Write detector JS
async function writeLanguageDetectorScript() {
  const jsPath = path.join(OUTPUT_DIR, "js", "language‑detector.js");
  await fs.ensureDir(path.dirname(jsPath));
  await fs.writeFile(jsPath, LANGUAGE_DETECTOR_SCRIPT);
  console.log(`✓ Language detector script written → ${jsPath}`);
}

// ==============================
// 3. LANGUAGE‑SPECIFIC TEMPLATES
// ==============================

const LANG_TEMPLATES = {};

LANGUAGES.forEach((lang) => {
  const L = lang;

  LANG_TEMPLATES[L] = {
    title: (city, event, keyword, index) => {
      if (L === "en") {
        if (city && event) {
          return `Best hotels in ${city} for ${event.replace("-", " ")} – ${index} 2026`;
        } else if (city) {
          return `Best ${keyword} in ${city} – ${index} 2026`;
        } else {
          return `Hotel guide ${index} 2026 | Booking.com affiliate`;
        }
      } else if (L === "es") {
        if (city && event) {
          return `Mejores hoteles en ${city} para ${event.replace("-", " ")} – Día ${index} 2026`;
        } else {
          return `Guía de hoteles en ${city} – Día ${index} 2026`;
        }
      } else if (L === "pt") {
        return `Melhores hotéis em ${city} para ${event || "turismo"} 2026`;
      } else if (L === "de") {
        return `Beste Hotels in ${city} für ${event || "Reisen"} 2026`;
      } else if (L === "fr") {
        return `Meilleurs hôtels à ${city} pour ${event || "tourisme"} 2026`;
      } else if (L === "it") {
        return `Migliori hotel a ${city} per ${event || "viaggi"} 2026`;
      } else if (L === "zh") {
        return `${city} 2026 ${event || "旅游"} 酒店推荐`;
      } else if (L === "ru") {
        return `Лучшие отели в ${city} для ${event || "путешествий"} 2026 года`;
      } else if (L === "ar") {
        return `أفضل الفنادق في ${city} لـ ${event || "السفر"} 2026`;
      } else if (L === "ja") {
        return `${city} 2026 ${event || "旅行"} 用ホテルガイド`;
      } else if (L === "ko") {
        return `${city} 2026 ${event || "여행"} 호텔 추천`;
      } else if (L === "tr") {
        return `${city} için 2026 ${
          event || "seçkin"
        } otel rehberi`;
      } else if (L === "pl") {
        return `Najlepsze hotele w ${city} na ${event || "urlop"} 2026`;
      } else if (L === "nl") {
        return `Beste hotels in ${city} voor ${event || "reizen"} 2026`;
      } else if (L === "no") {
        return `Beste hoteller i ${city} for ${event || "reiser"} 2026`;
      } else if (L === "se") {
        return `Bästa hotell i ${city} för ${event || "resor"} 2026`;
      } else if (L === "fa") {
        return `بهترین هتل‌های ${city} برای ${event || "سفر"} 2026`;
      } else if (L === "th") {
        return `โรงแรมที่ดีที่สุดใน ${city} สำหรับ ${event || "การท่องเที่ยว"} 2026`;
      } else if (L === "id") {
        return `Hotel terbaik di ${city} untuk ${event || "liburan"} 2026`;
      } else if (L === "vi") {
        return `Khách sạn tốt nhất tại ${city} cho ${event || "du lich"} 2026`;
      }
      return `Guide hoteles en ${city} 2026`;
    },

    description: (city, event, keyword) => {
      if (L === "en") {
        return `Find the best ${keyword || "hotels"} in ${city} for ${event || "2026 trips"} with Booking.com affiliate links (${BOOKING.HOME}) and Skyscanner (${SKY.HOME}).`;
      } else if (L === "es") {
        return `Encuentra los mejores ${keyword || "hoteles"} en ${city} para ${event || "viajes 2026"} con enlaces afiliados a Booking.com (${BOOKING.HOME}) y Skyscanner (${SKY.HOME}).`;
      } else if (L === "pt") {
        return `Encontre as melhores opções de ${keyword || "hotéis"} em ${city} para ${event || "viagens 2026"} com links afiliados à Booking.com (${BOOKING.HOME}) e Skyscanner (${SKY.HOME}).`;
      } else if (L === "de") {
        return `Finden Sie die besten ${keyword || "Hotels"} in ${city} für ${event || "Reisen 2026"} mit Booking.com‑Affiliate‑Links (${BOOKING.HOME}) und Skyscanner (${SKY.HOME}).`;
      } else if (L === "fr") {
        return `Trouvez les meilleurs ${
          keyword || "hôtels"
        } à ${city} pour ${event || "voyages 2026"} avec les liens affiliés Booking.com (${BOOKING.HOME}) et Skyscanner (${SKY.HOME}).`;
      } else if (L === "it") {
        return `Trova i migliori ${
          keyword || "hotel"
        } a ${city} per ${event || "viaggi 2026"} con i link affiliati Booking.com (${BOOKING.HOME}) e Skyscanner (${SKY.HOME}).`;
      } else if (L === "zh") {
        return `在 ${city} 找到 ${event || "2026年旅行"} 最好的 ${keyword || "酒店"}，并使用 Booking.com 联盟链接 (${BOOKING.HOME}) 和 Skyscanner (${SKY.HOME})。`;
      } else if (L === "ru") {
        return `Найдите лучшие ${
          keyword || "отели"
        } в ${city} для ${event || "путешествий 2026 года"} с партнерскими ссылками Booking.com (${BOOKING.HOME}) и Skyscanner (${SKY.HOME}).`;
      } else if (L === "ar") {
        return `ابحث عن أفضل ${keyword || "الفنادق"} في ${city} لـ ${event || "السفر 2026"} مع روابط شريكة Booking.com (${BOOKING.HOME}) وSkyscanner (${SKY.HOME}).`;
      } else if (L === "ja") {
        return `${city} の ${event || "旅行 2026年"} 用 ${
          keyword || "ホテル"
        } を見つけてください。Booking.com アフィリエイトリンク (${BOOKING.HOME}) と Skyscanner (${SKY.HOME}) を利用します。`;
      } else if (L === "ko") {
        return `${city} ${
          event || "여행 2026년"
        } 에서 ${keyword || "호텔"}을 찾아 보세요. Booking.com 제휴 링크 (${BOOKING.HOME})와 Skyscanner (${SKY.HOME})를 사용합니다.`;
      } else if (L === "tr") {
       
