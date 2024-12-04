import { getProfileData } from "@/utils/getProfileData";
import { supabase } from "@/utils/supabaseClient";

export async function getUserName(): Promise<string | null> {
    const userData = await getProfileData();

    if (!userData) {
        return null;
    }


    const { data, error } = await supabase
        .from('profiles') // Tabelle, in der die Daten gespeichert sind
        .select('user_name') // Spalte, die du abrufen möchtest
        .eq('user_id', userData.id) // Bedingung: id muss übereinstimmen
        .single();
    

    if (error) {
        console.log('Fehler beim Abrufen des Benutzernamens:', error);
        return null;
    }

    return data?.user_name ?? null; // Direktes Auslesen des Feldes
}
