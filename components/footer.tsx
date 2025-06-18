import Link from "next/link"
import { Calculator } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                MyCalculatorApp
              </span>
            </Link>
            <p className="text-slate-400 text-sm">
              Your comprehensive source for online calculators. Fast, accurate, and free to use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Popular Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/financial/mortgage-calculator" className="text-slate-400 hover:text-white">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/health/bmi-calculator" className="text-slate-400 hover:text-white">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/math/percentage-calculator" className="text-slate-400 hover:text-white">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/other/age-calculator" className="text-slate-400 hover:text-white">
                  Age Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/financial" className="text-slate-400 hover:text-white">
                  Financial
                </Link>
              </li>
              <li>
                <Link href="/health" className="text-slate-400 hover:text-white">
                  Health & Fitness
                </Link>
              </li>
              <li>
                <Link href="/math" className="text-slate-400 hover:text-white">
                  Math
                </Link>
              </li>
              <li>
                <Link href="/other" className="text-slate-400 hover:text-white">
                  Other
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 MyCalculatorApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
