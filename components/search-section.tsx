"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { categories } from "@/lib/calculatorsData"
import { useRouter } from "next/navigation"

const allCalculators = categories.flatMap(category =>
  category.calculators.map(calc => ({
    ...calc,
    category: category.title,
  }))
)

type SearchSectionProps = {
  setHighlightedCalculator: (href: string | null) => void
}

export function SearchSection({ setHighlightedCalculator }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const filteredCalculators = useMemo(() => {
    if (!searchTerm) return []
    return allCalculators
      .filter(calc => calc.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 8)
  }, [searchTerm])

  return (
    <div className="max-w-3xl mx-auto mb-16 relative">
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault()
          if (filteredCalculators.length > 0) {
            router.push(filteredCalculators[0].href)
          }
        }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for any calculator..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              setShowResults(e.target.value.length > 0)
            }}
            className="pl-12 h-14 text-lg rounded-full"
            onFocus={() => setShowResults(searchTerm.length > 0)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
        </div>
        <Button size="lg" className="px-8 rounded-full h-14" type="submit">
          Search
        </Button>
      </form>

      {showResults && filteredCalculators.length > 0 && (
        <Card className="absolute top-full w-full mt-2 p-2 bg-popover shadow-lg z-10 max-h-80 overflow-y-auto">
          {filteredCalculators.map((calc, index) => (
            <div
              key={index}
              className="block p-3 hover:bg-accent cursor-pointer rounded-lg transition-colors"
              onMouseDown={() => {
                const element = document.getElementById(calc.href)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "center" })
                  setHighlightedCalculator(calc.href)
                  setTimeout(() => setHighlightedCalculator(null), 2500)
                }
              }}
              onClick={() => {
                setSearchTerm("")
                setShowResults(false)
              }}
            >
              <p className="font-medium">{calc.name}</p>
              <p className="text-sm text-muted-foreground">{calc.category}</p>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
