'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Building2, Landmark, Coins, Users, ShieldCheck } from 'lucide-react';
import * as math from 'mathjs';

export default function EVCalculator() {
  const [marketCap, setMarketCap] = useState('');
  const [totalDebt, setTotalDebt] = useState('');
  const [cashEquivalents, setCashEquivalents] = useState('');
  
  const [includeAdvanced, setIncludeAdvanced] = useState(false);
  const [preferredStock, setPreferredStock] = useState('0');
  const [minorityInterest, setMinorityInterest] = useState('0');

  const [enterpriseValue, setEnterpriseValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setEnterpriseValue(null);

    const mc = parseFloat(marketCap);
    const td = parseFloat(totalDebt);
    const ce = parseFloat(cashEquivalents);

    if (isNaN(mc) || mc < 0) {
      setError("Market Capitalization must be a non-negative number.");
      return;
    }
    if (isNaN(td) || td < 0) {
      setError("Total Debt must be a non-negative number.");
      return;
    }
    if (isNaN(ce) || ce < 0) {
      setError("Cash and Cash Equivalents must be a non-negative number.");
      return;
    }

    let evNum = mc + td - ce;

    if (includeAdvanced) {
      const ps = parseFloat(preferredStock) || 0;
      const mi = parseFloat(minorityInterest) || 0;

      if (isNaN(ps) || ps < 0) {
        setError("Preferred Stock value must be a non-negative number.");
        return;
      }
      if (isNaN(mi) || mi < 0) {
        setError("Minority Interest value must be a non-negative number.");
        return;
      }
      evNum = evNum + ps + mi;
    }
    setEnterpriseValue(fmtCurrency(evNum));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><Building2 className="mr-2 h-6 w-6 text-teal-600"/>Enterprise Value (EV)</CardTitle>
        <CardDescription>Calculate a company's total value, often used as a more comprehensive alternative to market cap.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="marketCapEV">Market Capitalization</Label>
          <div className="relative mt-1">
            <DollarSign className="ICON_STYLES" />
            <Input id="marketCapEV" type="number" value={marketCap} onChange={(e) => setMarketCap(e.target.value)} placeholder="e.g., 100,000,000" className="pl-10"/>
          </div>
        </div>
        <div>
          <Label htmlFor="totalDebtEV">Total Debt (Short-term + Long-term)</Label>
          <div className="relative mt-1">
            <Landmark className="ICON_STYLES" />
            <Input id="totalDebtEV" type="number" value={totalDebt} onChange={(e) => setTotalDebt(e.target.value)} placeholder="e.g., 20,000,000" className="pl-10"/>
          </div>
        </div>
        <div>
          <Label htmlFor="cashEquivalentsEV">Cash and Cash Equivalents</Label>
          <div className="relative mt-1">
            <Coins className="ICON_STYLES" />
            <Input id="cashEquivalentsEV" type="number" value={cashEquivalents} onChange={(e) => setCashEquivalents(e.target.value)} placeholder="e.g., 5,000,000" className="pl-10"/>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="includeAdvancedEV" checked={includeAdvanced} onCheckedChange={(checked) => setIncludeAdvanced(checked as boolean)} />
          <Label htmlFor="includeAdvancedEV" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Include Preferred Stock & Minority Interest (Advanced)
          </Label>
        </div>

        {includeAdvanced && (
          <div className="space-y-4 p-4 border rounded-md bg-slate-50">
            <h3 className="text-md font-semibold text-slate-600 mb-2">Advanced Inputs:</h3>
            <div>
              <Label htmlFor="preferredStockEV">Preferred Stock Value</Label>
              <div className="relative mt-1">
                <ShieldCheck className="ICON_STYLES" />
                <Input id="preferredStockEV" type="number" value={preferredStock} onChange={(e) => setPreferredStock(e.target.value)} placeholder="e.g., 1,000,000 (optional)" className="pl-10"/>
              </div>
            </div>
            <div>
              <Label htmlFor="minorityInterestEV">Minority Interest Value</Label>
              <div className="relative mt-1">
                <Users className="ICON_STYLES" />
                <Input id="minorityInterestEV" type="number" value={minorityInterest} onChange={(e) => setMinorityInterest(e.target.value)} placeholder="e.g., 500,000 (optional)" className="pl-10"/>
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={handleCalculate} className="w-full">Calculate Enterprise Value</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {enterpriseValue !== null && (
          <Alert variant="default" className="mt-4 border-teal-500 border-2">
            <Building2 className="h-4 w-4" />
            <AlertTitle className="text-base font-bold">Enterprise Value (EV)</AlertTitle>
            <AlertDescription className="font-semibold text-xl">
              ${enterpriseValue}
            </AlertDescription>
            <p className="text-xs text-slate-500 mt-1">
                EV is often used in valuation multiples like EV/EBITDA.
            </p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

const ICON_STYLES = "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"; 