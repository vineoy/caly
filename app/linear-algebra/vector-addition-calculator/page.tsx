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

export default function VectorAdditionCalculatorPage() {
  const [vector1, setVector1] = useState("1, 2, 3")
  const [vector2, setVector2] = useState("4, 5, 6")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const v1 = vector1.split(/,?\s+/).map(Number);
    const v2 = vector2.split(/,?\s+/).map(Number);

    if (v1.length !== v2.length || v1.some(isNaN) || v2.some(isNaN)) {
        setError("Please enter two vectors of the same dimension.");
        setResult("");
        return;
    }

    const res = v1.map((val, i) => val + v2[i]);
    
    setResult(`[${res.join(', ')}]`);
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Vector Addition Calculator</CardTitle>
          <CardDescription>Enter two vectors of the same dimension.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Vector 1" value={vector1} onChange={setVector1} placeholder="e.g., 1, 2, 3"/>
          <InputWithLabel label="Vector 2" value={vector2} onChange={setVector2} placeholder="e.g., 4, 5, 6"/>
          <Button onClick={calculate}>Add Vectors</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Resultant Vector: <span className="font-bold">{result}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
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