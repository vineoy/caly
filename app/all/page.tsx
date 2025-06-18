"use client"

import { useState, useEffect } from "react"
import { CalculatorGrid } from "@/components/calculator-grid"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

const allCalculators = [
  // Financial
  {
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments",
    href: "/financial/mortgage-calculator",
    category: "Financial",
    popular: true,
  },
  {
    name: "Loan Calculator",
    description: "Calculate loan payments with interest",
    href: "/financial/loan-calculator",
    category: "Financial",
    popular: true,
  },
  {
    name: "Investment Calculator",
    description: "Calculate investment returns",
    href: "/financial/investment-calculator",
    category: "Financial",
    popular: true,
  },
  {
    name: "Compound Interest Calculator",
    description: "Calculate compound interest",
    href: "/financial/compound-interest-calculator",
    category: "Financial",
  },
  {
    name: "Retirement Calculator",
    description: "Plan for retirement savings",
    href: "/financial/retirement-calculator",
    category: "Financial",
  },
  {
    name: "GDP Calculator",
    description: "Calculate Gross Domestic Product using various methods",
    href: "/financial/gdp-calculator",
    category: "Financial",
  },

  // Health
  {
    name: "BMI Calculator",
    description: "Calculate Body Mass Index",
    href: "/health/bmi-calculator",
    category: "Health",
    popular: true,
  },
  {
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs",
    href: "/health/calorie-calculator",
    category: "Health",
    popular: true,
  },
  {
    name: "Body Fat Calculator",
    description: "Calculate body fat percentage",
    href: "/health/body-fat-calculator",
    category: "Health",
  },
  {
    name: "BMR Calculator",
    description: "Calculate Basal Metabolic Rate",
    href: "/health/bmr-calculator",
    category: "Health",
  },

  // Math
  {
    name: "Scientific Calculator",
    description: "Advanced mathematical calculator",
    href: "/math/scientific-calculator",
    category: "Math",
    popular: true,
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages",
    href: "/math/percentage-calculator",
    category: "Math",
    popular: true,
  },
  {
    name: "Fraction Calculator",
    description: "Calculate with fractions",
    href: "/math/fraction-calculator",
    category: "Math",
  },

  // Measurements (add after the Math section)
  {
    name: "Height Calculator",
    description: "Convert height units and check percentiles",
    href: "/measurements/height-calculator",
    category: "Measurements",
    popular: true,
  },
  {
    name: "Weight Calculator",
    description: "Calculate weight, ideal weight, and conversions",
    href: "/measurements/weight-calculator",
    category: "Measurements",
    popular: true,
  },
  {
    name: "Mass Calculator",
    description: "Calculate mass using various physics formulas",
    href: "/measurements/mass-calculator",
    category: "Measurements",
  },
  {
    name: "Density Calculator",
    description: "Calculate density, mass, or volume",
    href: "/measurements/density-calculator",
    category: "Measurements",
  },
  {
    name: "Speed Calculator",
    description: "Calculate speed, distance, and time",
    href: "/measurements/speed-calculator",
    category: "Measurements",
  },
  {
    name: "Conversion Calculator",
    description: "Convert between various units of measurement",
    href: "/measurements/conversion-calculator",
    category: "Measurements",
    popular: true,
  },
  {
    name: "Molarity Calculator",
    description: "Calculate molarity and solution concentrations",
    href: "/measurements/molarity-calculator",
    category: "Measurements",
  },
  {
    name: "Molecular Weight Calculator",
    description: "Calculate molecular weights of chemical compounds",
    href: "/measurements/molecular-weight-calculator",
    category: "Measurements",
  },

  // Other
  {
    name: "Age Calculator",
    description: "Calculate age in various units",
    href: "/other/age-calculator",
    category: "Other",
    popular: true,
  },
  {
    name: "Date Calculator",
    description: "Calculate date differences",
    href: "/other/date-calculator",
    category: "Other",
    popular: true,
  },
  { name: "Time Calculator", description: "Add and subtract time", href: "/other/time-calculator", category: "Other" },
  {
    name: "GPA Calculator",
    description: "Calculate Grade Point Average",
    href: "/other/gpa-calculator",
    category: "Other",
  },
  {
    name: "Roman Numeral Converter",
    description: "Convert between Roman numerals and Arabic numbers",
    href: "/other/roman-numeral-converter",
    category: "Other",
  },
]

export default function AllCalculatorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredCalculators, setFilteredCalculators] = useState(allCalculators)

  useEffect(() => {
    let filtered = allCalculators

    if (selectedCategory !== "all") {
      filtered = filtered.filter((calc) => calc.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          calc.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredCalculators(filtered)
  }, [searchTerm, selectedCategory])

  const categories = ["all", "Financial", "Health", "Math", "Measurements", "Other"]

  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
            All Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse our complete collection of calculators. Find the perfect
            tool for your calculations.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search calculators by name or description..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base rounded-full"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-56 h-12 rounded-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="text-sm font-medium">
              {filteredCalculators.length} calculators found
            </Badge>
          </div>
        </div>

        <CalculatorGrid calculators={filteredCalculators} />
      </div>
    </div>
  )
}
