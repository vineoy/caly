'use client';

import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateCovariance } from '@/lib/calculators/dataScience';

const CovarianceCalculator: React.FC = () => {
  const [inputValue1, setInputValue1] = useState<string>('');
  const [inputValue2, setInputValue2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!inputValue1.trim() || !inputValue2.trim()) {
      setError('Please enter numbers for both datasets.');
      return;
    }
    const covarianceOutcome = calculateCovariance(inputValue1, inputValue2);
    if (typeof covarianceOutcome === 'string') {
      setError(covarianceOutcome);
    } else {
      setResult(covarianceOutcome);
    }
  };

  return (
    <CalculatorCard
      title="Covariance (Joint Variability)"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="covariance-input-1" className="block text-sm font-medium text-gray-700 mb-1">
            Dataset 1 (comma-separated):
          </label>
          <input
            type="text"
            id="covariance-input-1"
            value={inputValue1}
            onChange={(e) => setInputValue1(e.target.value)}
            placeholder="e.g., 1, 2, 3, 4, 5"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="covariance-input-2" className="block text-sm font-medium text-gray-700 mb-1">
            Dataset 2 (comma-separated):
          </label>
          <input
            type="text"
            id="covariance-input-2"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
            placeholder="e.g., 2, 3, 4, 5, 6"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default CovarianceCalculator; 