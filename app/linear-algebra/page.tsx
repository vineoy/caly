import VectorAdditionCalculator from "@/components/linear-algebra/VectorAdditionCalculator";
import VectorSubtractionCalculator from "@/components/linear-algebra/VectorSubtractionCalculator";
import ScalarMultiplyVectorCalculator from "@/components/linear-algebra/ScalarMultiplyVectorCalculator";
import DotProductCalculator from "@/components/linear-algebra/DotProductCalculator";
import CrossProductCalculator from "@/components/linear-algebra/CrossProductCalculator";
import MatrixAdditionCalculator from "@/components/linear-algebra/MatrixAdditionCalculator";
import MatrixSubtractionCalculator from "@/components/linear-algebra/MatrixSubtractionCalculator";
import ScalarMultiplyMatrixCalculator from "@/components/linear-algebra/ScalarMultiplyMatrixCalculator";
import MatrixMultiplicationCalculator from "@/components/linear-algebra/MatrixMultiplicationCalculator";
import TransposeMatrixCalculator from "@/components/linear-algebra/TransposeMatrixCalculator";
import DeterminantCalculator from "@/components/linear-algebra/DeterminantCalculator";
import TraceCalculator from "@/components/linear-algebra/TraceCalculator";
import { Sigma } from "lucide-react";

export default function LinearAlgebraPage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sigma className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Linear Algebra Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Perform fundamental vector and matrix operations. Essential tools
            for students, engineers, and data scientists.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Vector Operations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
          <VectorAdditionCalculator />
          <VectorSubtractionCalculator />
          <ScalarMultiplyVectorCalculator />
          <DotProductCalculator />
          <CrossProductCalculator />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">
          Matrix Operations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <MatrixAdditionCalculator />
          <MatrixSubtractionCalculator />
          <ScalarMultiplyMatrixCalculator />
          <MatrixMultiplicationCalculator />
          <TransposeMatrixCalculator />
          <DeterminantCalculator />
          <TraceCalculator />
        </div>
      </div>
    </div>
  );
} 