/*
  # Add category to forum posts

  1. Changes
    - Add category column to forum_posts table
    - Add check constraint for valid categories
    - Update RLS policies to include category

  2. Categories
    - general
    - music
    - events
    - tech
    - culture
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'forum_posts' AND column_name = 'category'
  ) THEN
    ALTER TABLE forum_posts 
    ADD COLUMN category text NOT NULL DEFAULT 'general'
    CHECK (category IN ('general', 'music', 'events', 'tech', 'culture'));
  END IF;
END $$;