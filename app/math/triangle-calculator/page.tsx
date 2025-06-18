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

export default function TriangleCalculatorPage() {
  const [sideA, setSideA] = useState("3")
  const [sideB, setSideB] = useState("4")
  const [sideC, setSideC] = useState("5")
  const [result, setResult] = useState<{ area: string; perimeter: string } | null>(null)
  const [error, setError] = useState<string>("")

  const calculateTriangle = () => {
    const a = parseFloat(sideA)
    const b = parseFloat(sideB)
    const c = parseFloat(sideC)

    // Triangle inequality theorem
    if (a + b <= c || a + c <= b || b + c <= a) {
        setError("The given side lengths do not form a valid triangle.");
        setResult(null);
        return;
    }

    const perimeter = a + b + c
    // Heron's formula for area
    const s = perimeter / 2
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
    
    setResult({ area: area.toFixed(2), perimeter: perimeter.toFixed(2) })
    setError("")
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Triangle Calculator</CardTitle>
          <CardDescription>Calculate area and perimeter from side lengths.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Side A" value={sideA} onChange={setSideA} />
          <InputWithLabel label="Side B" value={sideB} onChange={setSideB} />
          <InputWithLabel label="Side C" value={sideC} onChange={setSideC} />
          <Button onClick={calculateTriangle}>Calculate</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Area: <span className="font-bold">{result.area}</span></p>
                <p>Perimeter: <span className="font-bold">{result.perimeter}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function InputWithLabel({label, value, onChange} : {label:string, value:string, onChange: (v:string) => void}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Input type="number" value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
} 