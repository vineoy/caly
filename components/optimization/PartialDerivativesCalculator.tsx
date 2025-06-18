'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PartialDerivativesCalculator = () => {
  const [func, setFunc] = useState('x^2 * y^3');
  const [variable, setVariable] = useState('x');
  const [derivative, setDerivative] = useState<string | null>(null);

  const calculateDerivative = () => {
    // Placeholder logic
    if (func === 'x^2 * y^3' && variable === 'x') {
      setDerivative('2 * x * y^3');
    } else if (func === 'x^2 * y^3' && variable === 'y') {
      setDerivative('3 * x^2 * y^2');
    } else {
      setDerivative('Calculation for this function is not implemented yet.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partial Derivative Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="function">Function f(x, y, ...)</Label>
            <Input
              id="function"
              value={func}
              onChange={(e) => setFunc(e.target.value)}
              placeholder="e.g., x^2 * y^3"
            />
          </div>
          <div>
            <Label htmlFor="variable">Variable to Differentiate With Respect To</Label>
            <Input
              id="variable"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              placeholder="e.g., x"
            />
          </div>
          <Button onClick={calculateDerivative}>Calculate Partial Derivative</Button>
          {derivative && (
            <div>
              <Label>Partial Derivative:</Label>
              <p className="font-bold text-lg">{derivative}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartialDerivativesCalculator; 