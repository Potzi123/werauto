"use client";

import { BooleanSlider } from "@/components/boolean-slider";
import { useEffect, useState } from "react";
import { fetchUserDrive, updateDriveStatus } from "@/utils/supabaseService";

export default function Home() {
  const [userDrive, setUserDrive] = useState<[boolean, string][] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserDrive();
        if (!data || data.length === 0) {
          throw new Error("You are not in a group");
        }
        setUserDrive(sortAlphabetically(data));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "An unexpected error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function sortAlphabetically(data: [boolean, string][]): [boolean, string][] {
    return [...data].sort((a, b) => a[1].localeCompare(b[1]));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <p>Name</p>

      {isLoading ? (
        <div className="inline-block align-middle animate-pulse bg-gray-200 h-5 w-32 rounded"></div>
      ) : error ? (
        <span className="text-red-500">{error}</span>
      ) : userDrive && userDrive.length > 0 ? (
        userDrive.map(([drive, name], index) => (
          <BooleanSlider
            key={index}
            checked={drive}
            onCheckedChange={async (value) => {
              const updatedDrives = [...userDrive];
              updatedDrives[index] = [value, name];
              setUserDrive(sortAlphabetically(updatedDrives));
              await updateDriveStatus(name, value);
            }}
            label={name}
          />
        ))
      ) : (
        <span>Unknown</span>
      )}
    </div>
  );
}
