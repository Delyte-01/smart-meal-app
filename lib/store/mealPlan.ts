import { Recipe } from "@/types/recipe";
import { create } from "zustand";
// import type { Recipe } from "@/app/dashboard/planner/page";



// Define the type of one slot (day + mealType → recipe)
type MealPlan = {
  [day: string]: {
    [mealType: string]: Recipe | null;
  };
};

interface MealPlanState {
  mealPlan: MealPlan;
  setRecipe: (day: string, mealType: string, recipe: Recipe) => void;
  removeRecipe: (day: string, mealType: string) => void;
  resetPlan: () => void;
}

export const useMealPlanStore = create<MealPlanState>((set) => ({
  mealPlan: {
    Monday: { Breakfast: null, Lunch: null, Dinner: null },
    Tuesday: { Breakfast: null, Lunch: null, Dinner: null },
    Wednesday: { Breakfast: null, Lunch: null, Dinner: null },
    Thursday: { Breakfast: null, Lunch: null, Dinner: null },
    Friday: { Breakfast: null, Lunch: null, Dinner: null },
    Saturday: { Breakfast: null, Lunch: null, Dinner: null },
    Sunday: { Breakfast: null, Lunch: null, Dinner: null },
  },

  setRecipe: (day, mealType, recipe) =>
    set((state) => ({
      mealPlan: {
        ...state.mealPlan,
        [day]: {
          ...state.mealPlan[day],
          [mealType]: recipe,
        },
      },
    })),

  removeRecipe: (day, mealType) =>
    set((state) => ({
      mealPlan: {
        ...state.mealPlan,
        [day]: {
          ...state.mealPlan[day],
          [mealType]: null,
        },
      },
    })),

  resetPlan: () =>
    set(() => ({
      mealPlan: {
        Monday: { Breakfast: null, Lunch: null, Dinner: null },
        Tuesday: { Breakfast: null, Lunch: null, Dinner: null },
        Wednesday: { Breakfast: null, Lunch: null, Dinner: null },
        Thursday: { Breakfast: null, Lunch: null, Dinner: null },
        Friday: { Breakfast: null, Lunch: null, Dinner: null },
        Saturday: { Breakfast: null, Lunch: null, Dinner: null },
        Sunday: { Breakfast: null, Lunch: null, Dinner: null },
      },
    })),
}));
