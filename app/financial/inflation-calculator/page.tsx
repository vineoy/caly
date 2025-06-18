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

export default function InflationCalculatorPage() {
  const [initialAmount, setInitialAmount] = useState("1000")
  const [inflationRate, setInflationRate] = useState("3")
  const [years, setYears] = useState("10")
  const [futureValue, setFutureValue] = useState<number | null>(null)

  const calculateInflation = () => {
    const amount = parseFloat(initialAmount)
    const rate = parseFloat(inflationRate) / 100
    const numYears = parseInt(years)

    const fv = amount * Math.pow(1 + rate, numYears)
    setFutureValue(fv)
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Inflation Calculator</CardTitle>
          <CardDescription>
            Calculate the future value of money.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="initial-amount">Initial Amount ($)</Label>
            <Input id="initial-amount" type="number" value={initialAmount} onChange={e => setInitialAmount(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="inflation-rate">Annual Inflation Rate (%)</Label>
            <Input id="inflation-rate" type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="years">Number of Years</Label>
            <Input id="years" type="number" value={years} onChange={e => setYears(e.target.value)} />
          </div>
          <Button onClick={calculateInflation}>Calculate</Button>
          {futureValue !== null && (
            <div className="p-4 bg-muted rounded-md text-center">
              <p>
                ${initialAmount} in {years} years will be worth
              </p>
              <p className="text-2xl font-bold">${futureValue.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 