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

const timeToSeconds = (h: number, m: number, s: number) => h * 3600 + m * 60 + s
const secondsToTime = (sec: number) => {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return { h, m, s }
}

export default function TimeCalculatorPage() {
  const [h1, setH1] = useState("0")
  const [m1, setM1] = useState("0")
  const [s1, setS1] = useState("0")
  const [h2, setH2] = useState("0")
  const [m2, setM2] = useState("0")
  const [s2, setS2] = useState("0")
  const [operation, setOperation] = useState<"add" | "subtract">("add")
  const [result, setResult] = useState<{ h: number; m: number; s: number } | null>(null)

  const calculateTime = () => {
    const time1 = timeToSeconds(Number(h1), Number(m1), Number(s1))
    const time2 = timeToSeconds(Number(h2), Number(m2), Number(s2))

    let totalSeconds
    if (operation === "add") {
      totalSeconds = time1 + time2
    } else {
      totalSeconds = time1 - time2
      if (totalSeconds < 0) {
        alert("Resulting time is negative, which is not supported.")
        setResult(null)
        return
      }
    }
    setResult(secondsToTime(totalSeconds))
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Time Calculator</CardTitle>
          <CardDescription>
            Add or subtract time durations.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Label>Time 1</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                value={h1}
                onChange={e => setH1(e.target.value)}
                placeholder="Hours"
              />
              <Input
                type="number"
                value={m1}
                onChange={e => setM1(e.target.value)}
                placeholder="Minutes"
              />
              <Input
                type="number"
                value={s1}
                onChange={e => setS1(e.target.value)}
                placeholder="Seconds"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Select
              value={operation}
              onValueChange={val => setOperation(val as "add" | "subtract")}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">+</SelectItem>
                <SelectItem value="subtract">-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Time 2</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                value={h2}
                onChange={e => setH2(e.target.value)}
                placeholder="Hours"
              />
              <Input
                type="number"
                value={m2}
                onChange={e => setM2(e.target.value)}
                placeholder="Minutes"
              />
              <Input
                type="number"
                value={s2}
                onChange={e => setS2(e.target.value)}
                placeholder="Seconds"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateTime} className="w-full">
            Calculate Time
          </Button>
          {result && (
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {result.h} hours, {result.m} minutes, {result.s} seconds
                </p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 