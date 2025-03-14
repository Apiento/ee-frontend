/*
  # Additional Artists and Releases

  1. New Content
    - Add more artists and their releases
    - Create sample purchases
    - Add likes and follows

  2. Changes
    - Insert new artists with proper image field
    - Insert corresponding releases
    - Create sample purchase data
    - Add sample likes and follows
*/

-- Insert additional artists
INSERT INTO artists (name, image) VALUES
  ('Ambient Collective', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80'),
  ('Deep Techno Project', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80'),
  ('Future Bass Ensemble', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80'),
  ('Modular Synthesis Lab', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&q=80'),
  ('Analog Dreams', 'https://images.unsplash.com/photo-1571935444382-b67f4c2087e4?w=300&q=80');

-- Insert additional releases
WITH new_artists AS (
  SELECT id, name FROM artists 
  WHERE name IN ('Ambient Collective', 'Deep Techno Project', 'Future Bass Ensemble', 'Modular Synthesis Lab', 'Analog Dreams')
)
INSERT INTO releases (title, artist_id, description, cover_art, price, release_date, format)
SELECT
  title,
  artist_id,
  description,
  cover_art,
  price,
  release_date,
  format
FROM (
  VALUES
    (
      'Ethereal Landscapes',
      (SELECT id FROM new_artists WHERE name = 'Ambient Collective'),
      'Immersive ambient soundscapes',
      'https://images.unsplash.com/photo-1515104882246-2bbbf5680010?w=500&q=80',
      34.99,
      '2024-03-01',
      'Vinyl'
    ),
    (
      'Deep Space Transmissions',
      (SELECT id FROM new_artists WHERE name = 'Deep Techno Project'),
      'A journey through deep techno',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80',
      29.99,
      '2024-03-05',
      'Vinyl'
    ),
    (
      'Neural Networks',
      (SELECT id FROM new_artists WHERE name = 'Future Bass Ensemble'),
      'Future bass innovations',
      'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=500&q=80',
      19.99,
      '2024-03-10',
      'Digital'
    ),
    (
      'Voltage Control',
      (SELECT id FROM new_artists WHERE name = 'Modular Synthesis Lab'),
      'Modular synthesis experiments',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80',
      39.99,
      '2024-03-15',
      'Vinyl'
    ),
    (
      'Tape Memories',
      (SELECT id FROM new_artists WHERE name = 'Analog Dreams'),
      'Analog warmth and texture',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80',
      24.99,
      '2024-03-20',
      'Digital'
    ),
    (
      'Ambient Textures Vol. 1',
      (SELECT id FROM new_artists WHERE name = 'Ambient Collective'),
      'Evolving ambient landscapes',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80',
      29.99,
      '2024-03-25',
      'Digital'
    ),
    (
      'Techno Structures',
      (SELECT id FROM new_artists WHERE name = 'Deep Techno Project'),
      'Architectural techno',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80',
      34.99,
      '2024-04-01',
      'Vinyl'
    ),
    (
      'Future Frequencies',
      (SELECT id FROM new_artists WHERE name = 'Future Bass Ensemble'),
      'Next-generation bass music',
      'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500&q=80',
      24.99,
      '2024-04-05',
      'Digital'
    ),
    (
      'Modular Explorations',
      (SELECT id FROM new_artists WHERE name = 'Modular Synthesis Lab'),
      'Deep modular journeys',
      'https://images.unsplash.com/photo-1515104882246-2bbbf5680010?w=500&q=80',
      44.99,
      '2024-04-10',
      'Vinyl'
    ),
    (
      'Synthesizer Dreams',
      (SELECT id FROM new_artists WHERE name = 'Analog Dreams'),
      'Vintage synthesizer magic',
      'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&q=80',
      29.99,
      '2024-04-15',
      'Vinyl'
    )
) AS new_releases(title, artist_id, description, cover_art, price, release_date, format);

-- Create sample purchases and purchase items
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
  SELECT id FROM auth.users LIMIT 5
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
  SELECT id FROM auth.users LIMIT 5
)
INSERT INTO artist_follows (user_id, artist_id)
SELECT 
  u.id,
  a.id
FROM sample_users u
CROSS JOIN artists a
WHERE random() < 0.7 -- 70% chance of following each artist
ON CONFLICT DO NOTHING;