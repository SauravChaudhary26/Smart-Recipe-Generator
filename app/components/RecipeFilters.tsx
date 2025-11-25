"use client";

import { Filter } from "lucide-react";

interface RecipeFiltersProps {
  filters: {
    dietary: string[];
    difficulty: string[];
    maxTime: number;
    servingSize: number;
  };
  setFilters: (filters: any) => void;
}

export function RecipeFilters({ filters, setFilters }: RecipeFiltersProps) {
  const toggleDietary = (tag: string) => {
    const newTags = filters.dietary.includes(tag)
      ? filters.dietary.filter((t: string) => t !== tag)
      : [...filters.dietary, tag];
    setFilters({ ...filters, dietary: newTags });
  };

  const toggleDifficulty = (diff: string) => {
    const newDiffs = filters.difficulty.includes(diff)
      ? filters.difficulty.filter((d: string) => d !== diff)
      : [...filters.difficulty, diff];
    setFilters({ ...filters, difficulty: newDiffs });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
      <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-100 font-semibold">
        <Filter size={20} />
        <h3>Filters</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Dietary Preferences</label>
          <div className="flex flex-wrap gap-2">
            {["Vegetarian", "Vegan", "Gluten-Free", "High Protein"].map(tag => (
              <button
                key={tag}
                onClick={() => toggleDietary(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filters.dietary.includes(tag)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Difficulty</label>
          <div className="flex flex-wrap gap-2">
            {["Easy", "Medium", "Hard"].map(diff => (
              <button
                key={diff}
                onClick={() => toggleDifficulty(diff)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filters.difficulty.includes(diff)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
            Max Cooking Time: <span className="text-blue-600 dark:text-blue-400 font-bold">{filters.maxTime} mins</span>
          </label>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={filters.maxTime}
            onChange={(e) => setFilters({ ...filters, maxTime: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
            <span>10m</span>
            <span>120m</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
            Min Serving Size: <span className="text-blue-600 dark:text-blue-400 font-bold">{filters.servingSize}+ people</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={filters.servingSize}
            onChange={(e) => setFilters({ ...filters, servingSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
            <span>1 person</span>
            <span>10+ people</span>
          </div>
        </div>
      </div>
    </div>
  );
}
