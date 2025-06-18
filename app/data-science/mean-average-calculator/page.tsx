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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function MeanCalculatorPage() {
  const [numbers, setNumbers] = useState("1, 2, 3, 4, 5")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const numArray = numbers.split(/,?\s+/).map(Number).filter(n => !isNaN(n));
    if (numArray.length === 0) {
        setError("Please enter at least one number.");
        setResult("");
        return;
    }

    const mean = numArray.reduce((a, b) => a + b) / numArray.length;
    
    setResult(mean.toFixed(4));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Mean (Average) Calculator</CardTitle>
          <CardDescription>Enter numbers separated by spaces or commas.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numbers">Numbers</Label>
            <Textarea id="numbers" value={numbers} onChange={e => setNumbers(e.target.value)} rows={5}/>
          </div>
          <Button onClick={calculate}>Calculate Mean</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Mean (Average): <span className="font-bold">{result}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 