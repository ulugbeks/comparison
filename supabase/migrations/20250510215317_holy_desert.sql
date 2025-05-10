/*
  # Fix authentication system

  1. Changes
    - Add role column to auth.users table
    - Add trigger to set default role
    - Add policies for role-based access
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

-- Update shop owners policy
CREATE OR REPLACE POLICY "Shop owners can access their shops"
  ON shops FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM shop_owners 
      WHERE shop_id = id 
      AND user_id = auth.uid()
    )
  );

-- Insert test users with roles
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@test.com', crypt('admin123', gen_salt('bf')), now(), 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'shop@test.com', crypt('shop123', gen_salt('bf')), now(), 'shop'),
  ('00000000-0000-0000-0000-000000000003', 'user@test.com', crypt('user123', gen_salt('bf')), now(), 'user')
ON CONFLICT (id) DO UPDATE
SET role = EXCLUDED.role;

-- Insert test shop and owner
INSERT INTO shops (id, name, description, contact_email)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Test Shop',
  'Test shop description',
  'shop@test.com'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO shop_owners (shop_id, user_id)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002'
) ON CONFLICT (shop_id, user_id) DO NOTHING;