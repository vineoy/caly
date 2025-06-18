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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Simplified 2023 Tax Brackets
const taxBrackets = {
  single: [
    { rate: 0.10, from: 0, to: 11000 },
    { rate: 0.12, from: 11001, to: 44725 },
    { rate: 0.22, from: 44726, to: 95375 },
    { rate: 0.24, from: 95376, to: 182100 },
    { rate: 0.32, from: 182101, to: 231250 },
    { rate: 0.35, from: 231251, to: 578125 },
    { rate: 0.37, from: 578126, to: Infinity },
  ],
  married: [
    { rate: 0.10, from: 0, to: 22000 },
    { rate: 0.12, from: 22001, to: 89450 },
    { rate: 0.22, from: 89451, to: 190750 },
    { rate: 0.24, from: 190751, to: 364200 },
    { rate: 0.32, from: 364201, to: 462500 },
    { rate: 0.35, from: 462501, to: 693750 },
    { rate: 0.37, from: 693751, to: Infinity },
  ]
};

export default function IncomeTaxCalculatorPage() {
  const [income, setIncome] = useState("75000")
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single")
  const [taxOwed, setTaxOwed] = useState<number | null>(null)

  const calculateTax = () => {
    let taxableIncome = parseFloat(income);
    const brackets = taxBrackets[filingStatus];
    let totalTax = 0;

    for (const bracket of brackets) {
        if (taxableIncome > bracket.from) {
            const taxableInBracket = Math.min(taxableIncome, bracket.to) - bracket.from;
            totalTax += taxableInBracket * bracket.rate;
        }
    }
    setTaxOwed(totalTax);
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Income Tax Calculator</CardTitle>
          <CardDescription>
            A simplified US federal income tax calculator.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="income">Taxable Income ($)</Label>
            <Input id="income" type="number" value={income} onChange={e => setIncome(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Filing Status</Label>
             <Select value={filingStatus} onValueChange={s => setFilingStatus(s as any)}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married Filing Jointly</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateTax}>Calculate Tax</Button>
          {taxOwed !== null && (
            <div className="p-4 bg-muted rounded-md text-center">
              <h3 className="font-semibold">Estimated Tax Owed:</h3>
              <p className="text-2xl font-bold">${taxOwed.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 