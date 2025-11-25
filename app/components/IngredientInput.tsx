"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

export function IngredientInput({ ingredients, setIngredients }: IngredientInputProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetching ingredients on mount
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch("/api/ingredients");
        if (res.ok) {
          const data = await res.json();
          setAllIngredients(data);
        }
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (input.trim().length > 0) {
      const filtered = allIngredients.filter(ing => 
        ing.toLowerCase().includes(input.toLowerCase()) && !ingredients.includes(ing)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, ingredients, allIngredients]);

  const addIngredient = (ing: string) => {
    if (ing && !ingredients.includes(ing)) {
      setIngredients([...ingredients, ing]);
      setInput("");
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input) {
      e.preventDefault();
      addIngredient(input.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 dark:focus-within:ring-blue-900/20 transition-all">
          <Search className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => input.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
            placeholder="Type an ingredient (e.g., 'chicken', 'tomato')..."
            className="flex-1 outline-none text-gray-700 dark:text-gray-100 placeholder-gray-400 bg-transparent ml-3"
          />
          <button 
            onClick={() => addIngredient(input.trim())}
            disabled={!input.trim()}
            className="ml-2 bg-blue-500 text-white p-1.5 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addIngredient(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-between group"
                >
                  <span>{suggestion}</span>
                  <Plus size={16} className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 min-h-10">
        <AnimatePresence>
          {ingredients.map((ing) => (
            <motion.span
              key={ing}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm"
            >
              {ing}
              <button
                onClick={() => removeIngredient(ing)}
                className="ml-2 p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        {ingredients.length === 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-sm italic mt-2">No ingredients added yet.</p>
        )}
      </div>
    </div>
  );
}
