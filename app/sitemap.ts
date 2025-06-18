import { categories } from '@/lib/calculatorsData';

const URL = "https://mycalculatorapp.in";

export default function sitemap() {
  const calculatorUrls = categories.flatMap(category => 
    category.calculators.map(calc => ({
      url: `${URL}${calc.href}`,
      lastModified: new Date(),
    }))
  );

  const categoryUrls = categories.map(category => ({
    url: `${URL}${category.href}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    { url: URL, lastModified: new Date() },
    { url: `${URL}/blogs`, lastModified: new Date() },
    { url: `${URL}/blogs/stock-market-calculations-finance-terms`, lastModified: new Date() },
    { url: `${URL}/about`, lastModified: new Date() },
    { url: `${URL}/contact`, lastModified: new Date() },
    { url: `${URL}/privacy`, lastModified: new Date() },
    { url: `${URL}/terms`, lastModified: new Date() },
  ];

  return [
    ...staticUrls,
    ...categoryUrls,
    ...calculatorUrls,
  ];
} 