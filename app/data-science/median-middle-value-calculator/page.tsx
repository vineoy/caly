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

export default function MedianCalculatorPage() {
  const [numbers, setNumbers] = useState("1, 2, 3, 4, 5, 6, 7")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const numArray = numbers.split(/,?\s+/).map(Number).filter(n => !isNaN(n)).sort((a,b) => a - b);
    if (numArray.length === 0) {
        setError("Please enter at least one number.");
        setResult("");
        return;
    }

    const mid = Math.floor(numArray.length / 2);
    const median = numArray.length % 2 !== 0 ? numArray[mid] : (numArray[mid - 1] + numArray[mid]) / 2;
    
    setResult(median.toString());
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Median (Middle Value) Calculator</CardTitle>
          <CardDescription>Enter numbers separated by spaces or commas.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numbers">Numbers</Label>
            <Textarea id="numbers" value={numbers} onChange={e => setNumbers(e.target.value)} rows={5}/>
          </div>
          <Button onClick={calculate}>Calculate Median</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Median (Middle Value): <span className="font-bold">{result}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 