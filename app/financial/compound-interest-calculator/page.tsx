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

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("1000")
  const [rate, setRate] = useState("5")
  const [time, setTime] = useState("10")
  const [contribution, setContribution] = useState("100")
  const [compoundFrequency, setCompoundFrequency] = useState("annually")
  const [result, setResult] = useState<{ total: number; interest: number } | null>(null)
  const [chartData, setChartData] = useState<any[]>([])

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(time)
    const c = parseFloat(contribution)
    const n = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12 }[compoundFrequency] as number

    let balance = p
    const data = [{ year: 0, balance: p }]

    for (let i = 1; i <= t * n; i++) {
        balance = balance * (1 + r / n) + c
        if (i % n === 0) {
            data.push({ year: i / n, balance: balance })
        }
    }

    setResult({ total: balance, interest: balance - p - c * t * n })
    setChartData(data)
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Compound Interest Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-4">
            <InputWithLabel label="Principal Amount ($)" value={principal} onChange={setPrincipal} />
            <InputWithLabel label="Annual Interest Rate (%)" value={rate} onChange={setRate} />
            <InputWithLabel label="Time (Years)" value={time} onChange={setTime} />
            <InputWithLabel label="Periodic Contribution ($)" value={contribution} onChange={setContribution} />
            <div className="grid gap-2">
                <Label>Compound Frequency</Label>
                <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="annually">Annually</SelectItem>
                        <SelectItem value="semiannually">Semiannually</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={calculate} className="w-full">Calculate</Button>
          </div>
          <div className="flex flex-col items-center justify-center bg-muted p-8 rounded-lg">
            {result && <>
                <Label className="text-lg">Future Value</Label>
                <p className="text-4xl font-bold my-2">${result.total.toFixed(2)}</p>
                <Label className="text-lg">Total Interest</Label>
                <p className="text-2xl font-bold">${result.interest.toFixed(2)}</p>
            </>}
             {chartData.length > 0 && (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}/>
                  <Tooltip formatter={(value:any) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="balance" name="Balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
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