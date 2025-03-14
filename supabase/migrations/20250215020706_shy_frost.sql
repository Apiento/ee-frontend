/*
  # Add Additional Artists and Releases

  1. New Data
    - Additional artists with their profiles
    - Additional releases for each artist
    - Sample purchases and interactions

  2. Changes
    - Insert new artists with avatar URLs
    - Insert corresponding releases with cover art
    - Create sample purchases and interactions
*/

-- Insert additional artists
INSERT INTO artists (name, avatar_url) VALUES
  ('Sonic Explorers', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80'),
  ('Digital Harmony', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80'),
  ('Quantum Sound Lab', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80'),
  ('Neural Beats', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&q=80'),
  ('Waveform Collective', 'https://images.unsplash.com/photo-1571935444382-b67f4c2087e4?w=300&q=80');

-- Insert additional releases
WITH new_artists AS (
  SELECT id, name FROM artists 
  WHERE name IN ('Sonic Explorers', 'Digital Harmony', 'Quantum Sound Lab', 'Neural Beats', 'Waveform Collective')
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
      'Cosmic Frequencies',
      (SELECT id FROM new_artists WHERE name = 'Sonic Explorers'),
      'A journey through space and sound',
      'https://images.unsplash.com/photo-1518972559570-7cc1309d3229?w=500&q=80',
      34.99,
      '2024-03-01',
      'Vinyl'
    ),
    (
      'Digital Dreams',
      (SELECT id FROM new_artists WHERE name = 'Digital Harmony'),
      'Electronic soundscapes and ambient textures',
      'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&q=80',
      29.99,
      '2024-03-05',
      'Digital'
    ),
    (
      'Quantum Resonance',
      (SELECT id FROM new_artists WHERE name = 'Quantum Sound Lab'),
      'Experimental electronic compositions',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80',
      39.99,
      '2024-03-10',
      'Vinyl'
    ),
    (
      'Neural Pathways',
      (SELECT id FROM new_artists WHERE name = 'Neural Beats'),
      'AI-generated electronic music explorations',
      'https://images.unsplash.com/photo-1518972559570-7cc1309d3229?w=500&q=80',
      24.99,
      '2024-03-15',
      'Digital'
    ),
    (
      'Harmonic Fields',
      (SELECT id FROM new_artists WHERE name = 'Waveform Collective'),
      'Collaborative electronic music project',
      'https://images.unsplash.com/photo-1571935444382-b67f4c2087e4?w=500&q=80',
      44.99,
      '2024-03-20',
      'Vinyl'
    ),
    (
      'Sonic Landscapes',
      (SELECT id FROM new_artists WHERE name = 'Sonic Explorers'),
      'Ambient soundscapes and field recordings',
      'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&q=80',
      29.99,
      '2024-03-25',
      'Digital'
    ),
    (
      'Digital Horizons',
      (SELECT id FROM new_artists WHERE name = 'Digital Harmony'),
      'Future-forward electronic compositions',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80',
      34.99,
      '2024-04-01',
      'Vinyl'
    ),
    (
      'Quantum Fields',
      (SELECT id FROM new_artists WHERE name = 'Quantum Sound Lab'),
      'Deep electronic explorations',
      'https://images.unsplash.com/photo-1518972559570-7cc1309d3229?w=500&q=80',
      19.99,
      '2024-04-05',
      'Digital'
    ),
    (
      'Neural Synthesis',
      (SELECT id FROM new_artists WHERE name = 'Neural Beats'),
      'AI-assisted modular synthesis',
      'https://images.unsplash.com/photo-1571935444382-b67f4c2087e4?w=500&q=80',
      49.99,
      '2024-04-10',
      'Vinyl'
    ),
    (
      'Waveform Theory',
      (SELECT id FROM new_artists WHERE name = 'Waveform Collective'),
      'Experimental electronic theory in practice',
      'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&q=80',
      29.99,
      '2024-04-15',
      'Digital'
    )
) AS new_releases(title, artist_id, description, cover_art, price, release_date, format);

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
  CROSS JOIN generate_series(1, 5) -- Each user makes 5 purchases
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