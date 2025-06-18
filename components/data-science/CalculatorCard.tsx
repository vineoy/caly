'use client';

import React from 'react';
import { Matrix, Vector } from '@/lib/calculators/linearAlgebra'; // Assuming types are exported

// More general result type to accommodate scalars, vectors, and matrices
export type CalculatorResult = string | number | Vector | Matrix | null;

interface CalculatorCardProps {
  title: string;
  children: React.ReactNode;
  result: CalculatorResult; // Updated result type
  onCalculate?: () => void;
  buttonText?: string;
  calculationError?: string | null;
}

// Helper type guard for Matrix
function isMatrix(value: any): value is Matrix {
  return Array.isArray(value) && value.length > 0 && Array.isArray(value[0]) && typeof value[0][0] === 'number';
}

// Helper type guard for Vector
function isVector(value: any): value is Vector {
  return Array.isArray(value) && (value.length === 0 || typeof value[0] === 'number') && !isMatrix(value);
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  children,
  result,
  onCalculate,
  buttonText = 'Calculate',
  calculationError
}) => {
  const renderResult = () => {
    if (calculationError) {
      return <p className="text-red-500 mt-2 text-sm">Error: {calculationError}</p>;
    }
    if (result === null || result === undefined) return null;

    if (isMatrix(result)) {
      return (
        <div className="mt-2 text-lg font-semibold">
          <p>Result:</p>
          <div className="p-2 bg-gray-100 rounded border border-gray-300 mt-1 overflow-x-auto text-sm">
            {result.map((row, rowIndex) => (
              <div key={rowIndex} className="whitespace-nowrap">
                [{row.map(num => Number.isInteger(num) ? num : num.toFixed(4)).join(', ')}]
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isVector(result)) {
      return <p className="mt-2 text-lg font-semibold">Result: [{result.map(num => Number.isInteger(num) ? num : num.toFixed(4)).join(', ')}]</p>;
    }
    
    if (typeof result === 'number') {
        const displayResult = Number.isInteger(result) ? result : result.toFixed(4);
        return <p className="mt-2 text-lg font-semibold">Result: {displayResult}</p>;
    }

    // Fallback for string results (e.g., "No mode", or other messages)
    return <p className="mt-2 text-lg font-semibold">Result: {String(result)}</p>;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
      {onCalculate && (
        <button
          onClick={onCalculate}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {buttonText}
        </button>
      )}
      {renderResult()}
    </div>
  );
};

export default CalculatorCard; 