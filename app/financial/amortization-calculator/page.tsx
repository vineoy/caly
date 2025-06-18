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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AmortizationCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("200000")
  const [loanTerm, setLoanTerm] = useState("30")
  const [interestRate, setInterestRate] = useState("6")
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([])

  const calculateAmortization = () => {
    const principal = parseFloat(loanAmount)
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseFloat(loanTerm) * 12

    if (principal > 0 && monthlyInterestRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

      let balance = principal
      const schedule = []
      for (let i = 1; i <= numberOfPayments; i++) {
        const interest = balance * monthlyInterestRate
        const principalPaid = payment - interest
        balance -= principalPaid
        schedule.push({
          month: i,
          payment: payment.toFixed(2),
          principal: principalPaid.toFixed(2),
          interest: interest.toFixed(2),
          balance: balance.toFixed(2),
        })
      }
      setAmortizationSchedule(schedule)
    } else {
      setAmortizationSchedule([])
    }
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Amortization Calculator</CardTitle>
          <CardDescription>
            Generate a detailed payment schedule for your loan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="grid md:grid-cols-3 gap-4">
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
          </div>
           <Button onClick={calculateAmortization} className="w-full">
              Generate Schedule
            </Button>
        </CardContent>
        {amortizationSchedule.length > 0 && (
          <CardFooter className="flex-col">
            <h3 className="text-xl font-semibold mb-4">
              Amortization Schedule
            </h3>
            <div className="w-full h-96 overflow-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationSchedule.map(row => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>${row.payment}</TableCell>
                      <TableCell>${row.principal}</TableCell>
                      <TableCell>${row.interest}</TableCell>
                      <TableCell>${row.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
} 