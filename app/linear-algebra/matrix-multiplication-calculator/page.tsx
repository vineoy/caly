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
        const matrix = text.trim().split('\n').map(row => row.trim().split(/,?\s+/).map(Number));
        if (matrix.some(row => row.some(isNaN))) return null;
        return matrix;
    } catch (e) {
        return null;
    }
}

const matrixToString = (matrix: number[][]): string => {
    return matrix.map(row => row.map(v => v.toFixed(2)).join(', ')).join('\n');
}

export default function MatrixMultiplicationCalculatorPage() {
  const [matrix1, setMatrix1] = useState("1, 2, 3\n4, 5, 6")
  const [matrix2, setMatrix2] = useState("7, 8\n9, 10\n11, 12")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const m1 = parseMatrix(matrix1);
    const m2 = parseMatrix(matrix2);

    if (!m1 || !m2 || m1[0].length !== m2.length) {
        setError("The number of columns in Matrix 1 must equal the number of rows in Matrix 2.");
        setResult("");
        return;
    }
    
    const res: number[][] = Array(m1.length).fill(0).map(() => Array(m2[0].length).fill(0));

    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m2[0].length; j++) {
            for (let k = 0; k < m1[0].length; k++) {
                res[i][j] += m1[i][k] * m2[k][j];
            }
        }
    }
    
    setResult(matrixToString(res));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Matrix Multiplication Calculator</CardTitle>
          <CardDescription>Enter two compatible matrices to multiply.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <TextareaWithLabel label="Matrix 1" value={matrix1} onChange={setMatrix1} />
            <TextareaWithLabel label="Matrix 2" value={matrix2} onChange={setMatrix2} />
          </div>
          <Button onClick={calculate}>Multiply Matrices</Button>
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