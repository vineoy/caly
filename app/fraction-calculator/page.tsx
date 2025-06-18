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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// GCD function to simplify fractions
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

export default function FractionCalculatorPage() {
  const [num1, setNum1] = useState("1")
  const [den1, setDen1] = useState("2")
  const [num2, setNum2] = useState("3")
  const [den2, setDen2] = useState("4")
  const [operator, setOperator] = useState("+")
  const [result, setResult] = useState("")

  const calculateFraction = () => {
    const n1 = parseInt(num1)
    const d1 = parseInt(den1)
    const n2 = parseInt(num2)
    const d2 = parseInt(den2)

    if (d1 === 0 || d2 === 0) {
      setResult("Denominator cannot be zero.")
      return
    }

    let resN = 0
    let resD = 0

    switch (operator) {
      case "+":
        resN = n1 * d2 + n2 * d1
        resD = d1 * d2
        break
      case "-":
        resN = n1 * d2 - n2 * d1
        resD = d1 * d2
        break
      case "*":
        resN = n1 * n2
        resD = d1 * d2
        break
      case "/":
        resN = n1 * d2
        resD = d1 * n2
        break
    }
    
    if (resD === 0) {
      setResult("Result has a zero denominator.")
      return
    }

    const commonDivisor = gcd(Math.abs(resN), Math.abs(resD))
    setResult(`${resN / commonDivisor} / ${resD / commonDivisor}`)
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Fraction Calculator</CardTitle>
          <CardDescription>Perform arithmetic on fractions.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-1 w-24">
            <Input type="number" value={num1} onChange={e => setNum1(e.target.value)} />
            <hr/>
            <Input type="number" value={den1} onChange={e => setDen1(e.target.value)} />
          </div>
          <Select value={operator} onValueChange={setOperator}>
            <SelectTrigger className="w-16"><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="+">+</SelectItem>
              <SelectItem value="-">-</SelectItem>
              <SelectItem value="*">*</SelectItem>
              <SelectItem value="/">/</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-1 w-24">
            <Input type="number" value={num2} onChange={e => setNum2(e.target.value)} />
            <hr/>
            <Input type="number" value={den2} onChange={e => setDen2(e.target.value)} />
          </div>
           <Button onClick={calculateFraction} size="lg" className="mx-4">=</Button>
           <div className="text-2xl font-bold w-28">
             {result}
           </div>
        </CardContent>
      </Card>
    </div>
  )
} 