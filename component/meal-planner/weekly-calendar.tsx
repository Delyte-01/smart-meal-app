"use client";

import { useDrop } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Trash2,
  Edit3,
  Clock,
  Users,
} from "lucide-react";
import { useMealPlanStore } from "@/lib/store/mealPlan";
import { Recipe } from "@/types/recipe";
import { useRecipeModal } from "@/lib/store/recipeModal";

// interface WeeklyCalendarProps {
//   weekDates: Date[];
//   mealPlan: Record<string, Record<string, Recipe | null>>;
//   onSlotClick: (day: string, mealType: string) => void;
//   onRemoveRecipe: (day: string, mealType: string) => void;
//   onAddRecipe: (day: string, mealType: string, recipe: Recipe) => void;
// }

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const mealTypes = [
  {
    key: "breakfast",
    label: "Breakfast",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  {
    key: "lunch",
    label: "Lunch",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    key: "dinner",
    label: "Dinner",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    key: "snack",
    label: "Snack",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
];

function MealSlot({
  day,
  mealType,
  recipe,
  onSlotClick,
  onRemoveRecipe,
  onAddRecipe,
}: {
  day: string;
  mealType: string;
  recipe: Recipe | null;
  onSlotClick: () => void;
  onRemoveRecipe: () => void;
  onAddRecipe: (recipe: Recipe) => void;
}) {
  const [{ isOver }, drop] = useDrop({
    accept: "recipe",
    drop: (item: Recipe) => {
      onAddRecipe(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const mealTypeInfo = mealTypes.find((m) => m.key === mealType);

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`min-h-[160px] flex justify-between items-center flex-col p-3 rounded-lg border-2 border-dashed transition-all duration-200 overflow-clip ${
        isOver
          ? "border-primary bg-primary/10 scale-105"
          : recipe
          ? "border-transparent bg-card shadow-sm"
          : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2  ">
        <Badge variant="outline" className={`text-xs ${mealTypeInfo?.color}`}>
          {mealTypeInfo?.label}
        </Badge>
        {recipe && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onSlotClick}>
                <Edit3 className="h-4 w-4 mr-2" />
                Replace
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onRemoveRecipe}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {recipe ? (
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <img
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-2 mb-1">
                {recipe.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {/* {recipe.prepTime + recipe.cookTime}m */}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {recipe.servings}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-primary">
              {recipe.calories} cal
            </span>
            <div className="flex gap-1">
              <span className="text-green-600">{recipe.protein}p</span>
              <span className="text-orange-600">{recipe.carbs}c</span>
              <span className="text-red-600">{recipe.fat}f</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center ">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSlotClick}
            className="text-muted-foreground hover:text-primary rounded-full border-2 flex justify-center m-2 py-4 px-6 md:p-0"
          >
            <Plus className="h-4 w-4 mr-1 " />
            Add meal
          </Button>
        </div>
      )}
    </div>
  );
}

export function WeeklyCalendar({ weekDates }: { weekDates: Date[] }) {
  const { mealPlan, setRecipe, removeRecipe } = useMealPlanStore();
    const { openModal } = useRecipeModal();

  return (
    <Card className="border-0 shadow-lg md:min-h-[800px]">
      <CardContent className="p-6 overflow-clip">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-2">
          {daysOfWeek.map((day, index) => (
            <div key={day} className="space-y-4">
              {/* Day Header */}
              <div className="text-center">
                <h3 className="font-semibold text-sm">{day}</h3>
                <p className="text-xs text-muted-foreground">
                  {weekDates[index]?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Meal Slots */}
              <div className="space-y-3 ">
                {/* {mealTypes.map((mealType) => (
                  <MealSlot
                    key={`${day}-${mealType.key}`}
                    day={day}
                    mealType={mealType.key}
                    recipe={mealPlan[day]?.[mealType.key] || null}
                    onSlotClick={() => onSlotClick(day, mealType.key)}
                    onRemoveRecipe={() => onRemoveRecipe(day, mealType.key)}
                    onAddRecipe={(recipe) =>
                      onAddRecipe(day, mealType.key, recipe)
                    }
                  />
                ))} */}

                {mealTypes.map((mealType) => (
                  <MealSlot
                    key={`${day}-${mealType.key}`}
                    day={day}
                    mealType={mealType.key}
                    recipe={mealPlan[day]?.[mealType.key] || null}
                    onSlotClick={() => openModal(day, mealType.key)} // ✅ open modal here
                    onRemoveRecipe={() => removeRecipe(day, mealType.key)}
                    onAddRecipe={(recipe: Recipe) =>
                      setRecipe(day, mealType.key, recipe)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
