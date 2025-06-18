'use client';

import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateMedian } from '@/lib/calculators/dataScience';

const MedianCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!inputValue.trim()) {
      setError('Please enter some numbers.');
      return;
    }
    const median = calculateMedian(inputValue);
    if (typeof median === 'string' && isNaN(parseFloat(median))) { // Check if it's an error string
      setError(median);
    } else {
      setResult(median);
    }
  };

  return (
    <CalculatorCard
      title="Median (Middle Value)"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div>
        <label htmlFor="median-input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter numbers (comma-separated):
        </label>
        <input
          type="text"
          id="median-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., 1, 2, 3, 4, 5"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </CalculatorCard>
  );
};

export default MedianCalculator; 