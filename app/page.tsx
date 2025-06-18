"use client"

import { useState } from "react"
import { CalculatorCategories } from "@/components/calculator-categories"
import { SearchSection } from "@/components/search-section"

export default function HomePage() {
  const [highlightedCalculator, setHighlightedCalculator] = useState<string | null>(null)

  return (
    <div>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Your Ultimate Calculator Hub
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From simple math to complex financial planning, we have a comprehensive suite of free online calculators to
            meet your every need. Fast, accurate, and easy-to-use.
          </p>
        </div>
      </section>

      <SearchSection setHighlightedCalculator={setHighlightedCalculator} />

      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our Calculators</h2>
        <CalculatorCategories highlightedCalculator={highlightedCalculator} />
      </div>
    </div>
  )
}
