'use client';

import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateZScore } from '@/lib/calculators/dataScience';

const ZScoreCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [specificValue, setSpecificValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    if (!inputValue.trim()) {
      setError('Please enter some numbers for the dataset.');
      return;
    }
    if (!specificValue.trim()) {
      setError('Please enter the specific value for Z-score calculation.');
      return;
    }

    const zScoreOutcome = calculateZScore(inputValue, specificValue);
    if (typeof zScoreOutcome === 'string') {
      setError(zScoreOutcome);
    } else {
      setResult(zScoreOutcome);
    }
  };

  return (
    <CalculatorCard
      title="Z-Score (Standard Score)"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="zscore-data-input" className="block text-sm font-medium text-gray-700 mb-1">
            Enter numbers (comma-separated dataset):
          </label>
          <input
            type="text"
            id="zscore-data-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., 10, 20, 30, 40, 50"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="zscore-value-input" className="block text-sm font-medium text-gray-700 mb-1">
            Value for Z-Score calculation (from the dataset or any value):
          </label>
          <input
            type="number" // Changed to type number for better UX, though state is string
            id="zscore-value-input"
            value={specificValue}
            onChange={(e) => setSpecificValue(e.target.value)}
            placeholder="e.g., 25"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ZScoreCalculator; 