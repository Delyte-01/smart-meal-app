"use client";

import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Calendar,
  Plus,
  Share2,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklyCalendar } from "@/component/meal-planner/weekly-calendar";
import { RecipeLibrary } from "@/component/meal-planner/recipe-library";
import { AddRecipeModal } from "@/component/meal-planner/add-recipe-modal";
import { ShareMealPlanModal } from "@/component/meal-planner/share-meal-plan";

// import { NutritionSummary } from "@/components/meal-planner/nutrition-summary";

// import { ShareMealPlanModal } from "@/components/meal-planner/share-meal-plan-modal";

// Types
export interface Recipe {
  id: number;
  title: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  dietTypes: string[];
  mealType: string[];
}

export interface MealSlot {
  day: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  recipe?: Recipe;
}

// Mock data
const mockSavedRecipes: Recipe[] = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "https://spoonacular.com/recipeImages/12345-312x231.jpg",
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 14,
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    dietTypes: ["Vegetarian", "Gluten-Free"],
    mealType: ["Lunch", "Dinner"],
  },
  {
    id: 2,
    title: "Overnight Oats with Berries",
    image: "https://spoonacular.com/recipeImages/12345-312x231.jpg",
    calories: 320,
    protein: 12,
    carbs: 48,
    fat: 10,
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    dietTypes: ["Vegetarian", "High Fiber"],
    mealType: ["Breakfast"],
  },
  {
    id: 3,
    title: "Grilled Chicken Caesar",
    image: "https://spoonacular.com/recipeImages/12345-312x231.jpg",
    calories: 380,
    protein: 32,
    carbs: 12,
    fat: 24,
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    dietTypes: ["High Protein", "Low Carb"],
    mealType: ["Lunch", "Dinner"],
  },
  {
    id: 4,
    title: "Avocado Toast",
    image: "https://spoonacular.com/recipeImages/12345-312x231.jpg",
    calories: 280,
    protein: 8,
    carbs: 24,
    fat: 18,
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: "Easy",
    dietTypes: ["Vegetarian", "Quick"],
    mealType: ["Breakfast", "Snack"],
  },
  {
    id: 5,
    title: "Greek Yogurt Parfait",
    image: "https://spoonacular.com/recipeImages/12345-312x231.jpg",
    calories: 250,
    protein: 15,
    carbs: 30,
    fat: 8,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    dietTypes: ["Vegetarian", "High Protein"],
    mealType: ["Breakfast", "Snack"],
  },
  {
    id: 6,
    title: "Keto Salmon Bowl",
    image: "https://spoonacular.com/recipeImages/12345-312x231.jpg",
    calories: 480,
    protein: 35,
    carbs: 8,
    fat: 36,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    dietTypes: ["Keto", "Low Carb"],
    mealType: ["Dinner"],
  },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MealPlannerPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [mealPlan, setMealPlan] = useState<
    Record<string, Record<string, Recipe | null>>
  >(() => {
    const initialPlan: Record<string, Record<string, Recipe | null>> = {};
    daysOfWeek.forEach((day) => {
      initialPlan[day] = {
        breakfast: null,
        lunch: null,
        dinner: null,
        snack: null,
      };
    });
    return initialPlan;
  });
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    mealType: string;
  } | null>(null);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeView, setActiveView] = useState<"calendar" | "library">(
    "calendar"
  );

  const addRecipeToSlot = useCallback(
    (day: string, mealType: string, recipe: Recipe) => {
      setMealPlan((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: recipe,
        },
      }));
    },
    []
  );

  const removeRecipeFromSlot = useCallback((day: string, mealType: string) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null,
      },
    }));
  }, []);

  const handleSlotClick = (day: string, mealType: string) => {
    setSelectedSlot({ day, mealType });
    setShowAddRecipeModal(true);
  };

  const handleAddRecipe = (recipe: Recipe) => {
    if (selectedSlot) {
      addRecipeToSlot(selectedSlot.day, selectedSlot.mealType, recipe);
      setShowAddRecipeModal(false);
      // wait until Dialog finishes unmounting before clearing slot
      setSelectedSlot(null);
    }
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const saveMealPlan = () => {
    // Save meal plan logic
    console.log("Saving meal plan:", mealPlan);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex ">
        <main className="flex-1 md:mx-9 p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 dm">Meal Planner</h1>
              <p className="text-muted-foreground poppins">
                Plan your weekly meals and track your nutrition
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowShareModal(true)}
                className="rounded-xl bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={saveMealPlan}
                className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Plan
              </Button>
            </div>
          </div>

          {/* Week Navigation */}
          <Card className="mb-6 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateWeek("prev")}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-center">
                  <h2 className="text-lg font-semibold">
                    {weekDates[0].toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {weekDates[6].toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Week of {weekDates[0].toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateWeek("next")}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Calendar/Library Toggle for Mobile */}
            <div className="xl:hidden">
              <Tabs
                value={activeView}
                onValueChange={(value) =>
                  setActiveView(value as "calendar" | "library")
                }
              >
                <TabsList className="grid w-full grid-cols-2 rounded-xl">
                  <TabsTrigger value="calendar" className="rounded-xl">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="library" className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Recipes
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="calendar" className="mt-6">
                  <WeeklyCalendar
                    weekDates={weekDates}
                    mealPlan={mealPlan}
                    onSlotClick={handleSlotClick}
                    onRemoveRecipe={removeRecipeFromSlot}
                    onAddRecipe={addRecipeToSlot}
                  />
                </TabsContent>
                <TabsContent value="library" className="mt-6">
                  <RecipeLibrary recipes={mockSavedRecipes} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop Layout */}
            <div className="hidden xl:block xl:col-span-3 ">
              <WeeklyCalendar
                weekDates={weekDates}
                mealPlan={mealPlan}
                onSlotClick={handleSlotClick}
                onRemoveRecipe={removeRecipeFromSlot}
                onAddRecipe={addRecipeToSlot}
              />
            </div>

            <div className="hidden xl:block">
              <RecipeLibrary recipes={mockSavedRecipes} />
            </div>
          </div>

          {/* Nutrition Summary */}
          <div className="mt-8">
            {/* <NutritionSummary mealPlan={mealPlan} weekDates={weekDates} /> */}
          </div>
        </main>
      </div>

      {/* Modals */}
      {showAddRecipeModal && selectedSlot && (
        <AddRecipeModal
          onClose={() => {
            setShowAddRecipeModal(false);
            setSelectedSlot(null);
          }}
          onAddRecipe={handleAddRecipe}
          recipes={mockSavedRecipes}
          selectedSlot={selectedSlot}
        />
      )}

      {showShareModal && (
          <ShareMealPlanModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            mealPlan={mealPlan}
            weekDates={weekDates}
          />
        )}
    </DndProvider>
  );
}
