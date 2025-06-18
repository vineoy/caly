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

export default function DensityCalculatorPage() {
  const [solveFor, setSolveFor] = useState("density")
  const [mass, setMass] = useState("10")
  const [volume, setVolume] = useState("5")
  const [density, setDensity] = useState("2")
  const [result, setResult] = useState<string>("")

  const calculate = () => {
    const m = parseFloat(mass)
    const v = parseFloat(volume)
    const d = parseFloat(density)

    if (solveFor === "density") {
      setResult(`${(m / v).toFixed(4)}`)
    } else if (solveFor === "mass") {
      setResult(`${(d * v).toFixed(4)}`)
    } else { // volume
      setResult(`${(m / d).toFixed(4)}`)
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Density Calculator</CardTitle>
          <CardDescription>Solve for density, mass, or volume.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Solve for</Label>
            <Select value={solveFor} onValueChange={setSolveFor}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="density">Density</SelectItem>
                    <SelectItem value="mass">Mass</SelectItem>
                    <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mass">Mass</Label>
            <Input id="mass" type="number" value={mass} onChange={e => setMass(e.target.value)} disabled={solveFor === 'mass'}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="volume">Volume</Label>
            <Input id="volume" type="number" value={volume} onChange={e => setVolume(e.target.value)} disabled={solveFor === 'volume'}/>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="density">Density</Label>
            <Input id="density" type="number" value={density} onChange={e => setDensity(e.target.value)} disabled={solveFor === 'density'}/>
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