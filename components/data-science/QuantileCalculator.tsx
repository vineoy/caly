'use client';

import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateQuantile } from '@/lib/calculators/dataScience';

const QuantileCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [quantileValue, setQuantileValue] = useState<string>('0.5'); // Default to median
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    const q = parseFloat(quantileValue);
    if (!inputValue.trim()) {
      setError('Please enter some numbers for the dataset.');
      return;
    }
    if (isNaN(q) || q < 0 || q > 1) {
      setError('Quantile value must be a number between 0 and 1 (e.g., 0.25, 0.5, 0.75).');
      return;
    }

    const quantileOutcome = calculateQuantile(inputValue, q);
    if (typeof quantileOutcome === 'string') {
      setError(quantileOutcome);
    } else {
      setResult(quantileOutcome);
    }
  };

  return (
    <CalculatorCard
      title="Quantiles / Percentiles"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="quantile-data-input" className="block text-sm font-medium text-gray-700 mb-1">
            Enter numbers (comma-separated):
          </label>
          <input
            type="text"
            id="quantile-data-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="quantile-value-input" className="block text-sm font-medium text-gray-700 mb-1">
            Quantile (0 to 1, e.g., 0.25 for Q1, 0.5 for median):
          </label>
          <input
            type="number"
            id="quantile-value-input"
            value={quantileValue}
            onChange={(e) => setQuantileValue(e.target.value)}
            placeholder="e.g., 0.25"
            step="0.01"
            min="0"
            max="1"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default QuantileCalculator; 