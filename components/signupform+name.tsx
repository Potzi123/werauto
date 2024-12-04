"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function SignupNameForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setError(authError.message);
      return;
    }

    // Update the user_name in the database
    const user = authData.user;
    if (user) {
      const { error: updateError } = await supabase
        .from("profiles") // Replace "profiles" with your table name
        .update({ user_name: userName })
        .eq("user_id", user.id); // Assuming your table has a column "id" linked to the user's ID
      if (updateError) {
        setError(updateError.message);
        return;
      }
    }

    // Redirect after successful signup
    router.push("/info/auth");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_name">Username</Label>
              <Input
                id="user_name"
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
