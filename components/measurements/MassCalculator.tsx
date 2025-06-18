'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const MassCalculator = () => {
  const [inputValue, setInputValue] = useState('70')
  const [fromUnit, setFromUnit] = useState('kg')
  const [toUnit, setToUnit] = useState('lb')
  const [result, setResult] = useState<string | null>(null)

  // Using the same conversion factors as weight for simplicity.
  const conversionFactors: { [key: string]: number } = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    t: 1000,
    lb: 0.453592,
    oz: 0.0283495,
  }

  const calculateConversion = () => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) {
      setResult('Please enter a valid number')
      return
    }

    const valueInKg = value * conversionFactors[fromUnit]
    const convertedValue = valueInKg / conversionFactors[toUnit]
    
    setResult(`${convertedValue.toFixed(4)} ${toUnit}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mass Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="input-value">Value</Label>
            <Input
              id="input-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="From unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="g">Grams (g)</SelectItem>
                <SelectItem value="mg">Milligrams (mg)</SelectItem>
                <SelectItem value="t">Metric Tons (t)</SelectItem>
                <SelectItem value="lb">Pounds (lb)</SelectItem>
                <SelectItem value="oz">Ounces (oz)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="To unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lb">Pounds (lb)</SelectItem>
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="g">Grams (g)</SelectItem>
                <SelectItem value="mg">Milligrams (mg)</SelectItem>
                <SelectItem value="t">Metric Tons (t)</SelectItem>
                <SelectItem value="oz">Ounces (oz)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={calculateConversion} className="mt-4">
          Convert
        </Button>
        {result && (
          <div className="mt-4">
            <Label>Result</Label>
            <p className="font-bold text-lg">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MassCalculator 