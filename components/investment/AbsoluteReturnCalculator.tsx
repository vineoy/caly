'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DollarSign, PercentSquare } from 'lucide-react'; // Using PercentSquare for a slightly different look
import * as math from 'mathjs';

const AbsoluteReturnCalculator = () => {
  const [initialValue, setInitialValue] = useState('1000');
  const [finalValue, setFinalValue] = useState('1500');
  const [absoluteReturn, setAbsoluteReturn] = useState<string | null>(null);

  const calculateAbsoluteReturn = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    
    if (!isNaN(initial) && !isNaN(final) && initial !== 0) {
      const calculatedReturn = ((final - initial) / initial) * 100;
      setAbsoluteReturn(calculatedReturn.toFixed(2) + '%');
    } else {
      setAbsoluteReturn('Please enter valid numbers (Initial Value must not be 0).');
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><PercentSquare className="mr-2 h-6 w-6 text-purple-600"/>Absolute Return</CardTitle>
        <CardDescription>Calculate the simple gain or loss of an investment, not annualized.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="initial-value">Initial Investment Value</Label>
            <Input id="initial-value" type="number" value={initialValue} onChange={(e) => setInitialValue(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="final-value">Final Investment Value</Label>
            <Input id="final-value" type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} />
          </div>
          <Button onClick={calculateAbsoluteReturn} className="w-full">Calculate Absolute Return</Button>
          {absoluteReturn && (
            <div>
              <Label>Absolute Return:</Label>
              <p className="font-bold text-lg">{absoluteReturn}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AbsoluteReturnCalculator; 