const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  spoonacularScore?: number; // rating (0–100)
  dishTypes?: string[];
  cuisines?: string[];
  pricePerServing?: number;
  summary?: string; // HTML string with description
  instructions?: string; // may be HTML
  nutrition?: {
    nutrients: Nutrient[];
  };
}

export interface Nutrient {
  name: string; // e.g. "Protein"
  amount: number; // e.g. 25
  unit: string; // e.g. "g"
}

// 🔹 Filters and sorting options
export interface RecipeFilters {
  cuisine?: string; // e.g. "Italian"
  diet?: string; // e.g. "vegetarian"
  intolerances?: string; // e.g. "gluten"
  type?: string; // e.g. "dessert"
  sort?: "popularity" | "healthiness" | "price" | "time" | "calories";
  sortDirection?: "asc" | "desc";
  minCalories?: number;
  maxCalories?: number;
  minProtein?: number;
  maxProtein?: number;
  minCarbs?: number;
  maxCarbs?: number;
  minFat?: number;
  maxFat?: number;
  mealType?: string; // e.g. "breakfast", "lunch", "dinner",
  calories?: [number, number]; // range
  time?: [number, number]; // range in minutes
}

export async function fetchRecipes(
  query: string = "",
  number: number = 30,
  filters: RecipeFilters = {}
): Promise<Recipe[]> {
  const params = new URLSearchParams({
    query,
    number: number.toString(),
    addRecipeInformation: "true",
    addRecipeNutrition: "true",
    apiKey: API_KEY!,
  });

  // 🔹 Add filters dynamically
  if (filters.cuisine) params.append("cuisine", filters.cuisine);
  if (filters.diet) params.append("diet", filters.diet);
  if (filters.intolerances) params.append("intolerances", filters.intolerances);
  if (filters.type) params.append("type", filters.type);
  if (filters.sort) params.append("sort", filters.sort);
  if (filters.sortDirection)
    params.append("sortDirection", filters.sortDirection);

  if (filters.minCalories)
    params.append("minCalories", filters.minCalories.toString());
  if (filters.maxCalories)
    params.append("maxCalories", filters.maxCalories.toString());
  if (filters.minProtein)
    params.append("minProtein", filters.minProtein.toString());
  if (filters.maxProtein)
    params.append("maxProtein", filters.maxProtein.toString());
  if (filters.minCarbs) params.append("minCarbs", filters.minCarbs.toString());
  if (filters.maxCarbs) params.append("maxCarbs", filters.maxCarbs.toString());
  if (filters.minFat) params.append("minFat", filters.minFat.toString());
  if (filters.maxFat) params.append("maxFat", filters.maxFat.toString());

  if (filters.mealType) params.append("mealType", filters.mealType);

  const url = `${BASE_URL}/complexSearch?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch recipes");

  const data = await res.json();
  return data.results;
}
