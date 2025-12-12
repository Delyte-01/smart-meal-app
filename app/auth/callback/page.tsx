// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/suparbaseClient";
import FireLoader from "@/components/ui/loader/fireLoader";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have an OAuth code in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const error = urlParams.get("error");
        const errorDescription = urlParams.get("error_description");

        // Handle OAuth errors
        if (error) {
          console.error("OAuth error:", error, errorDescription);
          setError(errorDescription || "Authentication failed");
          setTimeout(() => router.push("/auth-page?mode=login"), 2000);
          return;
        }

        // If we have a code, exchange it for a session
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error(
              "Error exchanging code for session:",
              exchangeError.message
            );
            setError("Failed to complete authentication");
            setTimeout(() => router.push("/auth-page?mode=login"), 2000);
            return;
          }
        }

        // Get the current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.error(
            "Error getting session:",
            sessionError?.message || "No session"
          );
          setError("Authentication failed");
          setTimeout(() => router.push("/auth-page?mode=login"), 2000);
          return;
        }

        // Ensure profile exists
        const user = session.user;
        if (user) {
          const { error: upsertError } = await supabase
            .from("profiles")
            .upsert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata.full_name || user.email,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);

          if (upsertError) {
            console.error("Profile upsert error:", upsertError.message);
            // Continue anyway - this isn't a critical failure
          }
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (err: any) {
        console.error("Unexpected error in auth callback:", err);
        setError("An unexpected error occurred");
        setTimeout(() => router.push("/auth-page?mode=login"), 2000);
      }
    };

    handleAuthCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
        <div>Redirecting to login page...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <FireLoader size={48} className="inline-block mr-2" color="#FF6B35" />
      <div>Completing authentication...</div>
    </div>
  );
}
