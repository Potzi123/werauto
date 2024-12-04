"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UpdateUsernameForm() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!userName.trim()) {
      setError("Username cannot be empty.");
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
        // Update the username in the database
        const { error: updateError } = await supabase
          .from("profiles") // Replace with your table name
          .update({ user_name: userName })
          .eq("user_id", user.id) // Assuming your table links to the user's ID
  
        if (updateError) {
          setError(updateError.message);
        } else {
          setSuccess("Username updated successfully!");
        }
      } else {
        setError("User not found.");
      }
    } catch (err) {
      console.error("Error updating username:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Update Username
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateUsername} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user_name">Username</Label>
              <Input
                id="user_name"
                type="text"
                placeholder="Enter your new username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <Button type="submit" className="w-full">
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
