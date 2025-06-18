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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InterestCalculatorPage() {
  const [principal, setPrincipal] = useState("1000")
  const [rate, setRate] = useState("5")
  const [time, setTime] = useState("10")
  const [timeUnit, setTimeUnit] = useState<"years" | "months">("years")
  const [compoundFrequency, setCompoundFrequency] = useState("annually")
  const [result, setResult] = useState<{
    total: string
    interest: string
  } | null>(null)

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = timeUnit === "years" ? parseFloat(time) : parseFloat(time) / 12

    const interest = p * r * t
    const total = p + interest
    setResult({ total: total.toFixed(2), interest: interest.toFixed(2) })
  }

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = timeUnit === "years" ? parseFloat(time) : parseFloat(time) / 12
    
    const n = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      daily: 365,
    }[compoundFrequency] as number;

    const total = p * Math.pow(1 + r / n, n * t)
    const interest = total - p
    setResult({ total: total.toFixed(2), interest: interest.toFixed(2) })
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Interest Calculator</CardTitle>
          <CardDescription>
            Calculate simple or compound interest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="simple" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simple">Simple</TabsTrigger>
              <TabsTrigger value="compound">Compound</TabsTrigger>
            </TabsList>
            <div className="grid gap-4 pt-6">
              <div className="grid gap-2">
                <Label htmlFor="principal">Principal Amount ($)</Label>
                <Input id="principal" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input id="rate" type="number" value={rate} onChange={e => setRate(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" value={time} onChange={e => setTime(e.target.value)} />
                <Select value={timeUnit} onValueChange={v => setTimeUnit(v as any)}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <TabsContent value="simple">
              <Button onClick={calculateSimpleInterest} className="w-full mt-4">Calculate</Button>
            </TabsContent>
            <TabsContent value="compound">
                <div className="grid gap-2 mt-4">
                  <Label>Compound Frequency</Label>
                  <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semiannually">Semiannually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <Button onClick={calculateCompoundInterest} className="w-full mt-4">Calculate</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        {result && (
          <CardFooter>
            <Card className="w-full bg-muted">
              <CardHeader><CardTitle>Result</CardTitle></CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span><span>${result.total}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Interest Amount:</span><span>${result.interest}</span>
                </div>
              </CardContent>
            </Card>
          </CardFooter>
        )}
      </Card>
    </div>
  )
} 