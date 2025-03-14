/*
  # Add votes to forum comments

  1. Changes
    - Add votes column to forum_comments table
    - Add votes tracking for comments
    - Add function to handle comment voting

  2. Security
    - Enable RLS on comment_votes table
    - Add policies for vote tracking
*/

-- Add votes column to forum_comments
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'forum_comments' AND column_name = 'votes'
  ) THEN
    ALTER TABLE forum_comments ADD COLUMN votes integer NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Create comment votes tracking table
CREATE TABLE IF NOT EXISTS comment_votes (
  comment_id uuid REFERENCES forum_comments ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  vote_type boolean NOT NULL, -- true for upvote, false for downvote
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (comment_id, user_id)
);

ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

-- RLS policies for comment_votes
CREATE POLICY "Users can view their own comment votes"
  ON comment_votes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own comment votes"
  ON comment_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to handle comment voting
CREATE OR REPLACE FUNCTION vote_comment(comment_id uuid, increment boolean)
RETURNS void AS $$
BEGIN
  -- Update the comment's vote count
  UPDATE forum_comments
  SET votes = votes + CASE WHEN increment THEN 1 ELSE -1 END
  WHERE id = comment_id;
  
  -- Record the vote
  INSERT INTO comment_votes (comment_id, user_id, vote_type)
  VALUES (comment_id, auth.uid(), increment)
  ON CONFLICT (comment_id, user_id)
  DO UPDATE SET vote_type = increment;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;