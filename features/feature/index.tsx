"use client";
import { MotionDiv } from "@/component/framer-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Calendar, Heart, Leaf, Target, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const features: FeatureProps[] = [
  {
    icon: Brain,
    title: "AI-Powered Recipe Discovery",
    description:
      "Get personalized recipe recommendations based on your preferences, dietary restrictions, and available ingredients.",
    color: "text-green-700",
  },
  {
    icon: Calendar,
    title: "Smart Meal Planning",
    description:
      "Plan your weekly meals effortlessly with our intelligent calendar that considers your schedule and nutrition goals.",
    color: "text-orange-600",
  },
  {
    icon: Target,
    title: "Nutrition Tracking",
    description:
      "Monitor your daily nutrition intake with detailed breakdowns and visual charts to stay on track with your health goals.",
    color: "text-green-500",
  },
  {
    icon: Heart,
    title: "Favorite Recipes",
    description:
      "Save and organize your favorite recipes in one place, with easy access and smart categorization.",
    color: "text-red-500",
  },
  {
    icon: Leaf,
    title: "Dietary Preferences",
    description:
      "Filter recipes by dietary needs including vegan, gluten-free, keto, and more to match your lifestyle.",
    color: "text-emerald-500",
  },
  {
    icon: Users,
    title: "Community Sharing",
    description:
      "Share your favorite recipes with the community and discover new dishes from fellow food enthusiasts.",
    color: "text-blue-500",
  },
];

const FeatureSection = () => {
  return (
    <div>
      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30 lg:px-32">
        <div className="container px-4 md:px-8 ">
          <div className="text-center mb-16 ">
            <MotionDiv
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge className="bg-[#16a249]/10 text-[#16a249] border-[#16a249]/20 rounded-full  px-4 py-1 mb-4">
                Features
              </Badge>
            </MotionDiv>
            <MotionDiv
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need for{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Smart Cooking
                </span>
              </h2>
            </MotionDiv>
            <MotionDiv
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto poppins">
                Discover powerful features designed to make meal planning
                effortless and enjoyable
              </p>
            </MotionDiv>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/50 
                  `}
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-${
                        feature.color.split("-")[1]
                      }-100 to-${
                        feature.color.split("-")[1]
                      }-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <MotionDiv
                        
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </MotionDiv>
                    </div>
                    <MotionDiv
                        
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                      {feature.title}
                      </h3>
                      </MotionDiv>
                    <MotionDiv
                        
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                      </p>
                      </MotionDiv>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;
