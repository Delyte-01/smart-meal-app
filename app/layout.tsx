import type { Metadata } from "next";
import "./globals.css";

import SmoothScroll from "@/component/lenis-smooth-scroll";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Smart Meal",
  description: "Eat better. Smarter. Healthier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <SmoothScroll>     */}
          {children}
          <Toaster richColors closeButton />
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
