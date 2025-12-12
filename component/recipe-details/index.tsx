"use client";
// import { motion } from "framer-motion";
import Image from "next/image";
// import BackButton from "../back-button";
import { Recipe } from "@/types/recipe";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Key, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { steps } from "framer-motion";
import { useMealPlanStore } from "@/lib/store/mealPlan";
import { useRouter } from "next/navigation";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
  const nutritionData = {
    labels: ["Calories", "Protein (g)", "Carbs (g)", "Fat (g)"],
    datasets: [
      {
        label: "Nutrition Facts",
        data: [420, 25, 55, 18], // Replace with dynamic data if available
        backgroundColor: ["#F59E0B", "#10B981", "#3B82F6", "#EF4444"],
      },
    ],
  };
  console.log(recipe);
  const router = useRouter();
  const filterScore = Math.round(recipe.spoonacularScore || 0);
  const addRecipeToSlot = useMealPlanStore((state) => state.setRecipe);
  
    const handleAddToPlanner = () => {
    // Example: add to Monday Lunch by default
    addRecipeToSlot("Monday", "Lunch", recipe);
    // Redirect to planner page
    router.push("/dashboard/planner");
  };

 

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* <BackButton /> */}
      <div className="flex flex-col md:flex-row md:gap-10">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex-1">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={800}
            height={400}
            priority
            className="w-full h-84 object-cover"
          />

          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>

            <div className="flex flex-col sm:flex-row  gap-4  my-6">
              <div>
                <p className="font-bold">{recipe.pricePerServing} mins</p>
                <p className="text-sm text-gray-500">Prep Time</p>
              </div>
              <div>
                <p className="font-bold">{recipe.readyInMinutes} mins</p>
                <p className="text-sm text-gray-500">Cook Time</p>
              </div>
              <div>
                <p className="font-bold">{filterScore} score</p>
                <p className="text-sm text-gray-500">Total Time</p>
              </div>
              <div>
                <p className="font-bold">{recipe.servings}</p>
                <p className="text-sm text-gray-500">Servings</p>
              </div>
            </div>

            {/* <Link href={"/"}> */}
            <Button onClick={ handleAddToPlanner}>
              Add To Plan <PlusCircle />{" "}
            </Button>
            {/* </Link> */}
          </div>
        </div>

        <div className="md:w-1/3 mt-10 md:mt-0">
          <h2 className="text-xl font-semibold mb-4">Nutrition Facts</h2>
          <Bar
            data={nutritionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
      <Card className="mt-10">
        <CardContent>
          {recipe.summary && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Summary</h2>
              <p
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipe.summary ?? "" }}
              ></p>
            </div>
          )}
          <div className="mb-6">
            {recipe.instructions && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: recipe.summary ?? "" }}
                ></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


 