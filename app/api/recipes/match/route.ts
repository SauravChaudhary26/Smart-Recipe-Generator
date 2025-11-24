import { NextResponse } from "next/server";
import recipesData from "@/data/recipes.json";
import { Recipe } from "@/app/types";

// Helper function for ingredients matching
function isMatch(ingredient: string, query: string): boolean {
  const i = ingredient.toLowerCase();
  const q = query.toLowerCase().trim();
  
  if (!q) return false;

  // For very short queries (1-2 chars), require exact match to avoid noise
  if (q.length < 3) {
    return i === q || i.split(" ").includes(q);
  }

  // regex match for partial words
  try {
    const regex = new RegExp(`\\b${q}`, 'i');
    return regex.test(i);
  } catch (e) {
    // Fallback to simple includes if regex fails
    return i.includes(q);
  }
}

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json({ error: "Invalid ingredients list" }, { status: 400 });
    }

    const recipes = recipesData as Recipe[];
    
    const matchedRecipes = recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients;
      
      // Count how many user ingredients match the recipe ingredients
      const matches = recipeIngredients.filter(rIng => 
        ingredients.some(uIng => isMatch(rIng, uIng))
      );

      const matchCount = matches.length;
      const totalCount = recipeIngredients.length;
      const matchPercentage = matchCount / totalCount;

      // If we have at least 30% of ingredients or 3 ingredients, it's a "match" candidate
      // Or if the user has very few ingredients, we show what they can make.
      
      return {
        ...recipe,
        matchCount,
        matchPercentage,
        missingIngredients: recipeIngredients.filter(rIng => 
          !ingredients.some(uIng => isMatch(rIng, uIng))
        )
      };
    })
    .filter(r => r.matchCount > 0) // Must match at least one ingredient
    .sort((a, b) => b.matchCount - a.matchCount); // Sort by most matches

    return NextResponse.json(matchedRecipes);

  } catch (error) {
    console.error("Error matching recipes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}