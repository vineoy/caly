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

export default function CrossProductCalculatorPage() {
  const [vector1, setVector1] = useState("1, 2, 3")
  const [vector2, setVector2] = useState("4, 5, 6")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const v1 = vector1.split(/,?\s+/).map(Number);
    const v2 = vector2.split(/,?\s+/).map(Number);

    if (v1.length !== 3 || v2.length !== 3 || v1.some(isNaN) || v2.some(isNaN)) {
        setError("Please enter two 3-dimensional vectors.");
        setResult("");
        return;
    }

    const res = [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0]
    ];
    
    setResult(`[${res.join(', ')}]`);
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Cross Product Calculator</CardTitle>
          <CardDescription>Calculate the cross product of two 3D vectors.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Vector 1 (3D)" value={vector1} onChange={setVector1} placeholder="e.g., 1, 2, 3"/>
          <InputWithLabel label="Vector 2 (3D)" value={vector2} onChange={setVector2} placeholder="e.g., 4, 5, 6"/>
          <Button onClick={calculate}>Calculate Cross Product</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Cross Product: <span className="font-bold">{result}</span></p>
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