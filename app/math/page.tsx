import { CalculatorGrid } from "@/components/calculator-grid"
import { Calculator } from "lucide-react"

const mathCalculators = [
  {
    name: "Scientific Calculator",
    description: "Advanced calculator with trigonometric and logarithmic functions",
    href: "/math/scientific-calculator",
    popular: true,
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, percentage change, and more",
    href: "/math/percentage-calculator",
    popular: true,
  },
  {
    name: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions",
    href: "/math/fraction-calculator",
  },
  {
    name: "Random Number Generator",
    description: "Generate random numbers within specified ranges",
    href: "/math/random-number-generator",
  },
  {
    name: "Triangle Calculator",
    description: "Calculate triangle properties and solve triangle problems",
    href: "/math/triangle-calculator",
  },
  {
    name: "Standard Deviation Calculator",
    description: "Calculate standard deviation and variance",
    href: "/math/standard-deviation-calculator",
  },
]

export default function MathCalculatorsPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Math Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Solve mathematical problems with our collection of advanced math
            calculators. From basic arithmetic to complex scientific
            calculations.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <CalculatorGrid calculators={mathCalculators} />
      </div>
    </div>
  )
}
