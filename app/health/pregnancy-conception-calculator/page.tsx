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
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, subDays } from "date-fns"

export default function ConceptionCalculatorPage() {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(new Date())
  const [cycleLength, setCycleLength] = useState("28")
  const [fertileWindow, setFertileWindow] = useState<string | null>(null)
  const [ovulationDate, setOvulationDate] = useState<string | null>(null)

  const calculateConception = () => {
    if (lastPeriodDate) {
      const LutealPhaseDays = 14
      const estimatedOvulation = addDays(lastPeriodDate, parseInt(cycleLength) - LutealPhaseDays);
      const fertileStart = subDays(estimatedOvulation, 5);
      
      setOvulationDate(format(estimatedOvulation, "MMMM do, yyyy"));
      setFertileWindow(
        `${format(fertileStart, "MMMM do")} - ${format(addDays(estimatedOvulation, 1), "MMMM do, yyyy")}`
      );
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Pregnancy Conception Calculator</CardTitle>
          <CardDescription>
            Estimate your fertile window and ovulation day.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>First Day of Last Menstrual Period</Label>
            <Calendar
              mode="single"
              selected={lastPeriodDate}
              onSelect={setLastPeriodDate}
              className="rounded-md border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
            <Input
              id="cycle-length"
              type="number"
              value={cycleLength}
              onChange={e => setCycleLength(e.target.value)}
            />
          </div>
          <Button onClick={calculateConception}>Calculate</Button>
          {fertileWindow && (
             <Card className="w-full bg-muted">
                <CardHeader>
                  <CardTitle>Estimated Fertile Window</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                     <div>
                        <h3 className="font-semibold">Most Fertile Days:</h3>
                        <p className="text-lg font-bold">{fertileWindow}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold">Estimated Ovulation Date:</h3>
                        <p className="text-lg font-bold">{ovulationDate}</p>
                    </div>
                </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 