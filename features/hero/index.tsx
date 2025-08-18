import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  ChefHat,
  Clock,
  Heart,
  Play,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      className="px-4 sm:px-6 lg:px-8 relative py-20 lg:py-32 bg-cover bg-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dk5mfu099/image/upload/v1754560732/wmremove-transformed_emuvwu.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/89"></div>
      <div className="relative text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-6 leading-tight dm">
                Your AI-Powered
                <span className="text-[#afe7ae] block">Meal Planning</span>
                Companion
              </h1>
              <p className="text-xl  mb-8 leading-relaxed ">
                Discover personalized recipes, plan nutritious meals, and
                achieve your health goals with intelligent recommendations
                tailored just for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ">
                <Link
                  href="/login"
                  className=" bg-[#7FB77E] text-[#1E1E1E] px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="border-2 border-[#FF9F1C] text-[#E0E0E0] px-8 py-4 rounded-xl font-semibold hover:border-primary-600 hover:text-primary-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8 text-sm ">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white text-black rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div
                  className="w-full h-64 bg-cover bg-center repeat-0 rounded-xl"
                  style={{
                    backgroundImage: `url('https://res.cloudinary.com/dk5mfu099/image/upload/f_auto,q_auto/v1753529676/photo-1533777324565-a040eb52facd_lftzrs.jpg')`,
                  }}
                />
                <div className="mt-4">
                  <h3 className="font-semibold ">Mediterranean Quinoa Bowl</h3>
                  <div className="flex items-center justify-between mt-2 text-sm ">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>25 min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>2 servings</span>
                      </div>
                    </div>
                    <span className="font-medium text-primary-600">
                      380 cal
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 right-8 bg-orange-100 rounded-full p-4 transform -rotate-12">
                <ChefHat className="h-8 w-8 text-orange-600" />
              </div>
              <div className="absolute bottom-8 left-8 bg-primary-100 rounded-full p-3 transform rotate-12">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
