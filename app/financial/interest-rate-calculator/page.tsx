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

export default function InterestRateCalculatorPage() {
  const [pv, setPv] = useState("1000")
  const [fv, setFv] = useState("2000")
  const [n, setN] = useState("10") // periods
  const [result, setResult] = useState<string>("")

  const calculateRate = () => {
    // Basic formula: rate = (FV/PV)^(1/N) - 1
    const rate = Math.pow(parseFloat(fv) / parseFloat(pv), 1 / parseInt(n)) - 1
    setResult((rate * 100).toFixed(2))
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Interest Rate Calculator</CardTitle>
          <CardDescription>Find the required interest rate for your goal.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Present Value ($)" value={pv} onChange={setPv}/>
          <InputWithLabel label="Future Value ($)" value={fv} onChange={setFv}/>
          <InputWithLabel label="Periods (Years)" value={n} onChange={setN} />
          <Button onClick={calculateRate}>Calculate Rate</Button>
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
              <h3 className="font-semibold">Required Annual Interest Rate:</h3>
              <p className="text-2xl font-bold">{result}%</p>
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