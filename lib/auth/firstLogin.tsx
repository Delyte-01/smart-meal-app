import { supabase } from "@/lib/suparbaseClient";

export const checkFirstLogin = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { isFirstLogin: null };

  const { data, error } = await supabase
    .from("profiles")
    .select("is_first_login")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return { isFirstLogin: null };
  }

  return { isFirstLogin: data.is_first_login };
};


export const markFirstLoginComplete = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("profiles")
    .update({ is_first_login: false })
    .eq("id", user.id);

  if (error) {
    console.error("Failed to update first login flag:", error.message);
  }
};
