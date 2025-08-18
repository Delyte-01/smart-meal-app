// components/WeeklyMealPlan.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Plus } from "lucide-react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mealSlots = [
  { type: "Breakfast", emoji: "🍳" },
  { type: "Lunch", emoji: "🍱" },
  { type: "Dinner", emoji: "🍝" },
];

export default function WeeklyMealPlan() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Weekly Meal Plan
        </h2>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {daysOfWeek.map((day) => (
          <Card key={day} className="min-w-[160px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-primary">
                {day}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mealSlots.map((meal) => (
                <div
                  key={meal.type}
                  className="flex items-center justify-between text-sm text-muted-foreground"
                >
                  <span>
                    {meal.emoji} {meal.type}
                  </span>
                  <span className="text-xs text-muted-foreground italic">
                    Not Set
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
