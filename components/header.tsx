import Link from "next/link"
import { Calculator, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import React from "react"

const calculators = {
  Financial: [
    "Amortization Calculator",
    "Auto Loan Calculator",
    "Compound Interest Calculator",
    "Finance Calculator",
    "GDP Calculator",
    "Income Tax Calculator",
    "Inflation Calculator",
    "Interest Calculator",
    "Interest Rate Calculator",
    "Investment Calculator",
    "Loan Calculator",
    "Mortgage Calculator",
    "Payment Calculator",
    "Retirement Calculator",
    "Salary Calculator",
    "Sales Tax Calculator",
  ],
  Health: [
    "BMI Calculator",
    "BMR Calculator",
    "Body Fat Calculator",
    "Calorie Calculator",
    "Due Date Calculator",
    "Ideal Weight Calculator",
    "Pace Calculator",
    "Pregnancy Calculator",
    "Pregnancy Conception Calculator",
  ],
  Math: [
    "Fraction Calculator",
    "Percentage Calculator",
    "Random Number Generator",
    "Scientific Calculator",
    "Standard Deviation Calculator",
    "Triangle Calculator",
  ],
  Measurements: [
    "Conversion Calculator",
    "Density Calculator",
    "Height Calculator",
    "Mass Calculator",
    "Molarity Calculator",
    "Speed Calculator",
    "Weight Calculator",
  ],
  Other: [
    "Age Calculator",
    "Concrete Calculator",
    "Conversion Calculator",
    "Date Calculator",
    "Density Calculator",
    "GPA Calculator",
    "Grade Calculator",
    "Hours Calculator",
    "Mass Calculator",
    "Molarity Calculator",
    "Molecular Weight Calculator",
    "Password Generator",
    "Roman Numeral Converter",
    "Speed Calculator",
    "Subnet Calculator",
    "Time Calculator",
    "Weight Calculator",
  ],
}

const singlePageCalculators = [
  "Data Science",
  "Linear Algebra",
  "Optimization",
  "Investment",
]

function toSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-")
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              MyCalculatorApp
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Financial</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {calculators.Financial.map(name => (
                        <ListItem
                          key={name}
                          href={`/financial/${toSlug(name)}`}
                          title={name}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Health</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {calculators.Health.map(name => (
                        <ListItem
                          key={name}
                          href={`/health/${toSlug(name)}`}
                          title={name}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Math & Others</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {calculators.Math.map(name => (
                        <ListItem
                          key={name}
                          href={`/math/${toSlug(name)}`}
                          title={name}
                        />
                      ))}
                      {calculators.Other.map(name => (
                        <ListItem
                          key={name}
                          href={`/other/${toSlug(name)}`}
                          title={name}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/all" legacyBehavior passHref>
                    <NavigationMenuLink className="font-medium mr-4">
                      All Calculators
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blogs" legacyBehavior passHref>
                    <NavigationMenuLink className="font-medium">
                      Blogs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/financial" className="text-lg">
                    Financial
                  </Link>
                  <Link href="/health" className="text-lg">
                    Health
                  </Link>
                  <Link href="/math" className="text-lg">
                    Math
                  </Link>
                  <Link href="/other" className="text-lg">
                    Other
                  </Link>
                  <Link href="/all" className="text-lg">
                    All Calculators
                  </Link>
                  <Link href="/blogs" className="text-lg">
                    Blogs
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
