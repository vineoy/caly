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

export default function ScalarVectorMultiplicationCalculatorPage() {
  const [scalar, setScalar] = useState("3")
  const [vector, setVector] = useState("1, 2, 3")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const s = parseFloat(scalar);
    const v = vector.split(/,?\s+/).map(Number);

    if (isNaN(s) || v.some(isNaN)) {
        setError("Please enter a valid scalar and vector.");
        setResult("");
        return;
    }

    const res = v.map(val => val * s);
    
    setResult(`[${res.join(', ')}]`);
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Scalar-Vector Multiplication</CardTitle>
          <CardDescription>Multiply a vector by a scalar value.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Scalar" value={scalar} onChange={setScalar} placeholder="e.g., 3"/>
          <InputWithLabel label="Vector" value={vector} onChange={setVector} placeholder="e.g., 1, 2, 3"/>
          <Button onClick={calculate}>Multiply</Button>
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