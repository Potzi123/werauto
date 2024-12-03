import { supabase } from "./supabaseClient";

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    console.log("Signed out successfully");
  }
}
