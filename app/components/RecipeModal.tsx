"use client";

import { Recipe } from "@/app/types";
import { X, Clock, Users, Flame, ChefHat, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface RecipeModalProps {
  recipe: Recipe & { matchPercentage?: number; missingIngredients?: string[] };
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  onRate: (rating: number) => void;
}

export function RecipeModal({ recipe, isOpen, onClose, rating, onRate }: RecipeModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const difficultyColor = {
    Easy: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    Medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    Hard: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors z-10"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>

              {/* Header Image / Title Section */}
              <div className="p-8 pb-0">
                <div className="flex items-start justify-between mb-4 pr-8">
                  <div>
                    {recipe.matchPercentage !== undefined && (
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-bold mb-3",
                        recipe.matchPercentage === 1 ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                      )}>
                        {Math.round(recipe.matchPercentage * 100)}% Match
                      </span>
                    )}
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{recipe.title}</h2>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={cn("px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5", difficultyColor[recipe.difficulty])}>
                    <ChefHat size={16} /> {recipe.difficulty}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                    <Clock size={16} /> {recipe.cookingTime}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                    <Users size={16} /> {recipe.servingSize}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                    <Flame size={16} /> {recipe.nutritionalInfo.calories} kcal
                  </span>
                </div>

                {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                    <p className="text-sm text-red-600 dark:text-red-400 font-semibold mb-2">Missing Ingredients:</p>
                    <div className="flex flex-wrap gap-2">
                      {recipe.missingIngredients.map(ing => (
                        <span key={ing} className="text-xs text-red-600 dark:text-red-400 bg-white dark:bg-red-900/40 px-2 py-1 rounded-md border border-red-100 dark:border-red-900/30 font-medium">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable Content */}
              <div className="p-8 pt-4 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      Ingredients
                    </h3>
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                          <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0" />
                          <span className="text-sm font-medium">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Nutrition</h3>
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Protein</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{recipe.nutritionalInfo.protein}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Carbs</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{recipe.nutritionalInfo.carbs || "-"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Fat</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{recipe.nutritionalInfo.fat || "-"}</span>
                      </div>
                    </div>

                    {/* Rating Section */}
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Rate this recipe</h4>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => onRate(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              size={28}
                              fill={star <= rating ? "currentColor" : "none"}
                              className={star <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Instructions</h3>
                  <div className="space-y-4">
                    {recipe.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
