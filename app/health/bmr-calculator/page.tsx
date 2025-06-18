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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BmrCalculatorPage() {
  const [unit, setUnit] = useState("metric")
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("30")
  const [height, setHeight] = useState("180")
  const [weight, setWeight] = useState("75")
  const [weightLbs, setWeightLbs] = useState("165")
  const [heightFt, setHeightFt] = useState("5")
  const [heightIn, setHeightIn] = useState("10")
  const [bmr, setBmr] = useState<number | null>(null)

  const calculateBmr = () => {
    const ageVal = parseInt(age)
    let h, w; // height in cm, weight in kg
    if (unit === 'metric') {
      h = parseFloat(height);
      w = parseFloat(weight);
    } else {
      h = (parseFloat(heightFt) * 12 + parseFloat(heightIn)) * 2.54;
      w = parseFloat(weightLbs) * 0.453592;
    }
    
    let calculatedBmr = 0
    // Mifflin-St Jeor Formula
    if (gender === 'male') {
        calculatedBmr = 10 * w + 6.25 * h - 5 * ageVal + 5
    } else {
        calculatedBmr = 10 * w + 6.25 * h - 5 * ageVal - 161
    }
    setBmr(calculatedBmr)
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">BMR Calculator</CardTitle>
          <CardDescription>
            Calculate your Basal Metabolic Rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label>Gender</Label>
                <RadioGroup defaultValue="male" value={gender} onValueChange={setGender} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="metric">Metric</SelectItem>
                    <SelectItem value="imperial">Imperial</SelectItem>
                </SelectContent>
            </Select>
            {unit === 'metric' ? (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="height-cm">Height (cm)</Label>
                        <Input id="height-cm" type="number" value={height} onChange={e => setHeight(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="weight-kg">Weight (kg)</Label>
                        <Input id="weight-kg" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                    </div>
                </>
            ) : (
                <>
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
                    <div className="grid gap-2">
                        <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                        <Input id="weight-lbs" type="number" value={weightLbs} onChange={e => setWeightLbs(e.target.value)} />
                    </div>
                </>
            )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
           <Button onClick={calculateBmr} className="w-full">
              Calculate BMR
            </Button>
            {bmr !== null && (
                 <Card className="w-full bg-muted">
                    <CardHeader><CardTitle>Your BMR</CardTitle></CardHeader>
                    <CardContent className="text-center">
                        <p className="text-4xl font-bold">{bmr.toFixed(0)}</p>
                        <p>calories/day</p>
                    </CardContent>
                </Card>
            )}
        </CardFooter>
      </Card>
    </div>
  )
} 