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

export default function PercentageCalculatorPage() {
  const [val1, setVal1] = useState("50")
  const [val2, setVal2] = useState("200")
  const [result1, setResult1] = useState("")
  
  const [val3, setVal3] = useState("10")
  const [val4, setVal4] = useState("200")
  const [result2, setResult2] = useState("")
  
  const [val5, setVal5] = useState("10")
  const [val6, setVal6] = useState("50")
  const [result3, setResult3] = useState("")

  // "What is X% of Y?"
  const calc1 = () => setResult1(((parseFloat(val1)/100) * parseFloat(val2)).toString())
  // "X is what % of Y?"
  const calc2 = () => setResult2(((parseFloat(val3)/parseFloat(val4))*100).toFixed(2) + '%')
  // "% increase/decrease from X to Y"
  const calc3 = () => setResult3((((parseFloat(val6) - parseFloat(val5))/parseFloat(val5))*100).toFixed(2) + '%')

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-8">
        <Card>
          <CardHeader><CardTitle>What is X% of Y?</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} />
              <Label>% of</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} />
            </div>
            <Button onClick={calc1}>Calculate</Button>
            {result1 && <p className="text-xl font-bold text-center">{result1}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>X is what % of Y?</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
             <div className="flex items-center gap-2">
                <Input type="number" value={val3} onChange={e => setVal3(e.target.value)} />
                <Label>is what % of</Label>
                <Input type="number" value={val4} onChange={e => setVal4(e.target.value)} />
            </div>
            <Button onClick={calc2}>Calculate</Button>
            {result2 && <p className="text-xl font-bold text-center">{result2}</p>}
          </CardContent>
        </Card>
         <Card>
          <CardHeader><CardTitle>% Change</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
             <div className="flex items-center gap-2">
                 <Label>From</Label>
                <Input type="number" value={val5} onChange={e => setVal5(e.target.value)} />
                <Label>to</Label>
                <Input type="number" value={val6} onChange={e => setVal6(e.target.value)} />
            </div>
            <Button onClick={calc3}>Calculate</Button>
            {result3 && <p className="text-xl font-bold text-center">{result3}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 