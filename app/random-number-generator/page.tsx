"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("1")
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [results, setResults] = useState<number[]>([])

  const generateNumbers = () => {
    const minVal = parseInt(min)
    const maxVal = parseInt(max)
    const numCount = parseInt(count)
    const generated = new Set<number>()

    if (maxVal - minVal + 1 < numCount && !allowDuplicates) {
        alert("Cannot generate more unique numbers than the range allows.")
        return;
    }

    while (generated.size < numCount) {
      const randomNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
      if (allowDuplicates) {
          const temp = [...results, randomNum]
          setResults(temp);
          if(results.length >= numCount) break;
      } else {
        generated.add(randomNum)
      }
    }
    
    if(!allowDuplicates) setResults(Array.from(generated))
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Random Number Generator</CardTitle>
          <CardDescription>Generate random numbers in a range.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="grid gap-2">
              <Label htmlFor="min">Min</Label>
              <Input id="min" type="number" value={min} onChange={e => setMin(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max">Max</Label>
              <Input id="max" type="number" value={max} onChange={e => setMax(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="count">How many numbers?</Label>
            <Input id="count" type="number" value={count} onChange={e => setCount(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="duplicates" checked={allowDuplicates} onCheckedChange={setAllowDuplicates} />
            <Label htmlFor="duplicates">Allow duplicates</Label>
          </div>
          <Button onClick={generateNumbers}>Generate</Button>
          {results.length > 0 && (
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">Results:</h3>
              <div className="flex flex-wrap gap-2">
                {results.map((num, i) => (
                  <span key={i} className="bg-background p-2 rounded-md">{num}</span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 