'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const HeightCalculator = () => {
  const [inputValue, setInputValue] = useState('175')
  const [fromUnit, setFromUnit] = useState('cm')
  const [toUnit, setToUnit] = useState('ft')
  const [result, setResult] = useState<string | null>(null)

  const conversionFactors: { [key: string]: number } = {
    m: 1,
    cm: 0.01,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
  }

  const calculateConversion = () => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) {
      setResult('Please enter a valid number')
      return
    }

    const valueInMeters = value * conversionFactors[fromUnit]
    const convertedValue = valueInMeters / conversionFactors[toUnit]
    
    setResult(`${convertedValue.toFixed(4)} ${toUnit}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Height Calculator</CardTitle>
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
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                <SelectItem value="m">Meters (m)</SelectItem>
                <SelectItem value="ft">Feet (ft)</SelectItem>
                <SelectItem value="in">Inches (in)</SelectItem>
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
                <SelectItem value="ft">Feet (ft)</SelectItem>
                <SelectItem value="in">Inches (in)</SelectItem>
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                <SelectItem value="m">Meters (m)</SelectItem>
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

export default HeightCalculator 