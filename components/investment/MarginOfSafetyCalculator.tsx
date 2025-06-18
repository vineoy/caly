'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DollarSign, Percent, Scale, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import * as math from 'mathjs';

export default function MarginOfSafetyCalculator() {
  const [intrinsicValue, setIntrinsicValue] = useState('');
  const [marketPrice, setMarketPrice] = useState('');

  const [marginOfSafetyAmount, setMarginOfSafetyAmount] = useState<string | null>(null);
  const [marginOfSafetyPercent, setMarginOfSafetyPercent] = useState<string | null>(null);
  const [valuationStatus, setValuationStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setMarginOfSafetyAmount(null);
    setMarginOfSafetyPercent(null);
    setValuationStatus(null);

    const iv = parseFloat(intrinsicValue);
    const mp = parseFloat(marketPrice);

    if (isNaN(iv)) {
      setError("Intrinsic Value per Share must be a number.");
      return;
    }
    if (isNaN(mp) || mp < 0) {
      setError("Current Market Price per Share must be a non-negative number.");
      return;
    }
    if (iv <= 0 && mp > 0) {
        setError("Intrinsic Value must be positive to calculate a meaningful Margin of Safety percentage when market price is positive.");
        return;
    }
    if (iv < 0 && mp <=0) {
        setError("Cannot reliably calculate Margin of Safety with negative Intrinsic Value and non-positive Market Price.");
        return;
    }

    const mosAmount = iv - mp;
    setMarginOfSafetyAmount(fmtCurrency(mosAmount));

    let mosPercent: number | null = null;
    if (iv > 0) {
        mosPercent = (mosAmount / iv) * 100;
        setMarginOfSafetyPercent(fmtPercent(mosPercent));
    } else if (iv === 0 && mp === 0) {
        // If both are zero, margin of safety is effectively 0 / 0%
        mosPercent = 0;
        setMarginOfSafetyPercent(fmtPercent(0));
    } else {
        // Intrinsic value is 0 or negative, and market price is 0 or positive (but caught iv<=0 && mp>0 above)
        // This means percentage is not meaningfully calculable or infinite.
        setMarginOfSafetyPercent("N/A (Intrinsic Value is not positive)");
    }

    if (mosAmount > 0) {
      setValuationStatus("Potentially Undervalued");
    } else if (mosAmount < 0) {
      setValuationStatus("Potentially Overvalued");
    } else {
      setValuationStatus("Priced at Intrinsic Value");
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-6 w-6 text-green-700"/>Margin of Safety</CardTitle>
        <CardDescription>Determine the difference between a stock's intrinsic value and its market price.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="intrinsicValueMOS">Estimated Intrinsic Value per Share</Label>
          <div className="relative mt-1">
            <Scale className="ICON_STYLES" />
            <Input id="intrinsicValueMOS" type="number" value={intrinsicValue} onChange={(e) => setIntrinsicValue(e.target.value)} placeholder="e.g., 100" className="pl-10"/>
          </div>
        </div>
        <div>
          <Label htmlFor="marketPriceMOS">Current Market Price per Share</Label>
          <div className="relative mt-1">
            <DollarSign className="ICON_STYLES" />
            <Input id="marketPriceMOS" type="number" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} placeholder="e.g., 80" className="pl-10"/>
          </div>
        </div>
        
        <Button onClick={handleCalculate} className="w-full">Calculate Margin of Safety</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        
        {marginOfSafetyAmount !== null && (
          <Alert variant="default" className={`mt-4 ${parseFloat(marginOfSafetyAmount) > 0 ? 'border-green-500' : (parseFloat(marginOfSafetyAmount) < 0 ? 'border-red-500' : 'border-slate-500')} border-2`}>
            {parseFloat(marginOfSafetyAmount) > 0 ? <TrendingUp className="h-5 w-5" /> : (parseFloat(marginOfSafetyAmount) < 0 ? <TrendingDown className="h-5 w-5" /> : <Scale className="h-5 w-5" />)}
            <AlertTitle className="text-base font-bold">Margin of Safety Analysis</AlertTitle>
            <div className="mt-2 text-sm">
                <p><strong>Status:</strong> <span className={`font-semibold ${parseFloat(marginOfSafetyAmount) > 0 ? 'text-green-700' : (parseFloat(marginOfSafetyAmount) < 0 ? 'text-red-700' : 'text-slate-700')}`}>{valuationStatus}</span></p>
                <p><strong>Absolute Margin of Safety:</strong> <span className="font-semibold">${marginOfSafetyAmount}</span> per share</p>
                {marginOfSafetyPercent !== null && (
                    <p><strong>Percentage Margin of Safety:</strong> <span className="font-semibold">{marginOfSafetyPercent}{typeof marginOfSafetyPercent === 'string' && !marginOfSafetyPercent.includes("N/A") ? "%" : ""}</span></p>
                )}
            </div>
            <p className="text-xs text-slate-500 mt-2">
                A positive margin indicates the market price is below your estimated intrinsic value, suggesting potential undervaluation.
            </p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

const ICON_STYLES = "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"; 