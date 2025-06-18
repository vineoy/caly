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

export default function ModeCalculatorPage() {
  const [numbers, setNumbers] = useState("1, 2, 2, 3, 3, 3, 4, 5")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const numArray = numbers.split(/,?\s+/).map(Number).filter(n => !isNaN(n));
    if (numArray.length === 0) {
        setError("Please enter at least one number.");
        setResult("");
        return;
    }

    const frequency: {[key:number]: number} = {};
    numArray.forEach(n => frequency[n] = (frequency[n] || 0) + 1);

    let modes: number[] = [];
    let maxFreq = 0;
    for (const num in frequency) {
        if (frequency[num] > maxFreq) {
            modes = [Number(num)];
            maxFreq = frequency[num];
        } else if (frequency[num] === maxFreq) {
            modes.push(Number(num));
        }
    }
    
    setResult(modes.join(', '));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Mode (Most Frequent Value) Calculator</CardTitle>
          <CardDescription>Enter numbers separated by spaces or commas.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numbers">Numbers</Label>
            <Textarea id="numbers" value={numbers} onChange={e => setNumbers(e.target.value)} rows={5}/>
          </div>
          <Button onClick={calculate}>Calculate Mode</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Mode(s): <span className="font-bold">{result}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 