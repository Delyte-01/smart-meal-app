"use client";
// components/Profile/ProfilePage.tsx
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("myRecipes");

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src="/avatar-placeholder.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-500">johndoe@email.com</p>
          </div>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 border rounded-md hover:bg-gray-100">
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        {["myRecipes", "saved", "preferences", "summary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-2 py-1 border-b-2 ${
              activeTab === tab
                ? "border-black font-medium"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-md p-4 shadow-sm">
        {activeTab === "myRecipes" && (
          <p>You haven’t created any recipes yet.</p>
        )}
        {activeTab === "saved" && <p>Your saved recipes will appear here.</p>}
        {activeTab === "preferences" && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Dietary Preferences</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Vegetarian</li>
              <li>No peanuts</li>
            </ul>
          </div>
        )}
        {activeTab === "summary" && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Nutrition Summary</h4>
            <p>Total calories consumed: 0 kcal</p>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-8 text-center">
        <button className="text-red-500 hover:underline">Logout</button>
      </div>
    </div>
  );
}
