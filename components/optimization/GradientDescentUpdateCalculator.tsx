'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from 'lucide-react';
import * as math from 'mathjs'; // For potential precision formatting if needed, though direct math is simple here

const GradientDescentUpdateCalculator = () => {
  const [currentParam, setCurrentParam] = useState('5');
  const [gradient, setGradient] = useState('2');
  const [learningRate, setLearningRate] = useState('0.1');
  const [newParam, setNewParam] = useState<string | null>(null);

  const calculateUpdate = () => {
    const theta_current = parseFloat(currentParam);
    const grad = parseFloat(gradient);
    const lr = parseFloat(learningRate);
    
    const theta_new = theta_current - lr * grad;
    setNewParam(theta_new.toFixed(4));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Gradient Descent Update Rule</CardTitle>
        <CardDescription>Calculates one step of gradient descent: θ_new = θ_current - α * ∇J(θ_current)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-param">Current Parameter (θ_current)</Label>
            <Input id="current-param" value={currentParam} onChange={(e) => setCurrentParam(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="gradient">Gradient (∇J(θ_current))</Label>
            <Input id="gradient" value={gradient} onChange={(e) => setGradient(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="lr">Learning Rate (α)</Label>
            <Input id="lr" value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
          </div>
          <Button onClick={calculateUpdate} className="w-full">Calculate New Parameter</Button>

          {newParam && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>New Parameter (θ_new):</AlertTitle>
              <AlertDescription className="font-bold text-lg">{newParam}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradientDescentUpdateCalculator; 