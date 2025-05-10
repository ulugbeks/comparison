/*
  # Shop and User Management Schema

  1. New Tables
    - `shops`: Store shop information
    - `shop_owners`: Link shops to their owners
    - `shop_reviews`: Store shop reviews and ratings
    - `wishlists`: Store user product wishlists

  2. Security
    - Enable RLS on all tables
    - Add policies for public viewing and authenticated actions
    
  3. Test Data
    - Create test users
    - Create a test shop with owner
*/

-- Create shops table
CREATE TABLE IF NOT EXISTS shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  contact_email text,
  contact_phone text,
  address text,
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create shop owners table
CREATE TABLE IF NOT EXISTS shop_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid REFERENCES shops(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(shop_id, user_id)
);

-- Create shop reviews table
CREATE TABLE IF NOT EXISTS shop_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid REFERENCES shops(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Policies for shops
CREATE POLICY "Shops are viewable by everyone" 
  ON shops FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Shops can be updated by owners" 
  ON shops FOR UPDATE 
  TO authenticated 
  USING (auth.uid() IN (
    SELECT user_id FROM shop_owners WHERE shop_id = id
  ));

-- Policies for shop owners
CREATE POLICY "Shop owners are viewable by everyone"
  ON shop_owners FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage shop owners"
  ON shop_owners FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id AND role = 'admin'
    )
  );

-- Policies for shop reviews
CREATE POLICY "Reviews are viewable by everyone" 
  ON shop_reviews FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Users can create reviews" 
  ON shop_reviews FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
  ON shop_reviews FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Policies for wishlists
CREATE POLICY "Users can view their own wishlists" 
  ON wishlists FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their wishlists" 
  ON wishlists FOR ALL 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create test users
DO $$
BEGIN
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
  VALUES 
    ('00000000-0000-0000-0000-000000000001', 'admin@elkor.uz', crypt('admin123', gen_salt('bf')), now(), 'admin'),
    ('00000000-0000-0000-0000-000000000002', 'shop@elkor.uz', crypt('shop123', gen_salt('bf')), now(), 'shop'),
    ('00000000-0000-0000-0000-000000000003', 'user@elkor.uz', crypt('user123', gen_salt('bf')), now(), 'user');
EXCEPTION 
  WHEN unique_violation THEN 
    NULL;
END $$;

-- Insert test shop and owner
DO $$
DECLARE
  shop_id uuid;
BEGIN
  INSERT INTO shops (id, name, description, contact_email, contact_phone)
  VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Test Shop',
    'This is a test shop for demonstration purposes',
    'shop@elkor.uz',
    '+998 90 123 45 67'
  )
  RETURNING id INTO shop_id;

  INSERT INTO shop_owners (shop_id, user_id)
  VALUES (shop_id, '00000000-0000-0000-0000-000000000002');
EXCEPTION 
  WHEN unique_violation THEN 
    NULL;
END $$;