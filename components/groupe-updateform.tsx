"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UpdateGroupeForm() {
  const [groupe, setGroupe] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdateGroupe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!groupe.trim()) {
      setError("Groupe cannot be empty.");
      return;
    }
  
    try {
      // Get the current user
      const { data: userData, error: authError } = await supabase.auth.getUser();
  
      if (authError) {
        setError(authError.message);
        return;
      }
  
      const user = userData.user;
  
      if (user) {
        // Check if the groupe exists in the groupes table
        const { data: groupeData, error: groupeError } = await supabase
          .from("groupes")
          .select("id")
          .eq("name", groupe)
          .single();
  
        if (groupeError) {
          setError("Groupe not found.");
          return;
        }
  
        if (!groupeData) {
          setError("Groupe does not exist.");
          return;
        }
  
        // Update the groupe_id in the profiles table
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ groupe_id: groupeData.id })
          .eq("user_id", user.id); // Assuming your table links to the user's ID
  
        if (updateError) {
          setError(updateError.message);
        } else {
          setSuccess("Groupe updated successfully!");
        }
      } else {
        setError("User not found.");
      }
    } catch (err) {
      console.error("Error updating groupe:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Update Groupe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateGroupe} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user_name">Groupe</Label>
              <Input
                id="user_name"
                type="text"
                placeholder="Enter your new groupe"
                value={groupe}
                onChange={(e) => setGroupe(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <Button type="submit" className="w-full">
              Update Groupe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

