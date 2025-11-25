"use client";

import { useState } from "react";
import { Recipe } from "@/app/types";
import { Clock, ChefHat, Users, Star, Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RecipeModal } from "./RecipeModal";

interface RecipeCardProps {
  recipe: Recipe & { matchPercentage?: number; missingIngredients?: string[] };
  isFavorite: boolean;
  rating: number;
  onToggleFavorite: () => void;
  onRate: (rating: number) => void;
}

export function RecipeCard({ recipe, isFavorite, rating, onToggleFavorite, onRate }: RecipeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const difficultyColor = {
    Easy: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    Medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    Hard: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              {recipe.matchPercentage !== undefined && (
                <span className={cn(
                  "inline-block px-2 py-1 rounded-md text-xs font-bold mb-2",
                  recipe.matchPercentage === 1 ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                )}>
                  {Math.round(recipe.matchPercentage * 100)}% Match
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{recipe.title}</h3>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
              className="text-gray-400 hover:text-red-500 transition-colors z-10"
            >
              <Star size={24} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-red-500" : ""} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1", difficultyColor[recipe.difficulty])}>
              <ChefHat size={12} /> {recipe.difficulty}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <Clock size={12} /> {recipe.cookingTime}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center gap-1">
              <Flame size={12} /> {recipe.nutritionalInfo.calories} kcal
            </span>
          </div>

          {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
              <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">Missing Ingredients:</p>
              <div className="flex flex-wrap gap-1">
                {recipe.missingIngredients.slice(0, 3).map(ing => (
                  <span key={ing} className="text-xs text-red-500 dark:text-red-400 bg-white dark:bg-red-900/40 px-1.5 py-0.5 rounded border border-red-100 dark:border-red-900/30">
                    {ing}
                  </span>
                ))}
                {recipe.missingIngredients.length > 3 && (
                  <span className="text-xs text-red-500 dark:text-red-400 px-1.5 py-0.5">+{recipe.missingIngredients.length - 3} more</span>
                )}
              </div>
            </div>
          )}

          <div className="w-full flex items-center justify-between pt-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            View Recipe
            <ArrowRight size={16} />
          </div>
        </div>
      </motion.div>

      <RecipeModal 
        recipe={recipe} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        rating={rating}
        onRate={onRate}
      />
    </>
  );
}
