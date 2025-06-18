import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DollarSign, Heart, Calculator, Settings, Ruler, Sigma, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/calculatorsData"

type CalculatorCategoriesProps = {
  highlightedCalculator: string | null
}

export function CalculatorCategories({ highlightedCalculator }: CalculatorCategoriesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {categories.map((category, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className={`p-3 rounded-full ${category.color}`}>
              <category.icon className="h-6 w-6" />
            </div>
            <CardTitle>{category.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-60 pr-4">
              <div className="space-y-2">
                {category.calculators.map((calc, calcIndex) => (
                  <Link
                    href={calc.href}
                    key={calcIndex}
                    id={calc.href}
                    className={`block p-2 rounded-md transition-all duration-300 ${
                      highlightedCalculator === calc.href
                        ? "bg-primary/20 ring-2 ring-primary/80 shadow-lg"
                        : "hover:bg-muted"
                    }`}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
