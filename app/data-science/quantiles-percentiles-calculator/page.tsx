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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function QuantileCalculatorPage() {
  const [numbers, setNumbers] = useState("1, 2, 3, 4, 5, 6, 7, 8, 9, 10")
  const [quantile, setQuantile] = useState("0.25")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const numArray = numbers.split(/,?\s+/).map(Number).filter(n => !isNaN(n)).sort((a,b) => a - b);
    const q = parseFloat(quantile);

    if (numArray.length === 0 || q < 0 || q > 1) {
        setError("Please enter a list of numbers and a quantile between 0 and 1.");
        setResult("");
        return;
    }

    const pos = (numArray.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    
    let quantileValue;
    if (numArray[base + 1] !== undefined) {
        quantileValue = numArray[base] + rest * (numArray[base + 1] - numArray[base]);
    } else {
        quantileValue = numArray[base];
    }
    
    setResult(quantileValue.toFixed(4));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Quantile / Percentile Calculator</CardTitle>
          <CardDescription>Enter numbers and a quantile (e.g., 0.25 for 25th percentile).</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numbers">Numbers</Label>
            <Textarea id="numbers" value={numbers} onChange={e => setNumbers(e.target.value)} rows={5}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantile">Quantile (0-1)</Label>
            <Input id="quantile" type="number" value={quantile} onChange={e => setQuantile(e.target.value)} />
          </div>
          <Button onClick={calculate}>Calculate Quantile</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Value at Quantile {quantile}: <span className="font-bold">{result}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 