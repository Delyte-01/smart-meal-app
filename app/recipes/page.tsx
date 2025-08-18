"use client"
import SearchAndFilterBar from '@/component/filter-search-bar';
import MealFilters from '@/component/filter-sort';
import RecipeGrid from '@/component/recipe-grid';
import { useRecipeStore } from '@/lib/store/recipeStore';
import React, { useEffect } from 'react'



const RecipePage = () =>
{
  const { recipes, loading, error, getRecipes } = useRecipeStore();
    useEffect(() => {
      getRecipes();
    }, [getRecipes]);

  return (
    <div className="bg-[#f9fafb] min-h-screen p-4 sm:p-6 lg:p-10   ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Explore Recipes</h1>
        {/* <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} /> */}
        {loading && <p>Loading recipes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col md:flex-row gap-4">
          <MealFilters />
          <RecipeGrid recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default RecipePage