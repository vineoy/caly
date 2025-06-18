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

export default function SalaryCalculatorPage() {
  const [amount, setAmount] = useState("50000")
  const [from, setFrom] = useState("annually")
  const [to, setTo] = useState("hourly")
  const [hoursPerWeek, setHoursPerWeek] = useState("40")
  const [result, setResult] = useState<string>("")

  const calculateSalary = () => {
    const amt = parseFloat(amount);
    const hours = parseFloat(hoursPerWeek);
    const WEEKS_IN_YEAR = 52;

    let annualSalary = 0;
    if (from === 'hourly') {
        annualSalary = amt * hours * WEEKS_IN_YEAR;
    } else if (from === 'weekly') {
        annualSalary = amt * WEEKS_IN_YEAR;
    } else if (from === 'monthly') {
        annualSalary = amt * 12;
    } else { // annually
        annualSalary = amt;
    }

    let converted = 0;
     if (to === 'hourly') {
        converted = annualSalary / WEEKS_IN_YEAR / hours;
    } else if (to === 'weekly') {
        converted = annualSalary / WEEKS_IN_YEAR;
    } else if (to === 'monthly') {
        converted = annualSalary / 12;
    } else { // annually
        converted = annualSalary;
    }
    setResult(`$${converted.toFixed(2)}`);
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Salary Calculator</CardTitle>
          <CardDescription>Convert salaries between different pay periods.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <InputWithLabel label="Amount ($)" value={amount} onChange={setAmount} />
            <div className="flex items-end gap-4">
                 <SelectWithLabel label="From" value={from} onChange={setFrom}/>
                 <div className="px-2 font-bold text-2xl">&#8594;</div>
                 <SelectWithLabel label="To" value={to} onChange={setTo}/>
            </div>
             <InputWithLabel label="Hours per Week" value={hoursPerWeek} onChange={setHoursPerWeek} />
            <Button onClick={calculateSalary}>Convert</Button>
            {result && (
                <div className="p-4 bg-muted rounded-md text-center">
                    <h3 className="font-semibold capitalize">Converted Salary:</h3>
                    <p className="text-2xl font-bold">{result} / {to.slice(0,-2)}</p>
                </div>
            )}
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

function SelectWithLabel({label, value, onChange} : {label:string, value:string, onChange: (v:string) => void}) {
    return(
        <div className="grid gap-2 w-full">
            <Label>{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
} 