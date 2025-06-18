"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import GradientCalculator from '@/components/optimization/GradientCalculator'

export default function GradientCalculatorPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <GradientCalculator />
    </div>
  )
}

function InputWithLabel({label, value, onChange, placeholder} : {label:string, value:string, onChange: (v:string) => void, placeholder?: string}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}/>
        </div>
    )
} 