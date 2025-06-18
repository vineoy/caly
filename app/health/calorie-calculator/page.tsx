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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const activityLevels = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
}

export default function CalorieCalculatorPage() {
  const [bmr, setBmr] = useState("1800")
  const [activityLevel, setActivityLevel] = useState<keyof typeof activityLevels>("sedentary")
  const [calorieNeeds, setCalorieNeeds] = useState<number | null>(null)

  const calculateCalories = () => {
    const bmrVal = parseFloat(bmr)
    const multiplier = activityLevels[activityLevel]
    setCalorieNeeds(bmrVal * multiplier)
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Calorie Calculator</CardTitle>
          <CardDescription>
            Estimate your daily calorie needs to maintain your weight.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="bmr">Basal Metabolic Rate (BMR)</Label>
            <Input
              id="bmr"
              type="number"
              value={bmr}
              onChange={e => setBmr(e.target.value)}
              placeholder="Enter your BMR"
            />
             <p className="text-sm text-muted-foreground">
              You can calculate this with our BMR Calculator.
            </p>
          </div>
          <div className="grid gap-2">
            <Label>Activity Level</Label>
             <Select value={activityLevel} onValueChange={v => setActivityLevel(v as any)}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Very active (hard exercise/sports 6-7 days a week)</SelectItem>
                    <SelectItem value="veryActive">Super active (very hard exercise/sports & physical job)</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateCalories} className="w-full">
            Calculate Calories
          </Button>
          {calorieNeeds !== null && (
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Estimated Daily Calorie Needs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold">{calorieNeeds.toFixed(0)}</p>
                <p>calories/day</p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 