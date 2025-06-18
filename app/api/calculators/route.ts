import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production, this would come from your PostgreSQL database
const calculators = [
  {
    id: 1,
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    category: "financial",
    description: "Calculate monthly mortgage payments, total interest, and amortization schedule",
    isPopular: true,
  },
  {
    id: 2,
    name: "BMI Calculator",
    slug: "bmi-calculator",
    category: "health",
    description: "Calculate Body Mass Index and health status",
    isPopular: true,
  },
  {
    id: 3,
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    category: "math",
    description: "Advanced calculator with trigonometric and logarithmic functions",
    isPopular: true,
  },
  {
    id: 4,
    name: "Age Calculator",
    slug: "age-calculator",
    category: "other",
    description: "Calculate age in years, months, days, and more",
    isPopular: true,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const popular = searchParams.get("popular")

  let filteredCalculators = calculators

  if (category) {
    filteredCalculators = filteredCalculators.filter((calc) => calc.category === category)
  }

  if (search) {
    filteredCalculators = filteredCalculators.filter(
      (calc) =>
        calc.name.toLowerCase().includes(search.toLowerCase()) ||
        calc.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (popular === "true") {
    filteredCalculators = filteredCalculators.filter((calc) => calc.isPopular)
  }

  return NextResponse.json(filteredCalculators)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { calculatorId, inputData, resultData } = body

    // In production, save to PostgreSQL database
    const usage = {
      id: Date.now(),
      calculatorId,
      inputData,
      resultData,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, usage })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save calculation" }, { status: 500 })
  }
}
