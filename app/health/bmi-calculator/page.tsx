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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState("metric")
  const [height, setHeight] = useState("180")
  const [weight, setWeight] = useState("75")
  const [weightLbs, setWeightLbs] = useState("165")
  const [heightFt, setHeightFt] = useState("5")
  const [heightIn, setHeightIn] = useState("10")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState("")

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi >= 18.5 && bmi < 25) return "Normal weight"
    if (bmi >= 25 && bmi < 30) return "Overweight"
    if (bmi >= 30) return "Obese"
    return ""
  }

  const calculateBmi = () => {
    let calculatedBmi = 0
    if (unit === "metric") {
      const h = parseFloat(height) / 100
      const w = parseFloat(weight)
      calculatedBmi = w / (h * h)
    } else {
      const h = parseFloat(heightFt) * 12 + parseFloat(heightIn)
      const w = parseFloat(weightLbs)
      calculatedBmi = (w / (h * h)) * 703
    }

    if (isNaN(calculatedBmi) || !isFinite(calculatedBmi)) {
      setBmi(null)
      setBmiCategory("")
      return
    }

    setBmi(calculatedBmi)
    setBmiCategory(getBmiCategory(calculatedBmi))
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">BMI Calculator</CardTitle>
          <CardDescription>
            Calculate your Body Mass Index.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={unit} onValueChange={setUnit} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metric">Metric</TabsTrigger>
              <TabsTrigger value="imperial">Imperial</TabsTrigger>
            </TabsList>
            <TabsContent value="metric" className="grid gap-4 pt-6">
              <div className="grid gap-2">
                <Label htmlFor="height-cm">Height (cm)</Label>
                <Input id="height-cm" type="number" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight-kg">Weight (kg)</Label>
                <Input id="weight-kg" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
            </TabsContent>
            <TabsContent value="imperial" className="grid gap-4 pt-6">
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
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
           <Button onClick={calculateBmi} className="w-full">
              Calculate BMI
            </Button>
            {bmi !== null && (
                 <Card className="w-full bg-muted">
                    <CardHeader><CardTitle>Your BMI</CardTitle></CardHeader>
                    <CardContent className="text-center">
                        <p className="text-4xl font-bold">{bmi.toFixed(1)}</p>
                        <p className="text-lg font-semibold">{bmiCategory}</p>
                    </CardContent>
                </Card>
            )}
        </CardFooter>
      </Card>
    </div>
  )
} 