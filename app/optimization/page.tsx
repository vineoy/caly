import Link from 'next/link';
import GradientCalculator from '@/components/optimization/GradientCalculator';
import PartialDerivativesCalculator from '@/components/optimization/PartialDerivativesCalculator';
import HessianMatrixCalculator from '@/components/optimization/HessianMatrixCalculator';
import JacobianMatrixCalculator from '@/components/optimization/JacobianMatrixCalculator';
import GradientDescentUpdateCalculator from '@/components/optimization/GradientDescentUpdateCalculator';
import ChainRuleCalculator from '@/components/optimization/ChainRuleCalculator';
import LagrangeMultiplierCalculator from '@/components/optimization/LagrangeMultiplierCalculator';
import BackpropagationCalculator from '@/components/optimization/BackpropagationCalculator';
import { Settings } from "lucide-react"

// Updated list - all components are now included
const optimizationCalculators = [
  { name: "Gradient (vector of partial derivatives)", componentName: "GradientCalculator", component: GradientCalculator },
  { name: "Partial Derivatives", componentName: "PartialDerivativesCalculator", component: PartialDerivativesCalculator },
  { name: "Hessian Matrix", componentName: "HessianMatrixCalculator", component: HessianMatrixCalculator },
  { name: "Jacobian Matrix", componentName: "JacobianMatrixCalculator", component: JacobianMatrixCalculator },
  { name: "Gradient Descent Update", componentName: "GradientDescentUpdateCalculator", component: GradientDescentUpdateCalculator },
  { name: "Chain Rule", componentName: "ChainRuleCalculator", component: ChainRuleCalculator },
  { name: "Lagrange Multiplier", componentName: "LagrangeMultiplierCalculator", component: LagrangeMultiplierCalculator },
  { name: "Backpropagation", componentName: "BackpropagationCalculator", component: BackpropagationCalculator },
];

export default function OptimizationPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Optimization Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tools for calculus and optimization, essential for machine
            learning and deep learning.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {optimizationCalculators.map(calc => {
            const CalcComponent = calc.component
            return <CalcComponent key={calc.componentName} />
          })}
        </div>
      </div>
    </div>
  );
} 