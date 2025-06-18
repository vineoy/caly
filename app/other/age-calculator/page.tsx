"use client"

import { useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

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

export default function AgeCalculatorPage() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    new Date(2000, 0, 1)
  )
  const [ageAtDate, setAgeAtDate] = useState<Date | undefined>(new Date())
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
  } | null>(null)

  const calculateAge = () => {
    if (dateOfBirth && ageAtDate) {
      if (dateOfBirth > ageAtDate) {
        alert("Date of birth cannot be in the future.")
        setAge(null)
        return
      }

      let years = ageAtDate.getFullYear() - dateOfBirth.getFullYear()
      let months = ageAtDate.getMonth() - dateOfBirth.getMonth()
      let days = ageAtDate.getDate() - dateOfBirth.getDate()

      if (days < 0) {
        months--
        const prevMonth = new Date(
          ageAtDate.getFullYear(),
          ageAtDate.getMonth(),
          0
        )
        days += prevMonth.getDate()
      }

      if (months < 0) {
        years--
        months += 12
      }

      setAge({ years, months, days })
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Age Calculator</CardTitle>
          <CardDescription>
            Calculate your age or the age of anything.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth ? (
                    format(dateOfBirth, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={setDateOfBirth}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ageAt">Age at the Date of</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !ageAtDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {ageAtDate ? (
                    format(ageAtDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={ageAtDate}
                  onSelect={setAgeAtDate}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear() + 100}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateAge} className="w-full">
            Calculate Age
          </Button>
          {age && (
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {age.years} years, {age.months} months, and {age.days} days
                </p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 