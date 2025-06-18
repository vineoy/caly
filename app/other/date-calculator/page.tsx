"use client"

import { useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, differenceInDays, add, sub } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [difference, setDifference] = useState<string>("")

  const [calcDate, setCalcDate] = useState<Date | undefined>(new Date())
  const [years, setYears] = useState("0")
  const [months, setMonths] = useState("0")
  const [weeks, setWeeks] = useState("0")
  const [days, setDays] = useState("0")
  const [operation, setOperation] = useState<"add" | "subtract">("add")
  const [resultDate, setResultDate] = useState<string>("")

  const calculateDifference = () => {
    if (startDate && endDate) {
      const diffDays = differenceInDays(endDate, startDate)
      const diffYears = Math.floor(diffDays / 365)
      const diffMonths = Math.floor((diffDays % 365) / 30)
      const remainingDays = diffDays - diffYears * 365 - diffMonths * 30
      setDifference(
        `${diffYears} years, ${diffMonths} months, and ${remainingDays} days`
      )
    }
  }

  const calculateDate = () => {
    if (calcDate) {
      const duration = {
        years: Number(years),
        months: Number(months),
        weeks: Number(weeks),
        days: Number(days),
      }
      const newDate =
        operation === "add" ? add(calcDate, duration) : sub(calcDate, duration)
      setResultDate(format(newDate, "PPP"))
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Date Calculator</CardTitle>
          <CardDescription>
            Calculate the difference between two dates or add/subtract a
            duration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="difference">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="difference">Date Difference</TabsTrigger>
              <TabsTrigger value="add-subtract">Add/Subtract</TabsTrigger>
            </TabsList>
            <TabsContent value="difference" className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button onClick={calculateDifference}>Calculate</Button>
                {difference && (
                  <div className="pt-4 text-center">
                    <p className="font-semibold">Difference:</p>
                    <p className="text-xl font-bold">{difference}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="add-subtract" className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {calcDate ? format(calcDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={calcDate}
                        onSelect={setCalcDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={operation}
                    onValueChange={val => setOperation(val as "add" | "subtract")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add</SelectItem>
                      <SelectItem value="subtract">Subtract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    type="number"
                    value={years}
                    onChange={e => setYears(e.target.value)}
                    placeholder="Years"
                  />
                  <Input
                    type="number"
                    value={months}
                    onChange={e => setMonths(e.target.value)}
                    placeholder="Months"
                  />
                  <Input
                    type="number"
                    value={weeks}
                    onChange={e => setWeeks(e.target.value)}
                    placeholder="Weeks"
                  />
                  <Input
                    type="number"
                    value={days}
                    onChange={e => setDays(e.target.value)}
                    placeholder="Days"
                  />
                </div>
                <Button onClick={calculateDate}>Calculate</Button>
                {resultDate && (
                  <div className="pt-4 text-center">
                    <p className="font-semibold">Result:</p>
                    <p className="text-xl font-bold">{resultDate}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 