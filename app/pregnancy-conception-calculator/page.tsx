"use client"

import { useState } from "react"
import { format, add } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

export default function DueDateCalculatorPage() {
  const [calcMethod, setCalcMethod] = useState("lmp")
  const [lmpDate, setLmpDate] = useState<Date | undefined>(new Date())
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<string>("")
  const [gestationalAge, setGestationalAge] = useState<string>("")

  const calculateDueDate = () => {
    let estimatedDueDate: Date;
    if (calcMethod === 'lmp' && lmpDate) {
      estimatedDueDate = add(lmpDate, { days: 280 });
    } else if (conceptionDate) {
      estimatedDueDate = add(conceptionDate, { days: 266 });
    } else {
        return
    }

    const today = new Date();
    const startDate = calcMethod === 'lmp' ? lmpDate : conceptionDate;
    const diffTime = Math.abs(today.getTime() - startDate!.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    setDueDate(format(estimatedDueDate, "PPP"));
    setGestationalAge(`${weeks} weeks and ${days} days`);
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Pregnancy Due Date Calculator</CardTitle>
          <CardDescription>
            Estimate your due date based on your last menstrual period (LMP) or date of conception.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RadioGroup value={calcMethod} onValueChange={setCalcMethod} className="flex gap-4">
              <div className="flex items-center space-x-2"><RadioGroupItem value="lmp" id="lmp" /><Label htmlFor="lmp">LMP</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="conception" id="conception" /><Label htmlFor="conception">Conception Date</Label></div>
          </RadioGroup>
          {calcMethod === 'lmp' ? (
             <div className="grid gap-2">
                <Label>First Day of Last Menstrual Period</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !lmpDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{lmpDate ? format(lmpDate, "PPP") : <span>Pick a date</span>}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={lmpDate} onSelect={setLmpDate} initialFocus /></PopoverContent>
                </Popover>
             </div>
          ) : (
             <div className="grid gap-2">
                <Label>Date of Conception</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !conceptionDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{conceptionDate ? format(conceptionDate, "PPP") : <span>Pick a date</span>}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={conceptionDate} onSelect={setConceptionDate} initialFocus /></PopoverContent>
                </Popover>
             </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateDueDate} className="w-full">Calculate</Button>
          {dueDate && (
            <Card className="w-full bg-muted">
              <CardHeader><CardTitle>Results</CardTitle></CardHeader>
              <CardContent className="grid gap-4 text-center">
                <div>
                  <Label>Estimated Due Date</Label>
                  <p className="text-2xl font-bold">{dueDate}</p>
                </div>
                <div>
                  <Label>Estimated Gestational Age</Label>
                  <p className="text-xl font-bold">{gestationalAge}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 