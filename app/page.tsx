"use client"

import { BooleanSlider } from '@/components/boolean-slider'
import { useState } from 'react'

export default function Home() {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      
      <p>Name</p>
      <BooleanSlider
              checked={darkMode}
              onCheckedChange={setDarkMode}
              label="Fahre"
      />

    </div>
  )
}