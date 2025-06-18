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

export default function BodyFatCalculatorPage() {
  const [unit, setUnit] = useState("metric")
  const [gender, setGender] = useState("male")
  
  const [height, setHeight] = useState("180")
  const [waist, setWaist] = useState("85")
  const [neck, setNeck] = useState("40")
  const [hip, setHip] = useState("90")

  const [heightIn, setHeightIn] = useState("71")
  const [waistIn, setWaistIn] = useState("33")
  const [neckIn, setNeckIn] = useState("16")
  const [hipIn, setHipIn] = useState("35")


  const [bodyFat, setBodyFat] = useState<number | null>(null)

  const calculateBodyFat = () => {
    let h: number, w: number, n: number, p: number

    if (unit === 'metric') {
      h = parseFloat(height)
      w = parseFloat(waist)
      n = parseFloat(neck)
      p = parseFloat(hip)
    } else {
      h = parseFloat(heightIn) * 2.54
      w = parseFloat(waistIn) * 2.54
      n = parseFloat(neckIn) * 2.54
      p = parseFloat(hipIn) * 2.54
    }
    
    let bfp = 0;
    if (gender === 'male') {
        bfp = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
    } else {
        bfp = 495 / (1.29579 - 0.35004 * Math.log10(w + p - n) + 0.22100 * Math.log10(h)) - 450
    }
    if (isNaN(bfp) || !isFinite(bfp)) {
      setBodyFat(null)
      return
    }
    setBodyFat(bfp)
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Body Fat Calculator</CardTitle>
          <CardDescription>
            Estimate your body fat percentage using the U.S. Navy Method.
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
           <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="metric">Metric (cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (in)</SelectItem>
                </SelectContent>
            </Select>
          <div className="grid gap-2">
            <Label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'in'})</Label>
            <Input id="height" type="number" value={unit === "metric" ? height : heightIn} onChange={e => unit === "metric" ? setHeight(e.target.value) : setHeightIn(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="waist">Waist ({unit === 'metric' ? 'cm' : 'in'})</Label>
            <Input id="waist" type="number" value={unit === "metric" ? waist : waistIn} onChange={e => unit === "metric" ? setWaist(e.target.value) : setWaistIn(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="neck">Neck ({unit === 'metric' ? 'cm' : 'in'})</Label>
            <Input id="neck" type="number" value={unit === "metric" ? neck : neckIn} onChange={e => unit === "metric" ? setNeck(e.target.value) : setNeckIn(e.target.value)} />
          </div>
          {gender === 'female' && (
            <div className="grid gap-2">
              <Label htmlFor="hip">Hip ({unit === 'metric' ? 'cm' : 'in'})</Label>
              <Input id="hip" type="number" value={unit === "metric" ? hip : hipIn} onChange={e => unit === "metric" ? setHip(e.target.value) : setHipIn(e.target.value)} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateBodyFat} className="w-full">
            Calculate Body Fat
          </Button>
          {bodyFat !== null && (
            <Card className="w-full bg-muted">
              <CardHeader><CardTitle>Estimated Body Fat</CardTitle></CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold">{bodyFat.toFixed(1)}%</p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 