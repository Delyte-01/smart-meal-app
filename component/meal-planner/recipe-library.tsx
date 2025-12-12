"use client";

import { useState } from "react";
import { useDrag } from "react-dnd";
import { Search, Clock, Users, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/app/dashboard/planner/page";
import Image from "next/image";

interface RecipeLibraryProps {
  recipes: Recipe[];
}


function DraggableRecipeCard({ recipe }: { recipe: Recipe }) {
  const [{ isDragging }, drag] = useDrag({
    type: "recipe",
    item: recipe,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`cursor-move transition-all duration-200  border-0 bg-gradient-to-br from-card to-card/50 ${
        isDragging
          ? "opacity-50 scale-95"
          : "hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      <CardContent className="p-4 ">
        <div className="flex items-start gap-3">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            className="w-16 h-16 rounded-full shadow-sm ring-4 ring-green-200 object-cover flex-shrink-0 "
            width={64}
            height={64}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {recipe.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {recipe.prepTime + recipe.cookTime}m
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {recipe.servings}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary">
                {recipe.calories} cal
              </span>
              <div className="flex gap-1 text-xs">
                <span className="text-green-600">{recipe.protein}p</span>
                <span className="text-orange-600">{recipe.carbs}c</span>
                <span className="text-red-600">{recipe.fat}f</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.dietTypes.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecipeLibrary({ recipes }: RecipeLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.mealType.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];

  return (
    <Card className="border-0 shadow-lg h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Recipe Library
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full text-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Recipe List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <DraggableRecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No recipes found</p>
            </div>
          )}
        </div>

        {/* Drag Instruction */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
          💡 Drag recipes to meal slots or click on a slot to add
        </div>
      </CardContent>
    </Card>
  );
}
