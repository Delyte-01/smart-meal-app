"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function NutritionSummary() {
  const data = {
    labels: ["Carbs", "Protein", "Fats"],
    datasets: [
      {
        label: "Macronutrients",
        data: [50, 30, 20], // Sample data: 50% carbs, 30% protein, 20% fats
        backgroundColor: [
          "#10b981", // Carbs - Orange
          "#f59e0b", // Protein - Teal
          "#ef4444", // Fats - Pink
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="w-full max-w-md mx-auto md:mx-0 shadow-md">
      <CardHeader>
        <CardTitle>Nutrition Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Pie data={data} />
      </CardContent>
    </Card>
  );
}
