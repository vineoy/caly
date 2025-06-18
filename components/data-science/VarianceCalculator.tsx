'use client';

import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateVariance } from '@/lib/calculators/dataScience';

const VarianceCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null); // Result is a number or null
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!inputValue.trim()) {
      setError('Please enter some numbers.');
      return;
    }
    const varianceOutcome = calculateVariance(inputValue);
    if (typeof varianceOutcome === 'string') {
      setError(varianceOutcome); // String outcomes are error messages
    } else {
      setResult(varianceOutcome); // Number outcome is the result
    }
  };

  return (
    <CalculatorCard
      title="Variance (Measure of Spread)"
      result={result} // Pass number or null
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div>
        <label htmlFor="variance-input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter numbers (comma-separated):
        </label>
        <input
          type="text"
          id="variance-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., 1, 2, 3, 4, 5"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </CalculatorCard>
  );
};

export default VarianceCalculator; 