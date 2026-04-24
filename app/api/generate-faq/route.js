import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate structured FAQ safely (NOT spam scale)
export async function POST(req) {
  try {
    const { topic, destination, affiliateUrl } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Missing topic" }, { status: 400 });
    }

    const prompt = `
Generate a high-quality SEO FAQ for:
Topic: ${topic}
Destination: ${destination || "Travel"}

Rules:
- 10 to 15 questions only
- Natural human tone
- No keyword stuffing
- Must include travel booking intent
- Include affiliate link naturally where relevant: ${affiliateUrl}
- Avoid repetition
- Make answers 2–4 sentences
Return JSON:
{
  "faqs": [
    { "q": "", "a": "" }
  ]
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const data = JSON.parse(response.choices[0].message.content);

    const saved = await prisma.fAQ.create({
      data: {
        topic,
        destination,
        content: data,
      },
    });

    return NextResponse.json(saved);
  } catch (err) {
    return NextResponse.json(
      { error: "Generation failed", details: err.message },
      { status: 500 }
    );
  }
}
