-- Migration script to ensure category column exists and add constraint
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Add index for faster category queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Insert sample products if table is empty
INSERT INTO products (name, description, price, category, size, stock_quantity)
SELECT 'Sample Beaded Earrings', 'Beautiful handcrafted beaded earrings', 599, 'Quirky (Beaded)', 'One Size', 5
WHERE NOT EXISTS (SELECT 1 FROM products);
