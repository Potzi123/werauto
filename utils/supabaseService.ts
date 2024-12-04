import { supabase } from "@/utils/supabaseClient";
import { getUserGroupe } from "@/utils/getUserGroupe"; // If this fetches the group ID

// Fetch user drive data based on group ID
export async function fetchUserDrive(): Promise<[boolean, string][] | null> {
  try {
    const groupeId = await getUserGroupe();

    if (!groupeId) {
      console.error("No group ID found.");
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("drive, user_name")
      .eq("groupe_id", groupeId);

    if (error) {
      console.error("Error fetching drive data:", error.message);
      return null;
    }

    return data?.map((item) => [item.drive, item.user_name]) ?? null;
  } catch (error) {
    console.error("Error fetching user drive:", error);
    return null;
  }
}

// Update drive status for a specific user
export async function updateDriveStatus(userName: string, newDriveStatus: boolean): Promise<void> {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ drive: newDriveStatus })
      .eq("user_name", userName);

    if (error) {
      console.error(`Error updating drive status for ${userName}:`, error.message);
    }
  } catch (error) {
    console.error("Error updating drive status:", error);
  }
}
