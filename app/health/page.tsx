import { CalculatorGrid } from "@/components/calculator-grid"
import { Heart } from "lucide-react"

const healthCalculators = [
  {
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and health status",
    href: "/health/bmi-calculator",
    popular: true,
  },
  {
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs for weight management",
    href: "/health/calorie-calculator",
    popular: true,
  },
  {
    name: "Body Fat Calculator",
    description: "Calculate body fat percentage using various methods",
    href: "/health/body-fat-calculator",
  },
  {
    name: "BMR Calculator",
    description: "Calculate Basal Metabolic Rate",
    href: "/health/bmr-calculator",
  },
  {
    name: "Ideal Weight Calculator",
    description: "Calculate ideal body weight range",
    href: "/health/ideal-weight-calculator",
  },
  {
    name: "Pace Calculator",
    description: "Calculate running pace and split times",
    href: "/health/pace-calculator",
  },
]

export default function HealthCalculatorsPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Health & Fitness Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Monitor your health and fitness with our comprehensive collection
            of health calculators. Track BMI, calories, body fat, and more.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <CalculatorGrid calculators={healthCalculators} />
      </div>
    </div>
  )
}
