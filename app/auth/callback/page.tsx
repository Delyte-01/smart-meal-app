// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/suparbaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) {
        console.log("No session");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name || user.email,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Profile insert error:", error.message);
      }

      router.push("/dashboard"); // Or your logged-in landing page
    };

    handleAuthCallback();
  }, [router]);

  return <p className="text-center mt-10 text-gray-700">Signing you in...</p>;
}
