
"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MealCardProps {
  title: string;
  image: string;
  calories?: number;
  onRemove?: () => void;
}

export function MealCard({ title, image, calories, onRemove }: MealCardProps) {
  return (
    <Card className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Remove button */}
      {onRemove && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onRemove}
          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/70 hover:bg-white z-10"
        >
          <X className="w-4 h-4 text-red-500" />
        </Button>
      )}

      <div className="flex flex-col items-center justify-center p-2">
        {/* Thumbnail */}
        <div className="w-12 h-12 relative mb-2">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-md object-cover"
          />
        </div>

        {/* Title */}
        <p className="text-xs font-medium text-center line-clamp-1">{title}</p>

        {/* Calories */}
        {calories && (
          <p className="text-[10px] text-muted-foreground mt-1">
            {calories} kcal
          </p>
        )}
      </div>
    </Card>
  );
}
