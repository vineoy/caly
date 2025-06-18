// Helper function to parse input string to numbers
const parseNumbers = (input: string): number[] => {
  return input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
};

export const calculateMean = (data: string): number | string => {
  const numbers = parseNumbers(data);
  if (numbers.length === 0) return 'Invalid input or no numbers provided.';
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
};

export const calculateMedian = (data: string): number | string => {
  const numbers = parseNumbers(data);
  if (numbers.length === 0) return 'Invalid input or no numbers provided.';
  numbers.sort((a, b) => a - b);
  const mid = Math.floor(numbers.length / 2);
  return numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
};

export const calculateMode = (data: string): number[] | string => {
  const numbers = parseNumbers(data);
  if (numbers.length === 0) return 'Invalid input or no numbers provided.';
  const frequency: { [key: number]: number } = {};
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
  });
  let maxFreq = 0;
  for (const num in frequency) {
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
    }
  }
  if (maxFreq === 1 && numbers.length > 1 && new Set(numbers).size === numbers.length) {
      return 'No mode (all values are unique).';
  }
  const modes: number[] = [];
  for (const num in frequency) {
    if (frequency[num] === maxFreq) {
      modes.push(Number(num));
    }
  }
  return modes;
};

export const calculateVariance = (data: string): number | string => {
  const numbers = parseNumbers(data);
  if (numbers.length < 2) return 'Variance requires at least two numbers.';
  const mean = calculateMean(data);
  if (typeof mean === 'string') return 'Could not calculate mean for variance.'; // Should not happen if numbers.length >= 1
  const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
  return squaredDifferences.reduce((acc, val) => acc + val, 0) / numbers.length; // Population variance
  // For sample variance, divide by (numbers.length - 1)
};

export const calculateStandardDeviation = (data: string): number | string => {
  const variance = calculateVariance(data);
  if (typeof variance === 'string') return variance; // Error message from calculateVariance
  return Math.sqrt(variance);
};

export const calculateCovariance = (data1: string, data2: string): number | string => {
  const numbers1 = parseNumbers(data1);
  const numbers2 = parseNumbers(data2);

  if (numbers1.length === 0 || numbers2.length === 0) return 'Invalid input or no numbers provided for one or both datasets.';
  if (numbers1.length !== numbers2.length) return 'Datasets must have the same number of values.';
  if (numbers1.length < 2) return 'Covariance requires at least two data points per dataset.';

  const mean1 = calculateMean(data1);
  const mean2 = calculateMean(data2);

  if (typeof mean1 === 'string' || typeof mean2 === 'string') return 'Could not calculate mean for one or both datasets.';

  let covariance = 0;
  for (let i = 0; i < numbers1.length; i++) {
    covariance += (numbers1[i] - mean1) * (numbers2[i] - mean2);
  }
  return covariance / numbers1.length; // Population covariance
  // For sample covariance, divide by (numbers1.length - 1)
};

export const calculatePearsonCorrelation = (data1: string, data2: string): number | string => {
  const numbers1 = parseNumbers(data1);
  const numbers2 = parseNumbers(data2);

  if (numbers1.length < 2 || numbers2.length < 2) return 'Correlation requires at least two data points per dataset.';

  const covariance = calculateCovariance(data1, data2);
  if (typeof covariance === 'string') return covariance; // Error message from covariance calculation

  const stdDev1 = calculateStandardDeviation(data1);
  const stdDev2 = calculateStandardDeviation(data2);

  if (typeof stdDev1 === 'string' || typeof stdDev2 === 'string') return 'Could not calculate standard deviation for one or both datasets.';
  if (stdDev1 === 0 || stdDev2 === 0) return 'Cannot calculate correlation: standard deviation of one or both datasets is zero.';

  return covariance / (stdDev1 * stdDev2);
};

export const calculateQuantile = (data: string, quantile: number): number | string => {
  if (quantile < 0 || quantile > 1) return 'Quantile must be between 0 and 1 (e.g., 0.25 for 25th percentile).';
  const numbers = parseNumbers(data);
  if (numbers.length === 0) return 'Invalid input or no numbers provided.';
  numbers.sort((a, b) => a - b);

  const index = quantile * (numbers.length - 1);
  if (Number.isInteger(index)) {
    return numbers[index];
  }
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);
  const fraction = index - lowerIndex;
  return numbers[lowerIndex] * (1 - fraction) + numbers[upperIndex] * fraction;
};

export const calculateZScore = (data: string, value: string): number | string => {
  const numbers = parseNumbers(data);
  const specificValue = parseFloat(value.trim());

  if (numbers.length < 2) return 'Z-score requires at least two data points.';
  if (isNaN(specificValue)) return 'Invalid input for the specific value.';
  
  const mean = calculateMean(data);
  const stdDev = calculateStandardDeviation(data);

  if (typeof mean === 'string') return 'Could not calculate mean for Z-score.';
  if (typeof stdDev === 'string') return 'Could not calculate standard deviation for Z-score.';
  if (stdDev === 0) return 'Cannot calculate Z-score: standard deviation is zero.';

  return (specificValue - mean) / stdDev;
}; 