'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from 'lucide-react';
import * as math from 'mathjs';

const GradientCalculator = () => {
  const [func, setFunc] = useState('x^2 + y^2');
  const [point, setPoint] = useState('1, 2');
  const [gradient, setGradient] = useState<string | null>(null);

  const calculateGradient = () => {
    // This is a placeholder for a real calculation.
    // In a real scenario, you'd parse the function and differentiate it.
    // For x^2 + y^2, partial derivatives are 2x and 2y.
    // At (1, 2), the gradient is [2*1, 2*2] = [2, 4].
    if (func === 'x^2 + y^2' && point === '1, 2') {
      setGradient('[2, 4]');
    } else {
      setGradient('Calculation for this function is not implemented yet.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="function">Function f(x, y, ...)</Label>
            <Input
              id="function"
              value={func}
              onChange={(e) => setFunc(e.target.value)}
              placeholder="e.g., x^2 + y^2"
            />
          </div>
          <div>
            <Label htmlFor="point">Point (x, y, ...)</Label>
            <Input
              id="point"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              placeholder="e.g., 1, 2"
            />
          </div>
          <Button onClick={calculateGradient}>Calculate Gradient</Button>
          {gradient && (
            <div>
              <Label>Gradient at the point:</Label>
              <p className="font-bold text-lg">{gradient}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradientCalculator; 