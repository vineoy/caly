'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DollarSign, Percent, Gift, CalendarCheck2 } from 'lucide-react'; 
import * as math from 'mathjs';

export default function HPRCalculator() {
  const [beginningValue, setBeginningValue] = useState('');
  const [endingValue, setEndingValue] = useState('');
  const [incomeReceived, setIncomeReceived] = useState('');
  
  const [hpr, setHpr] = useState<string | null>(null);
  const [capitalGainLoss, setCapitalGainLoss] = useState<string | null>(null);
  const [incomeAmount, setIncomeAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtPercent = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setHpr(null);
    setCapitalGainLoss(null);
    setIncomeAmount(null);

    const bv = parseFloat(beginningValue);
    const ev = parseFloat(endingValue);
    const income = parseFloat(incomeReceived) || 0; // Default to 0 if empty or invalid

    if (isNaN(bv) || bv <= 0) {
      if (bv === 0 && (ev !== 0 || income !== 0)) {
        setError("Beginning Value cannot be zero if there is an Ending Value or Income.");
        return;
      } else if (bv < 0) {
        setError("Beginning Value must be a non-negative number.");
        return;
      }
    }
    if (isNaN(ev)) {
      setError("Ending Value must be a number.");
      return;
    }
    if (isNaN(income) || income < 0) {
      setError("Income Received must be a non-negative number.");
      return;
    }

    if (bv === 0 && ev === 0 && income === 0) {
        setCapitalGainLoss(fmtCurrency(0));
        setIncomeAmount(fmtCurrency(0));
        setHpr(fmtPercent(0));
        return;
    }
    
    if (bv === 0 && (ev !==0 || income !== 0)) { 
        setError("Cannot calculate HPR with zero beginning value and non-zero ending value or income.");
        return;
    }

    const capGain = ev - bv;
    const hprValue = ((capGain + income) / bv) * 100;

    setCapitalGainLoss(fmtCurrency(capGain));
    setIncomeAmount(fmtCurrency(income));
    setHpr(fmtPercent(hprValue));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><CalendarCheck2 className="mr-2 h-6 w-6 text-cyan-600"/>Holding Period Return (HPR)</CardTitle>
        <CardDescription>Calculate the total return on an asset or portfolio over the specific period it was held.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="beginningValueHPR">Beginning Value / Initial Investment</Label>
             <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="beginningValueHPR"
                    type="number"
                    value={beginningValue}
                    onChange={(e) => setBeginningValue(e.target.value)}
                />
             </div>
          </div>
          <div>
            <Label htmlFor="endingValueHPR">Ending Value</Label>
             <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="endingValueHPR"
                    type="number"
                    value={endingValue}
                    onChange={(e) => setEndingValue(e.target.value)}
                />
             </div>
          </div>
          <div>
            <Label htmlFor="incomeReceivedHPR">Income Received</Label>
             <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="incomeReceivedHPR"
                    type="number"
                    value={incomeReceived}
                    onChange={(e) => setIncomeReceived(e.target.value)}
                />
             </div>
          </div>
          <div>
            <Button onClick={handleCalculate}>Calculate</Button>
          </div>
          {error && (
            <Alert className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {hpr && (
            <div className="mt-4">
              <Label>Holding Period Return (HPR)</Label>
              <div className="relative mt-1">
                <Percent className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="hpr"
                    type="text"
                    value={hpr}
                    readOnly
                />
              </div>
            </div>
          )}
          {capitalGainLoss && (
            <div className="mt-4">
              <Label>Capital Gain/Loss</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="capitalGainLoss"
                    type="text"
                    value={capitalGainLoss}
                    readOnly
                />
              </div>
            </div>
          )}
          {incomeAmount && (
            <div className="mt-4">
              <Label>Income Amount</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    id="incomeAmount"
                    type="text"
                    value={incomeAmount}
                    readOnly
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 