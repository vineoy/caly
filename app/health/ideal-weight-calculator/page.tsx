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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function IdealWeightCalculatorPage() {
  const [gender, setGender] = useState("male")
  const [heightFt, setHeightFt] = useState("5")
  const [heightIn, setHeightIn] = useState("10")
  const [idealWeight, setIdealWeight] = useState<string>("")

  const calculateIdealWeight = () => {
    const feet = parseInt(heightFt)
    const inches = parseInt(heightIn)
    const totalInches = feet * 12 + inches

    let baseWeight = 0
    let weightPerInch = 0

    if (gender === "male") {
      baseWeight = 106 // for 5 feet
      weightPerInch = 6
    } else {
      baseWeight = 100 // for 5 feet
      weightPerInch = 5
    }

    if (totalInches > 60) {
      const weight = baseWeight + (totalInches - 60) * weightPerInch
      // Provide a range
      const lowerBound = (weight * 0.9).toFixed(1)
      const upperBound = (weight * 1.1).toFixed(1)
      setIdealWeight(`${lowerBound} - ${upperBound} lbs`)
    } else {
      setIdealWeight("Height must be over 5 feet.")
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Ideal Weight Calculator</CardTitle>
          <CardDescription>
            Calculate your ideal weight based on the G.J. Hamwi formula.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
              <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="height-ft">Height (ft)</Label>
              <Input id="height-ft" type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height-in">Height (in)</Label>
              <Input id="height-in" type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateIdealWeight} className="w-full">
            Calculate Ideal Weight
          </Button>
          {idealWeight && (
            <Card className="w-full bg-muted">
              <CardHeader><CardTitle>Ideal Weight Range</CardTitle></CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold">{idealWeight}</p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 