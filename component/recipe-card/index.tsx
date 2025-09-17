"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Heart, Plus } from "lucide-react";
import Link from "next/link";

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    summary?: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    totalTime: number;
    difficulty: string;
    rating: number;
    dietTypes: string[];
    nutrition?: {
      nutrients: { name: string; amount: number; unit: string }[];
    };
    readyInMinutes?: number;
    servings?: number;
    diets?: string[];
    spoonacularScore?: number;
  };
  savedRecipes?: number[];
  toggleSaveRecipe?: (id: number) => void;
  setSelectedRecipe?: (recipe: any) => void;
}

export default function RecipeCard({
  recipe,
  savedRecipes,
  toggleSaveRecipe,
  setSelectedRecipe,
}: RecipeCardProps)
{
  
  

  return (
    <Card
      key={recipe.id}
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 cursor-pointer"
      onClick={() => setSelectedRecipe && setSelectedRecipe(recipe)}
    >
      <Link href={`/recipes/${recipe.id}`} >
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant="secondary" className="bg-black/50 text-white">
              {Math.round(recipe.calories)} cal
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              className={`h-8 w-8 rounded-full ${
                savedRecipes?.includes(recipe.id)
                  ? "text-red-500"
                  : "text-white"
              } hover:bg-black/20`}
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveRecipe && toggleSaveRecipe(recipe.id);
              }}
            >
              <Heart
                className={`h-4 w-4 ${
                  savedRecipes?.includes(recipe.id) ? "fill-current" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1 poppins">
            {recipe.title}
          </h3>
          <p
            className="text-muted-foreground text-sm mb-3 line-clamp-2 "
            dangerouslySetInnerHTML={{ __html: recipe.summary || "" }}
          />

          {/* Macros */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="font-semibold text-primary">
                {recipe.protein}g
              </div>
              <div className="text-muted-foreground">Protein</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="font-semibold ">{recipe.carbs}g</div>
              <div className="text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="font-semibold text-orange-500">{recipe.fat}g</div>
              <div className="text-muted-foreground">Fat</div>
            </div>
          </div>

          {/* Time, Servings, Rating */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.totalTime ?? "—"}m
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {recipe.servings ?? "—"}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              {recipe.rating ?? "—"}
            </div>
          </div>

          {/* Diet Tags */}
          <div className="flex flex-wrap gap-1 mb-4 ">
            {recipe.dietTypes?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {recipe.dietTypes && recipe.dietTypes.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.dietTypes.length - 2}
              </Badge>
            )}
          </div>

          {/* Action Button */}
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // Add to meal plan logic here
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add to Plan
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
