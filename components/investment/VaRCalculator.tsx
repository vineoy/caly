'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Percent, CalendarDays, ShieldAlert, TrendingDown } from 'lucide-react';
import * as math from 'mathjs';

const Z_SCORES: { [key: string]: number } = {
  '90': 1.28155, // 90% confidence level (one-tailed)
  '95': 1.64485, // 95% confidence level
  '99': 2.32635, // 99% confidence level
};

export default function VaRCalculator() {
  const [portfolioValue, setPortfolioValue] = useState('');
  const [dailyStdDev, setDailyStdDev] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('95'); // Default to 95%
  const [timeHorizon, setTimeHorizon] = useState(''); // In days

  const [varAmount, setVarAmount] = useState<string | null>(null);
  const [varPercentage, setVarPercentage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setVarAmount(null);
    setVarPercentage(null);

    const pv = parseFloat(portfolioValue);
    const stdDevPercent = parseFloat(dailyStdDev);
    const horizonDays = parseInt(timeHorizon, 10);
    const zScore = Z_SCORES[confidenceLevel];

    if (isNaN(pv) || pv <= 0) {
      setError("Portfolio Value must be a positive number.");
      return;
    }
    if (isNaN(stdDevPercent) || stdDevPercent < 0) {
      setError("Daily Standard Deviation must be a non-negative percentage.");
      return;
    }
    if (isNaN(horizonDays) || horizonDays <= 0) {
      setError("Time Horizon must be a positive number of days.");
      return;
    }
    if (!zScore) {
      setError("Invalid confidence level selected.");
      return;
    }

    const dailyStdDevDecimal = stdDevPercent / 100;
    
    try {
        const varVal = pv * zScore * dailyStdDevDecimal * Math.sqrt(horizonDays);
        if (isNaN(varVal) || !isFinite(varVal)) {
            setError("Could not calculate VaR. Check inputs, especially standard deviation and time horizon.");
            return;
        }

        setVarAmount(fmtCurrency(varVal));
        const varPctOfPortfolio = (varVal / pv) * 100;
        setVarPercentage(fmtPercent(varPctOfPortfolio));

    } catch (e: any) {
        setError("Error during VaR calculation. Please check your inputs.");
        console.error(e);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-6 w-6 text-red-600"/>Value at Risk (VaR)</CardTitle>
        <CardDescription>Estimate the maximum potential loss over a specified time horizon at a given confidence level (Parametric Method, assumes zero mean return).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="portfolioValueVaR">Portfolio Value</Label>
          <div className="relative mt-1">
            <DollarSign className="ICON_STYLES" />
            <Input id="portfolioValueVaR" type="number" value={portfolioValue} onChange={(e) => setPortfolioValue(e.target.value)} placeholder="e.g., 1,000,000" className="pl-10"/>
          </div>
        </div>
        <div>
          <Label htmlFor="dailyStdDevVaR">Daily Standard Deviation of Returns (%)</Label>
          <div className="relative mt-1">
            <Percent className="ICON_STYLES" />
            <Input id="dailyStdDevVaR" type="number" value={dailyStdDev} onChange={(e) => setDailyStdDev(e.target.value)} placeholder="e.g., 1 for 1%" className="pl-10"/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="confidenceLevelVaR">Confidence Level</Label>
                <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
                    <SelectTrigger id="confidenceLevelVaR" className="mt-1">
                        <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                        <SelectItem value="99">99%</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="timeHorizonVaR">Time Horizon (Days)</Label>
                <div className="relative mt-1">
                    <CalendarDays className="ICON_STYLES" />
                    <Input id="timeHorizonVaR" type="number" value={timeHorizon} onChange={(e) => setTimeHorizon(e.target.value)} placeholder="e.g., 10" className="pl-10"/>
                </div>
            </div>
        </div>
        
        <Button onClick={handleCalculate} className="w-full">Calculate VaR</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {varAmount !== null && varPercentage !== null && (
          <Alert variant="default" className="mt-4 border-red-500 border-2">
            <TrendingDown className="h-4 w-4" />
            <AlertTitle className="text-base font-bold">Value at Risk ({confidenceLevel}%)</AlertTitle>
            <AlertDescription className="space-y-1">
                <p className="font-semibold text-xl">${varAmount}</p>
                <p className="font-medium text-md">({varPercentage}% of Portfolio)</p>
                <p className="text-xs text-slate-600 pt-1">
                    This means there is a {100 - parseInt(confidenceLevel, 10)}% chance of losing <span className="font-bold">at least ${varAmount}</span> 
                    (or {varPercentage}% of the portfolio) over the next {timeHorizon} day(s), based on the provided parameters and assuming normal distribution of returns with zero mean.
                </p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

const ICON_STYLES = "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"; 