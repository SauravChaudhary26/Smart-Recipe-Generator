"use client";

import { Recipe } from "../types";
import { RecipeCard } from "./RecipeCard";

interface RecipeListProps {
  recipes: (Recipe & { matchPercentage?: number; missingIngredients?: string[] })[];
  isLoading: boolean;
  favorites: string[];
  ratings: Record<string, number>;
  onToggleFavorite: (id: string) => void;
  onRate: (id: string, rating: number) => void;
}

export function RecipeList({ recipes, isLoading, favorites, ratings, onToggleFavorite, onRate }: RecipeListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl h-96 animate-pulse shadow-sm border border-gray-100 dark:border-gray-700" />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No recipes found matching your criteria.</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adding more ingredients or adjusting filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          isFavorite={favorites.includes(recipe.id)}
          rating={ratings[recipe.id] || 0}
          onToggleFavorite={() => onToggleFavorite(recipe.id)}
          onRate={(rating) => onRate(recipe.id, rating)}
        />
      ))}
    </div>
  );
}
