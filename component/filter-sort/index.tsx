"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useRecipeStore } from "@/lib/store/recipeStore";
 // ✅ connect to zustand

export default function MealFilters() {
  const [calories, setCalories] = useState([0, 800]);
  const [time, setTime] = useState([0, 60]);

  return (
    <div className="w-full md:w-1/3 p-4 border-r bg-white dark:bg-zinc-900 shadow-sm manrope">
      {/* Mobile Toggle */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-4 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Recipes</SheetTitle>
            </SheetHeader>
            <FilterContent
              calories={calories}
              setCalories={setCalories}
              time={time}
              setTime={setTime}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <FilterContent
          calories={calories}
          setCalories={setCalories}
          time={time}
          setTime={setTime}
        />
      </div>
    </div>
  );
}

function FilterContent({ calories, setCalories, time, setTime }: any) {
  const { setFilters, setSort, getRecipes } = useRecipeStore();

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>(
    []
  );
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleApplyFilters = () => {
    setFilters({
      cuisine: selectedCuisine,
      diet: selectedDiet,
      intolerances: selectedIntolerances.join(","),
      mealType: selectedMealType,
      calories,
      time,
    });
    setSort(selectedSort);
    getRecipes(); // ✅ trigger fetch with new filters
  };

  return (
    <div className="space-y-6">
      {/* Cuisine */}
      <div>
        <label className="font-semibold text-sm">Cuisine</label>
        <Select onValueChange={(val) => setSelectedCuisine(val)}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Italian",
              "Mexican",
              "Indian",
              "Chinese",
              "French",
              "African",
            ].map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Diet */}
      <div>
        <label className="font-semibold text-sm">Diet</label>
        <Select onValueChange={(val) => setSelectedDiet(val)}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select diet" />
          </SelectTrigger>
          <SelectContent>
            {["Vegetarian", "Vegan", "Ketogenic", "Paleo", "Whole30"].map(
              (diet) => (
                <SelectItem key={diet} value={diet.toLowerCase()}>
                  {diet}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Intolerances */}
      <div>
        <label className="font-semibold text-sm">Intolerances</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {["Gluten", "Dairy", "Soy", "Peanut", "Shellfish"].map((intol) => (
            <label
              key={intol}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Checkbox
                checked={selectedIntolerances.includes(intol.toLowerCase())}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedIntolerances([
                      ...selectedIntolerances,
                      intol.toLowerCase(),
                    ]);
                  } else {
                    setSelectedIntolerances(
                      selectedIntolerances.filter(
                        (i) => i !== intol.toLowerCase()
                      )
                    );
                  }
                }}
              />{" "}
              {intol}
            </label>
          ))}
        </div>
      </div>

      {/* Meal Type */}
      <div>
        <label className="font-semibold text-sm">Meal Type</label>
        <Select onValueChange={(val) => setSelectedMealType(val)}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {["Breakfast", "Main Course", "Side Dish", "Dessert", "Snack"].map(
              (t) => (
                <SelectItem key={t} value={t.toLowerCase()}>
                  {t}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Calories */}
      <div>
        <label className="font-semibold text-sm">Max Calories</label>
        <Slider
          value={calories}
          onValueChange={setCalories}
          max={1200}
          step={50}
          className="mt-2"
        />
        <div className="text-xs mt-1 text-muted-foreground">
          {calories[0]} - {calories[1]} kcal
        </div>
      </div>

      {/* Cooking Time */}
      <div>
        <label className="font-semibold text-sm">Max Cooking Time (mins)</label>
        <Slider
          value={time}
          onValueChange={setTime}
          max={120}
          step={5}
          className="mt-2"
        />
        <div className="text-xs mt-1 text-muted-foreground">
          {time[0]} - {time[1]} mins
        </div>
      </div>

      {/* Sorting */}
      <div>
        <label className="font-semibold text-sm">Sort By</label>
        <Select onValueChange={(val) => setSelectedSort(val)}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Choose sorting" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Popularity",
              "Healthiness",
              "Calories",
              "Protein",
              "Carbs",
              "Fat",
              "Time",
              "Price",
            ].map((sort) => (
              <SelectItem key={sort} value={sort.toLowerCase()}>
                {sort}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Apply Button */}
      <Button
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
}
