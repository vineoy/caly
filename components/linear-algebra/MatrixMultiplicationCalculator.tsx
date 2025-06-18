'use client';

import React, { useState } from 'react';
import CalculatorCard from '@/components/data-science/CalculatorCard';
import { multiplyMatrices, Matrix } from '@/lib/calculators/linearAlgebra';
import { CalculatorResult } from '@/components/data-science/CalculatorCard';

const MatrixMultiplicationCalculator: React.FC = () => {
  const [matrix1Str, setMatrix1Str] = useState<string>('');
  const [matrix2Str, setMatrix2Str] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!matrix1Str.trim() || !matrix2Str.trim()) {
      setError('Please enter both matrices.');
      return;
    }
    const product = multiplyMatrices(matrix1Str, matrix2Str);
    if (typeof product === 'string') {
      setError(product);
    } else {
      setResult(product as Matrix);
    }
  };

  return (
    <CalculatorCard
      title="Matrix Multiplication"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="mat-mult-input-1" className="block text-sm font-medium text-gray-700 mb-1">
            Matrix 1 (rows by ';', elements by ','):
          </label>
          <textarea
            id="mat-mult-input-1"
            value={matrix1Str}
            onChange={(e) => setMatrix1Str(e.target.value)}
            placeholder="e.g., 1,2;3,4"
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="mat-mult-input-2" className="block text-sm font-medium text-gray-700 mb-1">
            Matrix 2 (rows by ';', elements by ','):
          </label>
          <textarea
            id="mat-mult-input-2"
            value={matrix2Str}
            onChange={(e) => setMatrix2Str(e.target.value)}
            placeholder="e.g., 5,6;7,8"
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default MatrixMultiplicationCalculator; 