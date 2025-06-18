'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, PlusCircle, XCircle } from 'lucide-react';
import * as math from 'mathjs';

interface InnerFunction {
  id: string;
  name: string; // e.g., y1
  definition: string; // e.g., x1^2 + x2
}

export default function ChainRuleCalculator() {
  const [outerFuncStr, setOuterFuncStr] = useState(''); // z = f(y1, y2, ...)
  const [outerIntermediateVarsStr, setOuterIntermediateVarsStr] = useState(''); // y1, y2, ... (used in outer function)
  const [innerFunctions, setInnerFunctions] = useState<InnerFunction[]>([{ id: Date.now().toString(), name: 'y1', definition: '' }]);
  const [independentVarsStr, setIndependentVarsStr] = useState(''); // x1, x2, ... (used in inner functions)
  const [targetIndependentVar, setTargetIndependentVar] = useState(''); // xj to find ∂z/∂xj
  const [pointsStr, setPointsStr] = useState(''); // Evaluation points for x1, x2, ...

  const [result, setResult] = useState<string | null>(null);
  const [evaluatedResult, setEvaluatedResult] = useState<string | null>(null);
  const [intermediateSteps, setIntermediateSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [availableOuterVars, setAvailableOuterVars] = useState<string[]>([]);
  const [availableIndependentVars, setAvailableIndependentVars] = useState<string[]>([]);

  useEffect(() => {
    setAvailableOuterVars(outerIntermediateVarsStr.split(',').map(v => v.trim()).filter(v => v));
  }, [outerIntermediateVarsStr]);

  useEffect(() => {
    const indVars = independentVarsStr.split(',').map(v => v.trim()).filter(v => v);
    setAvailableIndependentVars(indVars);
    if (indVars.length > 0 && !indVars.includes(targetIndependentVar)) {
      setTargetIndependentVar(indVars[0]);
    }
  }, [independentVarsStr, targetIndependentVar]);
  
  const addInnerFunction = () => {
    const nextYIndex = innerFunctions.length + 1;
    setInnerFunctions([...innerFunctions, { id: Date.now().toString(), name: `y${nextYIndex}`, definition: '' }]);
  };

  const removeInnerFunction = (id: string) => {
    setInnerFunctions(innerFunctions.filter(f => f.id !== id));
  };

  const handleInnerFunctionChange = (id: string, field: keyof InnerFunction, value: string) => {
    setInnerFunctions(innerFunctions.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setEvaluatedResult(null);
    setIntermediateSteps([]);

    if (!outerFuncStr.trim() || !outerIntermediateVarsStr.trim() || innerFunctions.some(f => !f.definition.trim() || !f.name.trim()) || !independentVarsStr.trim() || !targetIndependentVar.trim()) {
      setError("All function definitions, variable names, and target independent variable must be provided.");
      return;
    }

    try {
      const outerVars = outerIntermediateVarsStr.split(',').map(v => v.trim()).filter(v => v);
      const indepVars = independentVarsStr.split(',').map(v => v.trim()).filter(v => v);

      if (outerVars.length !== innerFunctions.length || !outerVars.every(ov => innerFunctions.find(inf => inf.name === ov))){
        setError("Mismatch between 'Outer Function Intermediate Variables' and defined 'Inner Functions'. Ensure names and counts match.");
        return;
      }

      const parsedOuterFunc = math.parse(outerFuncStr);
      const parsedInnerFuncs: { [key: string]: math.MathNode } = {};
      innerFunctions.forEach(inf => {
        parsedInnerFuncs[inf.name] = math.parse(inf.definition);
      });

      let totalDerivativeNode: math.MathNode | null = null;
      const currentIntermediateSteps: string[] = [];

      for (const y_i_name of outerVars) { // y_i is an intermediate variable name, e.g., y1
        const parsed_y_i_name = math.parse(y_i_name);
        const d_outer_d_yi = math.derivative(parsedOuterFunc, parsed_y_i_name);
        currentIntermediateSteps.push(`∂z/∂${y_i_name} = ${d_outer_d_yi.toString()}`);
        
        const innerFuncNode = parsedInnerFuncs[y_i_name];
        const d_yi_d_target_x = math.derivative(innerFuncNode, math.parse(targetIndependentVar));
        currentIntermediateSteps.push(`∂${y_i_name}/∂${targetIndependentVar} = ${d_yi_d_target_x.toString()}`);

        const termProduct = math.parse(`(${d_outer_d_yi.toString()}) * (${d_yi_d_target_x.toString()})`);
        
        if (totalDerivativeNode === null) {
          totalDerivativeNode = termProduct;
        } else {
          totalDerivativeNode = math.parse(`(${totalDerivativeNode.toString()}) + (${termProduct.toString()})`);
        }
      }
      
      if(totalDerivativeNode === null){
        setError("Could not compute the derivative. Ensure all inputs are correct.");
        return;
      }
      
      const simplifiedTotalDerivative = math.simplify(totalDerivativeNode);
      setResult(`∂z/∂${targetIndependentVar} = ${simplifiedTotalDerivative.toString()}`);
      setIntermediateSteps(currentIntermediateSteps);

      if (pointsStr.trim()) {
        const evalPointsArray = pointsStr.split(',').map(p => parseFloat(p.trim()));
        if (evalPointsArray.some(isNaN) || evalPointsArray.length !== indepVars.length) {
          setError("Invalid evaluation points or mismatch with number of independent variables.");
          return;
        }
        const scope: { [key: string]: number } = {};
        indepVars.forEach((xVar, idx) => scope[xVar] = evalPointsArray[idx]);
        
        // To evaluate, we need to substitute inner functions into the outer function first, then differentiate, 
        // OR substitute values into each component of the simplified symbolic derivative.
        // The latter is easier with the current structure.
        // Note: Direct evaluation of the `simplifiedTotalDerivative` might be tricky if it contains intermediate vars `y_i`.
        // A more robust evaluation would re-derive the full expression in terms of `x_j` or evaluate each part and sum.
        
        // For now, attempt direct evaluation of the simplified symbolic result, assuming mathjs can handle it with scope.
        // This may require ensuring y_i are not in the simplified expression or providing their evaluated values in scope too.
        // For robust evaluation, we need to ensure the simplified expression only contains independent vars.
        // This simplified path might not always work if y_i terms remain.

        // Re-evaluating components for numerical result:
        let numericalSum = 0;
        const numericalScopeForInner: {[key: string]: number} = {...scope};

        for (const y_i_name of outerVars) {
            const innerFuncNode = parsedInnerFuncs[y_i_name];
            const val_y_i = innerFuncNode.evaluate(scope); // Evaluate y_i(x1, x2, ...)
            numericalScopeForInner[y_i_name] = val_y_i; // Add to scope for evaluating ∂z/∂y_i
        }

        for (const y_i_name of outerVars) {
            const d_outer_d_yi_node = math.derivative(parsedOuterFunc, math.parse(y_i_name));
            const val_d_outer_d_yi = d_outer_d_yi_node.evaluate(numericalScopeForInner);

            const innerFuncNode = parsedInnerFuncs[y_i_name];
            const d_yi_d_target_x_node = math.derivative(innerFuncNode, math.parse(targetIndependentVar));
            const val_d_yi_d_target_x = d_yi_d_target_x_node.evaluate(scope);

            numericalSum += val_d_outer_d_yi * val_d_yi_d_target_x;
        }
        setEvaluatedResult(`∂z/∂${targetIndependentVar} (at ${indepVars.join(',')}=${evalPointsArray.join(',')}) = ${math.format(numericalSum, {precision: 5})}`);
      }

    } catch (e: any) {
      console.error(e);
      setError(`Error: ${e.message || 'Failed to calculate using chain rule.'}`);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Chain Rule Calculator</CardTitle>
        <CardDescription>
          Calculate ∂z/∂x for z = f(y₁, y₂, ...), where each yᵢ = gᵢ(x₁, x₂, ...).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="outerFuncCRC">Outer function z = f(y₁, y₂, ...)</Label>
          <Input id="outerFuncCRC" value={outerFuncStr} onChange={e => setOuterFuncStr(e.target.value)} placeholder="e.g., y1^2 + y2" />
        </div>
        <div>
          <Label htmlFor="outerIntermediateVarsCRC">Intermediate Variables in Outer Function (comma-separated, e.g., y1, y2)</Label>
          <Input id="outerIntermediateVarsCRC" value={outerIntermediateVarsStr} onChange={e => setOuterIntermediateVarsStr(e.target.value)} placeholder="e.g., y1, y2" />
        </div>

        <Label>Inner Functions yᵢ = gᵢ(x₁, x₂, ...)</Label>
        {innerFunctions.map((func, index) => (
          <div key={func.id} className="space-y-2 p-3 border rounded-md">
            <div className="flex items-center space-x-2">
                <Input 
                    value={func.name} 
                    onChange={e => handleInnerFunctionChange(func.id, 'name', e.target.value)} 
                    placeholder={`e.g., y${index + 1}`}
                    className="w-1/4"
                />
                <span className="text-lg">=</span>
                <Input 
                    value={func.definition} 
                    onChange={e => handleInnerFunctionChange(func.id, 'definition', e.target.value)} 
                    placeholder={`e.g., x1*sin(x2)`} 
                    className="flex-grow"
                />
                {innerFunctions.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeInnerFunction(func.id)}><XCircle className="h-5 w-5 text-red-500"/></Button>}
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addInnerFunction} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Inner Function (yᵢ)
        </Button>

        <div>
          <Label htmlFor="independentVarsCRC">Independent Variables (x₁, x₂, ... in inner functions, comma-separated)</Label>
          <Input id="independentVarsCRC" value={independentVarsStr} onChange={e => setIndependentVarsStr(e.target.value)} placeholder="e.g., x1, x2" />
        </div>
        <div>
          <Label htmlFor="targetIndependentVarCRC">Target Independent Variable (for ∂z/∂x)</Label>
          <Select onValueChange={setTargetIndependentVar} value={targetIndependentVar} disabled={availableIndependentVars.length === 0}>
            <SelectTrigger id="targetIndependentVarCRC"><SelectValue placeholder="Select x variable" /></SelectTrigger>
            <SelectContent>{availableIndependentVars.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="pointsStrCRC">Evaluation Points for Independent Variables (optional, comma-separated)</Label>
          <Input id="pointsStrCRC" value={pointsStr} onChange={e => setPointsStr(e.target.value)} placeholder="Order matches independent vars list" />
        </div>

        <Button onClick={handleCalculate} className="w-full">Calculate ∂z/∂x</Button>

        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        {result && <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>Symbolic Result</AlertTitle><AlertDescription className="font-mono text-sm break-all">{result}</AlertDescription></Alert>}
        {evaluatedResult && <Alert><Lightbulb className="h-4 w-4" /><AlertTitle>Evaluated Result</AlertTitle><AlertDescription className="font-mono text-sm break-all">{evaluatedResult}</AlertDescription></Alert>}
        {intermediateSteps.length > 0 && (
          <Alert variant="default">
            <AlertTitle>Intermediate Symbolic Derivatives:</AlertTitle>
            <AlertDescription className="font-mono text-xs whitespace-pre-wrap break-all">
              {intermediateSteps.join('\n')}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 