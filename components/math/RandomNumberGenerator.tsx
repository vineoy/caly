'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const RandomNumberGenerator = () => {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [randomNumber, setRandomNumber] = useState<number | null>(null)

  const generateRandom = () => {
    const minVal = Math.ceil(parseInt(min))
    const maxVal = Math.floor(parseInt(max))
    
    if (!isNaN(minVal) && !isNaN(maxVal) && maxVal >= minVal) {
      const rnd = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
      setRandomNumber(rnd)
    } else {
      setRandomNumber(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Random Number Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="min">Minimum Value</Label>
            <Input id="min" type="number" value={min} onChange={(e) => setMin(e.target.value)} />
          </div>
          <div className="flex-1">
            <Label htmlFor="max">Maximum Value</Label>
            <Input id="max" type="number" value={max} onChange={(e) => setMax(e.target.value)} />
          </div>
        </div>
        <Button onClick={generateRandom} className="w-full mt-4">Generate</Button>
        {randomNumber !== null && (
          <div className="mt-4 text-center">
            <Label>Your Random Number</Label>
            <p className="font-bold text-5xl tracking-tight">{randomNumber}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RandomNumberGenerator 