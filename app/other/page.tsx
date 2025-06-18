import { CalculatorGrid } from "@/components/calculator-grid"
import { Settings } from "lucide-react"

const otherCalculators = [
  {
    name: "Age Calculator",
    description: "Calculate age in years, months, days, and more",
    href: "/other/age-calculator",
    popular: true,
  },
  {
    name: "Date Calculator",
    description: "Calculate differences between dates and add/subtract days",
    href: "/other/date-calculator",
    popular: true,
  },
  {
    name: "Time Calculator",
    description: "Add, subtract, and convert time units",
    href: "/other/time-calculator",
  },
  {
    name: "GPA Calculator",
    description: "Calculate Grade Point Average",
    href: "/other/gpa-calculator",
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords with custom options",
    href: "/other/password-generator",
  },
  {
    name: "Hours Calculator",
    description: "Calculate hours worked and time differences",
    href: "/other/hours-calculator",
  },
  {
    name: "Grade Calculator",
    description: "Calculate grades and weighted averages",
    href: "/other/grade-calculator",
  },
]

export default function OtherCalculatorsPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Other Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Useful calculators for everyday tasks. Calculate age, dates, time,
            grades, and generate secure passwords.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <CalculatorGrid calculators={otherCalculators} />
      </div>
    </div>
  )
}
