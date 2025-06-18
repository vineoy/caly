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

export default function ZScoreCalculatorPage() {
  const [x, setX] = useState("70")
  const [mean, setMean] = useState("60")
  const [stdDev, setStdDev] = useState("10")
  const [result, setResult] = useState<string>("")

  const calculate = () => {
    const score = parseFloat(x);
    const m = parseFloat(mean);
    const sd = parseFloat(stdDev);

    if (sd === 0) {
        setResult("Standard deviation cannot be zero.");
        return;
    }
    
    const z = (score - m) / sd;
    setResult(z.toFixed(4));
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Z-Score (Standard Score) Calculator</CardTitle>
          <CardDescription>Calculate the Z-score of a data point.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Data Point (X)" value={x} onChange={setX} />
          <InputWithLabel label="Mean (μ)" value={mean} onChange={setMean} />
          <InputWithLabel label="Standard Deviation (σ)" value={stdDev} onChange={setStdDev} />
          <Button onClick={calculate}>Calculate Z-Score</Button>
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Z-Score: <span className="font-bold">{result}</span></p>
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