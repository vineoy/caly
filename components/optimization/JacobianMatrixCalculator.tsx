'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // For multi-line function inputs
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from 'lucide-react';
import * as math from 'mathjs';

// Re-using the helper from HessianMatrixCalculator, or it could be moved to a shared utils file
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

const JacobianMatrixCalculator = () => {
  const [functions, setFunctions] = useState('x^2*y, 5*x + sin(y)');
  const [variables, setVariables] = useState('x, y');
  const [jacobian, setJacobian] = useState<string | null>(null);

  const calculateJacobian = () => {
    // Placeholder logic
    if (functions === 'x^2*y, 5*x + sin(y)' && variables === 'x, y') {
      setJacobian('[[2*x*y, x^2], [5, cos(y)]]');
    } else {
      setJacobian('Calculation for these functions is not implemented yet.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jacobian Matrix Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="functions">Vector-valued function F (comma-separated)</Label>
            <Textarea
              id="functions"
              value={functions}
              onChange={(e) => setFunctions(e.target.value)}
              placeholder="e.g., x^2*y, 5*x + sin(y)"
            />
          </div>
          <div>
            <Label htmlFor="variables">Variables (comma-separated)</Label>
            <Input
              id="variables"
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              placeholder="e.g., x, y"
            />
          </div>
          <Button onClick={calculateJacobian}>Calculate Jacobian Matrix</Button>
          {jacobian && (
            <div>
              <Label>Jacobian Matrix:</Label>
              <p className="font-bold text-lg bg-muted p-2 rounded-md">{jacobian}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JacobianMatrixCalculator; 