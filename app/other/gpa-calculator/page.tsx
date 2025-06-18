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

type Course = {
  name: string
  credits: string
  grade: string
}

const gradeToPoints: { [key: string]: number } = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
}

export default function GpaCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { name: "Course 1", credits: "3", grade: "A" },
    { name: "Course 2", credits: "4", grade: "B+" },
  ])
  const [gpa, setGpa] = useState<number | null>(null)

  const handleCourseChange = (index: number, field: keyof Course, value: string) => {
    const newCourses = [...courses]
    newCourses[index][field] = value
    setCourses(newCourses)
  }

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, credits: "3", grade: "A" }])
  }

  const removeCourse = (index: number) => {
    const newCourses = courses.filter((_, i) => i !== index)
    setCourses(newCourses)
  }

  const calculateGpa = () => {
    let totalPoints = 0
    let totalCredits = 0

    for (const course of courses) {
      const credits = parseFloat(course.credits)
      const points = gradeToPoints[course.grade.toUpperCase()]

      if (!isNaN(credits) && points !== undefined) {
        totalPoints += credits * points
        totalCredits += credits
      } else {
        alert(`Invalid input for course: ${course.name}. Grade should be A, B, C, etc. and credits should be a number.`)
        return
      }
    }

    if (totalCredits === 0) {
      setGpa(0)
    } else {
      setGpa(totalPoints / totalCredits)
    }
  }

  return (
    <div className="flex justify-center items-start py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">GPA Calculator</CardTitle>
          <CardDescription>
            Calculate your Grade Point Average (GPA).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
              <Input
                value={course.name}
                onChange={e => handleCourseChange(index, "name", e.target.value)}
                placeholder="Course Name"
                className="md:col-span-2"
              />
              <Input
                value={course.credits}
                onChange={e => handleCourseChange(index, "credits", e.target.value)}
                placeholder="Credits"
                type="number"
              />
              <div className="flex items-center gap-2">
                <Input
                  value={course.grade}
                  onChange={e => handleCourseChange(index, "grade", e.target.value)}
                  placeholder="Grade (e.g., A, B+)"
                />
                <Button variant="ghost" size="icon" onClick={() => removeCourse(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addCourse}>Add Course</Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateGpa} className="w-full">
            Calculate GPA
          </Button>
          {gpa !== null && (
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Your GPA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-center">{gpa.toFixed(2)}</p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 