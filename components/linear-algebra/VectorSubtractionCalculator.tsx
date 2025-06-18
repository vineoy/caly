'use client';

import React, { useState } from 'react';
import CalculatorCard from '@/components/data-science/CalculatorCard';
import { subtractVectors, Vector } from '@/lib/calculators/linearAlgebra';

const VectorSubtractionCalculator: React.FC = () => {
  const [vector1Str, setVector1Str] = useState<string>('');
  const [vector2Str, setVector2Str] = useState<string>('');
  const [result, setResult] = useState<Vector | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!vector1Str.trim() || !vector2Str.trim()) {
      setError('Please enter both vectors.');
      return;
    }
    const difference = subtractVectors(vector1Str, vector2Str);
    if (typeof difference === 'string') {
      setError(difference);
    } else {
      setResult(difference);
    }
  };

  return (
    <CalculatorCard
      title="Vector Subtraction"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="vec-sub-input-1" className="block text-sm font-medium text-gray-700 mb-1">
            Vector 1 (Minuend):
          </label>
          <input
            type="text"
            id="vec-sub-input-1"
            value={vector1Str}
            onChange={(e) => setVector1Str(e.target.value)}
            placeholder="e.g., 4, 5, 6"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="vec-sub-input-2" className="block text-sm font-medium text-gray-700 mb-1">
            Vector 2 (Subtrahend):
          </label>
          <input
            type="text"
            id="vec-sub-input-2"
            value={vector2Str}
            onChange={(e) => setVector2Str(e.target.value)}
            placeholder="e.g., 1, 2, 3"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default VectorSubtractionCalculator; 