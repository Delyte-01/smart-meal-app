"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/suparbaseClient";

interface Profile {
  full_name: string;
  avatar_url: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        return;
      }

      // 1️⃣ Try to fetch from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();

      // 2️⃣ If found in table, use it
      if (profileData && !profileError) {
        setProfile({
          full_name:
            profileData.full_name ||
            user.user_metadata.full_name ||
            user.user_metadata.name ||
            user.email?.split("@")[0] ||
            "Anonymous",
          avatar_url:
            profileData.avatar_url ||
            user.user_metadata.avatar_url ||
            "https://res.cloudinary.com/dk5mfu099/image/upload/v1758107581/7b12d287221c0adf5b4efcdf326c178f_fhdl9i.jpg",
        });
      } else {
        // 3️⃣ Fallback: use auth metadata only
        setProfile({
          full_name:
            user.user_metadata.full_name ||
            user.user_metadata.name ||
            user.email?.split("@")[0] ||
            "Anonymous",
          avatar_url: user.user_metadata.avatar_url || "https://res.cloudinary.com/dk5mfu099/image/upload/v1758107581/7b12d287221c0adf5b4efcdf326c178f_fhdl9i.jpg",
        });
      }

      setLoading(false);
    };

      getProfile();
      console.log(profile?.avatar_url);
  }, []);

  return { profile, loading, error };
}
