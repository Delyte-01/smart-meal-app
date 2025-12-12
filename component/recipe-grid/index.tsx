"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import RecipeCard from "../recipe-card";
import { useRecipeStore } from "@/lib/store/recipeStore";

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  healthScore?: number;
  diets?: string[];
  nutrition?: {
    nutrients: { name: string; amount: number; unit: string }[];
  };
}

interface RecipeGridProps {
  recipes: SpoonacularRecipe[];
}

const ITEMS_PER_PAGE = 6;

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error } = useRecipeStore();

  // Memoize expensive calculations — prevents re-running on every render
  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return recipes.slice(startIndex, endIndex);
  }, [recipes, currentPage]);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Extract nutrition values once per recipe
  const getNutrient = (recipe: SpoonacularRecipe, name: string) =>
    recipe.nutrition?.nutrients.find((n) => n.name === name)?.amount || 0;

  // Early return for better readability
  if (loading) {
    return <RecipeGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No recipes found. Try searching something else!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden">
      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {paginatedRecipes.map((recipe) => {
          const protein = getNutrient(recipe, "Protein");
          const carbs = getNutrient(recipe, "Carbohydrates");
          const fat = getNutrient(recipe, "Fat");
          const calories = getNutrient(recipe, "Calories");

          return (
            <RecipeCard
              key={recipe.id} // Good: stable key
              recipe={{
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                summary: recipe.summary,
                calories: Math.round(calories),
                protein: Math.round(protein),
                carbs: Math.round(carbs),
                fat: Math.round(fat),
                servings: recipe.servings || 1,
                totalTime: recipe.readyInMinutes || 0,
                rating: recipe.healthScore || 0,
                dietTypes: recipe.diets || [],
              }}
            />
          );
        })}
      </div>

      {/* Pagination - Only show if needed */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-6 border-t border-gray-200 dark:border-zinc-800">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// Extracted Skeleton for cleaner code
function RecipeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}
