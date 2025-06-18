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
import { Label } from "@/components/ui/label"

const parseMatrix = (text: string): number[][] | null => {
    try {
        return text.trim().split('\n').map(row => row.trim().split(/,?\s+/).map(Number));
    } catch (e) {
        return null;
    }
}

const matrixToString = (matrix: number[][]): string => {
    return matrix.map(row => row.join(', ')).join('\n');
}

export default function MatrixSubtractionCalculatorPage() {
  const [matrix1, setMatrix1] = useState("5, 6\n7, 8")
  const [matrix2, setMatrix2] = useState("1, 2\n3, 4")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const m1 = parseMatrix(matrix1);
    const m2 = parseMatrix(matrix2);

    if (!m1 || !m2 || m1.length !== m2.length || m1[0].length !== m2[0].length) {
        setError("Please enter two matrices of the same dimensions.");
        setResult("");
        return;
    }

    const res = m1.map((row, i) => row.map((val, j) => val - m2[i][j]));
    
    setResult(matrixToString(res));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Matrix Subtraction Calculator</CardTitle>
          <CardDescription>Enter two matrices of the same dimensions. Use new lines for rows and commas/spaces for columns.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <TextareaWithLabel label="Matrix 1" value={matrix1} onChange={setMatrix1} />
            <TextareaWithLabel label="Matrix 2" value={matrix2} onChange={setMatrix2} />
          </div>
          <Button onClick={calculate}>Subtract Matrices</Button>
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

function TextareaWithLabel({label, value, onChange} : {label:string, value:string, onChange: (v:string) => void}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Textarea value={value} onChange={e => onChange(e.target.value)} rows={4}/>
        </div>
    )
} 