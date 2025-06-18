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

export default function StandardDeviationCalculatorPage() {
  const [numbers, setNumbers] = useState("1, 2, 3, 4, 5, 6, 7, 8, 9, 10")
  const [result, setResult] = useState<{ mean: string; variance: string; stdDev: string } | null>(null)
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const numArray = numbers.split(/,?\s+/).map(Number).filter(n => !isNaN(n));
    if (numArray.length < 2) {
        setError("Please enter at least two numbers.");
        setResult(null);
        return;
    }

    const mean = numArray.reduce((a, b) => a + b) / numArray.length;
    const variance = numArray.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (numArray.length -1);
    const stdDev = Math.sqrt(variance);

    setResult({
        mean: mean.toFixed(4),
        variance: variance.toFixed(4),
        stdDev: stdDev.toFixed(4)
    });
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Standard Deviation Calculator</CardTitle>
          <CardDescription>Enter numbers separated by spaces or commas.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numbers">Numbers</Label>
            <Textarea id="numbers" value={numbers} onChange={e => setNumbers(e.target.value)} rows={5}/>
          </div>
          <Button onClick={calculate}>Calculate</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md space-y-2">
                <p>Mean: <span className="font-bold">{result.mean}</span></p>
                <p>Variance: <span className="font-bold">{result.variance}</span></p>
                <p>Standard Deviation (Sample): <span className="font-bold">{result.stdDev}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 