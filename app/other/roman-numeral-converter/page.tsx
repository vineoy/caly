"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ... (utility functions will be added here)
const toRoman = (num: number) => {
    if (isNaN(num) || num < 1 || num > 3999) return 'Invalid Number';
    const roman = [
        { value: 1000, symbol: 'M' }, { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' }, { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' }, { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' }, { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' }, { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' }, { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];
    let result = '';
    for (const { value, symbol } of roman) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
};

const fromRoman = (roman: string) => {
    const romanMap: { [key: string]: number } = {
        I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i].toUpperCase()];
        const next = romanMap[roman[i + 1]?.toUpperCase()];
        if (next && current < next) {
            result -= current;
        } else {
            result += current;
        }
    }
    return result;
};


export default function RomanNumeralConverterPage() {
  const [numberInput, setNumberInput] = useState("1994")
  const [romanInput, setRomanInput] = useState("MCMXCIV")
  const [result, setResult] = useState("")

  const convertNumberToRoman = () => {
    setResult(toRoman(parseInt(numberInput)))
  }

  const convertRomanToNumber = () => {
    setResult(fromRoman(romanInput).toString())
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Roman Numeral Converter</CardTitle>
          <CardDescription>
            Convert between Arabic numbers and Roman numerals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="toRoman">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="toRoman">Number to Roman</TabsTrigger>
              <TabsTrigger value="fromRoman">Roman to Number</TabsTrigger>
            </TabsList>
            <TabsContent value="toRoman" className="pt-6 grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="number-input">Number</Label>
                    <Input id="number-input" type="number" value={numberInput} onChange={e => setNumberInput(e.target.value)} />
                </div>
                <Button onClick={convertNumberToRoman}>Convert</Button>
            </TabsContent>
            <TabsContent value="fromRoman" className="pt-6 grid gap-4">
               <div className="grid gap-2">
                    <Label htmlFor="roman-input">Roman Numeral</Label>
                    <Input id="roman-input" value={romanInput} onChange={e => setRomanInput(e.target.value)} />
                </div>
                <Button onClick={convertRomanToNumber}>Convert</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        {result && (
            <CardFooter>
                 <Card className="w-full bg-muted">
                    <CardHeader><CardTitle>Result</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold text-center">{result}</p></CardContent>
                </Card>
            </CardFooter>
        )}
      </Card>
    </div>
  )
} 