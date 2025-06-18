"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const parseMatrix = (text: string): number[][] | null => {
    try {
        const matrix = text.trim().split('\n').map(row => row.trim().split(/,?\s+/).map(Number));
        if (matrix.some(row => row.some(isNaN))) return null;
        return matrix;
    } catch (e) {
        return null;
    }
}

const matrixToString = (matrix: number[][]): string => {
    return matrix.map(row => row.join(', ')).join('\n');
}

export default function ScalarMatrixMultiplicationCalculatorPage() {
  const [scalar, setScalar] = useState("3")
  const [matrix, setMatrix] = useState("1, 2\n3, 4")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const s = parseFloat(scalar);
    const m = parseMatrix(matrix);

    if (isNaN(s) || !m) {
        setError("Please enter a valid scalar and matrix.");
        setResult("");
        return;
    }

    const res = m.map(row => row.map(val => val * s));
    
    setResult(matrixToString(res));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Scalar-Matrix Multiplication</CardTitle>
          <CardDescription>Multiply a matrix by a scalar value.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InputWithLabel label="Scalar" value={scalar} onChange={setScalar} />
          <TextareaWithLabel label="Matrix" value={matrix} onChange={setMatrix} />
          <Button onClick={calculate}>Multiply</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
             <div>
                <Label>Resultant Matrix</Label>
                <div className="p-4 bg-muted rounded-md text-center whitespace-pre-wrap font-mono">
                    {result}
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function InputWithLabel({label, value, onChange} : {label:string, value:string, onChange: (v:string) => void}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Input type="number" value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

function TextareaWithLabel({label, value, onChange} : {label:string, value:string, onChange: (v:string) => void}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Textarea value={value} onChange={e => onChange(e.target.value)} rows={4}/>
        </div>
    )
} 