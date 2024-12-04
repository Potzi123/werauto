"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateGroupPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert("Group created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating group");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Group Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button className="mt-4" type="submit">Create Group</Button>
    </form>
  );
}

