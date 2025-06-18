-- Create database schema for calculator website

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Calculator categories
CREATE TABLE IF NOT EXISTS calculator_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Individual calculators
CREATE TABLE IF NOT EXISTS calculators (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES calculator_categories(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    formula TEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Calculator usage tracking
CREATE TABLE IF NOT EXISTS calculator_usage (
    id SERIAL PRIMARY KEY,
    calculator_id INTEGER REFERENCES calculators(id),
    user_id INTEGER REFERENCES users(id) NULL,
    input_data JSONB,
    result_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved calculations for registered users
CREATE TABLE IF NOT EXISTS saved_calculations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    calculator_id INTEGER REFERENCES calculators(id),
    name VARCHAR(255),
    input_data JSONB NOT NULL,
    result_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_calculators_category ON calculators(category_id);
CREATE INDEX IF NOT EXISTS idx_calculators_popular ON calculators(is_popular);
CREATE INDEX IF NOT EXISTS idx_calculator_usage_calculator ON calculator_usage(calculator_id);
CREATE INDEX IF NOT EXISTS idx_calculator_usage_user ON calculator_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_calculator_usage_created ON calculator_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_saved_calculations_user ON saved_calculations(user_id);
