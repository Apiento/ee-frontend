/*
  # Add relationship between forum posts and profiles

  1. Changes
    - Add foreign key constraint from forum_posts.user_id to profiles.id
    - Update RLS policies to use auth.uid()

  2. Security
    - Maintain existing RLS policies
    - Ensure proper user authentication checks
*/

-- Add foreign key constraint to forum_posts
ALTER TABLE forum_posts
DROP CONSTRAINT IF EXISTS forum_posts_user_id_fkey,
ADD CONSTRAINT forum_posts_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES profiles(id)
  ON DELETE CASCADE;

-- Update RLS policies for better security
DROP POLICY IF EXISTS "Anyone can read forum posts" ON forum_posts;
DROP POLICY IF EXISTS "Users can create forum posts" ON forum_posts;

CREATE POLICY "Anyone can read forum posts"
  ON forum_posts
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create forum posts"
  ON forum_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);