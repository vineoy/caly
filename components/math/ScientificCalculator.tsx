'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')

  const handleInput = (value: string) => {
    if (display === '0' && value !== '.') {
      setDisplay(value)
    } else {
      setDisplay(display + value)
    }
    setExpression(expression + value)
  }

  const handleOperator = (op: string) => {
    setExpression(expression + op)
    setDisplay('0')
  }

  const handleClear = () => {
    setDisplay('0')
    setExpression('')
  }

  const handleEquals = () => {
    try {
      // Be careful with eval in real applications!
      const result = eval(expression.replace('^', '**'))
      setDisplay(result.toString())
      setExpression(result.toString())
    } catch (error) {
      setDisplay('Error')
      setExpression('')
    }
  }

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ]

  const sciButtons = [
    '(', ')', 'sqrt', '^', 'sin', 'cos', 'tan', 'log'
  ]

  // This is a simplified implementation. A real one would need a proper math parser.
  const handleSciFunction = (fn: string) => {
     // Placeholder for sci functions
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Scientific Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          value={display}
          readOnly
          className="text-right text-2xl font-bold mb-4 h-16"
        />
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <Button
              key={btn}
              onClick={() => {
                if (btn === '=') handleEquals()
                else if (['/', '*', '-', '+'].includes(btn)) handleOperator(btn)
                else handleInput(btn)
              }}
              variant={['/', '*', '-', '+', '='].includes(btn) ? 'secondary' : 'outline'}
            >
              {btn}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
           {sciButtons.map(btn => (
                <Button key={btn} onClick={() => handleSciFunction(btn)} variant="outline">{btn}</Button>
           ))}
        </div>
        <Button onClick={handleClear} className="w-full mt-2" variant="destructive">
          Clear
        </Button>
      </CardContent>
    </Card>
  )
}

export default ScientificCalculator 