'use client';

import React, { useState } from 'react';
import CalculatorCard from '@/components/data-science/CalculatorCard';
import { scalarMultiplyVector, Vector } from '@/lib/calculators/linearAlgebra';

const ScalarMultiplyVectorCalculator: React.FC = () => {
  const [scalarStr, setScalarStr] = useState<string>('');
  const [vectorStr, setVectorStr] = useState<string>('');
  const [result, setResult] = useState<Vector | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!scalarStr.trim() || !vectorStr.trim()) {
      setError('Please enter both scalar and vector.');
      return;
    }
    const product = scalarMultiplyVector(scalarStr, vectorStr);
    if (typeof product === 'string') {
      setError(product);
    } else {
      setResult(product);
    }
  };

  return (
    <CalculatorCard
      title="Scalar Multiplication (Vector)"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="scalar-mult-input-scalar" className="block text-sm font-medium text-gray-700 mb-1">
            Scalar:
          </label>
          <input
            type="number"
            id="scalar-mult-input-scalar"
            value={scalarStr}
            onChange={(e) => setScalarStr(e.target.value)}
            placeholder="e.g., 3"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="scalar-mult-input-vector" className="block text-sm font-medium text-gray-700 mb-1">
            Vector (comma-separated):
          </label>
          <input
            type="text"
            id="scalar-mult-input-vector"
            value={vectorStr}
            onChange={(e) => setVectorStr(e.target.value)}
            placeholder="e.g., 1, 2, -3"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ScalarMultiplyVectorCalculator; 