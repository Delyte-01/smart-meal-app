// export type Recipe = {
//   id: string;
//   title: string;
//   description?: string;
//   image: string;
//   calories?: number;
//   protein?: number;
//   carbs?: number;
//   fat: number;
//   prepTime: number;
//   cookTime: number;
//   totalTime: number;
//   servings: number;
//   ingredients: string[];
//   instructions: string[];
//   nutrition: {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//   };
//   summary?: string;
//   readyInMinutes: number;
// };


export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  spoonacularScore?: number;
  dishTypes?: string[];
  cuisines?: string[];
  pricePerServing?: number;
  summary?: string;
  instructions?: string;
  nutrition?: {
    nutrients: { name: string; amount: number; unit: string }[];
  };
  // If you want calories/macros, mark them optional:
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
};
