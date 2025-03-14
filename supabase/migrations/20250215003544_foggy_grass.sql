/*
  # Insert sample data for store

  1. Sample Data
    - Artists with bios and avatars
    - Releases with descriptions and cover art
    - Sample purchases and likes
    - Sample follows

  2. Changes
    - Inserts sample data into existing tables
    - No schema changes
*/

-- Insert sample artists
INSERT INTO artists (name, bio, avatar_url) VALUES
  ('Stellar Dreams', 'Creating ethereal soundscapes and ambient textures', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80'),
  ('Metro Rhythm', 'Detroit techno meets deep house grooves', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80'),
  ('Bass Horizon', 'Exploring the frontiers of bass music', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80'),
  ('Ambient Collective', 'Pioneering ambient and experimental music', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80'),
  ('Deep Techno Project', 'Exploring the depths of techno', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80'),
  ('Future Bass Ensemble', 'Cutting-edge bass music', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80'),
  ('Modular Synthesis Lab', 'Experimental modular synthesis', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&q=80'),
  ('Analog Dreams', 'Vintage synthesizer explorations', 'https://images.unsplash.com/photo-1571935444382-b67f4c2087e4?w=300&q=80')
ON CONFLICT (id) DO NOTHING;

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
    ('Deep Space Transmissions', 'Deep Techno Project', 'A journey through deep techno', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80', 29.99, '2024-03-05', 'Vinyl'),
    ('Neural Networks', 'Future Bass Ensemble', 'Future bass innovations', 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=500&q=80', 19.99, '2024-03-10', 'Digital'),
    ('Voltage Control', 'Modular Synthesis Lab', 'Modular synthesis experiments', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80', 39.99, '2024-03-15', 'Vinyl'),
    ('Tape Memories', 'Analog Dreams', 'Analog warmth and texture', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80', 24.99, '2024-03-20', 'Digital'),
    ('Ambient Textures Vol. 1', 'Ambient Collective', 'Evolving ambient landscapes', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80', 29.99, '2024-03-25', 'Digital'),
    ('Techno Structures', 'Deep Techno Project', 'Architectural techno', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80', 34.99, '2024-04-01', 'Vinyl')
) AS new_releases(title, artist_name, description, cover_art, price, release_date, format)
ON CONFLICT (id) DO NOTHING;

-- Insert sample profiles if they don't exist
INSERT INTO profiles (id, username, avatar_url)
SELECT 
  gen_random_uuid(),
  username,
  avatar_url
FROM (VALUES 
  ('Sarah Chen', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&q=80'),
  ('Michael Kim', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80'),
  ('Emma Thompson', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&q=80'),
  ('David Wilson', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80'),
  ('Alex Rivera', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&q=80')
) AS sample_profiles(username, avatar_url)
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE username = sample_profiles.username
)
RETURNING id, username;

-- Create sample purchases and purchase items
WITH sample_users AS (
  SELECT id FROM profiles LIMIT 5
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
  r.price
FROM new_purchases p
CROSS JOIN LATERAL (
  SELECT id, price
  FROM releases 
  ORDER BY random() 
  LIMIT 1
) r;

-- Add likes and follows
WITH sample_users AS (
  SELECT id FROM profiles LIMIT 5
)
INSERT INTO release_likes (user_id, release_id)
SELECT 
  u.id,
  r.id
FROM sample_users u
CROSS JOIN releases r
WHERE random() < 0.7 -- 70% chance of liking each release
ON CONFLICT DO NOTHING;

WITH sample_users AS (
  SELECT id FROM profiles LIMIT 5
)
INSERT INTO artist_follows (user_id, artist_id)
SELECT 
  u.id,
  a.id
FROM sample_users u
CROSS JOIN artists a
WHERE random() < 0.7 -- 70% chance of following each artist
ON CONFLICT DO NOTHING;