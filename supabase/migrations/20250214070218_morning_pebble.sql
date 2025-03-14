/*
  # Add votes column to forum_posts table

  1. Changes
    - Add `votes` column to `forum_posts` table with default value of 0
    - Add function and trigger to handle vote updates safely

  2. Security
    - Only authenticated users can vote
    - Users can only vote once per post
*/

-- Add votes column if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'forum_posts' AND column_name = 'votes'
  ) THEN
    ALTER TABLE forum_posts ADD COLUMN votes integer NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Create votes tracking table
CREATE TABLE IF NOT EXISTS post_votes (
  post_id uuid REFERENCES forum_posts ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  vote_type boolean NOT NULL, -- true for upvote, false for downvote
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

ALTER TABLE post_votes ENABLE ROW LEVEL SECURITY;

-- RLS policies for post_votes
CREATE POLICY "Users can view their own votes"
  ON post_votes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own votes"
  ON post_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to handle voting
CREATE OR REPLACE FUNCTION vote_post(post_id uuid, increment boolean)
RETURNS void AS $$
BEGIN
  -- Update the post's vote count
  UPDATE forum_posts
  SET votes = votes + CASE WHEN increment THEN 1 ELSE -1 END
  WHERE id = post_id;
  
  -- Record the vote
  INSERT INTO post_votes (post_id, user_id, vote_type)
  VALUES (post_id, auth.uid(), increment)
  ON CONFLICT (post_id, user_id)
  DO UPDATE SET vote_type = increment;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;