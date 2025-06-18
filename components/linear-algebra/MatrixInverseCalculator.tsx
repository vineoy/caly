'use client';

import React, { useState } from 'react';
import CalculatorCard from '@/components/data-science/CalculatorCard';
import { matrixInverse, Matrix } from '@/lib/calculators/linearAlgebra';
import { CalculatorResult } from '@/components/data-science/CalculatorCard';

const MatrixInverseCalculator: React.FC = () => {
  const [matrixStr, setMatrixStr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!matrixStr.trim()) {
      setError('Please enter a square matrix.');
      return;
    }
    const inverseVal = matrixInverse(matrixStr);
    if (typeof inverseVal === 'string') {
      setError(inverseVal);
    } else {
      setResult(inverseVal as Matrix);
    }
  };

  return (
    <CalculatorCard
      title="Matrix Inverse"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div>
        <label htmlFor="mat-inverse-input" className="block text-sm font-medium text-gray-700 mb-1">
          Square Matrix (rows by ';', elements by ','):
        </label>
        <textarea
          id="mat-inverse-input"
          value={matrixStr}
          onChange={(e) => setMatrixStr(e.target.value)}
          placeholder="e.g., 4,7;2,6 (for 2x2) or 1,2,3;0,1,4;5,6,0 (for 3x3)"
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <p className="mt-2 text-xs text-gray-500">
          Note: For matrices larger than 3x3, calculations can be intensive and might take a moment. Ensure the matrix is invertible (non-zero determinant).
        </p>
      </div>
    </CalculatorCard>
  );
};

export default MatrixInverseCalculator; 