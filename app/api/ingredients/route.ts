import { NextResponse } from "next/server";
import recipesData from "@/data/recipes.json";
import { Recipe } from "@/app/types";

export async function GET() {
  try {
    const recipes = recipesData as Recipe[];
    const allIngredients = new Set<string>();

    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        // Normalising ingredients to lowercase and trimming whitespace
        allIngredients.add(ing.toLowerCase().trim());
      });
    });

    // Sorting to navigate in dropdown easily
    const sortedIngredients = Array.from(allIngredients).sort();

    return NextResponse.json(sortedIngredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}