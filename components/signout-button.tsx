import React from "react";
import { signOut } from "@/utils/auth";
import Link from "next/link";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut();
    return <Link href="/login">Login</Link>; // Redirect after logout
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
