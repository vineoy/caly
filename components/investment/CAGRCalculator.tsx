'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DollarSign, Percent, CalendarDays } from 'lucide-react';
import * as math from 'mathjs';

const CAGRCalculator = () => {
  const [beginningValue, setBeginningValue] = useState('10000');
  const [endingValue, setEndingValue] = useState('19000');
  const [years, setYears] = useState('5');
  const [cagr, setCagr] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const calculateCAGR = () => {
    setError(null);
    setCagr(null);

    const bv = parseFloat(beginningValue);
    const ev = parseFloat(endingValue);
    const n = parseFloat(years);
    
    if (isNaN(bv) || bv <= 0) {
      setError("Beginning Value must be a positive number.");
      return;
    }
    if (isNaN(ev) || ev < 0) { // Ending value can be 0 if investment wiped out
      setError("Ending Value must be a non-negative number.");
      return;
    }
    if (isNaN(n) || n <= 0) {
      setError("Number of Years must be a positive number.");
      return;
    }
    if (bv > ev && n > 0) {
        // CAGR can be negative, which is valid.
    }

    try {
      const calculatedCagr = (Math.pow(ev / bv, 1 / n) - 1) * 100;
      if (isNaN(calculatedCagr) || !isFinite(calculatedCagr)) {
        setError("Could not calculate CAGR. Check for division by zero or invalid intermediate results if Ending Value is much smaller than Beginning Value for a short period.");
        return;
      }
      setCagr(fmtPercent(calculatedCagr));
    } catch (e: any) {
      setError("Error calculating CAGR. Please check inputs.");
      console.error(e);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><Percent className="mr-2 h-6 w-6 text-blue-600"/>Compound Annual Growth Rate (CAGR)</CardTitle>
        <CardDescription>Calculate the mean annual growth rate of an investment over a specified period longer than one year.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="beginning-value">Beginning Value</Label>
            <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="beginning-value"
                    type="number"
                    value={beginningValue}
                    onChange={(e) => setBeginningValue(e.target.value)}
                    placeholder="e.g., 10000"
                    className="pl-10"
                />
            </div>
          </div>

          <div>
            <Label htmlFor="ending-value">Ending Value</Label>
            <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="ending-value"
                    type="number"
                    value={endingValue}
                    onChange={(e) => setEndingValue(e.target.value)}
                    placeholder="e.g., 19000"
                    className="pl-10"
                />
            </div>
          </div>

          <div>
            <Label htmlFor="years">Number of Years</Label>
            <div className="relative mt-1">
                <CalendarDays className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="e.g., 5"
                    className="pl-10"
                />
            </div>
          </div>
          
          <Button onClick={calculateCAGR} className="w-full">Calculate CAGR</Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {cagr !== null && (
            <Alert variant="default"> {/* Changed from success */}
              <Percent className="h-4 w-4" />
              <AlertTitle>Compound Annual Growth Rate (CAGR)</AlertTitle>
              <AlertDescription className="font-semibold text-xl">
                {cagr}%
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CAGRCalculator; 