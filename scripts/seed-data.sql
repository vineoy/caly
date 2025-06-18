-- Seed data for calculator categories and calculators

-- Insert calculator categories
INSERT INTO calculator_categories (name, slug, description, icon, color) VALUES
('Financial Calculators', 'financial', 'Calculate loans, mortgages, investments, and other financial metrics', 'DollarSign', 'bg-green-100 text-green-700'),
('Health & Fitness Calculators', 'health', 'Calculate BMI, calories, body fat, and other health metrics', 'Heart', 'bg-red-100 text-red-700'),
('Math Calculators', 'math', 'Scientific, percentage, fraction, and other mathematical calculators', 'Calculator', 'bg-blue-100 text-blue-700'),
('Other Calculators', 'other', 'Age, date, time, and various utility calculators', 'Settings', 'bg-purple-100 text-purple-700')
ON CONFLICT (slug) DO NOTHING;

-- Insert financial calculators
INSERT INTO calculators (category_id, name, slug, description, is_popular) VALUES
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Mortgage Calculator', 'mortgage-calculator', 'Calculate monthly mortgage payments, total interest, and amortization schedule', true),
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Loan Calculator', 'loan-calculator', 'Calculate loan payments for any type of loan with interest', true),
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Auto Loan Calculator', 'auto-loan-calculator', 'Calculate car loan payments and total cost', false),
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Interest Calculator', 'interest-calculator', 'Calculate simple and compound interest', false),
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Investment Calculator', 'investment-calculator', 'Calculate investment returns and growth over time', true),
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Retirement Calculator', 'retirement-calculator', 'Plan for retirement and calculate required savings', false),
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Compound Interest Calculator', 'compound-interest-calculator', 'Calculate compound interest with regular contributions', false),
((SELECT id FROM calculator_categories WHERE slug = 'financial'), 'Salary Calculator', 'salary-calculator', 'Convert between hourly, monthly, and annual salary', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert health calculators
INSERT INTO calculators (category_id, name, slug, description, is_popular) VALUES
((SELECT id FROM calculator_categories WHERE slug = 'health'), 'BMI Calculator', 'bmi-calculator', 'Calculate Body Mass Index and health status', true),
((SELECT id FROM calculator_categories WHERE slug = 'health'), 'Calorie Calculator', 'calorie-calculator', 'Calculate daily calorie needs for weight management', true),
((SELECT id FROM calculator_categories WHERE slug = 'health'), 'Body Fat Calculator', 'body-fat-calculator', 'Calculate body fat percentage using various methods', false),
((SELECT id FROM calculator_categories WHERE slug = 'health'), 'BMR Calculator', 'bmr-calculator', 'Calculate Basal Metabolic Rate', false),
((SELECT id FROM calculator_categories WHERE slug = 'health'), 'Ideal Weight Calculator', 'ideal-weight-calculator', 'Calculate ideal body weight range', false),
((SELECT id FROM calculator_categories WHERE slug = 'health'), 'Pace Calculator', 'pace-calculator', 'Calculate running pace and split times', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert math calculators
INSERT INTO calculators (category_id, name, slug, description, is_popular) VALUES
((SELECT id FROM calculator_categories WHERE slug = 'math'), 'Scientific Calculator', 'scientific-calculator', 'Advanced calculator with trigonometric and logarithmic functions', true),
((SELECT id FROM calculator_categories WHERE slug = 'math'), 'Percentage Calculator', 'percentage-calculator', 'Calculate percentages, percentage change, and more', true),
((SELECT id FROM calculator_categories WHERE slug = 'math'), 'Fraction Calculator', 'fraction-calculator', 'Add, subtract, multiply, and divide fractions', false),
((SELECT id FROM calculator_categories WHERE slug = 'math'), 'Random Number Generator', 'random-number-generator', 'Generate random numbers within specified ranges', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert other calculators
INSERT INTO calculators (category_id, name, slug, description, is_popular) VALUES
((SELECT id FROM calculator_categories WHERE slug = 'other'), 'Age Calculator', 'age-calculator', 'Calculate age in years, months, days, and more', true),
((SELECT id FROM calculator_categories WHERE slug = 'other'), 'Date Calculator', 'date-calculator', 'Calculate differences between dates and add/subtract days', true),
((SELECT id FROM calculator_categories WHERE slug = 'other'), 'Time Calculator', 'time-calculator', 'Add, subtract, and convert time units', false),
((SELECT id FROM calculator_categories WHERE slug = 'other'), 'GPA Calculator', 'gpa-calculator', 'Calculate Grade Point Average', false),
((SELECT id FROM calculator_categories WHERE slug = 'other'), 'Password Generator', 'password-generator', 'Generate secure passwords with custom options', false)
ON CONFLICT (slug) DO NOTHING;
