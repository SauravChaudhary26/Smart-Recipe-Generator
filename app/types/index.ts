export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs?: string;
  fat?: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  nutritionalInfo: NutritionalInfo;
  dietaryTags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  cookingTime: string;
  servingSize: string;
}