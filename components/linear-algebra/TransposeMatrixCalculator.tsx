'use client';

import React, { useState } from 'react';
import CalculatorCard from '@/components/data-science/CalculatorCard';
import { transposeMatrix, Matrix } from '@/lib/calculators/linearAlgebra';
import { CalculatorResult } from '@/components/data-science/CalculatorCard';

const TransposeMatrixCalculator: React.FC = () => {
  const [matrixStr, setMatrixStr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!matrixStr.trim()) {
      setError('Please enter a matrix.');
      return;
    }
    const transposed = transposeMatrix(matrixStr);
    if (typeof transposed === 'string') {
      setError(transposed);
    } else {
      setResult(transposed as Matrix);
    }
  };

  return (
    <CalculatorCard
      title="Matrix Transpose"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div>
        <label htmlFor="mat-transpose-input" className="block text-sm font-medium text-gray-700 mb-1">
          Matrix (rows by ';', elements by ','):
        </label>
        <textarea
          id="mat-transpose-input"
          value={matrixStr}
          onChange={(e) => setMatrixStr(e.target.value)}
          placeholder="e.g., 1,2,3;4,5,6"
          rows={3}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </CalculatorCard>
  );
};

export default TransposeMatrixCalculator; 