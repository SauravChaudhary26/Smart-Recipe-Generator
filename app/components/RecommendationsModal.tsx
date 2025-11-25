"use client";

import { Recipe } from "@/app/types";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RecipeCard } from "./RecipeCard";
import { useEffect } from "react";

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendations: Recipe[];
  favorites: string[];
  ratings: Record<string, number>;
  onToggleFavorite: (id: string) => void;
  onRate: (id: string, rating: number) => void;
}

export function RecommendationsModal({ 
  isOpen, 
  onClose, 
  recommendations,
  favorites,
  ratings,
  onToggleFavorite,
  onRate
}: RecommendationsModalProps) {
  
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-20">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-yellow-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recommended for You</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((recipe) => (
                      <div key={recipe.id} className="relative">
                        <div className="absolute -top-3 -right-3 z-10 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm transform rotate-12">
                          Suggested
                        </div>
                        <RecipeCard 
                          recipe={recipe} 
                          isFavorite={favorites.includes(recipe.id)}
                          rating={ratings[recipe.id] || 0}
                          onToggleFavorite={() => onToggleFavorite(recipe.id)}
                          onRate={(rating) => onRate(recipe.id, rating)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p className="text-lg">No recommendations yet.</p>
                    <p className="text-sm mt-2">Favorite or rate more recipes to get personalized suggestions!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
