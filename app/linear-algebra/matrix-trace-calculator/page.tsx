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

export default function MatrixTraceCalculatorPage() {
  const [matrix, setMatrix] = useState("1, 2, 3\n4, 5, 6\n7, 8, 9")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const calculate = () => {
    const m = parseMatrix(matrix);

    if (!m || m.length !== m[0].length) {
        setError("Please enter a square matrix.");
        setResult("");
        return;
    }
    
    let trace = 0;
    for (let i = 0; i < m.length; i++) {
        trace += m[i][i];
    }
    
    setResult(trace.toString());
    setError("");
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Matrix Trace Calculator</CardTitle>
          <CardDescription>Find the trace of a square matrix.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TextareaWithLabel label="Matrix" value={matrix} onChange={setMatrix} />
          <Button onClick={calculate}>Calculate Trace</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {result && (
            <div className="p-4 bg-muted rounded-md text-center">
                <p>Trace: <span className="font-bold">{result}</span></p>
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