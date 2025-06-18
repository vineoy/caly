import { CalculatorGrid } from "@/components/calculator-grid"
import { Ruler } from "lucide-react"

const measurementCalculators = [
  {
    name: "Height Calculator",
    description: "Convert height units and check percentiles",
    href: "/measurements/height-calculator",
    popular: true,
  },
  {
    name: "Weight Calculator",
    description: "Calculate weight, ideal weight, and conversions",
    href: "/measurements/weight-calculator",
    popular: true,
  },
  {
    name: "Mass Calculator",
    description: "Calculate mass using various physics formulas",
    href: "/measurements/mass-calculator",
    popular: true,
  },
  {
    name: "Density Calculator",
    description: "Calculate density, mass, or volume",
    href: "/measurements/density-calculator",
  },
  {
    name: "Speed Calculator",
    description: "Calculate speed, distance, and time",
    href: "/measurements/speed-calculator",
  },
  {
    name: "Conversion Calculator",
    description: "Convert between various units of measurement",
    href: "/measurements/conversion-calculator",
  },
  {
    name: "Molarity Calculator",
    description: "Calculate molarity and solution concentrations",
    href: "/measurements/molarity-calculator",
  },
  {
    name: "Molecular Weight Calculator",
    description: "Calculate molecular weights of chemical compounds",
    href: "/measurements/molecular-weight-calculator",
  },
]

export default function MeasurementsPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ruler className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Various Measurements/Units
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive collection of measurement and unit conversion
            calculators. Convert between units, calculate physical properties,
            and solve measurement problems.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <CalculatorGrid calculators={measurementCalculators} />
      </div>
    </div>
  )
}
