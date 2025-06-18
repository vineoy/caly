'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, ChevronsRight, XCircle } from 'lucide-react';
import * as math from 'mathjs';

const sigmoid = (z: number): number => 1 / (1 + Math.exp(-z));
const sigmoidDerivative = (sigmoid_z: number): number => sigmoid_z * (1 - sigmoid_z);

interface CalcStep {
  title: string;
  details: string | string[];
  result?: string;
  isError?: boolean;
}

export default function BackpropagationCalculator() {
  // Network parameters
  const [x1, setX1] = useState('0.05');
  const [x2, setX2] = useState('0.10');
  const [targetO1, setTargetO1] = useState('0.99');

  const [w_x1_h1, setW_x1_h1] = useState('0.15');
  const [w_x2_h1, setW_x2_h1] = useState('0.20');
  const [b_h1, setB_h1] = useState('0.35');

  const [w_x1_h2, setW_x1_h2] = useState('0.25');
  const [w_x2_h2, setW_x2_h2] = useState('0.30');
  const [b_h2, setB_h2] = useState('0.35');

  const [w_h1_o1, setW_h1_o1] = useState('0.40');
  const [w_h2_o1, setW_h2_o1] = useState('0.45');
  const [b_o1, setB_o1] = useState('0.60');

  const [steps, setSteps] = useState<CalcStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  const parseF = (val: string, fieldName: string): number => {
    const num = parseFloat(val);
    if (isNaN(num)) throw new Error(`Invalid number for ${fieldName}: ${val}`);
    return num;
  };

  const fmt = (val: number | math.MathNode, precision = 8) => math.format(val, { notation: 'fixed', precision });

  const handleCalculate = () => {
    setSteps([]);
    setError(null);
    const currentSteps: CalcStep[] = [];

    try {
      const val_x1 = parseF(x1, 'x1');
      const val_x2 = parseF(x2, 'x2');
      const val_target_o1 = parseF(targetO1, 'Target o1');

      const val_w_x1_h1 = parseF(w_x1_h1, 'w_x1_h1');
      const val_w_x2_h1 = parseF(w_x2_h1, 'w_x2_h1');
      const val_b_h1 = parseF(b_h1, 'b_h1');
      const val_w_x1_h2 = parseF(w_x1_h2, 'w_x1_h2');
      const val_w_x2_h2 = parseF(w_x2_h2, 'w_x2_h2');
      const val_b_h2 = parseF(b_h2, 'b_h2');
      const val_w_h1_o1 = parseF(w_h1_o1, 'w_h1_o1');
      const val_w_h2_o1 = parseF(w_h2_o1, 'w_h2_o1');
      const val_b_o1 = parseF(b_o1, 'b_o1');

      currentSteps.push({ title: 'Inputs', details: [
        `x1 = ${val_x1}`, `x2 = ${val_x2}`, `Target Output (o1) = ${val_target_o1}`,
        `Initial Weights & Biases:`, 
        `  w_x1_h1=${val_w_x1_h1}, w_x2_h1=${val_w_x2_h1}, b_h1=${val_b_h1}`,
        `  w_x1_h2=${val_w_x1_h2}, w_x2_h2=${val_w_x2_h2}, b_h2=${val_b_h2}`,
        `  w_h1_o1=${val_w_h1_o1}, w_h2_o1=${val_w_h2_o1}, b_o1=${val_b_o1}`
      ]});

      // --- Forward Pass ---
      currentSteps.push({ title: 'Forward Pass', details: 'Calculating activations...' });

      const net_h1 = val_w_x1_h1 * val_x1 + val_w_x2_h1 * val_x2 + val_b_h1;
      const act_h1 = sigmoid(net_h1);
      currentSteps.push({ title: 'Hidden Neuron h1', details: [
        `Net Input (net_h1) = w_x1_h1*x1 + w_x2_h1*x2 + b_h1 = ${fmt(val_w_x1_h1)}*${val_x1} + ${fmt(val_w_x2_h1)}*${val_x2} + ${fmt(val_b_h1)} = ${fmt(net_h1)}`,
        `Activation (act_h1) = sigmoid(net_h1) = sigmoid(${fmt(net_h1)}) = ${fmt(act_h1)}`
      ]});

      const net_h2 = val_w_x1_h2 * val_x1 + val_w_x2_h2 * val_x2 + val_b_h2;
      const act_h2 = sigmoid(net_h2);
      currentSteps.push({ title: 'Hidden Neuron h2', details: [
        `Net Input (net_h2) = w_x1_h2*x1 + w_x2_h2*x2 + b_h2 = ${fmt(val_w_x1_h2)}*${val_x1} + ${fmt(val_w_x2_h2)}*${val_x2} + ${fmt(val_b_h2)} = ${fmt(net_h2)}`,
        `Activation (act_h2) = sigmoid(net_h2) = sigmoid(${fmt(net_h2)}) = ${fmt(act_h2)}`
      ]});

      const net_o1 = val_w_h1_o1 * act_h1 + val_w_h2_o1 * act_h2 + val_b_o1;
      const act_o1 = sigmoid(net_o1);
      currentSteps.push({ title: 'Output Neuron o1', details: [
        `Net Input (net_o1) = w_h1_o1*act_h1 + w_h2_o1*act_h2 + b_o1 = ${fmt(val_w_h1_o1)}*${fmt(act_h1)} + ${fmt(val_w_h2_o1)}*${fmt(act_h2)} + ${fmt(val_b_o1)} = ${fmt(net_o1)}`,
        `Activation (act_o1) = sigmoid(net_o1) = sigmoid(${fmt(net_o1)}) = ${fmt(act_o1)}`
      ]});

      const error_o1 = 0.5 * Math.pow(val_target_o1 - act_o1, 2);
      currentSteps.push({ title: 'Error Calculation', details: `Loss (E_o1) = 0.5 * (target_o1 - act_o1)^2 = 0.5 * (${val_target_o1} - ${fmt(act_o1)})^2 = ${fmt(error_o1)}` });

      // --- Backward Pass ---
      currentSteps.push({ title: 'Backward Pass', details: 'Calculating gradients...' });

      // Output Layer Gradients
      const dEdAct_o1 = -(val_target_o1 - act_o1); // d(0.5*(t-a)^2)/da = -(t-a)
      const dActdNet_o1 = sigmoidDerivative(act_o1);
      const delta_o1 = dEdAct_o1 * dActdNet_o1;
      currentSteps.push({ title: 'Output Layer Gradients (o1)', details: [
        `∂E/∂act_o1 = -(target_o1 - act_o1) = -(${val_target_o1} - ${fmt(act_o1)}) = ${fmt(dEdAct_o1)}`,
        `∂act_o1/∂net_o1 = act_o1 * (1 - act_o1) = ${fmt(act_o1)} * (1 - ${fmt(act_o1)}) = ${fmt(dActdNet_o1)}`,
        `δ_o1 = (∂E/∂act_o1) * (∂act_o1/∂net_o1) = ${fmt(dEdAct_o1)} * ${fmt(dActdNet_o1)} = ${fmt(delta_o1)}`
      ]});

      const dEdW_h1_o1 = delta_o1 * act_h1;
      const dEdW_h2_o1 = delta_o1 * act_h2;
      const dEdB_o1 = delta_o1; // *1 for bias input
      currentSteps.push({ title: 'Gradients for Output Weights & Bias', details: [
        `∂E/∂w_h1_o1 = δ_o1 * act_h1 = ${fmt(delta_o1)} * ${fmt(act_h1)} = ${fmt(dEdW_h1_o1)}`,
        `∂E/∂w_h2_o1 = δ_o1 * act_h2 = ${fmt(delta_o1)} * ${fmt(act_h2)} = ${fmt(dEdW_h2_o1)}`,
        `∂E/∂b_o1 = δ_o1 = ${fmt(dEdB_o1)}`
      ]});

      // Hidden Layer Gradients (h1)
      const dEdAct_h1 = delta_o1 * val_w_h1_o1;
      const dActdNet_h1 = sigmoidDerivative(act_h1);
      const delta_h1 = dEdAct_h1 * dActdNet_h1;
      currentSteps.push({ title: 'Hidden Layer Gradients (h1)', details: [
        `∂E/∂act_h1 = δ_o1 * w_h1_o1 = ${fmt(delta_o1)} * ${fmt(val_w_h1_o1)} = ${fmt(dEdAct_h1)}`,
        `∂act_h1/∂net_h1 = act_h1 * (1 - act_h1) = ${fmt(act_h1)} * (1 - ${fmt(act_h1)}) = ${fmt(dActdNet_h1)}`,
        `δ_h1 = (∂E/∂act_h1) * (∂act_h1/∂net_h1) = ${fmt(dEdAct_h1)} * ${fmt(dActdNet_h1)} = ${fmt(delta_h1)}`
      ]});

      const dEdW_x1_h1 = delta_h1 * val_x1;
      const dEdW_x2_h1 = delta_h1 * val_x2;
      const dEdB_h1 = delta_h1;
      currentSteps.push({ title: 'Gradients for Hidden Weights & Bias (h1)', details: [
        `∂E/∂w_x1_h1 = δ_h1 * x1 = ${fmt(delta_h1)} * ${val_x1} = ${fmt(dEdW_x1_h1)}`,
        `∂E/∂w_x2_h1 = δ_h1 * x2 = ${fmt(delta_h1)} * ${val_x2} = ${fmt(dEdW_x2_h1)}`,
        `∂E/∂b_h1 = δ_h1 = ${fmt(dEdB_h1)}`
      ]});

      // Hidden Layer Gradients (h2)
      const dEdAct_h2 = delta_o1 * val_w_h2_o1;
      const dActdNet_h2 = sigmoidDerivative(act_h2);
      const delta_h2 = dEdAct_h2 * dActdNet_h2;
      currentSteps.push({ title: 'Hidden Layer Gradients (h2)', details: [
        `∂E/∂act_h2 = δ_o1 * w_h2_o1 = ${fmt(delta_o1)} * ${fmt(val_w_h2_o1)} = ${fmt(dEdAct_h2)}`,
        `∂act_h2/∂net_h2 = act_h2 * (1 - act_h2) = ${fmt(act_h2)} * (1 - ${fmt(act_h2)}) = ${fmt(dActdNet_h2)}`,
        `δ_h2 = (∂E/∂act_h2) * (∂act_h2/∂net_h2) = ${fmt(dEdAct_h2)} * ${fmt(dActdNet_h2)} = ${fmt(delta_h2)}`
      ]});

      const dEdW_x1_h2 = delta_h2 * val_x1;
      const dEdW_x2_h2 = delta_h2 * val_x2;
      const dEdB_h2 = delta_h2;
      currentSteps.push({ title: 'Gradients for Hidden Weights & Bias (h2)', details: [
        `∂E/∂w_x1_h2 = δ_h2 * x1 = ${fmt(delta_h2)} * ${val_x1} = ${fmt(dEdW_x1_h2)}`,
        `∂E/∂w_x2_h2 = δ_h2 * x2 = ${fmt(delta_h2)} * ${val_x2} = ${fmt(dEdW_x2_h2)}`,
        `∂E/∂b_h2 = δ_h2 = ${fmt(dEdB_h2)}`
      ]});
      
      setSteps(currentSteps);

    } catch (e: any) {
      console.error(e);
      setError(`Calculation Error: ${e.message}`);
      currentSteps.push({title: "Error", details: e.message, isError: true});
      setSteps(currentSteps);
    }
  };

  const inputGroupClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 items-center mb-2 border p-2 rounded-md";
  const inputClass = "w-full";

  return (
    <Card className="w-full max-w-3xl"> {/* Wider card for more inputs */}
      <CardHeader>
        <CardTitle>Backpropagation Calculator (1 Epoch)</CardTitle>
        <CardDescription>
          Demonstrates forward and backward pass for a 2-input, 2-hidden-neuron, 1-output-neuron network using sigmoid activation and MSE loss.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Inputs:</h3>
          <div className={inputGroupClass}>
            <div><Label htmlFor="x1">Input x1:</Label><Input id="x1" value={x1} onChange={e => setX1(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="x2">Input x2:</Label><Input id="x2" value={x2} onChange={e => setX2(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="targetO1">Target Output (y_target):</Label><Input id="targetO1" value={targetO1} onChange={e => setTargetO1(e.target.value)} className={inputClass} /></div>
          </div>

          <h3 className="text-lg font-semibold">Weights & Biases:</h3>
          <div className="text-sm text-muted-foreground mb-1">Hidden Neuron h1:</div>
          <div className={inputGroupClass}>
            <div><Label htmlFor="w_x1_h1">w_x1_h1 (x1 to h1):</Label><Input id="w_x1_h1" value={w_x1_h1} onChange={e => setW_x1_h1(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="w_x2_h1">w_x2_h1 (x2 to h1):</Label><Input id="w_x2_h1" value={w_x2_h1} onChange={e => setW_x2_h1(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="b_h1">Bias b_h1:</Label><Input id="b_h1" value={b_h1} onChange={e => setB_h1(e.target.value)} className={inputClass} /></div>
          </div>
          <div className="text-sm text-muted-foreground mb-1">Hidden Neuron h2:</div>
          <div className={inputGroupClass}>
            <div><Label htmlFor="w_x1_h2">w_x1_h2 (x1 to h2):</Label><Input id="w_x1_h2" value={w_x1_h2} onChange={e => setW_x1_h2(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="w_x2_h2">w_x2_h2 (x2 to h2):</Label><Input id="w_x2_h2" value={w_x2_h2} onChange={e => setW_x2_h2(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="b_h2">Bias b_h2:</Label><Input id="b_h2" value={b_h2} onChange={e => setB_h2(e.target.value)} className={inputClass} /></div>
          </div>
          <div className="text-sm text-muted-foreground mb-1">Output Neuron o1:</div>
          <div className={inputGroupClass}>
            <div><Label htmlFor="w_h1_o1">w_h1_o1 (h1 to o1):</Label><Input id="w_h1_o1" value={w_h1_o1} onChange={e => setW_h1_o1(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="w_h2_o1">w_h2_o1 (h2 to o1):</Label><Input id="w_h2_o1" value={w_h2_o1} onChange={e => setW_h2_o1(e.target.value)} className={inputClass} /></div>
            <div><Label htmlFor="b_o1">Bias b_o1:</Label><Input id="b_o1" value={b_o1} onChange={e => setB_o1(e.target.value)} className={inputClass} /></div>
          </div>

          <Button onClick={handleCalculate} className="w-full mt-4">Run Backpropagation (1 Epoch)</Button>

          {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          
          {steps.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-xl font-semibold">Calculation Steps:</h3>
              {steps.map((step, index) => (
                <Alert key={index} variant={step.isError ? "destructive" : "default"} className="shadow-sm">
                  <div className="flex items-start">
                    {step.isError ? <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" /> : <ChevronsRight className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />}
                    <div className="flex-grow">
                      <AlertTitle>{step.title}</AlertTitle>
                      {Array.isArray(step.details) ? (
                        step.details.map((d, i) => <AlertDescription key={i} className="font-mono text-xs whitespace-pre-wrap break-words">{d}</AlertDescription>)
                      ) : (
                        <AlertDescription className="font-mono text-xs whitespace-pre-wrap break-words">{step.details}</AlertDescription>
                      )}
                      {step.result && <AlertDescription className="font-mono text-sm mt-1 font-semibold break-all">Result: {step.result}</AlertDescription>}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 