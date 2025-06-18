'use client';

import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateMode } from '@/lib/calculators/dataScience';

const ModeCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number[] | string | null>(null); // Mode can be number[] or string
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    if (!inputValue.trim()) {
      setError('Please enter some numbers.');
      return;
    }
    const modeResult = calculateMode(inputValue);
    if (typeof modeResult === 'string') { // This implies an error message or "No mode"
      // Differentiate between "No mode" (a valid result) and an actual error
      if (modeResult.toLowerCase().includes('invalid') || modeResult.toLowerCase().includes('error')) {
        setError(modeResult);
      } else {
        setResult(modeResult); // e.g., "No mode (all values are unique)."
      }
    } else {
      setResult(modeResult); // This is number[]
    }
  };

  return (
    <CalculatorCard
      title="Mode (Most Frequent Value)"
      result={result}
      onCalculate={handleCalculate}
      calculationError={error}
    >
      <div>
        <label htmlFor="mode-input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter numbers (comma-separated):
        </label>
        <input
          type="text"
          id="mode-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., 1, 2, 2, 3, 4, 4, 4"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </CalculatorCard>
  );
};

export default ModeCalculator; 