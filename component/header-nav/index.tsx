"use client";
import { useUserProfile } from "@/hooks/profile";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface HeaderNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const HeaderNav = ({ sidebarOpen, setSidebarOpen }: HeaderNavProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const { profile, loading } = useUserProfile();

  if (!profile) return null;

  return (
    <header className="sticky top-0 z-10 shadow p-4 w-full px-4 md:px-6 bg-gradient-to-r from-[#fcfaf8] via-[#f1ecee] to-[#faf3f5] backdrop-blur-md border-b border-gray-200 rounded-t-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Hamburger + Welcome */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {!sidebarOpen && <Menu />}
          </button>
        </div>

        {/* Center: Search */}
        <div className="md:flex-1 flex justify-center sm:justify-start border">
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals or recipes"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Right: Bell + Profile */}
        <div className="flex items-center gap-3 justify-center">
          {/* Mobile search toggle */}
          <div className="sm:hidden ">
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-5 h-5 text-gray-600 " />
            </button>
          </div>
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2">
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              width={40}
              height={40}
              className="rounded-full border border-gray-200 object-cover w-10 h-10 shadow-sm ring-4 ring-white"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {profile.full_name}
              </span>
              {loading && (
                <span className="text-xs text-gray-500 animate-pulse">
                  Loading...
                </span>
              )}
              {/* <span className="text-xs text-gray-500">Frontend Dev</span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Input Below Header */}
      {showSearch && (
        <div className="mt-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals or recipes"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
