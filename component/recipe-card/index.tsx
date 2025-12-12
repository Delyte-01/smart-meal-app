"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Heart,
  Plus,
  ChefHat,
} from "lucide-react";

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
    servings?: number;
    rating?: number;
    dietTypes?: string[];
  };
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
  onAddToPlan?: (recipe: RecipeCardProps["recipe"]) => void;
  onClick?: () => void;
}

export default function RecipeCard({
  recipe,
  isSaved = false,
  onToggleSave,
  onAddToPlan,
  onClick,
}: RecipeCardProps) {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleSave?.(recipe.id);
  };

  const handleAddToPlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToPlan?.(recipe);
  };

  const handleCardClick = () => {
    onClick?.();
  };

  return (
    <Card
      className="group overflow-hidden rounded-2xl border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <Link href={`/dashboard/recipes/${recipe.id}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={recipe.image || "/placeholder-recipe.jpg"}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />

          {/* Top Right Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm">
              {Math.round(recipe.calories)} cal
            </Badge>

            {/* Save Button */}
            <Button
              size="icon"
              variant="secondary"
              className={`h-9 w-9 rounded-full backdrop-blur-sm transition-all ${isSaved
                  ? "bg-red-500/90 text-white hover:bg-red-600"
                  : "bg-white/80 text-gray-700 hover:bg-white"
                }`}
              onClick={handleSaveClick}
              aria-label={isSaved ? "Remove from favorites" : "Save recipe"}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          {/* Summary - Sanitized & Safe */}
          {recipe.summary && (
            <p
              className="text-sm text-gray-600 line-clamp-2 mb-4"
              dangerouslySetInnerHTML={{
                __html: recipe.summary.replace(/<[^>]*>/g, ""), // Strip HTML tags safely
              }}
            />
          )}

          {/* Macro Nutrients */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-lg font-bold text-blue-700">{recipe.protein}g</p>
              <p className="text-xs text-gray-600">Protein</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <p className="text-lg font-bold text-amber-700">{recipe.carbs}g</p>
              <p className="text-xs text-gray-600">Carbs</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <p className="text-lg font-bold text-orange-700">{recipe.fat}g</p>
              <p className="text-xs text-gray-600">Fat</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.totalTime || "—"} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings || "—"} servings</span>
            </div>
            {recipe.rating !== undefined && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{recipe.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Diet Tags */}
          {recipe.dietTypes && recipe.dietTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {recipe.dietTypes.slice(0, 3).map((diet) => (
                <Badge
                  key={diet}
                  variant="secondary"
                  className="text-xs bg-green-700 "
                >
                  <ChefHat className="h-3 w-3 mr-1" />
                  {diet}
                </Badge>
              ))}
              {recipe.dietTypes.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{recipe.dietTypes.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Add to Plan Button */}
          <Button
            onClick={handleAddToPlan}
            className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Meal Plan
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}