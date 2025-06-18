'use client';

import React, { useState } from 'react';
import CalculatorCard from '@/components/data-science/CalculatorCard';
import { matrixDeterminant } from '@/lib/calculators/linearAlgebra';
import { CalculatorResult } from '@/components/data-science/CalculatorCard';

const DeterminantCalculator: React.FC = () => {
  const [matrixStr, setMatrixStr] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult>(null); // Determinant is a number
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!matrixStr.trim()) {
      setError('Please enter a square matrix.');
      return;
    }
    const determinantVal = matrixDeterminant(matrixStr);
    if (typeof determinantVal === 'string') {
      setError(determinantVal);
    } else {
      setResult(determinantVal);
    }
  };

  return (
    <CalculatorCard
      title="Matrix Determinant"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div>
        <label htmlFor="mat-determinant-input" className="block text-sm font-medium text-gray-700 mb-1">
          Square Matrix (rows by ';', elements by ','):
        </label>
        <textarea
          id="mat-determinant-input"
          value={matrixStr}
          onChange={(e) => setMatrixStr(e.target.value)}
          placeholder="e.g., 1,2;3,4 or 6,1,1;4,-2,5;2,8,7"
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </CalculatorCard>
  );
};

export default DeterminantCalculator; 