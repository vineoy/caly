'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Helper to find the greatest common divisor
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)

const FractionCalculator = () => {
  const [num1, setNum1] = useState('1')
  const [den1, setDen1] = useState('2')
  const [num2, setNum2] = useState('3')
  const [den2, setDen2] = useState('4')
  const [operator, setOperator] = useState('+')
  const [result, setResult] = useState<string | null>(null)

  const calculate = () => {
    const n1 = parseInt(num1)
    const d1 = parseInt(den1)
    const n2 = parseInt(num2)
    const d2 = parseInt(den2)

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult('Invalid input. Denominators cannot be zero.')
      return
    }

    let resNum, resDen;
    switch (operator) {
      case '+':
        resNum = n1 * d2 + n2 * d1
        resDen = d1 * d2
        break
      case '-':
        resNum = n1 * d2 - n2 * d1
        resDen = d1 * d2
        break
      case '*':
        resNum = n1 * n2
        resDen = d1 * d2
        break
      case '/':
        if (n2 === 0) {
          setResult("Cannot divide by zero fraction.")
          return
        }
        resNum = n1 * d2
        resDen = d1 * n2
        break
      default:
        return
    }

    if (resDen < 0) { // Keep denominator positive
        resNum = -resNum;
        resDen = -resDen;
    }
    
    const commonDivisor = gcd(Math.abs(resNum), Math.abs(resDen))
    setResult(`${resNum / commonDivisor} / ${resDen / commonDivisor}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraction Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-2">
          <div className="flex flex-col items-center">
            <Label htmlFor="num1">Numerator</Label>
            <Input id="num1" type="number" value={num1} onChange={(e) => setNum1(e.target.value)} className="w-20 text-center" />
            <hr className="w-20 my-1 border-t border-gray-400"/>
            <Input id="den1" type="number" value={den1} onChange={(e) => setDen1(e.target.value)} className="w-20 text-center" />
          </div>

          <Select value={operator} onValueChange={setOperator}>
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+">+</SelectItem>
              <SelectItem value="-">-</SelectItem>
              <SelectItem value="*">*</SelectItem>
              <SelectItem value="/">/</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-col items-center">
            <Label htmlFor="num2">Numerator</Label>
            <Input id="num2" type="number" value={num2} onChange={(e) => setNum2(e.target.value)} className="w-20 text-center" />
            <hr className="w-20 my-1 border-t border-gray-400"/>
            <Input id="den2" type="number" value={den2} onChange={(e) => setDen2(e.target.value)} className="w-20 text-center" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full mt-4">Calculate</Button>
        {result && (
          <div className="mt-4 text-center">
            <Label>Result</Label>
            <p className="font-bold text-2xl">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FractionCalculator 