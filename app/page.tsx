"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "./components/ImageUpload";
import { IngredientInput } from "./components/IngredientInput";
import { RecipeList } from "./components/RecipeList";
import { RecipeFilters } from "./components/RecipeFilters";
import { ThemeToggle } from "./components/ThemeToggle";
import { Recipe } from "./types";
import { ChefHat, Sparkles } from "lucide-react";
import { useUserPreferences } from "./hooks/useUserPreferences";
import { useRecommendations } from "./hooks/useRecommendations";
import recipesData from "@/data/recipes.json";
import { RecommendationsModal } from "./components/RecommendationsModal";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<(Recipe & { matchPercentage?: number; missingIngredients?: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecModalOpen, setIsRecModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dietary: [] as string[],
    difficulty: [] as string[],
    maxTime: 60,
    servingSize: 1,
  });

  const { favorites, ratings, toggleFavorite, rateRecipe } = useUserPreferences();
  
  // Cast recipesData to Recipe[] as it's imported from JSON
  const allRecipes = recipesData as unknown as Recipe[];
  const recommendations = useRecommendations({ allRecipes, favorites, ratings });

  // Fetch matched recipes when ingredients change
  useEffect(() => {
    const fetchRecipes = async () => {
      if (ingredients.length === 0) {
        setRecipes([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch("/api/recipes/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        });
        
        if (res.ok) {
          const data = await res.json();
          setRecipes(data);
        }
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce slightly to avoid too many calls
    const timeoutId = setTimeout(fetchRecipes, 500);
    return () => clearTimeout(timeoutId);
  }, [ingredients]);

  const handleIngredientsFound = (foundIngredients: string[], substitutions: Record<string, string[]>) => {
    // Merge found ingredients with existing ones, avoiding duplicates
    const newIngredients = Array.from(new Set([...ingredients, ...foundIngredients]));
    setIngredients(newIngredients);
    
    // Could also show substitutions in a toast or modal here
    if (Object.keys(substitutions).length > 0) {
      console.log("Substitutions found:", substitutions);
      // For now, we just log them, but in a real app we'd show them to the user
    }
  };

  // Filter recipes on the client side
  const filteredRecipes = recipes.filter(recipe => {
    // Filter by dietary tags
    if (filters.dietary.length > 0) {
      const hasAllTags = filters.dietary.every(tag => recipe.dietaryTags.includes(tag));
      if (!hasAllTags) return false;
    }

    // Filter by difficulty
    if (filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(recipe.difficulty)) return false;
    }

    // Filter by cooking time
    const time = parseInt(recipe.cookingTime); // Assuming format "20 mins"
    if (!isNaN(time) && time > filters.maxTime) return false;

    // Filter by serving size
    const servingSizeMatch = recipe.servingSize.match(/\d+/);
    if (servingSizeMatch) {
      const serving = parseInt(servingSizeMatch[0]);
      if (serving < filters.servingSize) return false;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ChefHat className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Smart Recipe Generator</h1>
          </div>
          <div className="flex items-center gap-4">
            {recommendations.length > 0 && (
              <button
                onClick={() => setIsRecModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors font-medium text-sm"
              >
                <Sparkles size={18} />
                <span>Recommendations</span>
                <span className="bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {recommendations.length}
                </span>
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Inputs & Filters */}
          <div className="lg:col-span-4 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Ingredients</h2>
              <ImageUpload onIngredientsFound={handleIngredientsFound} />
              <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
            </section>

            <section>
              <RecipeFilters filters={filters} setFilters={setFilters} />
            </section>
          </div>

          {/* Right Content: Recipe Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Suggested Recipes</h2>
            </div>
            
            <RecipeList 
              recipes={filteredRecipes} 
              isLoading={isLoading}
              favorites={favorites}
              ratings={ratings}
              onToggleFavorite={toggleFavorite}
              onRate={rateRecipe}
            />
          </div>
        </div>
      </div>

      <RecommendationsModal 
        isOpen={isRecModalOpen}
        onClose={() => setIsRecModalOpen(false)}
        recommendations={recommendations}
        favorites={favorites}
        ratings={ratings}
        onToggleFavorite={toggleFavorite}
        onRate={rateRecipe}
      />
    </main>
  );
}