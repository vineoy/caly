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

export default function HoursCalculatorPage() {
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [breakMinutes, setBreakMinutes] = useState("30")
  const [result, setResult] = useState<string>("")

  const calculateHours = () => {
    const start = new Date(`1970-01-01T${startTime}:00`)
    const end = new Date(`1970-01-01T${endTime}:00`)

    if (end < start) {
      end.setDate(end.getDate() + 1)
    }

    let diff = end.getTime() - start.getTime()
    diff -= Number(breakMinutes) * 60 * 1000

    if (diff < 0) {
      setResult("Break time is longer than the work duration.")
      return
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    setResult(`${hours} hours and ${minutes} minutes`)
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Hours Calculator</CardTitle>
          <CardDescription>
            Calculate the duration between two times, including breaks.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="start-time">Start Time</Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end-time">End Time</Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="break-minutes">Break (in minutes)</Label>
            <Input
              id="break-minutes"
              type="number"
              value={breakMinutes}
              onChange={e => setBreakMinutes(e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateHours} className="w-full">
            Calculate Hours
          </Button>
          {result && (
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{result}</p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 