'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingDown, ArrowDownToDot, ArrowUpFromDot } from 'lucide-react';
import * as math from 'mathjs';

export default function MaxDrawdownCalculator() {
  const [prices, setPrices] = useState('100, 110, 105, 120, 95, 90, 115, 130, 110');
  
  const [maxDrawdown, setMaxDrawdown] = useState<string | null>(null);
  const [peakValue, setPeakValue] = useState<string | null>(null);
  const [troughValue, setTroughValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const calculateMaxDrawdown = () => {
    setError(null);
    setMaxDrawdown(null);
    setPeakValue(null);
    setTroughValue(null);

    const priceSeries = prices.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));

    if (priceSeries.length < 2) {
      setError("Please enter at least two price points.");
      return;
    }

    let peak = -Infinity;
    let maxDd = 0;
    let peakForMaxDd = priceSeries[0];
    let troughForMaxDd = priceSeries[0];
    let tempPeak = priceSeries[0];

    for (const price of priceSeries) {
      if (price > peak) {
        peak = price;
      }
      const drawdown = (peak - price) / peak;
      if (drawdown > maxDd) {
        maxDd = drawdown;
        peakForMaxDd = peak;
        troughForMaxDd = price;
      }
    }
    
    // If all values are ascending, drawdown is 0
    if (maxDd === 0 && priceSeries.every((val, idx) => idx === 0 || val >= priceSeries[idx-1])){
        // Check if there was any peak and trough for display purposes even if MDD is 0
        // For strictly ascending, peak will be last, trough first (or same if single value trend)
        // But for MDD calc, peakForMaxDd and troughForMaxDd would remain at values[0]
        // So we set them to indicate no real drawdown occurred.
        setPeakValue(null); // No meaningful peak leading to a drawdown
        setTroughValue(null); // No meaningful trough after a peak for a drawdown
    } else {
        setPeakValue(fmtCurrency(peakForMaxDd));
        setTroughValue(fmtCurrency(troughForMaxDd));
    }

    setMaxDrawdown(fmtPercent(maxDd * 100));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><TrendingDown className="mr-2 h-6 w-6 text-pink-600"/>Maximum Drawdown (MDD)</CardTitle>
        <CardDescription>Calculate the largest peak-to-trough decline of an investment over a period.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="prices">Price Series (comma-separated)</Label>
          <Textarea
            id="prices"
            value={prices}
            onChange={(e) => setPrices(e.target.value)}
            placeholder="e.g., 100, 110, 105, 120, 95, ..."
            className="mt-1 min-h-[80px]"
          />
          <p className="text-xs text-slate-500 mt-1">Enter values in chronological order.</p>
        </div>
        
        <Button onClick={calculateMaxDrawdown} className="w-full">Calculate Maximum Drawdown</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {maxDrawdown !== null && (
          <Alert variant="default" className={`mt-4 border-pink-500 border-2`}>
            <TrendingDown className="h-4 w-4" />
            <AlertTitle className="text-base font-bold">Maximum Drawdown (MDD)</AlertTitle>
            <AlertDescription className="font-semibold text-xl">
              {maxDrawdown}%
            </AlertDescription>
            {peakValue !== null && troughValue !== null && (
                <div className="text-sm text-slate-600 mt-2 space-y-1">
                    <p className="flex items-center">
                        <ArrowUpFromDot className="h-4 w-4 mr-1 text-green-600" /> 
                        Peak value during drawdown period: <span className="font-semibold ml-1">${peakValue}</span>
                    </p>
                    <p className="flex items-center">
                        <ArrowDownToDot className="h-4 w-4 mr-1 text-red-600" /> 
                        Trough value during drawdown period: <span className="font-semibold ml-1">${troughValue}</span>
                    </p>
                </div>
            )}
            <p className="text-xs text-slate-500 mt-2">
                This represents the largest percentage drop from a peak to a subsequent trough in the provided series.
            </p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 