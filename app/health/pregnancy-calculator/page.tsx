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
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, differenceInWeeks, subDays, differenceInDays } from "date-fns"

export default function PregnancyCalculatorPage() {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<string | null>(null)
  const [conceptionDate, setConceptionDate] = useState<string | null>(null)
  const [gestationalAge, setGestationalAge] = useState<string | null>(null)

  const calculatePregnancy = () => {
    if (lastPeriodDate) {
      // Naegele's rule for due date: LMP + 280 days (40 weeks)
      const due = addDays(lastPeriodDate, 280);
      setDueDate(format(due, "MMMM do, yyyy"));

      // Conception is usually ~14 days after LMP
      const conception = addDays(lastPeriodDate, 14);
      setConceptionDate(format(conception, "MMMM do, yyyy"));
      
      // Gestational age
      const totalDays = differenceInDays(new Date(), lastPeriodDate);
      const weeks = Math.floor(totalDays / 7);
      const days = totalDays % 7;
      setGestationalAge(`${weeks} weeks and ${days} days`);
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Pregnancy Calculator</CardTitle>
          <CardDescription>
            Estimate your due date, conception date, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>First Day of Last Menstrual Period (LMP)</Label>
            <Calendar
              mode="single"
              selected={lastPeriodDate}
              onSelect={setLastPeriodDate}
              className="rounded-md border"
            />
          </div>
          <Button onClick={calculatePregnancy}>Calculate</Button>
          {dueDate && (
            <Card className="w-full bg-muted">
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <h3 className="font-semibold">Estimated Due Date:</h3>
                        <p className="text-lg font-bold">{dueDate}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Estimated Conception Date:</h3>
                        <p className="text-lg font-bold">{conceptionDate}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Gestational Age:</h3>
                        <p className="text-lg font-bold">{gestationalAge}</p>
                    </div>
                </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 