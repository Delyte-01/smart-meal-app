// stores/useRecipeModal.ts
import { Recipe } from "@/types/recipe";
import { create } from "zustand";


interface RecipeModalState {
  isOpen: boolean;
  day: string | null;
  mealType: string | null;
  recipe: Recipe | null;
  openModal: (day: string, mealType: string) => void;
  closeModal: () => void;
  setRecipe: (recipe: Recipe) => void;
}

export const useRecipeModal = create<RecipeModalState>((set) => ({
  isOpen: false,
  day: null,
  mealType: null,
  recipe: null,
  openModal: (day, mealType) =>
    set({ isOpen: true, day, mealType, recipe: null }),
  closeModal: () =>
    set({ isOpen: false, day: null, mealType: null, recipe: null }),
  setRecipe: (recipe) => set({ recipe }),
}));
