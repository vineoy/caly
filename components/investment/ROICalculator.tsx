'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, TrendingUp } from 'lucide-react';
import * as math from 'mathjs'; // For formatting results

export default function ROICalculator() {
  const [calculationMode, setCalculationMode] = useState<'value' | 'profit'>('value'); // 'value' or 'profit'
  const [initialInvestment, setInitialInvestment] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [netProfitInput, setNetProfitInput] = useState('');
  
  const [roi, setRoi] = useState<string | null>(null);
  const [calculatedNetProfit, setCalculatedNetProfit] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setRoi(null);
    setCalculatedNetProfit(null);

    const cost = parseFloat(initialInvestment);
    if (isNaN(cost) || cost <= 0) {
      setError("Initial Investment must be a positive number.");
      return;
    }

    let netProfitNum: number;

    if (calculationMode === 'value') {
      const finalVal = parseFloat(currentValue);
      if (isNaN(finalVal)) {
        setError("Current Value of Investment must be a number.");
        return;
      }
      netProfitNum = finalVal - cost;
      setCalculatedNetProfit(fmtCurrency(netProfitNum));
    } else { // calculationMode === 'profit'
      const profitVal = parseFloat(netProfitInput);
      if (isNaN(profitVal)) {
        setError("Net Profit must be a number.");
        return;
      }
      netProfitNum = profitVal;
    }

    if (cost === 0) { // Should be caught by cost <=0 earlier, but as a safeguard
        setError("Cost of Investment cannot be zero for ROI calculation.");
        return;
    }

    const roiValue = (netProfitNum / cost) * 100;
    setRoi(fmtPercent(roiValue));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-green-600"/>Return on Investment (ROI)</CardTitle>
        <CardDescription>Calculate the profitability of an investment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Calculation Mode:</Label>
            <RadioGroup value={calculationMode} onValueChange={(value: string) => setCalculationMode(value as 'value' | 'profit')} className="mt-1 flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="value" id="roiModeValue" />
                <Label htmlFor="roiModeValue">Using Current Value</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="profit" id="roiModeProfit" />
                <Label htmlFor="roiModeProfit">Using Net Profit</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="initialInvestmentROI">Cost of Investment (Initial Amount)</Label>
            <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="initialInvestmentROI"
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    placeholder="e.g., 1000"
                    className="pl-10"
                />
            </div>
          </div>

          {calculationMode === 'value' && (
            <div>
              <Label htmlFor="currentValueROI">Current Value of Investment</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="currentValueROI"
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    placeholder="e.g., 1200"
                    className="pl-10"
                />
                </div>
            </div>
          )}

          {calculationMode === 'profit' && (
            <div>
              <Label htmlFor="netProfitROI">Net Profit</Label>
               <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="netProfitROI"
                    type="number"
                    value={netProfitInput}
                    onChange={(e) => setNetProfitInput(e.target.value)}
                    placeholder="e.g., 200"
                    className="pl-10"
                />
              </div>
            </div>
          )}
          
          <Button onClick={handleCalculate} className="w-full">Calculate ROI</Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {calculatedNetProfit && calculationMode === 'value' && (
            <Alert variant="default">
                <DollarSign className="h-4 w-4" />
                <AlertTitle>Calculated Net Profit</AlertTitle>
                <AlertDescription className="font-semibold text-lg">
                    ${calculatedNetProfit}
                </AlertDescription>
            </Alert>
          )}

          {roi !== null && (
            <Alert variant="default">
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Return on Investment (ROI)</AlertTitle>
              <AlertDescription className="font-semibold text-xl">
                {roi}%
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 