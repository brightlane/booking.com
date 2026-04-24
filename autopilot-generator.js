import OpenAI from "openai";
import crypto from "crypto";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a unique SEO travel page
 * Safe for programmatic SEO (not spam pattern)
 */

export async function generateTravelPage(job) {
  const { city, intent, country, travelerType } = job;

  const pageId = crypto
    .createHash("md5")
    .update(`${city}-${intent}-${travelerType}`)
    .digest("hex");

  const prompt = `
You are an expert travel editor writing a high-quality SEO page.

RULES:
- 1200–2200 words
- No keyword stuffing
- Must feel human written
- Include real travel advice
- Include structured sections (H2 headings)
- Include Booking.com hotel search link naturally
- No repetitive phrasing across pages

PAGE CONTEXT:
City: ${city}
Country: ${country}
Intent: ${intent}
Traveler Type: ${travelerType}

WRITE STRUCTURE:

1. Introduction (city overview for this traveler type)
2. Best areas to stay in ${city}
3. Recommended hotel types (budget / mid / luxury)
4. Neighborhood breakdown
5. Travel tips specific to ${intent}
6. FAQ section
7. Booking suggestion section (natural CTA)

Return clean markdown only.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a senior travel content editor." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;

  return {
    id: pageId,
    slug: `${city.toLowerCase()}-${intent.toLowerCase()}-${travelerType.toLowerCase()}`,
    city,
    intent,
    travelerType,
    content,
    affiliateLinks: generateAffiliateLinks(city),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Booking affiliate injection (safe contextual linking)
 */
function generateAffiliateLinks(city) {
  return {
    bookingSearch: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
      city
    )}&aid=1858279`,
  };
}
