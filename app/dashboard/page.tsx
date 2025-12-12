"use client";

import { supabase } from "@/lib/suparbaseClient";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DashboardStats from "@/component/dashboard-stats";
import WeeklyMealPlan from "@/component/weekly-plans";
import GroceryListPreview from "@/component/grocesary-list-preview";
import { NutritionSummary } from "@/component/nutrition-summary";
import { SuggestedMeals } from "@/component/suggested-meal";
import { RecentActivity } from "@/component/recent-activity";
import {
  Droplets,
  Calendar,
  Target,
  Siren as Fire,
  ChefHat,
} from "lucide-react";
import RecipeCard from "@/component/recipe-card";
import { mockRecipes } from "../data/recipe";

// const mockRecipes = [
//   {
//     id: '1',
//     title: 'Mediterranean Quinoa Bowl',
//     image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
//     cookTime: 25,
//     servings: 2,
//     calories: 380,
//     difficulty: 'Easy' as const,
//     tags: ['vegetarian', 'healthy', 'protein-rich'],
//     rating: 4.5,
//     isFavorite: false,
//     isBookmarked: true
//   },
//   {
//     id: '2',
//     title: 'Grilled Salmon with Asparagus',
//     image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
//     cookTime: 20,
//     servings: 1,
//     calories: 420,
//     difficulty: 'Medium' as const,
//     tags: ['keto', 'low-carb', 'omega-3'],
//     rating: 4.8,
//     isFavorite: true,
//     isBookmarked: false
//   },
//   {
//     id: '3',
//     title: 'Green Smoothie Bowl',
//     image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
//     cookTime: 10,
//     servings: 1,
//     calories: 290,
//     difficulty: 'Easy' as const,
//     tags: ['vegan', 'breakfast', 'antioxidants'],
//     rating: 4.3,
//     isFavorite: false,
//     isBookmarked: false
//   }
// ];

const nutritionData = [
  {
    name: "Calories",
    value: 1847,
    target: 2200,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    name: "Protein",
    value: 124,
    target: 150,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    name: "Carbs",
    value: 180,
    target: 220,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    name: "Fat",
    value: 67,
    target: 80,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
];

const todayMeals = [
  { name: "Breakfast", calories: 320, time: "8:00 AM", eaten: true },
  { name: "Lunch", calories: 520, time: "12:30 PM", eaten: true },
  { name: "Snack", calories: 180, time: "3:30 PM", eaten: false },
  { name: "Dinner", calories: 450, time: "7:00 PM", eaten: false },
];

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      console.log("Session:", session);

      if (sessionError || !session?.user) {
        console.error("No session or error:", sessionError);
        setLoading(false);
        return;
      }

      const userId = session.user.id;
      console.log("User ID:", userId);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();
      console.log("Profile data:", profile);
      if (error) {
        console.error("Error fetching profile:", error);
      } else if (profile) {
        setUserName(profile.full_name);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      console.log("User signed out");
      // Optional: Redirect after logout
      window.location.href = "/auth-page?mode=login"; // or "/login"
    }
  };
  const currentHour = new Date().getHours();
  const user = {
    name: userName,
  };
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="bg-[#f9fafb] min-h-screen p-4 sm:p-6 lg:p-20 space-y-8  ">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {greeting}, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-600">
          You're doing great! Keep up with your healthy eating journey.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Today's Calories
              </p>
              <p className="text-2xl font-bold text-gray-900">1,847</p>
              <p className="text-sm text-gray-500">of 2,200 goal</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Fire className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Water Intake</p>
              <p className="text-2xl font-bold text-gray-900">6.2L</p>
              <p className="text-sm text-gray-500">of 8L goal</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meals Planned</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-500">this week</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">12 days</p>
              <p className="text-sm text-gray-500">Keep it up!</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Nutrition */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Today's Nutrition
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nutritionData.map((item) => (
                <div key={item.name} className="text-center">
                  <div
                    className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <span className={`text-xl font-bold ${item.color}`}>
                      {Math.round((item.value / item.target) * 100)}%
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.value}g / {item.target}g
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggested Meals */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                AI Suggested Meals
              </h2>
              <ChefHat className="h-5 w-5 text-primary-600" />
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockRecipes.slice(0,3).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  calories={recipe.calories}
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                  servings={recipe.servings}
                />
              ))}
            </div> */}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Meals */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Today's Meals
            </h3>
            <div className="space-y-3">
              {todayMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        meal.eaten ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">{meal.name}</p>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {meal.calories} cal
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-primary-50 text-primary-700 px-4 py-3 rounded-lg font-medium hover:bg-primary-100 transition-colors text-left">
                📱 Log a meal
              </button>
              <button className="w-full bg-orange-50 text-orange-700 px-4 py-3 rounded-lg font-medium hover:bg-orange-100 transition-colors text-left">
                🔍 Find new recipes
              </button>
              <button className="w-full bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-100 transition-colors text-left">
                📅 Plan next week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <DashboardStats /> */}
      {/* <WeeklyMealPlan /> */}
      {/* <NutritionSummary /> */}
      {/* <SuggestedMeals /> */}
      {/* <RecentActivity /> */}
    </div>
  );
};

export default Dashboard;
