import { supabase } from "@/utils/supabaseClient";
import { UserMetadata } from "@supabase/supabase-js";

export async function getProfileData(): Promise<UserMetadata | null> {
  const { data: userData, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error fetching user:", error.message);
    return null;
  }

  return userData.user;

}