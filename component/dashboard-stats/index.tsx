
import { ChefHat, CalendarDays, ShoppingCart, Flame } from "lucide-react";
import DashboardStatCard from "../dashboard-stats-card";

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
      <DashboardStatCard
        icon={<ChefHat className="w-5 h-5 text-green-600" />}
        label="Total Recipes"
        value="128"
      />
      <DashboardStatCard
        icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
        label="Meals Planned"
        value="21"
      />
      <DashboardStatCard
        icon={<ShoppingCart className="w-5 h-5 text-yellow-600" />}
        label="Groceries Left"
        value="12"
      />
      <DashboardStatCard
        icon={<Flame className="w-5 h-5 text-red-600" />}
        label="Calories Tracked"
        value="1,780 kcal"
      />
    </section>
  );
}
