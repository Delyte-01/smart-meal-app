"use client";
import { CircleUserRound, UsersIcon, X } from "lucide-react";
import React from "react";

import {
  LogOut,
  Settings,
  LayoutDashboard,
  Utensils,
  CalendarClock,
  HeartPulse,

} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // optional: utility to join classNames
import { supabase } from "@/lib/suparbaseClient";
import Image from "next/image";

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
interface LinkItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth-page?mode=login"); // go to login
  };

  const links: LinkItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Recipes",
      href: "/recipes",
      icon: <Utensils className="w-5 h-5" />,
    },
    {
      name: "Planner",
      href: "/planner",
      icon: <CalendarClock className="w-5 h-5" />,
    },
    {
      name: "Favorites",
      href: "/favorites",
      icon: <HeartPulse className="w-5 h-5" />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <CircleUserRound className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];
  return (
    <aside
      className={`fixed  top-0 left-0 z-30 backdrop-blur-lg h-full bg-gradient-to-b from-[#eeeff8] via-[#eee8f3] to-[#f9f2f7] text-[#433e45] border-r border-gray-200   transition-all duration-300 shadow-lg transform flex-col justify-between p-6  gap-3 flex ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }
         md:translate-x-0  w-[260px]`}
    >
      {/* Logo */}
      <div>
        <div className="flex items-center mb-10  justify-between">
          <div className="text-2xl font-bold  tracking-tight">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image
                src={
                  "https://res.cloudinary.com/dk5mfu099/image/upload/v1753520561/4dba7c67cd39d5816d9dd68d4cc9216f_hysmkn.jpg"
                }
                alt="logo"
                width={30}
                height={40}
                className="object-cover rounded-2xl"
              />
              <span className="text-[#090f1f]">SmartMeal</span>
            </Link>
          </div>

          <div className="flex items-center justify-between px-4 py-4 ">
            {/* Close button for mobile view */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="block md:hidden"
            >
              {sidebarOpen && <X />}
            </button>
          </div>
        </div>

        <div className="border-b border-4 border-[#e5e7eb] mb-8 w-full " />

        {/* Navigation */}
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = pathname == link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center text-sm md:text-[16px] space-x-2 p-2 rounded-md hover:bg-white/30 transition-colors
                    ${
                      isActive
                        ? "bg-white text-green-600 shadow-sm font-semibold"
                        : "text-gray-600 hover:bg-white/40"
                    }
                    `}
                >
                  {link.icon}
                  <span className="  font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 text-[#fb7185]/80 hover:text-[#4a4a4a] text-sm transition cursor-pointer hover:text-underline"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
