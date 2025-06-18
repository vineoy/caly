import VarianceCalculator from '@/components/data-science/VarianceCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: "Variance Calculator",
  description: "Calculate the variance of a set of numbers. A key measure of spread in statistics.",
};

export default function VariancePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Variance Calculator</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        The variance calculator helps you find the variance for a set of numbers. Variance measures how far each number in the set is from the mean (average), and thus from every other number in the set. It's a fundamental concept in statistics for understanding data distribution.
      </p>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Calculate Variance</CardTitle>
        </CardHeader>
        <CardContent>
          <VarianceCalculator />
        </CardContent>
      </Card>
    </div>
  );
} 