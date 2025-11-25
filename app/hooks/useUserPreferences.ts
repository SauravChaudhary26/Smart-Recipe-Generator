import { useState, useEffect } from "react";

export interface UserPreferences {
  favorites: string[];
  ratings: Record<string, number>;
  toggleFavorite: (recipeId: string) => void;
  rateRecipe: (recipeId: string, rating: number) => void;
}

export function useUserPreferences(): UserPreferences {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const savedRatings = localStorage.getItem("ratings");

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }

    if (savedRatings) {
      try {
        setRatings(JSON.parse(savedRatings));
      } catch (e) {
        console.error("Failed to parse ratings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ratings", JSON.stringify(ratings));
    }
  }, [ratings, isLoaded]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const rateRecipe = (recipeId: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [recipeId]: rating,
    }));
  };

  return {
    favorites,
    ratings,
    toggleFavorite,
    rateRecipe,
  };
}
