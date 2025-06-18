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

export default function PaymentCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("10000")
  const [loanTerm, setLoanTerm] = useState("5")
  const [interestRate, setInterestRate] = useState("7")
  const [payment, setPayment] = useState<number | null>(null)

  const calculatePayment = () => {
    const principal = parseFloat(loanAmount)
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseFloat(loanTerm) * 12

    if (principal > 0 && numberOfPayments > 0) {
      if (monthlyInterestRate > 0) {
        const pmt =
          (principal *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        setPayment(pmt)
      } else {
        setPayment(principal / numberOfPayments)
      }
    } else {
      setPayment(null)
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Payment Calculator</CardTitle>
          <CardDescription>Calculate your periodic payment for a loan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="loan-amount">Loan Amount ($)</Label>
            <Input id="loan-amount" type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="loan-term">Loan Term (Years)</Label>
            <Input id="loan-term" type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input id="interest-rate" type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
          </div>
          <Button onClick={calculatePayment}>Calculate Payment</Button>
          {payment !== null && (
            <div className="p-4 bg-muted rounded-md text-center">
              <h3 className="font-semibold">Monthly Payment:</h3>
              <p className="text-2xl font-bold">${payment.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 