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

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("25000")
  const [loanTerm, setLoanTerm] = useState("5")
  const [interestRate, setInterestRate] = useState("5")
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  const [totalInterest, setTotalInterest] = useState<number | null>(null)
  const [totalPayment, setTotalPayment] = useState<number | null>(null)
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([])

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount)
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseFloat(loanTerm) * 12

    if (principal > 0 && monthlyInterestRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
      
      const totalPaid = payment * numberOfPayments;
      const totalInt = totalPaid - principal;

      setMonthlyPayment(payment)
      setTotalInterest(totalInt);
      setTotalPayment(totalPaid);

      // Generate Amortization Schedule
      let balance = principal
      const schedule = []
      for (let i = 1; i <= numberOfPayments; i++) {
        const interest = balance * monthlyInterestRate
        const principalPaid = payment - interest
        balance -= principalPaid
        schedule.push({
          month: i,
          principal: principalPaid.toFixed(2),
          interest: interest.toFixed(2),
          balance: balance.toFixed(2),
        })
      }
      setAmortizationSchedule(schedule)
    } else {
      setMonthlyPayment(null)
      setAmortizationSchedule([])
      setTotalInterest(null)
      setTotalPayment(null)
    }
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Loan Calculator</CardTitle>
          <CardDescription>
            Estimate your monthly loan payment and total cost.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="loan-amount">Loan Amount ($)</Label>
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
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
            <Button onClick={calculateLoan} className="w-full">
              Calculate
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center bg-muted p-8 rounded-lg space-y-4">
            <div>
                <Label className="text-lg">Monthly Payment</Label>
                <p className="text-4xl font-bold">
                {monthlyPayment ? `$${monthlyPayment.toFixed(2)}` : "$0.00"}
                </p>
            </div>
             <div>
                <Label className="text-lg">Total Interest</Label>
                <p className="text-2xl font-bold">
                {totalInterest ? `$${totalInterest.toFixed(2)}` : "$0.00"}
                </p>
            </div>
             <div>
                <Label className="text-lg">Total Payment</Label>
                <p className="text-2xl font-bold">
                {totalPayment ? `$${totalPayment.toFixed(2)}` : "$0.00"}
                </p>
            </div>
          </div>
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
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationSchedule.map(row => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
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