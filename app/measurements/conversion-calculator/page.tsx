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

const conversionFactors = {
  length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254,
  },
  weight: {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495,
  },
  temperature: {
    c: (v:number) => v,
    f: (v:number) => (v * 9/5) + 32,
    k: (v:number) => v + 273.15,
  },
   temperatureFrom: {
    c: (v:number) => v,
    f: (v:number) => (v - 32) * 5/9,
    k: (v:number) => v - 273.15,
  }
};

type TempUnit = keyof typeof conversionFactors.temperature;

export default function ConversionCalculatorPage() {
  const [conversionType, setConversionType] = useState<"length" | "weight" | "temperature">("length")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("ft")
  const [value, setValue] = useState("1")
  const [result, setResult] = useState("")

  const handleConversion = () => {
    const val = parseFloat(value)
    if (conversionType === 'temperature') {
        const tempInC = conversionFactors.temperatureFrom[fromUnit as TempUnit](val)
        const convertedTemp = conversionFactors.temperature[toUnit as TempUnit](tempInC)
        setResult(convertedTemp.toFixed(2))
    } else {
        const fromFactor = (conversionFactors[conversionType] as Record<string, number>)[fromUnit]
        const toFactor = (conversionFactors[conversionType] as Record<string, number>)[toUnit]
        const convertedValue = (val * fromFactor) / toFactor
        setResult(convertedValue.toFixed(4))
    }
  }
  
  const unitsForType = Object.keys(conversionFactors[conversionType] || {})

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Conversion Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Select value={conversionType} onValueChange={t => {setConversionType(t as any); setFromUnit(''); setToUnit('')}}>
            <SelectTrigger><SelectValue placeholder="Select conversion type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="length">Length</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-4">
            <div className="grid gap-1 w-full">
              <Label>From</Label>
              <Input type="number" value={value} onChange={e => setValue(e.target.value)} />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                 <SelectTrigger><SelectValue/></SelectTrigger>
                 <SelectContent>{unitsForType.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
              </Select>
            </div>
             <div className="pt-6"> &#8594; </div>
            <div className="grid gap-1 w-full">
               <Label>To</Label>
               <Input readOnly value={result} className="font-bold"/>
               <Select value={toUnit} onValueChange={setToUnit}>
                 <SelectTrigger><SelectValue/></SelectTrigger>
                 <SelectContent>{unitsForType.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleConversion}>Convert</Button>
        </CardContent>
      </Card>
    </div>
  )
} 