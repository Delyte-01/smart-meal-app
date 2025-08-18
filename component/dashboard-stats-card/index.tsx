// components/DashboardStatCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

export default function DashboardStatCard({
  icon,
  label,
  value,
  color = "text-primary",
}: DashboardStatCardProps) {
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-all">
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`p-3 rounded-full bg-muted ${color}`}>{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <h3 className="text-lg font-semibold text-foreground">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
