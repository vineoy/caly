'use client';

import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateStandardDeviation } from '@/lib/calculators/dataScience';

const StandardDeviationCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!inputValue.trim()) {
      setError('Please enter some numbers.');
      return;
    }
    const stdDevOutcome = calculateStandardDeviation(inputValue);
    if (typeof stdDevOutcome === 'string') {
      setError(stdDevOutcome); // String outcomes are error messages
    } else {
      setResult(stdDevOutcome); // Number outcome is the result
    }
  };

  return (
    <CalculatorCard
      title="Standard Deviation (Spread Around Mean)"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div>
        <label htmlFor="stddev-input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter numbers (comma-separated):
        </label>
        <input
          type="text"
          id="stddev-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., 1, 2, 3, 4, 5"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </CalculatorCard>
  );
};

export default StandardDeviationCalculator; 