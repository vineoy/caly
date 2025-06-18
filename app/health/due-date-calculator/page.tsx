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
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addDays, format, differenceInWeeks, differenceInDays, subDays } from "date-fns"

export default function DueDateCalculatorPage() {
  const [calcMethod, setCalcMethod] = useState("lmp")
  const [lmpDate, setLmpDate] = useState<Date | undefined>(new Date())
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<string | null>(null)
  const [gestationalAge, setGestationalAge] = useState<string | null>(null)

  const calculateDueDate = () => {
    let calculatedDueDate: Date | undefined;
    let startDate: Date | undefined;

    if (calcMethod === "lmp" && lmpDate) {
      calculatedDueDate = addDays(lmpDate, 280)
      startDate = lmpDate
    } else if (calcMethod === "conception" && conceptionDate) {
      calculatedDueDate = addDays(conceptionDate, 266)
      startDate = subDays(conceptionDate, 14) // Approximate LMP
    }
    
    if (calculatedDueDate && startDate) {
      setDueDate(format(calculatedDueDate, "MMMM do, yyyy"));
      const totalDays = differenceInDays(new Date(), startDate);
      const weeks = Math.floor(totalDays / 7);
      const days = totalDays % 7;
      setGestationalAge(`${weeks} weeks and ${days} days`);
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Due Date Calculator</CardTitle>
          <CardDescription>
            Estimate your due date based on your last menstrual period or conception date.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Tabs value={calcMethod} onValueChange={setCalcMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lmp">Last Period</TabsTrigger>
              <TabsTrigger value="conception">Conception Date</TabsTrigger>
            </TabsList>
            <TabsContent value="lmp" className="pt-4">
              <div className="grid gap-2">
                <Label>First Day of Last Menstrual Period (LMP)</Label>
                <Calendar mode="single" selected={lmpDate} onSelect={setLmpDate} className="rounded-md border" />
              </div>
            </TabsContent>
            <TabsContent value="conception" className="pt-4">
               <div className="grid gap-2">
                <Label>Date of Conception</Label>
                <Calendar mode="single" selected={conceptionDate} onSelect={setConceptionDate} className="rounded-md border" />
              </div>
            </TabsContent>
          </Tabs>
          <Button onClick={calculateDueDate}>Calculate Due Date</Button>
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
                        <h3 className="font-semibold">Current Gestational Age:</h3>
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