🔧 Tech Stack:
Frontend: Next.js (App Router), Tailwind CSS

State Management: Zustand

Authentication & DB: Supabase (or Firebase)

API Integration: Spoonacular or Edamam API

Charts: Chart.js (with react-chartjs-2)

Toast Notifications: sonner or react-hot-toast

📁 Folder Structure Plan:
bash
Copy
Edit
/app
  /dashboard
  /login
  /register
  /recipes
  /profile
/components
  Navbar, RecipeCard, ChartCard, LoadingCard
/store
  userStore.ts
  recipeStore.ts
/utils
  fetchRecipes.ts
  auth.ts
/lib
  supabase.ts
🔐 1. Authentication (Supabase)
✅ Features:
Register / Login / Logout

Auth protected routes (middleware.ts)

User profile storage (avatar, bio, dietary preferences)

🔧 Implementation Plan:
Use @supabase/supabase-js for client SDK

Create useUserStore in Zustand to manage session & user data

Middleware for route protection:

ts
Copy
Edit
export { default } from 'next-auth/middleware';
export const config = { matcher: ['/dashboard', '/recipes'] }
Profile Page: Allow updates for display name, dietary filters

🧠 2. Recipe Search & Suggestions (API Integration)
✅ Features:
Search by ingredient or meal type

Filter by diet (vegan, keto, etc.)

Random AI recipe suggestions

Fetch detailed recipe + nutrition data

🔧 Implementation Plan:
Use Spoonacular or Edamam API for:

GET /recipes/complexSearch

GET /recipes/{id}/nutritionWidget

Store search term, filters, results in Zustand (useRecipeStore)

Debounced search input + dropdown filters

Display with RecipeCard

📊 3. Nutrition Charts (Chart.js)
✅ Features:
Pie chart for macros (carbs, fat, protein)

Bar chart for vitamins/minerals

Calorie breakdown per meal

🔧 Implementation Plan:
Use react-chartjs-2

Dynamic nutrition data on recipe detail page

Component: <NutritionChart /> and <MacroBreakdown />

💬 4. UI Features
Typing/loading indicators for AI suggestions

Grouped message/recommendations with timestamps

Loading skeletons for recipe cards

Error fallback UI if API fails

Dark mode toggle

