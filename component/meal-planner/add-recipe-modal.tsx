"use client";

import { useState } from "react";
import { Search, Clock, Users, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRecipeModal } from "@/lib/store/recipeModal";
import type { Recipe } from "@/app/dashboard/planner/page";
import { useMealPlanStore } from "@/lib/store/mealPlan";

interface AddRecipeModalProps {
  recipes: Recipe[];
  // onAddRecipe: (day: string, mealType: string, recipe: Recipe) => void;
}

export function AddRecipeModal({ recipes }: AddRecipeModalProps) {
  const { isOpen, closeModal, day, mealType } = useRecipeModal();
  const setRecipe = useMealPlanStore((s) => s.setRecipe);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen || !day || !mealType) return null;

  // ✅ Filter recipes by search + mealType
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesMealType = recipe.mealType.some(
      (type) => type.toLowerCase() === mealType.toLowerCase()
    );
    return matchesSearch && (searchQuery || matchesMealType);
  });

  const handleAddRecipe = (recipe: any) => {
    setRecipe(day, mealType, recipe);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden z-10">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Add Recipe to {day}{" "}
            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          {/* Recipe List */}
          <div className="space-y-3">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="border-0 bg-gradient-to-br from-card to-card/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full shadow-sm ring-4 ring-green-200 object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-2">{recipe.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {recipe.prepTime + recipe.cookTime}m
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {recipe.servings}
                          </div>
                          <span className="font-medium text-primary">
                            {recipe.calories} cal
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {recipe.dietTypes.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddRecipe(recipe)}
                            className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No recipes found for this meal type</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
