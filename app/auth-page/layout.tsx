import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Authentification ",
  description:
    "Join Smart Meal to start your journey towards healthier eating habits.",
};

export default function LogInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
