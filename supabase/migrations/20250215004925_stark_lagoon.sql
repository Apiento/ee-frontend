/*
  # Add sample purchase data

  1. New Data
    - Sample user profiles with realistic data
    - Purchase records for releases
    - Purchase items linking users to releases
    - Sample release likes and artist follows

  2. Changes
    - Adds realistic purchase history
    - Creates relationships between users and releases
    - Establishes user engagement patterns

  3. Security
    - Maintains existing RLS policies
    - No changes to security settings
*/

-- Insert sample profiles with realistic data
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
  ('Alex Rivera', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&q=80'),
  ('Nina Patel', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&q=80'),
  ('Marcus Johnson', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&q=80'),
  ('Sophie Martin', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&q=80'),
  ('James Lee', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&q=80'),
  ('Olivia Brown', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&q=80')
) AS sample_profiles(username, avatar_url)
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE username = sample_profiles.username
)
RETURNING id, username;

-- Create purchases with realistic timestamps
WITH profile_ids AS (
  SELECT id, username FROM profiles
  WHERE username IN (
    'Sarah Chen', 'Michael Kim', 'Emma Thompson', 'David Wilson', 'Alex Rivera',
    'Nina Patel', 'Marcus Johnson', 'Sophie Martin', 'James Lee', 'Olivia Brown'
  )
),
release_data AS (
  SELECT id, price FROM releases
),
new_purchases AS (
  INSERT INTO purchases (user_id, status, created_at)
  SELECT 
    profile_ids.id,
    'completed',
    -- Generate timestamps between 1 and 30 days ago
    now() - (random() * interval '30 days')
  FROM profile_ids
  CROSS JOIN generate_series(1, 5) -- Each user makes up to 5 purchases
  WHERE random() < 0.8 -- 80% chance of making each purchase
  RETURNING id, user_id, created_at
)
INSERT INTO purchase_items (purchase_id, release_id, price)
SELECT 
  p.id,
  r.id,
  r.price
FROM new_purchases p
CROSS JOIN LATERAL (
  SELECT id, price
  FROM release_data
  ORDER BY random()
  LIMIT 1
) r;

-- Add release likes with timestamps
WITH profile_ids AS (
  SELECT id FROM profiles
),
release_ids AS (
  SELECT id FROM releases
)
INSERT INTO release_likes (user_id, release_id, created_at)
SELECT 
  p.id,
  r.id,
  now() - (random() * interval '60 days')
FROM profile_ids p
CROSS JOIN release_ids r
WHERE random() < 0.4 -- 40% chance of liking each release
ON CONFLICT DO NOTHING;

-- Add artist follows with timestamps
WITH profile_ids AS (
  SELECT id FROM profiles
),
artist_ids AS (
  SELECT id FROM artists
)
INSERT INTO artist_follows (user_id, artist_id, created_at)
SELECT 
  p.id,
  a.id,
  now() - (random() * interval '90 days')
FROM profile_ids p
CROSS JOIN artist_ids a
WHERE random() < 0.5 -- 50% chance of following each artist
ON CONFLICT DO NOTHING;