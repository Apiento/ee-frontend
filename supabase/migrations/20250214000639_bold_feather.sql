/*
  # Initial Schema Setup

  1. New Tables
    - users (handled by Supabase Auth)
    - forum_posts
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
    - forum_comments
      - id (uuid, primary key)
      - content (text)
      - post_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
    - products
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - price (numeric)
      - file_url (text)
      - created_at (timestamp)
    - purchases
      - id (uuid, primary key)
      - product_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
    - events
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - date (timestamp)
      - location (text)
      - price (numeric)
      - capacity (integer)
      - created_at (timestamp)
    - tickets
      - id (uuid, primary key)
      - event_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Forum Posts
CREATE TABLE forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read forum posts"
  ON forum_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum posts"
  ON forum_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Forum Comments
CREATE TABLE forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  post_id uuid REFERENCES forum_posts NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read forum comments"
  ON forum_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum comments"
  ON forum_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Products
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  file_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- Purchases
CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases"
  ON purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create purchases"
  ON purchases
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Events
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  capacity integer NOT NULL CHECK (capacity > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Tickets
CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can purchase tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX forum_posts_user_id_idx ON forum_posts(user_id);
CREATE INDEX forum_comments_post_id_idx ON forum_comments(post_id);
CREATE INDEX forum_comments_user_id_idx ON forum_comments(user_id);
CREATE INDEX purchases_user_id_idx ON purchases(user_id);
CREATE INDEX purchases_product_id_idx ON purchases(product_id);
CREATE INDEX tickets_user_id_idx ON tickets(user_id);
CREATE INDEX tickets_event_id_idx ON tickets(event_id);