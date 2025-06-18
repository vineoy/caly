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

function determinant(matrix: number[][]): number {
    if (matrix.length === 1) {
        return matrix[0][0];
    }
    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, colIndex) => i !== colIndex));
        det += matrix[0][i] * determinant(subMatrix) * Math.pow(-1, i);
    }
    return det;
}

export default function MatrixDeterminantCalculatorPage() {
  const [matrix, setMatrix] = useState("1, 2\n3, 4")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const m = parseMatrix(matrix);

    if (!m || m.length !== m[0].length) {
        setError("Please enter a square matrix.");
        setResult("");
        return;
    }
    
    setResult(determinant(m).toString());
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Matrix Determinant Calculator</CardTitle>
          <CardDescription>Find the determinant of a square matrix.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TextareaWithLabel label="Matrix" value={matrix} onChange={setMatrix} />
          <Button onClick={calculate}>Calculate Determinant</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Determinant: <span className="font-bold">{result}</span></p>
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