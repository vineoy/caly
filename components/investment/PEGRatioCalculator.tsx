'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, Percent, LineChart, TrendingUp } from 'lucide-react';
import * as math from 'mathjs';

export default function PEGRatioCalculator() {
  const [peInputMode, setPeInputMode] = useState<'direct' | 'calculate'>('direct');
  
  // Direct input for P/E Ratio
  const [peRatioDirect, setPeRatioDirect] = useState('');
  
  // Inputs for calculating P/E Ratio
  const [marketPricePerShare, setMarketPricePerShare] = useState('');
  const [eps, setEps] = useState('');

  const [epsGrowthRate, setEpsGrowthRate] = useState('');

  const [pegRatio, setPegRatio] = useState<string | null>(null);
  const [calculatedPeRatio, setCalculatedPeRatio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtRatio = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setPegRatio(null);
    setCalculatedPeRatio(null);

    let peNum: number;

    if (peInputMode === 'direct') {
      peNum = parseFloat(peRatioDirect);
      if (isNaN(peNum)) {
        setError("P/E Ratio (Direct Input) must be a number.");
        return;
      }
    } else { // peInputMode === 'calculate'
      const mpps = parseFloat(marketPricePerShare);
      const epsVal = parseFloat(eps);

      if (isNaN(mpps) || mpps < 0) {
        setError("Market Price per Share must be a non-negative number.");
        return;
      }
      if (isNaN(epsVal)) {
        setError("Earnings per Share (EPS) must be a number.");
        return;
      }
      if (epsVal === 0) {
        setError("EPS cannot be zero for P/E calculation. P/E would be undefined.");
        setCalculatedPeRatio("Undefined (EPS is 0)");
        return;
      } // EPS can be negative, leading to a negative P/E ratio, which is valid.
      
      peNum = mpps / epsVal;
      if (isNaN(peNum) || !isFinite(peNum)){
        setError("Could not calculate P/E ratio from provided values.");
        return;
      }
      setCalculatedPeRatio(fmtRatio(peNum));
    }

    const growthRate = parseFloat(epsGrowthRate);
    if (isNaN(growthRate)) {
      setError("Annual EPS Growth Rate must be a number.");
      return;
    }
    if (growthRate === 0) {
      setError("Annual EPS Growth Rate cannot be zero for PEG calculation. PEG would be undefined or infinite.");
      setPegRatio(peNum !== 0 ? "Undefined (Growth is 0)" : fmtRatio(0));
      return;
    }
    // Growth rate can be negative. If P/E is positive and growth negative, PEG is negative.
    // If P/E is negative and growth negative, PEG is positive. These are valid.

    const pegRatioValue = peNum / growthRate;
     if (isNaN(pegRatioValue) || !isFinite(pegRatioValue)){
        setError("Could not calculate PEG ratio from provided values.");
        return;
    }
    setPegRatio(fmtRatio(pegRatioValue));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><LineChart className="mr-2 h-6 w-6 text-green-600"/>PEG Ratio (Price/Earnings to Growth)</CardTitle>
        <CardDescription>Compare a stock's P/E ratio to its earnings growth rate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>P/E Ratio Input Mode:</Label>
          <RadioGroup value={peInputMode} onValueChange={(v) => setPeInputMode(v as 'direct' | 'calculate')} className="mt-1 flex space-x-4">
            <div className="flex items-center space-x-2"><RadioGroupItem value="direct" id="directPE" /><Label htmlFor="directPE">Direct Input</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="calculate" id="calculatePE" /><Label htmlFor="calculatePE">Calculate P/E</Label></div>
          </RadioGroup>
        </div>

        {peInputMode === 'direct' && (
          <div>
            <Label htmlFor="peRatioDirectPEG">P/E Ratio (Direct)</Label>
            <Input id="peRatioDirectPEG" type="number" value={peRatioDirect} onChange={(e) => setPeRatioDirect(e.target.value)} placeholder="e.g., 15" className="mt-1"/>
          </div>
        )}

        {peInputMode === 'calculate' && (
          <div className="space-y-4 p-4 border rounded-md bg-slate-50">
            <h3 className="text-md font-semibold text-slate-600 mb-2">Calculate P/E Ratio:</h3>
            <div>
              <Label htmlFor="marketPricePEG">Market Price per Share</Label>
              <div className="relative mt-1">
                <DollarSign className="ICON_STYLES" />
                <Input id="marketPricePEG" type="number" value={marketPricePerShare} onChange={(e) => setMarketPricePerShare(e.target.value)} placeholder="e.g., 30" className="pl-10"/>
              </div>
            </div>
            <div>
              <Label htmlFor="epsPEG">Earnings per Share (EPS)</Label>
              <div className="relative mt-1">
                <DollarSign className="ICON_STYLES" />
                <Input id="epsPEG" type="number" value={eps} onChange={(e) => setEps(e.target.value)} placeholder="e.g., 2" className="pl-10"/>
              </div>
            </div>
            {calculatedPeRatio && (
              <Alert variant="default" className="mt-2">
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Calculated P/E Ratio</AlertTitle>
                <AlertDescription className="font-semibold text-lg">
                  {calculatedPeRatio}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="epsGrowthRatePEG">Annual EPS Growth Rate (%)</Label>
          <div className="relative mt-1">
            <Percent className="ICON_STYLES" />
            <Input id="epsGrowthRatePEG" type="number" value={epsGrowthRate} onChange={(e) => setEpsGrowthRate(e.target.value)} placeholder="e.g., 10 (for 10%)" className="pl-10"/>
          </div>
        </div>
        
        <Button onClick={handleCalculate} className="w-full">Calculate PEG Ratio</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {pegRatio !== null && (
          <Alert variant="default" className={`mt-4 ${pegRatio.includes("Undefined") ? 'border-orange-500' : (parseFloat(pegRatio) < 0 ? 'border-purple-500' : (parseFloat(pegRatio) < 1 ? 'border-green-500' : (parseFloat(pegRatio) === 1 ? 'border-blue-500' : 'border-red-500')))} border-2`}>
            <LineChart className="h-4 w-4" />
            <AlertTitle className="text-base font-bold">PEG Ratio</AlertTitle>
            <AlertDescription className="font-semibold text-xl">
              {pegRatio}
            </AlertDescription>
            <p className="text-xs text-slate-500 mt-1">
                (A PEG ratio of 1 may suggest fair valuation. &lt;1 might indicate undervaluation, &gt;1 overvaluation. Negative PEG requires careful context.)
            </p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

const ICON_STYLES = "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"; 