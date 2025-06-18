import React from 'react';
import MeanCalculator from "@/components/data-science/MeanCalculator";
import MedianCalculator from "@/components/data-science/MedianCalculator";
import ModeCalculator from "@/components/data-science/ModeCalculator";
import VarianceCalculator from "@/components/data-science/VarianceCalculator";
import StandardDeviationCalculator from "@/components/data-science/StandardDeviationCalculator";
import CovarianceCalculator from "@/components/data-science/CovarianceCalculator";
import CorrelationCalculator from "@/components/data-science/CorrelationCalculator";
import QuantileCalculator from "@/components/data-science/QuantileCalculator";
import ZScoreCalculator from "@/components/data-science/ZScoreCalculator";
import { Sigma } from "lucide-react";

export default function DataSciencePage() {
  return (
    <div>
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sigma className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Data Science Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore fundamental statistical calculations used in data science.
            Calculate mean, median, mode, variance, and more.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <MeanCalculator />
          <MedianCalculator />
          <ModeCalculator />
          <VarianceCalculator />
          <StandardDeviationCalculator />
          <CovarianceCalculator />
          <CorrelationCalculator />
          <QuantileCalculator />
          <ZScoreCalculator />
        </div>
      </div>
    </div>
  );
} 