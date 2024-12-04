import { supabase } from "@/utils/supabaseClient";
import { getProfileData } from "@/utils/getProfileData";


export async function getUserGroupe() {

    const userData = await getProfileData();

    if (!userData) {
        return null;
    }

    const { data, error } = await supabase
    .from('profiles') // Tabelle, in der die Daten gespeichert sind
    .select('groupe_id') // Spalte, die du abrufen möchtest
    .eq('user_id', userData.id) // Bedingung: id muss übereinstimmen
    .single();

    if (error) {
        console.log("Error fetching drive:", error.message);
        return null;
    }

  return data?.groupe_id ?? null;
}
