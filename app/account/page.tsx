"use client";

import { Button } from "@/components/ui/button";
import { getUserName } from "@/utils/getUserName";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UpdateGroupeForm from "@/components/groupe-updateform";

export default function Account() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const name = await getUserName();
        setUserName(name);
      } catch (error) {
        console.error("Error getting user name:", error);
        setUserName(null); // Fallback value if there's an error
      } finally {
        setIsLoading(false); // Stop showing the skeleton
      }
    }

    fetchUserName();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <p>This is your account page where you can manage your settings.</p>
      <div className="mb-4">
        <span>Current user: </span>
        {isLoading ? (
          <div className="inline-block align-middle animate-pulse bg-gray-200 h-5 w-32 rounded"></div> // Skeleton loader
        ) : (
          <span>{userName || "Guest"}</span>
        )}
      </div>
      {!isLoading && userName && (
        <Button onClick={() => router.push("/signup")}>
          Create Account
        </Button>
      )}
      <UpdateGroupeForm />
    </div>
  );
}
