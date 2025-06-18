"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [isRadians, setIsRadians] = useState(true)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "*":
        return firstValue * secondValue
      case "/":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performFunction = (func: string) => {
    const value = Number.parseFloat(display)
    let result: number

    switch (func) {
      case "sin":
        result = Math.sin(isRadians ? value : (value * Math.PI) / 180)
        break
      case "cos":
        result = Math.cos(isRadians ? value : (value * Math.PI) / 180)
        break
      case "tan":
        result = Math.tan(isRadians ? value : (value * Math.PI) / 180)
        break
      case "ln":
        result = Math.log(value)
        break
      case "log":
        result = Math.log10(value)
        break
      case "sqrt":
        result = Math.sqrt(value)
        break
      case "square":
        result = value * value
        break
      case "cube":
        result = value * value * value
        break
      case "factorial":
        result = factorial(value)
        break
      case "1/x":
        result = 1 / value
        break
      case "exp":
        result = Math.exp(value)
        break
      case "pi":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      default:
        return
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const factorial = (n: number): number => {
    if (n < 0) return Number.NaN
    if (n === 0 || n === 1) return 1
    return n * factorial(n - 1)
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const buttons = [
    [
      { label: "sin", action: () => performFunction("sin"), variant: "secondary" },
      { label: "cos", action: () => performFunction("cos"), variant: "secondary" },
      { label: "tan", action: () => performFunction("tan"), variant: "secondary" },
      { label: "C", action: clear, variant: "destructive" },
      { label: "CE", action: clearEntry, variant: "destructive" },
    ],
    [
      { label: "ln", action: () => performFunction("ln"), variant: "secondary" },
      { label: "log", action: () => performFunction("log"), variant: "secondary" },
      { label: "√", action: () => performFunction("sqrt"), variant: "secondary" },
      { label: "(", action: () => inputNumber("("), variant: "outline" },
      { label: ")", action: () => inputNumber(")"), variant: "outline" },
    ],
    [
      { label: "x²", action: () => performFunction("square"), variant: "secondary" },
      { label: "x³", action: () => performFunction("cube"), variant: "secondary" },
      { label: "x!", action: () => performFunction("factorial"), variant: "secondary" },
      { label: "7", action: () => inputNumber("7"), variant: "outline" },
      { label: "8", action: () => inputNumber("8"), variant: "outline" },
    ],
    [
      { label: "1/x", action: () => performFunction("1/x"), variant: "secondary" },
      { label: "exp", action: () => performFunction("exp"), variant: "secondary" },
      { label: "π", action: () => performFunction("pi"), variant: "secondary" },
      { label: "4", action: () => inputNumber("4"), variant: "outline" },
      { label: "5", action: () => inputNumber("5"), variant: "outline" },
    ],
    [
      { label: "e", action: () => performFunction("e"), variant: "secondary" },
      { label: "+", action: () => inputOperation("+"), variant: "default" },
      { label: "-", action: () => inputOperation("-"), variant: "default" },
      { label: "1", action: () => inputNumber("1"), variant: "outline" },
      { label: "2", action: () => inputNumber("2"), variant: "outline" },
    ],
    [
      { label: "*", action: () => inputOperation("*"), variant: "default" },
      { label: "/", action: () => inputOperation("/"), variant: "default" },
      { label: "=", action: () => inputOperation("="), variant: "default" },
      { label: "0", action: () => inputNumber("0"), variant: "outline" },
      { label: ".", action: () => inputNumber("."), variant: "outline" },
    ],
  ]

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Scientific Calculator</CardTitle>
        <div className="flex justify-center gap-2 mt-4">
          <Badge
            variant={isRadians ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setIsRadians(true)}
          >
            Radians
          </Badge>
          <Badge
            variant={!isRadians ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setIsRadians(false)}
          >
            Degrees
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="bg-slate-900 text-white p-4 rounded-lg text-right">
            <div className="text-3xl font-mono font-bold min-h-[3rem] flex items-center justify-end">{display}</div>
          </div>
        </div>

        <div className="grid gap-2">
          {buttons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {row.map((button, colIndex) => (
                <Button
                  key={colIndex}
                  variant={button.variant as any}
                  size="lg"
                  onClick={button.action}
                  className="h-12 text-lg font-semibold"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
