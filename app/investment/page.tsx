import Link from 'next/link';
import ROICalculator from '@/components/investment/ROICalculator'; // Import the new calculator
import CAGRCalculator from '@/components/investment/CAGRCalculator'; // Import the new calculator
import AnnualizedReturnCalculator from '@/components/investment/AnnualizedReturnCalculator'; // Ensure this import is present
import AbsoluteReturnCalculator from '@/components/investment/AbsoluteReturnCalculator'; // Import the new calculator
import TotalReturnCalculator from '@/components/investment/TotalReturnCalculator'; // Import the new calculator
import HPRCalculator from '@/components/investment/HPRCalculator'; // Import the new calculator
import PBRatioCalculator from '@/components/investment/PBRatioCalculator'; // Import the new calculator
import PSRatioCalculator from '@/components/investment/PSRatioCalculator'; // Import the new calculator
import EVCalculator from '@/components/investment/EVCalculator'; // Import the new calculator
import EVEBITDACalculator from '@/components/investment/EVEBITDACalculator'; // Ensure this import is present
import PEGRatioCalculator from '@/components/investment/PEGRatioCalculator'; // Import the new calculator
import VaRCalculator from '@/components/investment/VaRCalculator'; // ADD THIS LINE
import MaxDrawdownCalculator from '@/components/investment/MaxDrawdownCalculator'; // ADD THIS LINE
import CAPMCalculator from '@/components/investment/CAPMCalculator'; // ADD THIS LINE
import MarginOfSafetyCalculator from '@/components/investment/MarginOfSafetyCalculator'; // ADD THIS LINE
import { DollarSign } from "lucide-react"

// Updated list - we will gradually replace placeholders with actual components
const investmentCalculatorsList = [
  { name: "Return on Investment (ROI)", componentName: "ROICalculator", component: ROICalculator },
  { name: "Compound Annual Growth Rate (CAGR)", componentName: "CAGRCalculator", component: CAGRCalculator },
  { name: "Annualized Return", componentName: "AnnualizedReturnCalculator", component: AnnualizedReturnCalculator }, // Ensure this line is correctly updated
  { name: "Absolute Return", componentName: "AbsoluteReturnCalculator", component: AbsoluteReturnCalculator },
  { name: "Total Return", componentName: "TotalReturnCalculator", component: TotalReturnCalculator },
  { name: "Holding Period Return (HPR)", componentName: "HPRCalculator", component: HPRCalculator },
  { name: "Price-to-Book (P/B) Ratio", componentName: "PBRatioCalculator", component: PBRatioCalculator },
  { name: "Price-to-Sales (P/S) Ratio", componentName: "PSRatioCalculator", component: PSRatioCalculator },
  { name: "Enterprise Value (EV)", componentName: "EVCalculator", component: EVCalculator },
  { name: "EV/EBITDA", componentName: "EVEBITDACalculator", component: EVEBITDACalculator }, // Ensure this line is correctly updated
  { name: "PEG Ratio", componentName: "PEGRatioCalculator", component: PEGRatioCalculator },
  { name: "Value at Risk (VaR)", componentName: "VaRCalculator", component: VaRCalculator },
  { name: "Maximum Drawdown", componentName: "MaxDrawdownCalculator", component: MaxDrawdownCalculator },
  { name: "Capital Asset Pricing Model (CAPM)", componentName: "CAPMCalculator", component: CAPMCalculator },
  { name: "Margin of Safety", componentName: "MarginOfSafetyCalculator", component: MarginOfSafetyCalculator },
];

export default function InvestmentPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Investment Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Analyze investments with key financial metrics. Essential tools for
            investors and financial analysts.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {investmentCalculatorsList.map((calc) => {
            if (calc.component) {
              const CalcComponent = calc.component;
              return <CalcComponent key={calc.componentName} />;
            }
            return (
              <div key={calc.componentName} className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold text-slate-700 mb-3">{calc.name}</h2>
                <p className="text-sm text-slate-500 mb-4">
                  Full calculator component for {calc.name} will be implemented here.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 