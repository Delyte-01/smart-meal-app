"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {  useRouter } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth-page?mode=signup');
  };
  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8  rounded-lg flex items-center justify-center">
              <Image
                src={
                  "https://res.cloudinary.com/dk5mfu099/image/upload/v1753520561/4dba7c67cd39d5816d9dd68d4cc9216f_hysmkn.jpg"
                }
                alt="logo"
                width={40}
                height={40}
                className="object-cover rounded-2xl"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 dm">
              SmartMeal
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 dm">
            <Link
              href="#features"
              className="text-gray-600 hover:text-[#7FB77E] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-gray-600 hover:text-[#7FB77E] transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-[#7FB77E] transition-colors"
            >
              Reviews
            </Link>
            {/* <Link
              href="/login"
              className="text-gray-600 hover:text-[#7FB77E] transition-colors"
            >
              Sign In
            </Link> */}
            {/* <Link href="/auth-page"> */}
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-5"
              >
                Get Started
              </Button>
            {/* </Link> */}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 transition-all duration-500 ease-in-out">
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-[#7FB77E] transition-colors"
              >
                Features
              </Link>
              <Link
                href="#benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-[#7FB77E] transition-colors"
              >
                Benefits
              </Link>
              <Link
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-[#7FB77E] transition-colors"
              >
                Reviews
              </Link>
              <Link
                href="/login"
                className="text-gray-600 hover:text-[#7FB77E] transition-colors"
              >
                Sign In
              </Link>
              <Button
                onClick={handleGetStarted}
                className="bg-[#FF9F1C] text-white px-4 py-2 rounded-lg hover:bg-[#FF9F1C]/80 transition-colors text-center"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
