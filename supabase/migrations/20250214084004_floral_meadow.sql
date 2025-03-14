/*
  # Enhanced Forum Structure

  1. New Tables
    - `forum_categories` - Main forum categories
    - `forum_subcategories` - Subcategories within main categories
    - `forum_regions` - Geographic regions for location-based filtering
    - `forum_interests` - Interest tags for content filtering
    - `forum_posts_interests` - Many-to-many relationship between posts and interests
    - `forum_posts_regions` - Many-to-many relationship between posts and regions

  2. Security
    - Enable RLS on all tables
    - Add policies for public reading
    - Add policies for authenticated user actions

  3. Changes
    - Add new columns to forum_posts table
    - Add relationships between tables
*/

-- Forum Categories
CREATE TABLE IF NOT EXISTS forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum categories"
  ON forum_categories FOR SELECT
  USING (true);

-- Forum Subcategories
CREATE TABLE IF NOT EXISTS forum_subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES forum_categories NOT NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum subcategories"
  ON forum_subcategories FOR SELECT
  USING (true);

-- Forum Regions
CREATE TABLE IF NOT EXISTS forum_regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  parent_id uuid REFERENCES forum_regions,
  type text NOT NULL CHECK (type IN ('continent', 'country', 'state', 'city')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_regions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum regions"
  ON forum_regions FOR SELECT
  USING (true);

-- Forum Interests
CREATE TABLE IF NOT EXISTS forum_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum interests"
  ON forum_interests FOR SELECT
  USING (true);

-- Add new columns to forum_posts
ALTER TABLE forum_posts
ADD COLUMN IF NOT EXISTS subcategory_id uuid REFERENCES forum_subcategories,
ADD COLUMN IF NOT EXISTS is_pinned boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS last_activity_at timestamptz DEFAULT now();

-- Create junction tables
CREATE TABLE IF NOT EXISTS forum_posts_interests (
  post_id uuid REFERENCES forum_posts ON DELETE CASCADE,
  interest_id uuid REFERENCES forum_interests ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, interest_id)
);

ALTER TABLE forum_posts_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view post interests"
  ON forum_posts_interests FOR SELECT
  USING (true);

CREATE TABLE IF NOT EXISTS forum_posts_regions (
  post_id uuid REFERENCES forum_posts ON DELETE CASCADE,
  region_id uuid REFERENCES forum_regions ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, region_id)
);

ALTER TABLE forum_posts_regions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view post regions"
  ON forum_posts_regions FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS forum_posts_subcategory_idx ON forum_posts(subcategory_id);
CREATE INDEX IF NOT EXISTS forum_posts_last_activity_idx ON forum_posts(last_activity_at);
CREATE INDEX IF NOT EXISTS forum_subcategories_category_idx ON forum_subcategories(category_id);
CREATE INDEX IF NOT EXISTS forum_regions_parent_idx ON forum_regions(parent_id);

-- Function to update last activity timestamp
CREATE OR REPLACE FUNCTION update_post_last_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE forum_posts
  SET last_activity_at = now()
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last activity on new comments
CREATE TRIGGER update_post_activity
AFTER INSERT ON forum_comments
FOR EACH ROW
EXECUTE FUNCTION update_post_last_activity();

-- Insert initial categories
INSERT INTO forum_categories (name, slug, description, display_order) VALUES
('Music Production', 'music-production', 'Discuss music production techniques, gear, and software', 1),
('Events & Festivals', 'events-festivals', 'Find and discuss electronic music events worldwide', 2),
('Culture & Community', 'culture-community', 'Explore electronic music culture and community', 3),
('Technology', 'technology', 'Technical discussions about music technology', 4),
('Regional Scenes', 'regional-scenes', 'Local electronic music scenes and communities', 5),
('Industry & Business', 'industry-business', 'Music industry discussions and opportunities', 6);

-- Insert initial subcategories
INSERT INTO forum_subcategories (category_id, name, slug, description, display_order)
SELECT 
  id as category_id,
  'General Discussion' as name,
  slug || '-general' as slug,
  'General discussions about ' || name as description,
  1 as display_order
FROM forum_categories;

-- Insert some example regions
INSERT INTO forum_regions (name, slug, type) VALUES
('Europe', 'europe', 'continent'),
('North America', 'north-america', 'continent'),
('Asia', 'asia', 'continent');

-- Insert some example interests
INSERT INTO forum_interests (name, slug, description) VALUES
('Techno', 'techno', 'Techno music and culture'),
('House', 'house', 'House music and culture'),
('Ambient', 'ambient', 'Ambient and experimental music'),
('Modular Synthesis', 'modular-synthesis', 'Modular synthesizers and patching'),
('DJ Culture', 'dj-culture', 'DJ techniques and culture'),
('Live Performance', 'live-performance', 'Live electronic music performance');