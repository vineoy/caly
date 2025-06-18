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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PaceCalculatorPage() {
  const [calcOption, setCalcOption] = useState("pace")
  
  const [timeH, setTimeH] = useState("0")
  const [timeM, setTimeM] = useState("45")
  const [timeS, setTimeS] = useState("0")
  
  const [dist, setDist] = useState("10")
  const [distUnit, setDistUnit] = useState("km")

  const [paceM, setPaceM] = useState("7")
  const [paceS, setPaceS] = useState("15")
  const [paceUnit, setPaceUnit] = useState("min/km")
  
  const [result, setResult] = useState<string>("")

  const calculate = () => {
    const totalTimeSec = parseInt(timeH) * 3600 + parseInt(timeM) * 60 + parseInt(timeS)
    const paceSec = parseInt(paceM) * 60 + parseInt(paceS)
    
    let distanceInKm = parseFloat(dist);
    if(distUnit === 'miles') distanceInKm *= 1.60934;

    let paceInMinPerKm = paceSec / 60;
    if(paceUnit === 'min/mi') paceInMinPerKm /= 1.60934;

    if (calcOption === 'pace') {
        const pace = totalTimeSec / distanceInKm; // in seconds per km
        const minutes = Math.floor(pace / 60);
        const seconds = Math.round(pace % 60);
        setResult(`${minutes} min ${seconds} sec / km`);
    } else if (calcOption === 'time') {
        const time = paceInMinPerKm * 60 * distanceInKm; // in seconds
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = Math.round(time % 60);
        setResult(`${h}h ${m}m ${s}s`);
    } else { // distance
        const distance = totalTimeSec / (paceInMinPerKm * 60); // in km
        setResult(`${distance.toFixed(2)} km`);
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Pace Calculator</CardTitle>
          <CardDescription>
            Calculate run pace, time, or distance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={calcOption} onValueChange={setCalcOption} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pace">Pace</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
              <TabsTrigger value="distance">Distance</TabsTrigger>
            </TabsList>
            <div className="grid gap-4 pt-6">
                {calcOption !== 'time' && (
                    <div className="grid gap-2">
                        <Label>Time</Label>
                        <div className="grid grid-cols-3 gap-2">
                            <Input type="number" value={timeH} onChange={e => setTimeH(e.target.value)} placeholder="h"/>
                            <Input type="number" value={timeM} onChange={e => setTimeM(e.target.value)} placeholder="m"/>
                            <Input type="number" value={timeS} onChange={e => setTimeS(e.target.value)} placeholder="s"/>
                        </div>
                    </div>
                )}
                 {calcOption !== 'distance' && (
                    <div className="grid gap-2">
                        <Label>Distance</Label>
                        <div className="grid grid-cols-2 gap-2">
                           <Input type="number" value={dist} onChange={e => setDist(e.target.value)}/>
                           <Select value={distUnit} onValueChange={setDistUnit}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="km">km</SelectItem>
                                <SelectItem value="miles">miles</SelectItem>
                            </SelectContent>
                           </Select>
                        </div>
                    </div>
                 )}
                 {calcOption !== 'pace' && (
                     <div className="grid gap-2">
                        <Label>Pace</Label>
                        <div className="grid grid-cols-3 gap-2">
                            <Input type="number" value={paceM} onChange={e => setPaceM(e.target.value)} placeholder="min"/>
                            <Input type="number" value={paceS} onChange={e => setPaceS(e.target.value)} placeholder="sec"/>
                            <Select value={paceUnit} onValueChange={setPaceUnit}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="min/km">min/km</SelectItem>
                                    <SelectItem value="min/mi">min/mi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                 )}
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
             <Card className="w-full bg-muted">
                <CardHeader><CardTitle>Result</CardTitle></CardHeader>
                <CardContent className="text-center"><p className="text-3xl font-bold">{result}</p></CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 