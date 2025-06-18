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
import { X } from "lucide-react"

type Assignment = {
  name: string
  weight: string
  grade: string
}

export default function GradeCalculatorPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { name: "Homework", weight: "20", grade: "95" },
    { name: "Midterm", weight: "30", grade: "85" },
    { name: "Final", weight: "50", grade: "" },
  ])
  const [finalGrade, setFinalGrade] = useState<number | null>(null)
  const [requiredGrade, setRequiredGrade] = useState<number | null>(null)
  const [desiredGrade, setDesiredGrade] = useState<string>("90")

  const handleAssignmentChange = (index: number, field: keyof Assignment, value: string) => {
    const newAssignments = [...assignments]
    newAssignments[index][field] = value
    setAssignments(newAssignments)
  }

  const addAssignment = () => {
    setAssignments([...assignments, { name: `Assignment ${assignments.length + 1}`, weight: "10", grade: "" }])
  }

  const removeAssignment = (index: number) => {
    const newAssignments = assignments.filter((_, i) => i !== index)
    setAssignments(newAssignments)
  }

  const calculateFinalGrade = () => {
    let totalWeight = 0
    let weightedGrade = 0
    for (const assignment of assignments) {
      const weight = parseFloat(assignment.weight)
      const grade = parseFloat(assignment.grade)
      if (!isNaN(weight) && !isNaN(grade)) {
        totalWeight += weight
        weightedGrade += (grade * weight) / 100
      }
    }
    setFinalGrade(weightedGrade * 100 / totalWeight)
  }
  
  const calculateRequiredGrade = () => {
    let currentGrade = 0
    let totalWeight = 0
    let finalWeight = 0

    for (const assignment of assignments) {
      const weight = parseFloat(assignment.weight)
      const grade = parseFloat(assignment.grade)

      if (!isNaN(weight)) {
        if (!isNaN(grade)) {
          currentGrade += grade * (weight / 100)
          totalWeight += weight
        } else {
          finalWeight = weight
        }
      }
    }
    
    if (finalWeight <= 0) {
      alert("Please leave one assignment grade blank to calculate the required score for it.")
      return
    }

    const needed = (parseFloat(desiredGrade) - currentGrade) / (finalWeight / 100)
    setRequiredGrade(needed)
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Grade Calculator</CardTitle>
          <CardDescription>
            Calculate your course grade based on weighted assignments.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {assignments.map((assignment, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
              <Input
                value={assignment.name}
                onChange={e => handleAssignmentChange(index, "name", e.target.value)}
                placeholder="Assignment Name"
                className="md:col-span-2"
              />
              <div className="flex items-center">
                <Input
                  value={assignment.weight}
                  onChange={e => handleAssignmentChange(index, "weight", e.target.value)}
                  placeholder="Weight"
                  type="number"
                />
                 <span className="ml-2">%</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={assignment.grade}
                  onChange={e => handleAssignmentChange(index, "grade", e.target.value)}
                  placeholder="Grade"
                  type="number"
                />
                <Button variant="ghost" size="icon" onClick={() => removeAssignment(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addAssignment}>Add Assignment</Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateFinalGrade} className="w-full">
            Calculate Final Grade
          </Button>
          {finalGrade !== null && (
            <Card className="w-full bg-muted">
              <CardHeader><CardTitle>Final Grade</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold text-center">{finalGrade.toFixed(2)}%</p></CardContent>
            </Card>
          )}

          <div className="w-full border-t pt-4 mt-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4 items-center">
               <Label htmlFor="desired-grade">Desired grade for course:</Label>
               <Input id="desired-grade" type="number" value={desiredGrade} onChange={e => setDesiredGrade(e.target.value)} />
            </div>
            <Button onClick={calculateRequiredGrade} className="w-full">
              Calculate Required Grade on Final
            </Button>
            {requiredGrade !== null && (
              <Card className="w-full bg-muted">
                <CardHeader><CardTitle>Required Grade on Final</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold text-center">{requiredGrade.toFixed(2)}%</p></CardContent>
              </Card>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 