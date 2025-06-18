'use client';

import React, { useState } from 'react';
import CalculatorCard from '@/components/data-science/CalculatorCard';
import { scalarMultiplyMatrix, Matrix } from '@/lib/calculators/linearAlgebra';
import { CalculatorResult } from '@/components/data-science/CalculatorCard';

const ScalarMultiplyMatrixCalculator: React.FC = () => {
  const [scalarStr, setScalarStr] = useState<string>('');
  const [matrixStr, setMatrixStr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!scalarStr.trim() || !matrixStr.trim()) {
      setError('Please enter both scalar and matrix.');
      return;
    }
    const product = scalarMultiplyMatrix(scalarStr, matrixStr);
    if (typeof product === 'string') {
      setError(product);
    } else {
      setResult(product as Matrix);
    }
  };

  return (
    <CalculatorCard
      title="Scalar Multiplication (Matrix)"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="scalar-mat-mult-input-scalar" className="block text-sm font-medium text-gray-700 mb-1">
            Scalar:
          </label>
          <input
            type="number"
            id="scalar-mat-mult-input-scalar"
            value={scalarStr}
            onChange={(e) => setScalarStr(e.target.value)}
            placeholder="e.g., 3"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="scalar-mat-mult-input-matrix" className="block text-sm font-medium text-gray-700 mb-1">
            Matrix (rows by ';', elements by ','):
          </label>
          <textarea
            id="scalar-mat-mult-input-matrix"
            value={matrixStr}
            onChange={(e) => setMatrixStr(e.target.value)}
            placeholder="e.g., 1,0;0,1"
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ScalarMultiplyMatrixCalculator; 