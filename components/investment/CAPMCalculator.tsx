'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Percent, Activity, Award, TrendingUp, ShieldQuestion } from 'lucide-react'; // ShieldQuestion for Beta perhaps
import * as math from 'mathjs';

export default function CAPMCalculator() {
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [beta, setBeta] = useState('');
  const [expectedMarketReturn, setExpectedMarketReturn] = useState('');

  const [expectedInvestmentReturn, setExpectedInvestmentReturn] = useState<string | null>(null);
  const [marketRiskPremium, setMarketRiskPremium] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setExpectedInvestmentReturn(null);
    setMarketRiskPremium(null);

    const rf = parseFloat(riskFreeRate);
    const b = parseFloat(beta);
    const rm = parseFloat(expectedMarketReturn);

    if (isNaN(rf)) {
      setError("Risk-Free Rate must be a number.");
      return;
    }
    if (isNaN(b)) {
      setError("Beta must be a number.");
      return;
    }
    if (isNaN(rm)) {
      setError("Expected Market Return must be a number.");
      return;
    }

    const rfDecimal = rf / 100;
    const rmDecimal = rm / 100;

    const marketPremiumVal = rmDecimal - rfDecimal;
    setMarketRiskPremium(fmtPercent(marketPremiumVal * 100));

    const expectedReturnVal = rfDecimal + b * marketPremiumVal;
    setExpectedInvestmentReturn(fmtPercent(expectedReturnVal * 100));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><Activity className="mr-2 h-6 w-6 text-blue-600"/>Capital Asset Pricing Model (CAPM)</CardTitle>
        <CardDescription>Calculate the expected return of an investment based on its risk relative to the market.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="riskFreeRateCAPM">Risk-Free Rate (Rf)</Label>
          <div className="relative mt-1">
            <Percent className="ICON_STYLES" />
            <Input id="riskFreeRateCAPM" type="number" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} placeholder="e.g., 2 for 2%" className="pl-10"/>
          </div>
        </div>
        <div>
          <Label htmlFor="betaCAPM">Beta (β) of the Investment</Label>
          <div className="relative mt-1">
            <ShieldQuestion className="ICON_STYLES" />
            <Input id="betaCAPM" type="number" value={beta} onChange={(e) => setBeta(e.target.value)} placeholder="e.g., 1.2" className="pl-10"/>
          </div>
        </div>
        <div>
          <Label htmlFor="expectedMarketReturnCAPM">Expected Market Return (ERm)</Label>
          <div className="relative mt-1">
            <Percent className="ICON_STYLES" />
            <Input id="expectedMarketReturnCAPM" type="number" value={expectedMarketReturn} onChange={(e) => setExpectedMarketReturn(e.target.value)} placeholder="e.g., 8 for 8%" className="pl-10"/>
          </div>
        </div>
        
        <Button onClick={handleCalculate} className="w-full">Calculate Expected Return (CAPM)</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        
        <div className="space-y-3 mt-4">
            {marketRiskPremium !== null && (
                <Alert variant="default">
                    <TrendingUp className="h-4 w-4" />
                    <AlertTitle>Market Risk Premium (ERm - Rf)</AlertTitle>
                    <AlertDescription className={`font-semibold text-lg`}>
                        {marketRiskPremium}%
                    </AlertDescription>
                </Alert>
            )}
            {expectedInvestmentReturn !== null && (
            <Alert variant="default" className={`border-blue-500 border-2`}>
                <Award className="h-4 w-4" />
                <AlertTitle className="text-base font-bold">Expected Return on Investment (ERi)</AlertTitle>
                <AlertDescription className={`font-semibold text-xl`}>
                {expectedInvestmentReturn}%
                </AlertDescription>
                <p className="text-xs text-slate-500 mt-1">
                    This is the return an investor might expect for taking on the additional risk associated with the investment.
                </p>
            </Alert>
            )}
        </div>
      </CardContent>
    </Card>
  );
}

const ICON_STYLES = "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"; 