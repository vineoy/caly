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

export default function CovarianceCalculatorPage() {
  const [numbers1, setNumbers1] = useState("1, 2, 3, 4, 5")
  const [numbers2, setNumbers2] = useState("5, 4, 3, 2, 1")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const arr1 = numbers1.split(/,?\s+/).map(Number).filter(n => !isNaN(n));
    const arr2 = numbers2.split(/,?\s+/).map(Number).filter(n => !isNaN(n));

    if (arr1.length !== arr2.length || arr1.length === 0) {
        setError("Please enter two equal-length lists of numbers.");
        setResult("");
        return;
    }

    const mean1 = arr1.reduce((a, b) => a + b) / arr1.length;
    const mean2 = arr2.reduce((a, b) => a + b) / arr2.length;
    
    const covariance = arr1.reduce((acc, val, i) => acc + (val - mean1) * (arr2[i] - mean2), 0) / (arr1.length - 1);
    
    setResult(covariance.toFixed(4));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Covariance (Joint Variability) Calculator</CardTitle>
          <CardDescription>Enter two lists of numbers.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="numbers1">Data Set 1</Label>
            <Textarea id="numbers1" value={numbers1} onChange={e => setNumbers1(e.target.value)} rows={3}/>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="numbers2">Data Set 2</Label>
            <Textarea id="numbers2" value={numbers2} onChange={e => setNumbers2(e.target.value)} rows={3}/>
          </div>
          <Button onClick={calculate}>Calculate Covariance</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Sample Covariance: <span className="font-bold">{result}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 