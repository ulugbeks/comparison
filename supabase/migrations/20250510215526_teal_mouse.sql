/*
  # Add user roles and shop authentication
  
  1. New Types
    - `user_role` enum type with values: 'user', 'shop', 'admin'
  
  2. Schema Changes
    - Add role column to auth.users table
    - Create trigger for setting default role
  
  3. Security
    - Enable RLS on shops table
    - Add policy for shop owners
*/

-- Add role type if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'shop', 'admin');
  END IF;
END $$;

-- Add role column to auth.users if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'role'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN role user_role DEFAULT 'user'::user_role;
  END IF;
END $$;

-- Function to set default role
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  -- Set default role if not specified
  IF NEW.role IS NULL THEN
    NEW.role = 'user'::user_role;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to set default role
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on shops table
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;

-- Create policy after enabling RLS
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Shop owners can access their shops" ON shops;
  
  CREATE POLICY "Shop owners can access their shops"
    ON shops FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM shop_owners 
        WHERE shop_id = id 
        AND user_id = auth.uid()
      )
    );
END $$;

-- Insert test users with roles
DO $$
BEGIN
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
  VALUES 
    ('00000000-0000-0000-0000-000000000001', 'admin@elkor.uz', crypt('admin123', gen_salt('bf')), now(), 'admin'),
    ('00000000-0000-0000-0000-000000000002', 'shop@elkor.uz', crypt('shop123', gen_salt('bf')), now(), 'shop'),
    ('00000000-0000-0000-0000-000000000003', 'user@elkor.uz', crypt('user123', gen_salt('bf')), now(), 'user')
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    encrypted_password = EXCLUDED.encrypted_password,
    role = EXCLUDED.role;
END $$;

-- Insert test shop and owner
DO $$
DECLARE
  v_shop_id uuid := '00000000-0000-0000-0000-000000000001';
  v_user_id uuid := '00000000-0000-0000-0000-000000000002';
BEGIN
  -- Insert shop
  INSERT INTO shops (id, name, description, contact_email)
  VALUES (
    v_shop_id,
    'Test Shop',
    'Test shop description',
    'shop@elkor.uz'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    contact_email = EXCLUDED.contact_email;

  -- Insert shop owner
  INSERT INTO shop_owners (shop_id, user_id)
  VALUES (v_shop_id, v_user_id)
  ON CONFLICT (shop_id, user_id) DO NOTHING;
END $$;