'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, BookOpen, Hash, BarChartBig } from 'lucide-react';
import * as math from 'mathjs';

export default function PBRatioCalculator() {
  const [marketPricePerShare, setMarketPricePerShare] = useState('');
  const [calculationMode, setCalculationMode] = useState<'direct' | 'calculate'>('direct');
  
  // Direct input for BVPS
  const [bookValuePerShareDirect, setBookValuePerShareDirect] = useState('');
  
  // Inputs for calculating BVPS
  const [totalEquity, setTotalEquity] = useState('');
  const [preferredStockValue, setPreferredStockValue] = useState('0'); // Defaults to 0
  const [commonSharesOutstanding, setCommonSharesOutstanding] = useState('');

  const [pbRatio, setPbRatio] = useState<string | null>(null);
  const [calculatedBvps, setCalculatedBvps] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtRatio = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setPbRatio(null);
    setCalculatedBvps(null);

    const mpps = parseFloat(marketPricePerShare);
    if (isNaN(mpps) || mpps < 0) { // Market price can be 0 theoretically
      setError("Market Price per Share must be a non-negative number.");
      return;
    }

    let bvpsNum: number;

    if (calculationMode === 'direct') {
      bvpsNum = parseFloat(bookValuePerShareDirect);
      if (isNaN(bvpsNum)) {
        setError("Book Value per Share (Direct Input) must be a number.");
        return;
      }
    } else { // calculationMode === 'calculate'
      const te = parseFloat(totalEquity);
      const ps = parseFloat(preferredStockValue) || 0;
      const cso = parseFloat(commonSharesOutstanding);

      if (isNaN(te)) {
        setError("Total Common Stockholders' Equity must be a number.");
        return;
      }
      if (isNaN(ps) || ps < 0) {
        setError("Preferred Stock Value must be a non-negative number.");
        return;
      }
      if (isNaN(cso) || cso <= 0) {
        setError("Number of Common Shares Outstanding must be a positive number.");
        return;
      }
      if (te < ps) {
        setError("Total Equity cannot be less than Preferred Stock Value.");
        return;
      }

      bvpsNum = (te - ps) / cso;
      if (isNaN(bvpsNum) || !isFinite(bvpsNum)) {
        setError("Could not calculate Book Value per Share. Check inputs.");
        return;
      }
      setCalculatedBvps(fmtCurrency(bvpsNum));
    }

    if (bvpsNum === 0) {
      if (mpps > 0) {
        setError("Book Value per Share is zero. P/B Ratio is undefined or infinitely large. Consider the implications.");
        setPbRatio("Undefined (BVPS is 0)");
      } else { // mpps is 0 and bvps is 0
        setPbRatio(fmtRatio(0)); // Or "N/A", depends on convention for 0/0
      }
      return;
    }
    if (bvpsNum < 0) {
        // P/B can be negative if BVPS is negative. This is a valid scenario indicating financial distress.
        // No specific error, calculation will proceed.
    }

    const pbRatioValue = mpps / bvpsNum;
    if (isNaN(pbRatioValue) || !isFinite(pbRatioValue)) {
        setError("Could not calculate P/B Ratio from the given values.");
        return;
    }
    setPbRatio(fmtRatio(pbRatioValue));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><BookOpen className="mr-2 h-6 w-6 text-sky-600"/>Price-to-Book (P/B) Ratio</CardTitle>
        <CardDescription>Compare a company's market capitalization to its book value.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="marketPricePB">Current Market Price per Share</Label>
          <div className="relative mt-1">
            <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input id="marketPricePB" type="number" value={marketPricePerShare} onChange={(e) => setMarketPricePerShare(e.target.value)} placeholder="e.g., 50" className="pl-10"/>
          </div>
        </div>

        <div>
          <Label>Book Value per Share (BVPS) Input Mode:</Label>
          <RadioGroup value={calculationMode} onValueChange={(v) => setCalculationMode(v as 'direct' | 'calculate')} className="mt-1 flex space-x-4">
            <div className="flex items-center space-x-2"><RadioGroupItem value="direct" id="directBVPS" /><Label htmlFor="directBVPS">Direct Input</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="calculate" id="calculateBVPS" /><Label htmlFor="calculateBVPS">Calculate</Label></div>
          </RadioGroup>
        </div>

        {calculationMode === 'direct' && (
          <div>
            <Label htmlFor="bookValuePerShareDirectPB">Book Value per Share (Direct)</Label>
            <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="bookValuePerShareDirectPB" type="number" value={bookValuePerShareDirect} onChange={(e) => setBookValuePerShareDirect(e.target.value)} placeholder="e.g., 25" className="pl-10"/>
            </div>
          </div>
        )}

        {calculationMode === 'calculate' && (
          <div className="space-y-4 p-4 border rounded-md bg-slate-50">
            <h3 className="text-md font-semibold text-slate-600 mb-2">Calculate Book Value per Share:</h3>
            <div>
              <Label htmlFor="totalEquityPB">Total Common Stockholders' Equity</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="totalEquityPB" type="number" value={totalEquity} onChange={(e) => setTotalEquity(e.target.value)} placeholder="e.g., 2,500,000" className="pl-10"/>
              </div>
            </div>
            <div>
              <Label htmlFor="preferredStockValuePB">Value of Preferred Stock (if any)</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="preferredStockValuePB" type="number" value={preferredStockValue} onChange={(e) => setPreferredStockValue(e.target.value)} placeholder="e.g., 0 or 100,000" className="pl-10"/>
              </div>
            </div>
            <div>
              <Label htmlFor="commonSharesOutstandingPB">Number of Common Shares Outstanding</Label>
              <div className="relative mt-1">
                <Hash className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="commonSharesOutstandingPB" type="number" value={commonSharesOutstanding} onChange={(e) => setCommonSharesOutstanding(e.target.value)} placeholder="e.g., 100,000" className="pl-10"/>
              </div>
            </div>
            {calculatedBvps && (
              <Alert variant="default" className="mt-2">
                <DollarSign className="h-4 w-4" />
                <AlertTitle>Calculated Book Value per Share (BVPS)</AlertTitle>
                <AlertDescription className="font-semibold text-lg">
                  ${calculatedBvps}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        
        <Button onClick={handleCalculate} className="w-full">Calculate P/B Ratio</Button>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {pbRatio !== null && (
          <Alert variant="default" className={`mt-4 ${pbRatio.includes("Undefined") ? 'border-orange-500' : (parseFloat(pbRatio) < 1 ? 'border-red-500' : (parseFloat(pbRatio) <=3 ? 'border-green-500' : 'border-yellow-500'))} border-2`}>
            <BarChartBig className="h-4 w-4" />
            <AlertTitle className="text-base font-bold">Price-to-Book (P/B) Ratio</AlertTitle>
            <AlertDescription className="font-semibold text-xl">
              {pbRatio}
            </AlertDescription>
            <p className="text-xs text-slate-500 mt-1">
                (Generally, P/B &lt; 1 may indicate undervaluation, P/B &gt; 3 may indicate overvaluation, but varies by industry.)
            </p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 