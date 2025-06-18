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

export default function GdpCalculatorPage() {
  const [consumption, setConsumption] = useState("10") // C
  const [investment, setInvestment] = useState("2")   // I
  const [government, setGovernment] = useState("3")   // G
  const [exports, setExports] = useState("1.5")     // X
  const [imports, setImports] = useState("2.5")     // M
  const [gdp, setGdp] = useState<number | null>(null)

  const calculateGdp = () => {
    const C = parseFloat(consumption)
    const I = parseFloat(investment)
    const G = parseFloat(government)
    const X = parseFloat(exports)
    const M = parseFloat(imports)
    const result = C + I + G + (X - M)
    setGdp(result)
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">GDP Calculator</CardTitle>
          <CardDescription>
            Calculate GDP using the expenditure approach.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Consumption (C)" value={consumption} onChange={setConsumption} unit="(trillions)"/>
          <InputWithLabel label="Investment (I)" value={investment} onChange={setInvestment} unit="(trillions)"/>
          <InputWithLabel label="Government Spending (G)" value={government} onChange={setGovernment} unit="(trillions)"/>
          <InputWithLabel label="Exports (X)" value={exports} onChange={setExports} unit="(trillions)"/>
          <InputWithLabel label="Imports (M)" value={imports} onChange={setImports} unit="(trillions)"/>
          <Button onClick={calculateGdp}>Calculate GDP</Button>
          {gdp !== null && (
            <div className="p-4 bg-muted rounded-md text-center">
              <h3 className="font-semibold">Gross Domestic Product (GDP):</h3>
              <p className="text-2xl font-bold">${gdp.toFixed(2)} trillion</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function InputWithLabel({label, value, onChange, unit} : {label:string, value:string, onChange: (v:string) => void, unit?: string}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <div className="flex items-center gap-2">
                <Input type="number" value={value} onChange={e => onChange(e.target.value)} />
                {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
        </div>
    )
} 