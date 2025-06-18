'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DollarSign, Percent, Gift } from 'lucide-react'; 
import * as math from 'mathjs';

export default function TotalReturnCalculator() {
  const [beginningPrice, setBeginningPrice] = useState('');
  const [endingPrice, setEndingPrice] = useState('');
  const [dividendsInterest, setDividendsInterest] = useState('');
  
  const [totalReturn, setTotalReturn] = useState<string | null>(null);
  const [capitalGainLoss, setCapitalGainLoss] = useState<string | null>(null);
  const [incomeAmount, setIncomeAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setTotalReturn(null);
    setCapitalGainLoss(null);
    setIncomeAmount(null);

    const bp = parseFloat(beginningPrice);
    const ep = parseFloat(endingPrice);
    const di = parseFloat(dividendsInterest) || 0; // Default to 0 if empty or invalid

    if (isNaN(bp) || bp <= 0) {
      if (bp === 0 && (ep !== 0 || di !== 0)) {
        setError("Beginning Price cannot be zero if there is an Ending Price or Income.");
        return;
      } else if (bp < 0) {
        setError("Beginning Price must be a non-negative number.");
        return;
      }
    }
    if (isNaN(ep)) {
      setError("Ending Price must be a number.");
      return;
    }
    if (isNaN(di) || di < 0) {
      setError("Dividends/Interest must be a non-negative number.");
      return;
    }

    if (bp === 0 && ep === 0 && di === 0) {
        setCapitalGainLoss(fmtCurrency(0));
        setIncomeAmount(fmtCurrency(0));
        setTotalReturn(fmtPercent(0));
        return;
    }
    
    if (bp === 0 && (ep !==0 || di !== 0)) { 
        setError("Cannot calculate total return with zero beginning price and non-zero ending price or income.");
        return;
    }

    const capGain = ep - bp;
    const totalReturnVal = ((capGain + di) / bp) * 100;

    setCapitalGainLoss(fmtCurrency(capGain));
    setIncomeAmount(fmtCurrency(di));
    setTotalReturn(fmtPercent(totalReturnVal));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><Percent className="mr-2 h-6 w-6 text-emerald-600"/>Total Return</CardTitle>
        <CardDescription>Calculate the overall return including capital gains and income (dividends/interest).</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="beginningPriceTR">Beginning Price / Initial Investment</Label>
             <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="beginningPriceTR"
                    type="number"
                    value={beginningPrice}
                    onChange={(e) => setBeginningPrice(e.target.value)}
                    placeholder="e.g., 100"
                    className="pl-10"
                />
            </div>
          </div>

          <div>
            <Label htmlFor="endingPriceTR">Ending Price / Final Value</Label>
            <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="endingPriceTR"
                    type="number"
                    value={endingPrice}
                    onChange={(e) => setEndingPrice(e.target.value)}
                    placeholder="e.g., 110"
                    className="pl-10"
                />
            </div>
          </div>

          <div>
            <Label htmlFor="dividendsInterestTR">Total Dividends / Interest Received</Label>
            <div className="relative mt-1">
                <Gift className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="dividendsInterestTR"
                    type="number"
                    value={dividendsInterest}
                    onChange={(e) => setDividendsInterest(e.target.value)}
                    placeholder="e.g., 5 (optional)"
                    className="pl-10"
                />
            </div>
          </div>
          
          <Button onClick={handleCalculate} className="w-full">Calculate Total Return</Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3 mt-4">
            {capitalGainLoss !== null && (
                <Alert variant="default">
                    <DollarSign className="h-4 w-4" />
                    <AlertTitle>Capital Gain / Loss</AlertTitle>
                    <AlertDescription className={`font-semibold text-lg ${parseFloat(capitalGainLoss) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        ${capitalGainLoss}
                    </AlertDescription>
                </Alert>
            )}

            {incomeAmount !== null && (
                <Alert variant="default">
                    <Gift className="h-4 w-4" />
                    <AlertTitle>Income (Dividends/Interest)</AlertTitle>
                    <AlertDescription className="font-semibold text-lg text-blue-700">
                        ${incomeAmount}
                    </AlertDescription>
                </Alert>
            )}

            {totalReturn !== null && (
                <Alert variant="default" className={`${parseFloat(totalReturn) >= 0 ? 'border-green-500' : 'border-red-500'} border-2`}>
                <Percent className="h-4 w-4" />
                <AlertTitle className="text-base font-bold">Total Return</AlertTitle>
                <AlertDescription className={`font-semibold text-xl ${parseFloat(totalReturn) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {totalReturn}%
                </AlertDescription>
                </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 