"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const meals = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    image:
      "https://res.cloudinary.com/dk5mfu099/image/upload/v1753530778/salad-mix-plate-shot-from-above-on-dark-brown-table_fp5abc.jpg",
    calories: 320,
    time: "25 mins",
  },
  {
    id: 2,
    name: "Avocado Toast",
    image:
      "https://res.cloudinary.com/dk5mfu099/image/upload/v1753530778/salad-mix-plate-shot-from-above-on-dark-brown-table_fp5abc.jpg",
    calories: 280,
    time: "10 mins",
  },
  {
    id: 3,
    name: "Veggie Stir Fry",
    image:
      "https://res.cloudinary.com/dk5mfu099/image/upload/v1753530778/salad-mix-plate-shot-from-above-on-dark-brown-table_fp5abc.jpg",
    calories: 400,
    time: "30 mins",
  },
];

export function SuggestedMeals() {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-4">AI Suggested Meals</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal) => (
          <Card
            key={meal.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-40 w-full">
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{meal.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>🔥 {meal.calories} kcal</p>
              <p>⏱️ {meal.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
