'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from 'lucide-react';
import * as math from 'mathjs';

// Helper to format a matrix (array of arrays) as a string for display
const formatMatrixForDisplay = (matrix: (string | number)[][], title: string, varNames?: string[], points?: string[]) => {
  let header = title;
  if (varNames && points && points.length === varNames.length) {
    header += ` at (${varNames.map((v, i) => `${v}=${points[i]}`).join(', ')})`;
  }
  header += ':\n';

  const matrixString = matrix.map(row => 
    '[ ' + row.map(val => typeof val === 'string' ? val : math.format(val, { precision: 4 })).join(', ') + ' ]'
  ).join('\n');
  return header + matrixString;
};

export default function HessianMatrixCalculator() {
  const [funcStr, setFuncStr] = useState('');
  const [varsStr, setVarsStr] = useState(''); // Comma-separated variables, e.g., x,y
  const [pointsStr, setPointsStr] = useState('');
  const [symbolicHessian, setSymbolicHessian] = useState<string | null>(null);
  const [numericalHessian, setNumericalHessian] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setSymbolicHessian(null);
    setNumericalHessian(null);

    if (!funcStr.trim() || !varsStr.trim()) {
      setError("Function string and variables string cannot be empty.");
      return;
    }

    try {
      const variableNames = varsStr.split(',').map(v => v.trim()).filter(v => v);
      if (variableNames.length === 0) {
        setError("Please provide at least one variable.");
        return;
      }

      const parsedFunc = math.parse(funcStr);
      const n = variableNames.length;
      const hessianMatrixSymbolic: string[][] = Array(n).fill(null).map(() => Array(n).fill(''));

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const var_i = math.parse(variableNames[i]);
          const var_j = math.parse(variableNames[j]);
          // Calculate ∂f/∂var_j first
          const firstDerivative = math.derivative(parsedFunc, var_j);
          // Then calculate ∂(∂f/∂var_j)/∂var_i
          const secondDerivative = math.derivative(firstDerivative, var_i);
          hessianMatrixSymbolic[i][j] = secondDerivative.toString();
        }
      }
      setSymbolicHessian(formatMatrixForDisplay(hessianMatrixSymbolic, 'Symbolic Hessian Matrix H'));

      if (pointsStr.trim()) {
        const evaluationPointsArray = pointsStr.split(',').map(p => p.trim()).filter(p => p);
        if (evaluationPointsArray.length !== n) {
          setError(`Number of evaluation points (${evaluationPointsArray.length}) must match the number of variables (${n}).`);
          return;
        }

        const scope: { [key: string]: number } = {};
        variableNames.forEach((val, index) => {
          const pointVal = parseFloat(evaluationPointsArray[index]);
          if (isNaN(pointVal)) {
            throw new Error(`Invalid number for evaluation point: ${evaluationPointsArray[index]} for variable ${val}`);
          }
          scope[val] = pointVal;
        });

        const hessianMatrixNumerical: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            const var_i = math.parse(variableNames[i]);
            const var_j = math.parse(variableNames[j]);
            const firstDerivative = math.derivative(parsedFunc, var_j);
            const secondDerivativeNode = math.derivative(firstDerivative, var_i);
            hessianMatrixNumerical[i][j] = secondDerivativeNode.evaluate(scope);
          }
        }
        setNumericalHessian(formatMatrixForDisplay(hessianMatrixNumerical, 'Numerical Hessian Matrix H', variableNames, evaluationPointsArray));
      }

    } catch (e: any) {
      setError(`Error: ${e.message || 'Failed to calculate Hessian matrix.'}`);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Hessian Matrix Calculator</CardTitle>
        <CardDescription>Calculate the Hessian matrix of second-order partial derivatives for a scalar function.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="funcStrHMC">Function (e.g., x^2*y + y^3)</Label>
            <Input
              id="funcStrHMC"
              value={funcStr}
              onChange={(e) => setFuncStr(e.target.value)}
              placeholder="Enter scalar function"
            />
          </div>
          <div>
            <Label htmlFor="varsStrHMC">Variables (comma-separated, order matters, e.g., x, y)</Label>
            <Input
              id="varsStrHMC"
              value={varsStr}
              onChange={(e) => setVarsStr(e.target.value)}
              placeholder="e.g., x, y"
            />
          </div>
          <div>
            <Label htmlFor="pointsStrHMC">Evaluation Points for Variables (optional, e.g., 1, 2)</Label>
            <Input
              id="pointsStrHMC"
              value={pointsStr}
              onChange={(e) => setPointsStr(e.target.value)}
              placeholder="Order must match variables list"
            />
          </div>
          <Button onClick={handleCalculate} className="w-full">Calculate Hessian Matrix</Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {symbolicHessian && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Symbolic Hessian Matrix</AlertTitle>
              <AlertDescription className="font-mono text-sm whitespace-pre-wrap break-all">
                {symbolicHessian}
              </AlertDescription>
            </Alert>
          )}

          {numericalHessian && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Numerical Hessian Matrix</AlertTitle>
              <AlertDescription className="font-mono text-sm whitespace-pre-wrap break-all">
                {numericalHessian}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 