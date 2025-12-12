import RecipeDetails from "@/component/recipe-details";
import { fetchRecipeById } from "@/lib/spoonacular";

const RecipeDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const recipe = await fetchRecipeById(Number(id));
  console.log( recipe);

  if (!recipe) {
    return <div className="text-center">Loading recipe details...</div>;
  }
  console.log( recipe.readyInMinutes);
  return (
    <div className="bg-[#f9fafb] min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Recipe Details</h1>
        {/* Here you would fetch and display the recipe details based on the ID */}
        <p>Details for recipe ID: {id}</p>
        <RecipeDetails recipe={{ ...recipe}} />
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
