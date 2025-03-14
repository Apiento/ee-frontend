/*
  # Store Schema Update

  1. New Tables
    - artists (id, name, bio, image)
    - releases (id, title, artist_id, description, cover_art, price, release_date, format)
    - release_likes (user_id, release_id)
    - artist_follows (user_id, artist_id)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for viewing and managing data
    
  3. Performance
    - Add indexes for common queries
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view artists" ON artists;
  DROP POLICY IF EXISTS "Anyone can view releases" ON releases;
  DROP POLICY IF EXISTS "Anyone can view release likes count" ON release_likes;
  DROP POLICY IF EXISTS "Users can manage their own likes" ON release_likes;
  DROP POLICY IF EXISTS "Anyone can view artist follows count" ON artist_follows;
  DROP POLICY IF EXISTS "Users can manage their own follows" ON artist_follows;
EXCEPTION
  WHEN undefined_table OR undefined_object THEN NULL;
END $$;

-- Artists table
CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  CREATE POLICY "Anyone can view artists"
    ON artists FOR SELECT
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Releases table
CREATE TABLE IF NOT EXISTS releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist_id uuid REFERENCES artists NOT NULL,
  description text,
  cover_art text,
  price numeric NOT NULL CHECK (price >= 0),
  release_date date NOT NULL,
  format text NOT NULL CHECK (format IN ('Digital', 'Vinyl', 'CD')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  CREATE POLICY "Anyone can view releases"
    ON releases FOR SELECT
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- User likes for releases
CREATE TABLE IF NOT EXISTS release_likes (
  user_id uuid REFERENCES auth.users NOT NULL,
  release_id uuid REFERENCES releases NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, release_id)
);

ALTER TABLE release_likes ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  CREATE POLICY "Anyone can view release likes count"
    ON release_likes FOR SELECT
    USING (true);

  CREATE POLICY "Users can manage their own likes"
    ON release_likes FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- User follows for artists
CREATE TABLE IF NOT EXISTS artist_follows (
  user_id uuid REFERENCES auth.users NOT NULL,
  artist_id uuid REFERENCES artists NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, artist_id)
);

ALTER TABLE artist_follows ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  CREATE POLICY "Anyone can view artist follows count"
    ON artist_follows FOR SELECT
    USING (true);

  CREATE POLICY "Users can manage their own follows"
    ON artist_follows FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS releases_artist_idx ON releases(artist_id);

-- Function to get release buyers
CREATE OR REPLACE FUNCTION get_release_buyers(release_id uuid)
RETURNS TABLE (
  user_id uuid,
  username text,
  avatar_url text,
  purchase_date timestamptz,
  is_following boolean
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.user_id,
    pr.username,
    pr.avatar_url,
    pi.created_at as purchase_date,
    EXISTS (
      SELECT 1 FROM artist_follows af
      WHERE af.user_id = auth.uid()
      AND af.artist_id = (
        SELECT artist_id FROM releases WHERE id = release_id
      )
    ) as is_following
  FROM purchase_items pi
  JOIN purchases p ON p.id = pi.purchase_id
  JOIN profiles pr ON pr.id = p.user_id
  WHERE pi.release_id = release_id
  AND p.status = 'completed'
  ORDER BY pi.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;