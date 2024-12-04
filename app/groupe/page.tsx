"use client"

//import { useState } from "react"
import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"


export default function Group() {
    const router = useRouter();



  return (
      <div className="space-y-4">
        <Button>Update group</Button>
        <Button onClick={() => router.push("/groupe/create")}>Create group</Button>
      </div>
  )
}

