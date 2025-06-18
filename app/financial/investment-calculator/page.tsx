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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export default function InvestmentCalculatorPage() {
  const [initialAmount, setInitialAmount] = useState("10000")
  const [contribution, setContribution] = useState("500")
  const [contributionFrequency, setContributionFrequency] = useState("monthly")
  const [time, setTime] = useState("20")
  const [annualReturn, setAnnualReturn] = useState("8")
  const [futureValue, setFutureValue] = useState<number | null>(null)
  const [chartData, setChartData] = useState<any[]>([])

  const calculateInvestment = () => {
    let balance = parseFloat(initialAmount)
    const contrib = parseFloat(contribution)
    const rate = parseFloat(annualReturn) / 100
    const years = parseInt(time)
    
    const periodsPerYear = { monthly: 12, annually: 1 }[contributionFrequency] || 1;
    const periodicRate = rate / periodsPerYear;
    const totalPeriods = years * periodsPerYear;

    const data = [{ year: 0, balance: balance }];
    let yearlyBalance = balance;

    for (let i = 1; i <= totalPeriods; i++) {
        balance = balance * (1 + periodicRate) + contrib;
        if(i % periodsPerYear === 0) {
            data.push({ year: i / periodsPerYear, balance: balance });
        }
    }

    setFutureValue(balance)
    setChartData(data)
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Investment Calculator</CardTitle>
          <CardDescription>
            Project the future value of your investments.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Initial Amount ($)</Label>
              <Input type="number" value={initialAmount} onChange={e => setInitialAmount(e.target.value)} />
            </div>
             <div className="grid grid-cols-2 gap-2">
                <Input type="number" value={contribution} onChange={e => setContribution(e.target.value)} />
                <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Per Month</SelectItem>
                    <SelectItem value="annually">Per Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            <div className="grid gap-2">
              <Label>Time in Years</Label>
              <Input type="number" value={time} onChange={e => setTime(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Estimated Annual Return (%)</Label>
              <Input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} />
            </div>
            <Button onClick={calculateInvestment} className="w-full">
              Calculate
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center bg-muted p-8 rounded-lg">
             <Label className="text-lg">Estimated Future Value</Label>
             <p className="text-4xl font-bold my-4">
              {futureValue
                ? `$${futureValue.toLocaleString(undefined, {
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
                  <Line type="monotone" dataKey="balance" name="Balance" stroke="#22c55e" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 