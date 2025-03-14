-- Drop existing tables with CASCADE to handle dependencies
DROP TABLE IF EXISTS purchase_items CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;

-- Create purchases table
CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases"
  ON purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create purchase items table
CREATE TABLE purchase_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id uuid REFERENCES purchases NOT NULL,
  release_id uuid REFERENCES releases NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE purchase_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view purchase items"
  ON purchase_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM purchases
      WHERE purchases.id = purchase_items.purchase_id
      AND purchases.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS purchases_user_idx ON purchases(user_id);
CREATE INDEX IF NOT EXISTS purchase_items_purchase_idx ON purchase_items(purchase_id);
CREATE INDEX IF NOT EXISTS purchase_items_release_idx ON purchase_items(release_id);

-- Insert sample purchases for existing users
WITH sample_users AS (
  SELECT id FROM auth.users LIMIT 5
),
new_purchases AS (
  INSERT INTO purchases (user_id, status)
  SELECT 
    id,
    'completed'
  FROM sample_users
  CROSS JOIN generate_series(1, 3) -- Each user makes 3 purchases
  RETURNING id, user_id
)
INSERT INTO purchase_items (purchase_id, release_id, price)
SELECT 
  p.id,
  r.id,
  (SELECT price FROM releases WHERE id = r.id) -- Get price from releases table
FROM new_purchases p
CROSS JOIN LATERAL (
  SELECT id
  FROM releases 
  ORDER BY random() 
  LIMIT 1
) r;