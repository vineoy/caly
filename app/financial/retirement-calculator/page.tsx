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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState("30")
  const [retirementAge, setRetirementAge] = useState("65")
  const [currentSavings, setCurrentSavings] = useState("50000")
  const [monthlyContribution, setMonthlyContribution] = useState("500")
  const [annualReturn, setAnnualReturn] = useState("7")
  const [retirementBalance, setRetirementBalance] = useState<number | null>(null)
  const [chartData, setChartData] = useState<any[]>([])

  const calculateRetirement = () => {
    const age = parseInt(currentAge)
    const retAge = parseInt(retirementAge)
    let balance = parseFloat(currentSavings)
    const monthlyContrib = parseFloat(monthlyContribution)
    const monthlyReturn = parseFloat(annualReturn) / 100 / 12
    const yearsToRetirement = retAge - age

    const data = [{ year: age, balance: balance }]

    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        balance += monthlyContrib
        balance *= 1 + monthlyReturn
      }
      data.push({ year: age + year, balance: balance })
    }

    setRetirementBalance(balance)
    setChartData(data)
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Retirement Calculator</CardTitle>
          <CardDescription>
            Project your retirement savings growth over time.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-age">Current Age</Label>
              <Input id="current-age" type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="retirement-age">Retirement Age</Label>
              <Input id="retirement-age" type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current-savings">Current Savings ($)</Label>
              <Input id="current-savings" type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthly-contrib">Monthly Contribution ($)</Label>
              <Input id="monthly-contrib" type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="return-rate">Estimated Annual Return (%)</Label>
              <Input id="return-rate" type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} />
            </div>
            <Button onClick={calculateRetirement} className="w-full">
              Calculate
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center bg-muted p-8 rounded-lg">
             <Label className="text-lg">Estimated Retirement Balance</Label>
             <p className="text-4xl font-bold my-4">
              {retirementBalance
                ? `$${retirementBalance.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}`
                : "$0"}
            </p>
            {chartData.length > 0 && (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}/>
                  <Tooltip formatter={(value:any) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 