import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator } from "lucide-react"

interface CalculatorItem {
  name: string
  description: string
  href: string
  popular?: boolean
}

interface CalculatorGridProps {
  calculators: CalculatorItem[]
}

export function CalculatorGrid({ calculators }: CalculatorGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {calculators.map((calculator, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    <Link href={calculator.href}>{calculator.name}</Link>
                  </CardTitle>
                </div>
              </div>
              {calculator.popular && (
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">{calculator.description}</p>
            <Link
              href={calculator.href}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Use Calculator →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
