"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const buttonLayout = [
    ['(', ')', 'mc', 'm+', 'm-', 'mr'],
    ['2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x'],
    ['1/x', 'sqrt', 'cbrt', 'y-rt', 'ln', 'log10'],
    ['x!', 'sin', 'cos', 'tan', 'e', 'EE'],
    ['Rad', 'sinh', 'cosh', 'tanh', 'pi', 'Rand'],
    ['7', '8', '9', '/', '%', 'AC'],
    ['4', '5', '6', '*', 'sqrt', 'C'],
    ['1', '2', '3', '-', '1/x', '='],
    ['0', '.', '+/-', '+']
];

export default function ScientificCalculatorPage() {
  const [display, setDisplay] = useState("0")
  const [expression, setExpression] = useState("")

  const handleButtonClick = (value: string) => {
    // This is a simplified logic. A full implementation would require a robust expression parser.
    if (value === 'AC') {
      setDisplay('0')
      setExpression('')
    } else if (value === '=') {
      try {
        // Warning: eval is not safe. For a real app, use a math expression parser library.
        const result = eval(expression.replace('^', '**'));
        setDisplay(result.toString())
        setExpression(result.toString())
      } catch (error) {
        setDisplay('Error')
        setExpression('')
      }
    } else {
       if (display === '0' || expression === 'Error') {
           setExpression(value)
           setDisplay(value)
       } else {
           setExpression(prev => prev + value)
           setDisplay(prev => prev + value)
       }
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            readOnly
            value={display}
            className="text-right text-3xl h-20 mb-4 font-mono"
          />
          <div className="grid grid-cols-6 gap-2">
            {buttonLayout.flat().map((btn, i) => (
              <Button
                key={i}
                onClick={() => handleButtonClick(btn)}
                variant={/\d|\./.test(btn) ? "secondary" : "default"}
                className={btn === '=' ? 'col-span-2' : ''}
              >
                {btn}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 