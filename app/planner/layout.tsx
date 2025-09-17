"use client";

import "../globals.css";
import Sidebar from "@/component/side-bar";
import { useState } from "react";
import HeaderNav from "@/component/header-nav";



export default function PlannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <main className="h-screen w-full ">
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="md:flex-1 flex flex-col md:ml-64  transition-all duration-300">
        <HeaderNav setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <main className="md:flex-1   ">
          <div className="space-y-6">
            {children}
          </div>
        </main>
      </div>
    </main>
  );
}
