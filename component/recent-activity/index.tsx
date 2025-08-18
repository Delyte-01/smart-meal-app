"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Salad, Flame } from "lucide-react";

const activity = [
  {
    id: 1,
    icon: <Salad className="text-green-500 w-5 h-5" />,
    title: "Meal Logged",
    description: "You logged: Chicken Salad + Avocado",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: <Flame className="text-orange-500 w-5 h-5" />,
    title: "Calories Tracked",
    description: "320 kcal added to your log",
    time: "Today, 9:30 AM",
  },
  {
    id: 3,
    icon: <CalendarCheck className="text-blue-500 w-5 h-5" />,
    title: "Goal Checked",
    description: "Daily protein goal reached 💪",
    time: "Yesterday, 7:00 PM",
  },
];

export function RecentActivity() {
  return (
    <section className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 border-b pb-3 last:border-b-0"
            >
              <div className="mt-1">{item.icon}</div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
