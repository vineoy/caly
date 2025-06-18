"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const units = {
  distance: ["meters", "kilometers", "miles", "feet", "yards"],
  time: ["seconds", "minutes", "hours"],
  speed: ["m/s", "km/h", "mph", "ft/s"],
}

const conversionFactors = {
  distance: {
    meters: 1,
    kilometers: 1000,
    miles: 1609.34,
    feet: 0.3048,
    yards: 0.9144,
  },
  time: {
    seconds: 1,
    minutes: 60,
    hours: 3600,
  },
}

export function SpeedCalculator() {
  const [distance, setDistance] = useState("")
  const [time, setTime] = useState("")
  const [speed, setSpeed] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("kilometers")
  const [timeUnit, setTimeUnit] = useState("hours")
  const [speedUnit, setSpeedUnit] = useState("km/h")
  const [calculation, setCalculation] = useState<string | null>(null)

  const handleCalculate = () => {
    const distMeters = parseFloat(distance) * (conversionFactors.distance[distanceUnit as keyof typeof conversionFactors.distance] || 1)
    const timeSeconds = parseFloat(time) * (conversionFactors.time[timeUnit as keyof typeof conversionFactors.time] || 1)
    
    if (!isNaN(distMeters) && !isNaN(timeSeconds) && timeSeconds > 0) {
      const speedMps = distMeters / timeSeconds
      setSpeed(convertSpeed(speedMps, speedUnit).toFixed(4))
      setCalculation(`Speed = ${distance} ${distanceUnit} / ${time} ${timeUnit}`)
    }
  }

  const convertSpeed = (speedMps: number, toUnit: string) => {
    switch (toUnit) {
      case "km/h":
        return speedMps * 3.6
      case "mph":
        return speedMps * 2.23694
      case "ft/s":
        return speedMps * 3.28084
      default: // m/s
        return speedMps
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Speed Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="distance">Distance</Label>
            <Input id="distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 100" />
          </div>
          <div>
            <Select value={distanceUnit} onValueChange={setDistanceUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.distance.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 2" />
          </div>
          <div>
            <Select value={timeUnit} onValueChange={setTimeUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.time.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleCalculate} className="w-full">Calculate Speed</Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="speed">Calculated Speed</Label>
            <Input id="speed" type="number" value={speed} readOnly placeholder="Result" />
          </div>
          <div>
            <Select value={speedUnit} onValueChange={setSpeedUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.speed.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        {calculation && (
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="font-semibold">Calculation:</p>
            <p className="text-lg">{calculation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 