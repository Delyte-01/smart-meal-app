
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <BackButton /> */}
      <div className="flex flex-col md:flex-row md:gap-10">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />

          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-gray-600">{recipe.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-6">
              <div>
                <p className="font-bold">{recipe.prepTime} mins</p>
                <p className="text-sm text-gray-500">Prep Time</p>
              </div>
              <div>
                <p className="font-bold">{recipe.cookTime} mins</p>
                <p className="text-sm text-gray-500">Cook Time</p>
              </div>
              <div>
                <p className="font-bold">{recipe.totalTime} mins</p>
                <p className="text-sm text-gray-500">Total Time</p>
              </div>
              <div>
                <p className="font-bold">{recipe.servings}</p>
                <p className="text-sm text-gray-500">Servings</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center bg-gray-100 p-4 rounded-lg">
              <div>
                <p className="font-bold">{recipe.nutrition.calories}</p>
                <p className="text-xs text-gray-500">Calories</p>
              </div>
              <div>
                <p className="font-bold">{recipe.nutrition.protein}g</p>
                <p className="text-xs text-gray-500">Protein</p>
              </div>
              <div>
                <p className="font-bold">{recipe.nutrition.carbs}g</p>
                <p className="text-xs text-gray-500">Carbs</p>
              </div>
              <div>
                <p className="font-bold">{recipe.nutrition.fat}g</p>
                <p className="text-xs text-gray-500">Fat</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
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
    </div>
  );
}
