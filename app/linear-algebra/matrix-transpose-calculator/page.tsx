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
    return matrix.map(row => row.join(', ')).join('\n');
}

export default function MatrixTransposeCalculatorPage() {
  const [matrix, setMatrix] = useState("1, 2, 3\n4, 5, 6")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const m = parseMatrix(matrix);

    if (!m) {
        setError("Please enter a valid matrix.");
        setResult("");
        return;
    }
    
    const res: number[][] = Array(m[0].length).fill(0).map(() => Array(m.length).fill(0));

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            res[j][i] = m[i][j];
        }
    }
    
    setResult(matrixToString(res));
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Matrix Transpose Calculator</CardTitle>
          <CardDescription>Find the transpose of a matrix.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TextareaWithLabel label="Matrix" value={matrix} onChange={setMatrix} />
          <Button onClick={calculate}>Transpose Matrix</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div>
                <Label>Transposed Matrix</Label>
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