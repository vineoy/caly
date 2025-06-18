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

export default function MolarityCalculatorPage() {
  const [solveFor, setSolveFor] = useState("molarity")
  const [mass, setMass] = useState("58.44") // 1 mole of NaCl
  const [volume, setVolume] = useState("1") // in Liters
  const [molarMass, setMolarMass] = useState("58.44") // NaCl
  const [molarity, setMolarity] = useState("1") // in M
  const [result, setResult] = useState<string>("")

  const calculate = () => {
    const m = parseFloat(mass) // grams
    const v = parseFloat(volume) // liters
    const mm = parseFloat(molarMass) // g/mol
    const M = parseFloat(molarity) // mol/L

    if (solveFor === "molarity") {
      const moles = m / mm
      setResult(`${(moles / v).toFixed(4)} M`)
    } else if (solveFor === "mass") {
      const moles = M * v
      setResult(`${(moles * mm).toFixed(4)} g`)
    } else { // volume
      const moles = m / mm
      setResult(`${(moles / M).toFixed(4)} L`)
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Molarity Calculator</CardTitle>
          <CardDescription>Solve for molarity, mass, or volume.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Solve for</Label>
            <Select value={solveFor} onValueChange={setSolveFor}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="molarity">Molarity (M)</SelectItem>
                    <SelectItem value="mass">Mass (g)</SelectItem>
                    <SelectItem value="volume">Volume (L)</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mass">Mass (g)</Label>
            <Input id="mass" type="number" value={mass} onChange={e => setMass(e.target.value)} disabled={solveFor === 'mass'}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="volume">Volume (L)</Label>
            <Input id="volume" type="number" value={volume} onChange={e => setVolume(e.target.value)} disabled={solveFor === 'volume'}/>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="molar-mass">Molar Mass (g/mol)</Label>
            <Input id="molar-mass" type="number" value={molarMass} onChange={e => setMolarMass(e.target.value)} />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="molarity">Molarity (M)</Label>
            <Input id="molarity" type="number" value={molarity} onChange={e => setMolarity(e.target.value)} disabled={solveFor === 'molarity'}/>
          </div>
          <Button onClick={calculate}>Calculate</Button>
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
              <h3 className="font-semibold capitalize">{solveFor}:</h3>
              <p className="text-2xl font-bold">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 