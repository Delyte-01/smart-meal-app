// /store/recipeStore.ts
import { create } from "zustand";
import { Recipe, RecipeFilters, fetchRecipes } from "@/lib/spoonacular";

// Define filter types
// interface Filters {
//   cuisine?: string;
//   diet?: string;
//   intolerances?: string;
// }

// Zustand store state & actions
interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  filters: RecipeFilters; // Stores selected filters
  sort: string; // Stores selected sort option
  getRecipes: (query?: string) => Promise<void>;
  setFilters: (filters: RecipeFilters) => void;
  setSort: (sort: string) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: [],
  loading: false,
  error: null,
  filters: {}, // start with empty filters
  sort: "", // no sorting applied by default

  // Fetch recipes with query + applied filters + sort
  getRecipes: async (query = "") => {
    try {
      set({ loading: true, error: null });

      // Pull current filters & sort from state
      const { filters, sort } = get();

      // Pass them to your API function
      const data = await fetchRecipes(query, 30, filters);

      set({ recipes: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  // Update filters (does not auto-fetch yet, you call getRecipes after)
  setFilters: (filters) => {
    set({ filters });
     get().getRecipes();
  },

  // Update sorting option
  setSort: (sort) => {
    set({ sort });
     get().getRecipes();
  },
}));
