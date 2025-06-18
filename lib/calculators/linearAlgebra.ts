// Type definitions
export type Vector = number[];
export type Matrix = number[][];

// --- Input Parsers ---

/**
 * Parses a string representation of a vector into a number array.
 * Expected format: "1, 2, 3, -4.5"
 */
export const parseVector = (input: string): Vector | string => {
  if (!input.trim()) return "Input string is empty.";
  const elements = input.split(',').map(s => parseFloat(s.trim()));
  if (elements.some(isNaN)) {
    return "Invalid input: All vector elements must be numbers.";
  }
  return elements;
};

/**
 * Parses a string representation of a matrix into a 2D number array.
 * Expected format: "1,2,3; 4,5,6; 7,8,9" (rows separated by ';', elements by ',')
 */
export const parseMatrix = (input: string): Matrix | string => {
  if (!input.trim()) return "Input string is empty.";
  const rowsStr = input.split(';');
  if (rowsStr.length === 0) return "Matrix input cannot be empty.";

  const matrix: Matrix = [];
  let numCols = -1;

  for (const rowStr of rowsStr) {
    if (!rowStr.trim()) return "Matrix row string cannot be empty.";
    const elements = rowStr.split(',').map(s => parseFloat(s.trim()));
    if (elements.some(isNaN)) {
      return "Invalid input: All matrix elements must be numbers.";
    }
    if (numCols === -1) {
      numCols = elements.length;
    } else if (elements.length !== numCols) {
      return "Invalid matrix format: All rows must have the same number of columns.";
    }
    if (numCols === 0 && rowsStr.length > 1) { // handles cases like ";" or "1;;2"
        return "Invalid matrix format: Rows cannot be empty if multiple rows exist or if single row is just a separator.";
    }
    if (numCols === 0 && rowsStr.length === 1 && input.trim() !== "") { // allow single empty row like "" to be parsed as [[]] if needed, but generally not a valid matrix for operations
        // For now, let's consider a matrix with zero columns invalid for most operations
        return "Invalid matrix format: A matrix must have at least one column if it has rows.";
    }
    matrix.push(elements);
  }
  if(matrix.length > 0 && matrix[0].length === 0 && matrix.every(row => row.length === 0)){
      //This case handles input like ";;" which results in [[],[],[]]
      return "Invalid matrix format: A matrix must have at least one column.";
  }

  return matrix;
};

// --- Vector Operations ---

export const addVectors = (v1Str: string, v2Str: string): Vector | string => {
  const vec1 = parseVector(v1Str);
  const vec2 = parseVector(v2Str);
  if (typeof vec1 === 'string') return `Vector 1: ${vec1}`;
  if (typeof vec2 === 'string') return `Vector 2: ${vec2}`;
  if (vec1.length !== vec2.length) return "Vectors must have the same dimension for addition.";
  return vec1.map((val, i) => val + vec2[i]);
};

export const subtractVectors = (v1Str: string, v2Str: string): Vector | string => {
  const vec1 = parseVector(v1Str);
  const vec2 = parseVector(v2Str);
  if (typeof vec1 === 'string') return `Vector 1: ${vec1}`;
  if (typeof vec2 === 'string') return `Vector 2: ${vec2}`;
  if (vec1.length !== vec2.length) return "Vectors must have the same dimension for subtraction.";
  return vec1.map((val, i) => val - vec2[i]);
};

export const scalarMultiplyVector = (scalarStr: string, vStr: string): Vector | string => {
  const scalar = parseFloat(scalarStr);
  const vec = parseVector(vStr);
  if (isNaN(scalar)) return "Scalar must be a valid number.";
  if (typeof vec === 'string') return `Vector: ${vec}`;
  return vec.map(val => val * scalar);
};

export const dotProduct = (v1Str: string, v2Str: string): number | string => {
  const vec1 = parseVector(v1Str);
  const vec2 = parseVector(v2Str);
  if (typeof vec1 === 'string') return `Vector 1: ${vec1}`;
  if (typeof vec2 === 'string') return `Vector 2: ${vec2}`;
  if (vec1.length !== vec2.length) return "Vectors must have the same dimension for dot product.";
  if (vec1.length === 0) return "Cannot calculate dot product for empty vectors.";
  return vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
};

export const crossProduct = (v1Str: string, v2Str: string): Vector | string => {
  const vec1 = parseVector(v1Str);
  const vec2 = parseVector(v2Str);
  if (typeof vec1 === 'string') return `Vector 1: ${vec1}`;
  if (typeof vec2 === 'string') return `Vector 2: ${vec2}`;
  if (vec1.length !== 3 || vec2.length !== 3) return "Cross product is only defined for 3D vectors.";
  return [
    vec1[1] * vec2[2] - vec1[2] * vec2[1],
    vec1[2] * vec2[0] - vec1[0] * vec2[2],
    vec1[0] * vec2[1] - vec1[1] * vec2[0],
  ];
};

// --- Matrix Operations ---

export const addMatrices = (m1Str: string, m2Str: string): Matrix | string => {
  const mat1 = parseMatrix(m1Str);
  const mat2 = parseMatrix(m2Str);
  if (typeof mat1 === 'string') return `Matrix 1: ${mat1}`;
  if (typeof mat2 === 'string') return `Matrix 2: ${mat2}`;

  if (mat1.length === 0 || mat2.length === 0) return "Matrices cannot be empty for addition.";
  if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length) {
    return "Matrices must have the same dimensions for addition.";
  }

  const result: Matrix = [];
  for (let i = 0; i < mat1.length; i++) {
    result[i] = [];
    for (let j = 0; j < mat1[0].length; j++) {
      result[i][j] = mat1[i][j] + mat2[i][j];
    }
  }
  return result;
};

export const subtractMatrices = (m1Str: string, m2Str: string): Matrix | string => {
  const mat1 = parseMatrix(m1Str);
  const mat2 = parseMatrix(m2Str);
  if (typeof mat1 === 'string') return `Matrix 1: ${mat1}`;
  if (typeof mat2 === 'string') return `Matrix 2: ${mat2}`;

  if (mat1.length === 0 || mat2.length === 0) return "Matrices cannot be empty for subtraction.";
  if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length) {
    return "Matrices must have the same dimensions for subtraction.";
  }

  const result: Matrix = [];
  for (let i = 0; i < mat1.length; i++) {
    result[i] = [];
    for (let j = 0; j < mat1[0].length; j++) {
      result[i][j] = mat1[i][j] - mat2[i][j];
    }
  }
  return result;
};

export const scalarMultiplyMatrix = (scalarStr: string, mStr: string): Matrix | string => {
  const scalar = parseFloat(scalarStr);
  const mat = parseMatrix(mStr);
  if (isNaN(scalar)) return "Scalar must be a valid number.";
  if (typeof mat === 'string') return `Matrix: ${mat}`;
  if (mat.length === 0 || mat[0].length === 0) return "Matrix cannot be empty for scalar multiplication.";

  return mat.map(row => row.map(val => val * scalar));
};

export const multiplyMatrices = (m1Str: string, m2Str: string): Matrix | string => {
  const mat1 = parseMatrix(m1Str);
  const mat2 = parseMatrix(m2Str);
  if (typeof mat1 === 'string') return `Matrix 1: ${mat1}`;
  if (typeof mat2 === 'string') return `Matrix 2: ${mat2}`;

  if (mat1.length === 0 || mat1[0].length === 0 || mat2.length === 0 || mat2[0].length === 0) {
      return "Matrices cannot be empty for multiplication.";
  }
  if (mat1[0].length !== mat2.length) {
    return "Number of columns in Matrix 1 must equal number of rows in Matrix 2 for multiplication.";
  }

  const result: Matrix = new Array(mat1.length).fill(0).map(() => new Array(mat2[0].length).fill(0));
  for (let i = 0; i < mat1.length; i++) {
    for (let j = 0; j < mat2[0].length; j++) {
      for (let k = 0; k < mat1[0].length; k++) {
        result[i][j] += mat1[i][k] * mat2[k][j];
      }
    }
  }
  return result;
};

export const transposeMatrix = (mStr: string): Matrix | string => {
  const mat = parseMatrix(mStr);
  if (typeof mat === 'string') return `Matrix: ${mat}`;
  if (mat.length === 0 || mat[0].length === 0) return "Matrix cannot be empty for transpose.";

  const rows = mat.length;
  const cols = mat[0].length;
  const result: Matrix = new Array(cols).fill(0).map(() => new Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = mat[i][j];
    }
  }
  return result;
};

export const matrixTrace = (mStr: string): number | string => {
  const mat = parseMatrix(mStr);
  if (typeof mat === 'string') return `Matrix: ${mat}`;
  if (mat.length === 0) return "Matrix cannot be empty for trace calculation.";
  if (mat.length !== mat[0].length) return "Matrix must be square to calculate its trace.";

  let trace = 0;
  for (let i = 0; i < mat.length; i++) {
    trace += mat[i][i];
  }
  return trace;
};

// Helper function to get a submatrix (minor) for determinant calculation
const getSubmatrix = (matrix: Matrix, rowToRemove: number, colToRemove: number): Matrix => {
  return matrix
    .filter((_, rowIndex) => rowIndex !== rowToRemove)
    .map(row => row.filter((_, colIndex) => colIndex !== colToRemove));
};

export const matrixDeterminant = (mStr: string): number | string => {
  const mat = parseMatrix(mStr);
  if (typeof mat === 'string') return `Matrix: ${mat}`;
  if (mat.length === 0) return "Matrix cannot be empty for determinant calculation.";
  if (mat.length !== mat[0].length) return "Matrix must be square to calculate its determinant.";

  const n = mat.length;

  if (n === 1) {
    return mat[0][0];
  }

  if (n === 2) {
    return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
  }

  // For 3x3 and larger, use cofactor expansion along the first row
  let determinant = 0;
  for (let j = 0; j < n; j++) {
    const submatrix = getSubmatrix(mat, 0, j);
    // Recursively call matrixDeterminant on the submatrix (which is a string representation)
    // This requires converting submatrix back to string. Or, create an internal function that works with Matrix type.
    // For simplicity here, let's assume an internal function that works with Matrix type directly.
    const subDeterminant = calculateDeterminantRecursive(submatrix); // Assume this helper exists
    if (typeof subDeterminant === 'string') {
        // This should ideally not happen if logic is correct, but handle for type safety
        return `Error calculating sub-determinant: ${subDeterminant}`;
    }
    determinant += (j % 2 === 0 ? 1 : -1) * mat[0][j] * subDeterminant;
  }
  return determinant;
};

// Internal recursive helper for determinant that takes Matrix type
const calculateDeterminantRecursive = (matrix: Matrix): number | string => {
    const n = matrix.length;
    if (n === 0) return "Cannot calculate determinant of an empty submatrix (should not happen).";
    // Ensure submatrix is square, though getSubmatrix should maintain this
    if (matrix.some(row => row.length !== n)) return "Submatrix is not square (should not happen).";

    if (n === 1) {
        return matrix[0][0];
    }
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let j = 0; j < n; j++) {
        const submatrix = getSubmatrix(matrix, 0, j);
        const subDet = calculateDeterminantRecursive(submatrix);
        if (typeof subDet === 'string') return subDet; // Propagate error
        det += (j % 2 === 0 ? 1 : -1) * matrix[0][j] * subDet;
    }
    return det;
};

// Helper function to calculate the cofactor of an element
const getCofactor = (matrix: Matrix, row: number, col: number): number | string => {
  const submatrix = getSubmatrix(matrix, row, col);
  const subDeterminant = calculateDeterminantRecursive(submatrix);
  if (typeof subDeterminant === 'string') return subDeterminant; // Propagate error
  return ((row + col) % 2 === 0 ? 1 : -1) * subDeterminant;
};

export const matrixInverse = (mStr: string): Matrix | string => {
  const mat = parseMatrix(mStr);
  if (typeof mat === 'string') return `Matrix: ${mat}`;
  if (mat.length === 0) return "Matrix cannot be empty for inverse calculation.";
  if (mat.length !== mat[0].length) return "Matrix must be square to calculate its inverse.";

  const n = mat.length;
  const det = calculateDeterminantRecursive(mat); // Use the internal recursive one that takes Matrix

  if (typeof det === 'string') return `Error calculating determinant for inverse: ${det}`;
  if (det === 0) return "Matrix is not invertible (determinant is zero).";

  // Handle 1x1 matrix
  if (n === 1) {
    if (mat[0][0] === 0) return "Matrix is not invertible (element is zero for 1x1 matrix)." // Should be caught by det === 0
    return [[1 / mat[0][0]]];
  }

  // For 2x2 and larger, calculate adjugate matrix
  const cofactorMatrix: Matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cofactor = getCofactor(mat, i, j);
      if (typeof cofactor === 'string') return `Error calculating cofactor: ${cofactor}`;
      cofactorMatrix[i][j] = cofactor;
    }
  }

  // Adjugate matrix is the transpose of the cofactor matrix
  // We can reuse the transposeMatrix logic, but it expects a string. Let's quickly define an internal transpose helper.
  const transposeInternal = (matrix: Matrix): Matrix => {
      const rows = matrix.length;
      const cols = matrix[0].length;
      const result: Matrix = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
              result[j][i] = matrix[i][j];
          }
      }
      return result;
  };
  const adjugateMatrix = transposeInternal(cofactorMatrix);

  // Inverse = (1/determinant) * adjugateMatrix
  const inverseMatrix: Matrix = adjugateMatrix.map(row =>
    row.map(val => val / det)
  );

  return inverseMatrix;
};

// Further Matrix Operations (Rank, etc.) will be added next 