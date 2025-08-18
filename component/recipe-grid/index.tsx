"use client";

import { useState } from "react";
import RecipeCard from "../recipe-card";

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  healthScore?: number;
  diets?: string[];
  // optional nutrition data if included
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

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {currentRecipes.map((recipe) => {
            const protein =
              recipe.nutrition?.nutrients.find((n) => n.name === "Protein")
                ?.amount || 0;
            const carbs =
              recipe.nutrition?.nutrients.find(
                (n) => n.name === "Carbohydrates"
              )?.amount || 0;
            const fat =
              recipe.nutrition?.nutrients.find((n) => n.name === "Fat")
                ?.amount || 0;
            const calories =
              recipe.nutrition?.nutrients.find((n) => n.name === "Calories")
                ?.amount || 0;

            return (
              <RecipeCard
                key={recipe.id}
                recipe={{
                  id: recipe.id,
                  title: recipe.title,
                  image: recipe.image,
                  summary: recipe.summary,
                  calories,
                  protein,
                  carbs,
                  fat,
                  servings: recipe.servings || 0,
                  totalTime: recipe.readyInMinutes || 0,
                  difficulty: "Medium", // Spoonacular doesn’t provide, so placeholder
                  rating: recipe.healthScore || 0, // placeholder for ratings
                  dietTypes: recipe.diets || [],
                }}
              />
            
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-white ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-white ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
