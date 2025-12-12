"use client";

import React, { useEffect } from "react";
import MealFilters from "@/component/filter-sort";
import RecipeGrid from "@/component/recipe-grid";
import { useRecipeStore } from "@/lib/store/recipeStore";
import { Search } from "lucide-react";

const RecipePage = () => {
  const { recipes, error, getRecipes } = useRecipeStore();

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-[#003a17] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Delicious Recipes
          </h1>
          <p className="text-xl opacity-90">
            Search from thousands of healthy, tasty meals tailored to your diet
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
       

        {/* Filters on Top (Mobile + Desktop) */}
        <div className="mb-10">
          <MealFilters />
        </div>

        {/* Recipe Grid */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <RecipeGrid recipes={recipes} />
        </div>

        {/* Empty State */}
        {!error && recipes.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search for something new!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
