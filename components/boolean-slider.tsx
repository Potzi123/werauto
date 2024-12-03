import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface BooleanSliderProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
}

export function BooleanSlider({ checked, onCheckedChange, label }: BooleanSliderProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200"
      />
      {label && <Label htmlFor="airplane-mode">{label}</Label>}
    </div>
  )
}


export { Switch }
