'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const PercentageCalculator = () => {
  const [valA, setValA] = useState('10')
  const [valB, setValB] = useState('50')
  const [result, setResult] = useState<string | null>(null)

  const calc1 = () => { // What is X% of Y?
    const a = parseFloat(valA)
    const b = parseFloat(valB)
    if (!isNaN(a) && !isNaN(b)) {
      setResult(`${(a / 100) * b}`)
    }
  }
  
  const calc2 = () => { // X is what percent of Y?
      const a = parseFloat(valA)
      const b = parseFloat(valB)
      if (!isNaN(a) && !isNaN(b) && b !== 0) {
        setResult(`${(a / b) * 100}%`)
      }
  }

  const calc3 = () => { // What is the percentage increase/decrease from X to Y?
      const a = parseFloat(valA)
      const b = parseFloat(valB)
      if (!isNaN(a) && !isNaN(b) && a !== 0) {
        setResult(`${((b - a) / a) * 100}%`)
      }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Percentage Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* General Inputs */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="valA">Value A</Label>
            <Input id="valA" type="number" value={valA} onChange={e => setValA(e.target.value)} />
          </div>
          <div className="flex-1">
            <Label htmlFor="valB">Value B</Label>
            <Input id="valB" type="number" value={valB} onChange={e => setValB(e.target.value)} />
          </div>
        </div>
        
        {/* Calculation Sections */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <p className="text-center mb-2">What is A% of B?</p>
            <Button onClick={calc1} className="w-full">Calculate</Button>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-center mb-2">A is what percent of B?</p>
            <Button onClick={calc2} className="w-full">Calculate</Button>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-center mb-2">% change from A to B?</p>
            <Button onClick={calc3} className="w-full">Calculate</Button>
          </div>
        </div>

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

export default PercentageCalculator 