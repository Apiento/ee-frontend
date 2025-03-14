/*
  # Everything Everywhere Database Schema

  1. Core Tables
    - artists (Record labels and artists)
    - releases (Music releases)
    - merchandise (Physical merchandise items)
    - profiles (User profiles)

  2. Junction Tables
    - release_likes (User likes on releases)
    - artist_follows (User follows on artists)
    - purchases (User purchases)
    - purchase_items (Items in purchases)

  3. Security
    - RLS enabled on all tables
    - Policies for viewing and managing data
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS purchase_items;
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS release_likes;
DROP TABLE IF EXISTS artist_follows;
DROP TABLE IF EXISTS merchandise;
DROP TABLE IF EXISTS releases;
DROP TABLE IF EXISTS artists;

-- Create artists table
CREATE TABLE artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view artists"
  ON artists FOR SELECT
  USING (true);

-- Create releases table
CREATE TABLE releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist_id uuid REFERENCES artists NOT NULL,
  description text NOT NULL,
  cover_art text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  release_date date NOT NULL,
  format text NOT NULL CHECK (format IN ('Digital', 'Vinyl', 'CD')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view releases"
  ON releases FOR SELECT
  USING (true);

-- Create merchandise table
CREATE TABLE merchandise (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES artists NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  category text NOT NULL CHECK (category IN ('clothing', 'accessories', 'prints', 'other')),
  variants jsonb,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view merchandise"
  ON merchandise FOR SELECT
  USING (true);

-- Create release likes table
CREATE TABLE release_likes (
  user_id uuid REFERENCES auth.users NOT NULL,
  release_id uuid REFERENCES releases NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, release_id)
);

ALTER TABLE release_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view release likes"
  ON release_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own likes"
  ON release_likes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create artist follows table
CREATE TABLE artist_follows (
  user_id uuid REFERENCES auth.users NOT NULL,
  artist_id uuid REFERENCES artists NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, artist_id)
);

ALTER TABLE artist_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view artist follows"
  ON artist_follows FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own follows"
  ON artist_follows FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

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
  release_id uuid REFERENCES releases,
  merchandise_id uuid REFERENCES merchandise,
  price numeric NOT NULL CHECK (price >= 0),
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  variant_data jsonb,
  created_at timestamptz DEFAULT now(),
  CHECK (
    (release_id IS NOT NULL AND merchandise_id IS NULL) OR
    (release_id IS NULL AND merchandise_id IS NOT NULL)
  )
);

ALTER TABLE purchase_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their purchase items"
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
CREATE INDEX IF NOT EXISTS releases_artist_idx ON releases(artist_id);
CREATE INDEX IF NOT EXISTS merchandise_artist_idx ON merchandise(artist_id);
CREATE INDEX IF NOT EXISTS purchases_user_idx ON purchases(user_id);
CREATE INDEX IF NOT EXISTS purchase_items_purchase_idx ON purchase_items(purchase_id);
CREATE INDEX IF NOT EXISTS purchase_items_release_idx ON purchase_items(release_id);
CREATE INDEX IF NOT EXISTS purchase_items_merchandise_idx ON purchase_items(merchandise_id);

-- Insert sample artists
INSERT INTO artists (name, bio, avatar_url) VALUES
  ('Stellar Dreams', 'Creating ethereal soundscapes and ambient textures', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80'),
  ('Metro Rhythm', 'Detroit techno meets deep house grooves', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80'),
  ('Bass Horizon', 'Exploring the frontiers of bass music', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80'),
  ('Ambient Collective', 'Pioneering ambient and experimental music', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80'),
  ('Deep Techno Project', 'Exploring the depths of techno', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80');

-- Insert sample releases
WITH artist_ids AS (
  SELECT id, name FROM artists
)
INSERT INTO releases (title, artist_id, description, cover_art, price, release_date, format)
SELECT
  title,
  (SELECT id FROM artist_ids WHERE name = artist_name),
  description,
  cover_art,
  price,
  release_date,
  format
FROM (
  VALUES
    ('Midnight Atmospheres', 'Stellar Dreams', 'A journey through ambient soundscapes and ethereal textures.', 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&q=80', 24.99, '2024-02-15', 'Vinyl'),
    ('Urban Pulse', 'Metro Rhythm', 'Deep house grooves meets Detroit techno.', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80', 29.99, '2024-03-01', 'Vinyl'),
    ('Future Waves', 'Bass Horizon', 'Cutting-edge bass music with futuristic sound design.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80', 19.99, '2024-03-15', 'Digital'),
    ('Ethereal Landscapes', 'Ambient Collective', 'Immersive ambient soundscapes', 'https://images.unsplash.com/photo-1515104882246-2bbbf5680010?w=500&q=80', 34.99, '2024-03-01', 'Vinyl'),
    ('Deep Space Transmissions', 'Deep Techno Project', 'A journey through deep techno', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', 29.99, '2024-03-05', 'Vinyl')
) AS new_releases(title, artist_name, description, cover_art, price, release_date, format);

-- Insert sample merchandise
WITH artist_ids AS (
  SELECT id, name FROM artists
)
INSERT INTO merchandise (artist_id, title, description, image, price, category, variants, in_stock)
SELECT
  (SELECT id FROM artist_ids WHERE name = artist_name),
  title,
  description,
  image,
  price,
  category,
  variants,
  in_stock
FROM (
  VALUES
    ('Stellar Dreams', 'Label Logo Tee', 'Classic black t-shirt with embroidered label logo', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', 29.99, 'clothing', 
     '[{"size": "S", "color": "Black"}, {"size": "M", "color": "Black"}, {"size": "L", "color": "Black"}, {"size": "XL", "color": "Black"}]'::jsonb, true),
    ('Stellar Dreams', 'Limited Edition Screen Print', 'Hand-numbered art print featuring our first release artwork', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', 49.99, 'prints', NULL, true),
    ('Metro Rhythm', 'Label Hoodie', 'Premium quality hoodie with minimalist label design', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80', 59.99, 'clothing',
     '[{"size": "S", "color": "Navy"}, {"size": "M", "color": "Navy"}, {"size": "L", "color": "Navy"}, {"size": "XL", "color": "Navy"}]'::jsonb, true),
    ('Metro Rhythm', 'Record Bag', 'Heavy duty vinyl record bag with padded interior', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80', 39.99, 'accessories', NULL, true)
) AS new_merch(artist_name, title, description, image, price, category, variants, in_stock);