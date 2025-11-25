import { useMemo } from "react";
import { Recipe } from "../types";

interface UseRecommendationsProps {
  allRecipes: Recipe[];
  favorites: string[];
  ratings: Record<string, number>;
}

export function useRecommendations({ allRecipes, favorites, ratings }: UseRecommendationsProps) {
  const recommendations = useMemo(() => {
    // 1. Build User Profile
    const tagWeights: Record<string, number> = {};
    const difficultyWeights: Record<string, number> = {};
    
    const likedRecipeIds = new Set([
      ...favorites,
      ...Object.entries(ratings)
        .filter(([_, rating]) => rating >= 4)
        .map(([id]) => id)
    ]);

    if (likedRecipeIds.size === 0) return [];

    likedRecipeIds.forEach(id => {
      const recipe = allRecipes.find(r => r.id === id);
      if (!recipe) return;

      // Weight tags
      recipe.dietaryTags.forEach(tag => {
        tagWeights[tag] = (tagWeights[tag] || 0) + 1;
      });

      // Weight difficulty
      difficultyWeights[recipe.difficulty] = (difficultyWeights[recipe.difficulty] || 0) + 1;
    });

    // 2. Score Candidates
    const candidates = allRecipes.filter(recipe => 
      !likedRecipeIds.has(recipe.id) && // Not already liked
      (ratings[recipe.id] === undefined || ratings[recipe.id] >= 3) // Not disliked (rated < 3)
    );

    const scoredCandidates = candidates.map(recipe => {
      let score = 0;

      // Score by tags
      recipe.dietaryTags.forEach(tag => {
        score += (tagWeights[tag] || 0) * 2;
      });

      // Score by difficulty
      score += (difficultyWeights[recipe.difficulty] || 0);

      return { ...recipe, score };
    });

    // 3. Sort and Return Top 3
    return scoredCandidates
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

  }, [allRecipes, favorites, ratings]);

  return recommendations;
}
