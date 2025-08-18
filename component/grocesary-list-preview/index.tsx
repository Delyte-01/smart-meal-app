// components/GroceryListPreview.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const groceryItems = [
  "2 Eggs",
  "Chicken Breast",
  "Tomatoes",
  "Spinach",
  "Brown Rice",
  "Greek Yogurt",
  "Bananas",
  "Olive Oil",
  "Almonds",
  "Oats",
];

export default function GroceryListPreview() {
  return (
    <section className="mt-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Grocery List
          </CardTitle>
          <Badge variant="outline">{groceryItems.length} items</Badge>
        </CardHeader>

        <CardContent className="max-h-[180px] overflow-y-auto space-y-2">
          {groceryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <span>{item}</span>
              <input type="checkbox" className="accent-primary" />
            </div>
          ))}
        </CardContent>

        <CardFooter className="pt-2">
          <Button variant="secondary" size="sm">
            View Full List
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
