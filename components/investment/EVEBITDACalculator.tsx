'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, Building2, TrendingDown, TrendingUp, PieChart, Briefcase } from 'lucide-react';
import * as math from 'mathjs';

export default function EVEBITDACalculator() {
  const [enterpriseValue, setEnterpriseValue] = useState('');
  const [ebitdaInputMode, setEbitdaInputMode] = useState<'direct' | 'calculate'>('direct');
  
  // Direct input for EBITDA
  const [ebitdaDirect, setEbitdaDirect] = useState('');
  
  // Inputs for calculating EBITDA
  const [operatingIncome, setOperatingIncome] = useState(''); // EBIT
  const [depreciation, setDepreciation] = useState('');
  const [amortization, setAmortization] = useState('');

  const [evEbitdaRatio, setEvEbitdaRatio] = useState<string | null>(null);
  const [calculatedEbitda, setCalculatedEbitda] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtRatio = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setEvEbitdaRatio(null);
    setCalculatedEbitda(null);

    const ev = parseFloat(enterpriseValue);
    if (isNaN(ev)) { // EV can be negative
      setError("Enterprise Value must be a number.");
      return;
    }

    let ebitdaNum: number;

    if (ebitdaInputMode === 'direct') {
      ebitdaNum = parseFloat(ebitdaDirect);
      if (isNaN(ebitdaNum)) {
        setError("EBITDA (Direct Input) must be a number.");
        return;
      }
    } else { // ebitdaInputMode === 'calculate'
      const oi = parseFloat(operatingIncome);
      const d = parseFloat(depreciation) || 0;
      const a = parseFloat(amortization) || 0;

      if (isNaN(oi)) {
        setError("Operating Income (EBIT) must be a number.");
        return;
      }
      if (isNaN(d) || d < 0) {
        setError("Depreciation must be a non-negative number.");
        return;
      }
      if (isNaN(a) || a < 0) {
        setError("Amortization must be a non-negative number.");
        return;
      }
      ebitdaNum = oi + d + a;
      setCalculatedEbitda(fmtCurrency(ebitdaNum));
    }

    if (ebitdaNum === 0) {
      setEvEbitdaRatio(ev !== 0 ? "Undefined (EBITDA is 0)" : fmtRatio(0)); // EV 0 / EBITDA 0 = 0, otherwise Undefined
      return;
    }
    // EBITDA can be negative. If EV is positive and EBITDA negative, ratio is negative.
    // If EV is negative and EBITDA negative, ratio is positive.
    // These are all mathematically valid, though interpretation varies.

    const ratioValue = ev / ebitdaNum;
    if (isNaN(ratioValue) || !isFinite(ratioValue)) {
        setError("Could not calculate EV/EBITDA ratio from the given values.");
        return;
    }
    setEvEbitdaRatio(fmtRatio(ratioValue));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><PieChart className="mr-2 h-6 w-6 text-indigo-600"/>EV/EBITDA Ratio</CardTitle>
        <CardDescription>Assess company value relative to its earnings before interest, taxes, depreciation, and amortization.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="enterpriseValueEVE">Enterprise Value (EV)</Label>
          <div className="relative mt-1">
            <Building2 className="ICON_STYLES" />
            <Input id="enterpriseValueEVE" type="number" value={enterpriseValue} onChange={(e) => setEnterpriseValue(e.target.value)} placeholder="e.g., 120,000,000" className="pl-10"/>
          </div>
        </div>

        <div>
          <Label>EBITDA Input Mode:</Label>
          <RadioGroup value={ebitdaInputMode} onValueChange={(v) => setEbitdaInputMode(v as 'direct' | 'calculate')} className="mt-1 flex space-x-4">
            <div className="flex items-center space-x-2"><RadioGroupItem value="direct" id="directEBITDA" /><Label htmlFor="directEBITDA">Direct Input</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="calculate" id="calculateEBITDA" /><Label htmlFor="calculateEBITDA">Calculate</Label></div>
          </RadioGroup>
        </div>

        {ebitdaInputMode === 'direct' && (
          <div>
            <Label htmlFor="ebitdaDirectEVE">EBITDA (Direct)</Label>
            <div className="relative mt-1">
                <DollarSign className="ICON_STYLES" />
                <Input id="ebitdaDirectEVE" type="number" value={ebitdaDirect} onChange={(e) => setEbitdaDirect(e.target.value)} placeholder="e.g., 15,000,000" className="pl-10"/>
            </div>
          </div>
        )}

        {ebitdaInputMode === 'calculate' && (
          <div className="space-y-4 p-4 border rounded-md bg-slate-50">
            <h3 className="text-md font-semibold text-slate-600 mb-2">Calculate EBITDA:</h3>
            <div>
              <Label htmlFor="operatingIncomeEVE">Operating Income (EBIT)</Label>
              <div className="relative mt-1">
                <Briefcase className="ICON_STYLES" />
                <Input id="operatingIncomeEVE" type="number" value={operatingIncome} onChange={(e) => setOperatingIncome(e.target.value)} placeholder="e.g., 10,000,000" className="pl-10"/>
              </div>
            </div>
            <div>
              <Label htmlFor="depreciationEVE">Depreciation Expense</Label>
              <div className="relative mt-1">
                <TrendingDown className="ICON_STYLES" />
                <Input id="depreciationEVE" type="number" value={depreciation} onChange={(e) => setDepreciation(e.target.value)} placeholder="e.g., 3,000,000 (optional)" className="pl-10"/>
              </div>
            </div>
            <div>
              <Label htmlFor="amortizationEVE">Amortization Expense</Label>
              <div className="relative mt-1">
                <TrendingDown className="ICON_STYLES transform scale-y-[-1]" /> {/* Flip icon for Amortization */}
                <Input id="amortizationEVE" type="number" value={amortization} onChange={(e) => setAmortization(e.target.value)} placeholder="e.g., 2,000,000 (optional)" className="pl-10"/>
              </div>
            </div>
            {calculatedEbitda && (
              <Alert variant="default" className="mt-2">
                <DollarSign className="h-4 w-4" />
                <AlertTitle>Calculated EBITDA</AlertTitle>
                <AlertDescription className="font-semibold text-lg">
                  ${calculatedEbitda}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        
        <Button onClick={handleCalculate} className="w-full">Calculate EV/EBITDA Ratio</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {evEbitdaRatio !== null && (
          <Alert variant="default" className={`mt-4 ${evEbitdaRatio.includes("Undefined") ? 'border-orange-500' : (parseFloat(evEbitdaRatio) < 0 ? 'border-purple-500' : (parseFloat(evEbitdaRatio) < 10 ? 'border-green-500' : 'border-red-500'))} border-2`}>
            <PieChart className="h-4 w-4" />
            <AlertTitle className="text-base font-bold">EV/EBITDA Ratio</AlertTitle>
            <AlertDescription className="font-semibold text-xl">
              {evEbitdaRatio}
            </AlertDescription>
            <p className="text-xs text-slate-500 mt-1">
                (Lower ratios often suggest undervaluation, higher suggest overvaluation. Typically, &lt;10 is seen as healthy. Negative ratios require careful interpretation.)
            </p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

const ICON_STYLES = "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"; 