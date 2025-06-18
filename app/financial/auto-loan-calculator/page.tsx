"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AutoLoanCalculatorPage() {
  const [vehiclePrice, setVehiclePrice] = useState("35000")
  const [tradeInValue, setTradeInValue] = useState("5000")
  const [salesTax, setSalesTax] = useState("7")
  const [loanTerm, setLoanTerm] = useState("5")
  const [interestRate, setInterestRate] = useState("6")
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  const [totalPayment, setTotalPayment] = useState<number | null>(null)

  const calculateAutoLoan = () => {
    const price = parseFloat(vehiclePrice)
    const tradeIn = parseFloat(tradeInValue)
    const taxRate = parseFloat(salesTax) / 100
    
    const priceAfterTradeIn = price - tradeIn
    const totalTax = priceAfterTradeIn * taxRate
    const principal = priceAfterTradeIn + totalTax

    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseFloat(loanTerm) * 12

    if (principal > 0 && numberOfPayments > 0) {
      if (monthlyInterestRate > 0) {
        const payment =
          (principal *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        setMonthlyPayment(payment)
        setTotalPayment(payment * numberOfPayments)
      } else {
        // Handle 0% interest rate
        const payment = principal / numberOfPayments
        setMonthlyPayment(payment)
        setTotalPayment(principal)
      }
    } else {
      setMonthlyPayment(null)
      setTotalPayment(null)
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Auto Loan Calculator</CardTitle>
          <CardDescription>
            Estimate your monthly car loan payment.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="vehicle-price">Vehicle Price ($)</Label>
            <Input
              id="vehicle-price"
              type="number"
              value={vehiclePrice}
              onChange={e => setVehiclePrice(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="trade-in">Trade-in Value ($)</Label>
            <Input
              id="trade-in"
              type="number"
              value={tradeInValue}
              onChange={e => setTradeInValue(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sales-tax">Sales Tax (%)</Label>
            <Input
              id="sales-tax"
              type="number"
              value={salesTax}
              onChange={e => setSalesTax(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="loan-term">Loan Term (Years)</Label>
            <Input
              id="loan-term"
              type="number"
              value={loanTerm}
              onChange={e => setLoanTerm(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={e => setInterestRate(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateAutoLoan} className="w-full">
            Calculate
          </Button>
          {monthlyPayment !== null && (
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Monthly Payment:</span>
                  <span className="font-bold text-lg">${monthlyPayment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Payment:</span>
                  <span className="font-bold">${totalPayment?.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 