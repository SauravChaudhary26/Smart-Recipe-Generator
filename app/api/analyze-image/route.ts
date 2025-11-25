import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set. Using mock data.");
      // Mock response for development
      return NextResponse.json({
        ingredients: ["tomato", "pasta", "garlic"],
        substitutions: {
          "pasta": ["zucchini noodles", "gluten-free pasta"],
          "garlic": ["garlic powder", "shallots"]
        }
      });
    }

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.5-flash"});

    const prompt = `
      Analyze this image and identify the food ingredients present.
      Return a JSON object with two keys:
      1. "ingredients": an array of strings, each being a distinct ingredient found.
      2. "substitutions": an object where keys are the identified ingredients (only if common allergens or hard to find) and values are arrays of 2-3 common substitution strings.
      
      Example format:
      {
        "ingredients": ["eggs", "milk", "flour"],
        "substitutions": {
          "milk": ["almond milk", "soy milk"],
          "flour": ["almond flour", "oat flour"]
        }
      }
      
      Only return the JSON. Do not include markdown formatting.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: file.type,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      const data = JSON.parse(cleanText);
      
      if (!data.ingredients || data.ingredients.length === 0) {
         return NextResponse.json({ error: "No ingredients found" }, { status: 404 });
      }

      return NextResponse.json(data);
    } catch (e) {
      console.error("Failed to parse Gemini response:", text);
      return NextResponse.json({ error: "Failed to parse ingredient data" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}