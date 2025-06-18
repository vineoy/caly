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

export default function FinanceCalculatorPage() {
  const [solveFor, setSolveFor] = useState("fv")
  const [pv, setPv] = useState("1000")
  const [pmt, setPmt] = useState("100")
  const [n, setN] = useState("10") // periods
  const [iy, setIy] = useState("5") // interest rate
  const [fv, setFv] = useState("0")
  const [result, setResult] = useState<string>("")

  const calculate = () => {
    const rate = parseFloat(iy) / 100
    const numPeriods = parseInt(n)
    const presentValue = parseFloat(pv)
    const payment = parseFloat(pmt)
    const futureValue = parseFloat(fv)

    let res = 0;
    if (solveFor === 'fv') {
        res = presentValue * Math.pow(1 + rate, numPeriods) + payment * ((Math.pow(1 + rate, numPeriods) - 1) / rate)
    } else if (solveFor === 'pv') {
        res = futureValue / Math.pow(1 + rate, numPeriods) - payment * ((1 - Math.pow(1 + rate, -numPeriods)) / rate)
    } else if (solveFor === 'pmt') {
        res = (futureValue - presentValue * Math.pow(1 + rate, numPeriods)) / (((Math.pow(1 + rate, numPeriods) - 1)) / rate)
    }
    setResult(res.toFixed(2));
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Finance Calculator</CardTitle>
          <CardDescription>Solve for financial variables.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Solve for</Label>
            <Select value={solveFor} onValueChange={setSolveFor}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="fv">Future Value (FV)</SelectItem>
                    <SelectItem value="pv">Present Value (PV)</SelectItem>
                    <SelectItem value="pmt">Payment (PMT)</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <InputWithLabel label="Present Value (PV)" value={pv} onChange={setPv} disabled={solveFor === 'pv'}/>
          <InputWithLabel label="Payment (PMT)" value={pmt} onChange={setPmt} disabled={solveFor === 'pmt'}/>
          <InputWithLabel label="Future Value (FV)" value={fv} onChange={setFv} disabled={solveFor === 'fv'}/>
          <InputWithLabel label="Periods (N)" value={n} onChange={setN} />
          <InputWithLabel label="Interest Rate (%)" value={iy} onChange={setIy} />
          
          <Button onClick={calculate}>Calculate</Button>
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
              <h3 className="font-semibold capitalize">{solveFor.toUpperCase()}:</h3>
              <p className="text-2xl font-bold">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function InputWithLabel({label, value, onChange, disabled = false} : {label:string, value:string, onChange: (v:string) => void, disabled?: boolean}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Input type="number" value={value} onChange={e => onChange(e.target.value)} disabled={disabled}/>
        </div>
    )
} 