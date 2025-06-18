'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, CalendarClock } from 'lucide-react';
import * as math from 'mathjs';

export default function AnnualizedReturnCalculator() {
  const [totalReturnPercent, setTotalReturnPercent] = useState('');
  const [holdingPeriodValue, setHoldingPeriodValue] = useState('');
  const [holdingPeriodUnit, setHoldingPeriodUnit] = useState<'days' | 'months' | 'years'>('years');
  
  const [annualizedReturn, setAnnualizedReturn] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setAnnualizedReturn(null);

    const totalReturn = parseFloat(totalReturnPercent);
    const periodVal = parseFloat(holdingPeriodValue);

    if (isNaN(totalReturn)) {
      setError("Total Return percentage must be a number.");
      return;
    }
    if (isNaN(periodVal) || periodVal <= 0) {
      setError("Holding Period value must be a positive number.");
      return;
    }

    let years: number;
    switch (holdingPeriodUnit) {
      case 'days':
        years = periodVal / 365;
        break;
      case 'months':
        years = periodVal / 12;
        break;
      case 'years':
        years = periodVal;
        break;
      default:
        setError("Invalid holding period unit.");
        return;
    }

    if (years === 0) {
        setError("Holding period in years cannot be zero for annualization.");
        return;
    }

    try {
      // Formula: ((1 + TotalReturnDecimal)^(1/Years) - 1) * 100
      const totalReturnDecimal = totalReturn / 100;
      const base = 1 + totalReturnDecimal;
      
      if (base < 0 && (1 / years) % 1 !== 0 && (1 / years) % 1 !== 0.5) {
        // Handle negative base with fractional exponent carefully if Math.pow would return NaN
        // This scenario (negative total return and fractional year) can lead to complex numbers or undefined real results
        // For simplicity in a financial calculator, often we might restrict or show error.
        // Or, for negative returns, some prefer to show a simple annualized version of the loss, not compounding it if it creates NaNs.
        // Let's allow negative returns but be mindful of Math.pow for negative bases.
        // If base is negative (total loss > 100%), Math.pow might return NaN for fractional exponents.
         setError("Cannot calculate annualized return for a total loss exceeding 100% over a fractional year period resulting in a complex number. Please adjust inputs or period.");
         return;
      }
      
      const annualizedReturnValue = (Math.pow(base, 1 / years) - 1) * 100;

      if (isNaN(annualizedReturnValue) || !isFinite(annualizedReturnValue)) {
        setError("Could not calculate Annualized Return. This can happen with extreme negative total returns over short periods.");
        return;
      }
      setAnnualizedReturn(fmtPercent(annualizedReturnValue));
    } catch (e: any) {
      setError("Error calculating Annualized Return. Please check inputs.");
      console.error(e);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><CalendarClock className="mr-2 h-6 w-6 text-indigo-600"/>Annualized Return</CardTitle>
        <CardDescription>Convert the return of an investment to an equivalent annual rate.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="totalReturnAR">Total Return (for the entire period)</Label>
            <div className="relative mt-1">
                <Input
                    id="totalReturnAR"
                    type="number"
                    value={totalReturnPercent}
                    onChange={(e) => setTotalReturnPercent(e.target.value)}
                    placeholder="e.g., 15 for 15%"
                    className="pr-10"
                />
                <Percent className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="holdingPeriodValueAR">Holding Period</Label>
                <Input
                    id="holdingPeriodValueAR"
                    type="number"
                    value={holdingPeriodValue}
                    onChange={(e) => setHoldingPeriodValue(e.target.value)}
                    placeholder="e.g., 3"
                />
            </div>
            <div>
                <Label htmlFor="holdingPeriodUnitAR">Unit</Label>
                <Select value={holdingPeriodUnit} onValueChange={(value: string) => setHoldingPeriodUnit(value as 'days' | 'months' | 'years')}>
                    <SelectTrigger id="holdingPeriodUnitAR">
                        <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          
          <Button onClick={handleCalculate} className="w-full">Calculate Annualized Return</Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {annualizedReturn !== null && (
            <Alert variant="default">
              <Percent className="h-4 w-4" />
              <AlertTitle>Annualized Return</AlertTitle>
              <AlertDescription className="font-semibold text-xl">
                {annualizedReturn}%
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 