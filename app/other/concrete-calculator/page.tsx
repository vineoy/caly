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

export default function ConcreteCalculatorPage() {
  const [shape, setShape] = useState("slab")
  const [length, setLength] = useState("10")
  const [width, setWidth] = useState("10")
  const [thickness, setThickness] = useState("4")
  const [diameter, setDiameter] = useState("4")
  const [depth, setDepth] = useState("10")
  const [result, setResult] = useState<string>("")
  const [units, setUnits] = useState<"imperial" | "metric">("imperial")

  const calculateConcrete = () => {
    let volume = 0
    const len = parseFloat(length)
    const wid = parseFloat(width)
    const thick = parseFloat(thickness) / (units === 'imperial' ? 12 : 1) // to feet or meters
    const diam = parseFloat(diameter)
    const dep = parseFloat(depth)

    switch (shape) {
      case "slab":
        volume = len * wid * thick
        break
      case "footing":
        volume = len * wid * thick
        break
      case "column":
        volume = Math.PI * Math.pow(diam / (units === 'imperial' ? 24 : 2), 2) * dep
        break
    }
    
    if (units === 'imperial') {
        setResult(`${(volume / 27).toFixed(2)} cubic yards`)
    } else {
        setResult(`${volume.toFixed(2)} cubic meters`)
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Concrete Calculator</CardTitle>
          <CardDescription>
            Estimate the amount of concrete you need for your project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={shape} onValueChange={setShape}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="slab">Slab</TabsTrigger>
              <TabsTrigger value="footing">Footing</TabsTrigger>
              <TabsTrigger value="column">Column</TabsTrigger>
            </TabsList>
            <div className="grid gap-4 py-6">
                <Select value={units} onValueChange={(val) => setUnits(val as "imperial" | "metric")}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="imperial">Imperial (feet/inches)</SelectItem>
                        <SelectItem value="metric">Metric (meters/cm)</SelectItem>
                    </SelectContent>
                </Select>
             
              {shape !== "column" && (
                <>
                  <div className="grid gap-2">
                    <Label>Length ({units === 'imperial' ? 'feet' : 'meters'})</Label>
                    <Input type="number" value={length} onChange={e => setLength(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Width ({units === 'imperial' ? 'feet' : 'meters'})</Label>
                    <Input type="number" value={width} onChange={e => setWidth(e.target.value)} />
                  </div>
                </>
              )}
              {shape === "column" && (
                <div className="grid gap-2">
                  <Label>Diameter ({units === 'imperial' ? 'inches' : 'cm'})</Label>
                  <Input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} />
                </div>
              )}
               <div className="grid gap-2">
                <Label>{shape === 'column' ? `Height (${units === 'imperial' ? 'feet' : 'meters'})` : `Thickness (${units === 'imperial' ? 'inches' : 'cm'})`}</Label>
                <Input type="number" value={shape === 'column' ? depth : thickness} onChange={e => shape === 'column' ? setDepth(e.target.value) : setThickness(e.target.value)} />
              </div>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button onClick={calculateConcrete} className="w-full">Calculate</Button>
            {result && (
                 <Card className="w-full bg-muted">
                 <CardHeader><CardTitle>Estimated Concrete Needed</CardTitle></CardHeader>
                 <CardContent><p className="text-2xl font-bold text-center">{result}</p></CardContent>
               </Card>
            )}
        </CardFooter>
      </Card>
    </div>
  )
} 