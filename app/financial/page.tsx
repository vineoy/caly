import { CalculatorGrid } from "@/components/calculator-grid"
import { DollarSign } from "lucide-react"

const financialCalculators = [
  {
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments, total interest, and amortization schedule",
    href: "/financial/mortgage-calculator",
    popular: true,
  },
  {
    name: "Loan Calculator",
    description: "Calculate loan payments for any type of loan with interest",
    href: "/financial/loan-calculator",
    popular: true,
  },
  {
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments and total cost",
    href: "/financial/auto-loan-calculator",
  },
  {
    name: "Interest Calculator",
    description: "Calculate simple and compound interest",
    href: "/financial/interest-calculator",
  },
  {
    name: "Investment Calculator",
    description: "Calculate investment returns and growth over time",
    href: "/financial/investment-calculator",
    popular: true,
  },
  {
    name: "Retirement Calculator",
    description: "Plan for retirement and calculate required savings",
    href: "/financial/retirement-calculator",
  },
  {
    name: "Compound Interest Calculator",
    description: "Calculate compound interest with regular contributions",
    href: "/financial/compound-interest-calculator",
  },
  {
    name: "Salary Calculator",
    description: "Convert between hourly, monthly, and annual salary",
    href: "/financial/salary-calculator",
  },
]

export default function FinancialCalculatorsPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Financial Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Make informed financial decisions with our comprehensive collection
            of financial calculators. Calculate loans, mortgages, investments,
            and more.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <CalculatorGrid calculators={financialCalculators} />
      </div>
    </div>
  )
}
