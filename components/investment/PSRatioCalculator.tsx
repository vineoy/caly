'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, Hash, BarChartHorizontal, Receipt } from 'lucide-react';
import * as math from 'mathjs';

export default function PSRatioCalculator() {
  const [mainCalculationMode, setMainCalculationMode] = useState<'perShare' | 'marketCapTotalRevenue'>('perShare');
  const [rpsInputMode, setRpsInputMode] = useState<'direct' | 'calculate'>('direct'); // For perShare mode

  // Inputs for 'perShare' mode
  const [marketPricePerShare, setMarketPricePerShare] = useState('');
  const [revenuePerShareDirect, setRevenuePerShareDirect] = useState('');
  const [totalRevenueForRps, setTotalRevenueForRps] = useState(''); // For calculating RPS
  const [sharesOutstandingForRps, setSharesOutstandingForRps] = useState(''); // For calculating RPS

  // Inputs for 'marketCapTotalRevenue' mode
  const [marketCap, setMarketCap] = useState('');
  const [totalRevenueForMarketCap, setTotalRevenueForMarketCap] = useState('');

  const [psRatio, setPsRatio] = useState<string | null>(null);
  const [calculatedRps, setCalculatedRps] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtRatio = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });
  const fmtCurrency = (val: number) => math.format(val, { notation: 'fixed', precision: 2 });

  const handleCalculate = () => {
    setError(null);
    setPsRatio(null);
    setCalculatedRps(null);

    let mppsNum: number, rpsNum: number, marketCapNum: number, totalRevenueNum: number;

    if (mainCalculationMode === 'perShare') {
      mppsNum = parseFloat(marketPricePerShare);
      if (isNaN(mppsNum) || mppsNum < 0) {
        setError("Market Price per Share must be a non-negative number.");
        return;
      }

      if (rpsInputMode === 'direct') {
        rpsNum = parseFloat(revenuePerShareDirect);
        if (isNaN(rpsNum)) {
          setError("Revenue per Share (Direct Input) must be a number.");
          return;
        }
      } else { // rpsInputMode === 'calculate'
        totalRevenueNum = parseFloat(totalRevenueForRps);
        const sharesNum = parseFloat(sharesOutstandingForRps);
        if (isNaN(totalRevenueNum) || totalRevenueNum < 0) {
          setError("Total Revenue (for RPS calc) must be a non-negative number.");
          return;
        }
        if (isNaN(sharesNum) || sharesNum <= 0) {
          setError("Number of Shares Outstanding (for RPS calc) must be a positive number.");
          return;
        }
        rpsNum = totalRevenueNum / sharesNum;
        if (isNaN(rpsNum) || !isFinite(rpsNum)) {
            setError("Could not calculate Revenue per Share. Check inputs."); return;
        }
        setCalculatedRps(fmtCurrency(rpsNum));
      }

      if (rpsNum === 0) {
        setPsRatio(mppsNum > 0 ? "Undefined (RPS is 0)" : fmtRatio(0));
        return;
      }
      const ratio = mppsNum / rpsNum;
      setPsRatio(fmtRatio(ratio));

    } else { // mainCalculationMode === 'marketCapTotalRevenue'
      marketCapNum = parseFloat(marketCap);
      totalRevenueNum = parseFloat(totalRevenueForMarketCap);

      if (isNaN(marketCapNum) || marketCapNum < 0) {
        setError("Market Capitalization must be a non-negative number.");
        return;
      }
      if (isNaN(totalRevenueNum) || totalRevenueNum < 0) {
        setError("Total Revenue must be a non-negative number.");
        return;
      }
      if (totalRevenueNum === 0) {
        setPsRatio(marketCapNum > 0 ? "Undefined (Total Revenue is 0)" : fmtRatio(0));
        return;
      }
      const ratio = marketCapNum / totalRevenueNum;
      setPsRatio(fmtRatio(ratio));
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><Receipt className="mr-2 h-6 w-6 text-orange-600"/>Price-to-Sales (P/S) Ratio</CardTitle>
        <CardDescription>Compare a company's stock price to its revenues.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>P/S Calculation Method:</Label>
          <RadioGroup value={mainCalculationMode} onValueChange={(v) => setMainCalculationMode(v as 'perShare' | 'marketCapTotalRevenue')} className="mt-1 grid grid-cols-2 gap-2">
            <Label htmlFor="modePerSharePS" className={`border rounded-md p-2 text-center cursor-pointer ${mainCalculationMode === 'perShare' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}><RadioGroupItem value="perShare" id="modePerSharePS" className="sr-only"/>Per Share Data</Label>
            <Label htmlFor="modeMarketCapPS" className={`border rounded-md p-2 text-center cursor-pointer ${mainCalculationMode === 'marketCapTotalRevenue' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}><RadioGroupItem value="marketCapTotalRevenue" id="modeMarketCapPS" className="sr-only"/>Market Cap & Total Revenue</Label>
          </RadioGroup>
        </div>

        {mainCalculationMode === 'perShare' && (
          <div className="space-y-4 p-4 border rounded-md bg-slate-50">
            <h3 className="text-md font-semibold text-slate-600 mb-2">Using Per Share Data:</h3>
            <div>
              <Label htmlFor="marketPricePS">Market Price per Share</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="marketPricePS" type="number" value={marketPricePerShare} onChange={(e) => setMarketPricePerShare(e.target.value)} placeholder="e.g., 20" className="pl-10"/>
              </div>
            </div>
            <div>
                <Label>Revenue per Share (RPS) Input:</Label>
                <RadioGroup value={rpsInputMode} onValueChange={(v) => setRpsInputMode(v as 'direct' | 'calculate')} className="mt-1 flex space-x-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="direct" id="directRPS" /><Label htmlFor="directRPS">Direct</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="calculate" id="calculateRPS" /><Label htmlFor="calculateRPS">Calculate</Label></div>
                </RadioGroup>
            </div>
            {rpsInputMode === 'direct' && (
                <div>
                    <Label htmlFor="rpsDirectPS">Revenue per Share (Direct)</Label>
                    <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input id="rpsDirectPS" type="number" value={revenuePerShareDirect} onChange={(e) => setRevenuePerShareDirect(e.target.value)} placeholder="e.g., 5" className="pl-10"/>
                    </div>
                </div>
            )}
            {rpsInputMode === 'calculate' && (
                <div className="space-y-3 p-3 border rounded-md bg-white">
                    <h4 className="text-sm font-medium text-slate-500">Calculate Revenue per Share:</h4>
                    <div><Label htmlFor="totalRevenueRPS">Total Revenue (TTM)</Label><div className="relative mt-1"><DollarSign className="ICON_STYLES" /><Input id="totalRevenueRPS" type="number" value={totalRevenueForRps} onChange={(e) => setTotalRevenueForRps(e.target.value)} placeholder="e.g., 5,000,000" className="pl-10"/></div></div>
                    <div><Label htmlFor="sharesForRPS">Shares Outstanding</Label><div className="relative mt-1"><Hash className="ICON_STYLES" /><Input id="sharesForRPS" type="number" value={sharesOutstandingForRps} onChange={(e) => setSharesOutstandingForRps(e.target.value)} placeholder="e.g., 1,000,000" className="pl-10"/></div></div>
                    {calculatedRps && <Alert variant="default" className="mt-2"><DollarSign className="h-4 w-4" /><AlertTitle>Calculated RPS</AlertTitle><AlertDescription className="font-semibold text-lg">${calculatedRps}</AlertDescription></Alert>}
                </div>
            )}
          </div>
        )}

        {mainCalculationMode === 'marketCapTotalRevenue' && (
          <div className="space-y-4 p-4 border rounded-md bg-slate-50">
            <h3 className="text-md font-semibold text-slate-600 mb-2">Using Market Cap & Total Revenue:</h3>
            <div>
              <Label htmlFor="marketCapPS">Market Capitalization</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="marketCapPS" type="number" value={marketCap} onChange={(e) => setMarketCap(e.target.value)} placeholder="e.g., 20,000,000" className="pl-10"/>
              </div>
            </div>
            <div>
              <Label htmlFor="totalRevenueMarketCapPS">Total Revenue (TTM)</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="totalRevenueMarketCapPS" type="number" value={totalRevenueForMarketCap} onChange={(e) => setTotalRevenueForMarketCap(e.target.value)} placeholder="e.g., 5,000,000" className="pl-10"/>
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={handleCalculate} className="w-full">Calculate P/S Ratio</Button>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {psRatio !== null && (
          <Alert variant="default" className={`mt-4 ${psRatio.includes("Undefined") ? 'border-orange-500' : (parseFloat(psRatio) < 1 ? 'border-green-500' : (parseFloat(psRatio) <=4 ? 'border-yellow-500' : 'border-red-500'))} border-2`}>
            <BarChartHorizontal className="h-4 w-4" />
            <AlertTitle className="text-base font-bold">Price-to-Sales (P/S) Ratio</AlertTitle>
            <AlertDescription className="font-semibold text-xl">{psRatio}</AlertDescription>
            <p className="text-xs text-slate-500 mt-1">(P/S varies significantly by industry. Lower may suggest undervaluation, higher may suggest overvaluation or high growth expectations.)</p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

const ICON_STYLES = "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"; 