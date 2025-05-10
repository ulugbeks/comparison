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

-- Create policies for shops table
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Shop owners can access their shops" ON shops;
  DROP POLICY IF EXISTS "Shops are viewable by everyone" ON shops;
  
  -- Allow public to view shops
  CREATE POLICY "Shops are viewable by everyone"
    ON shops FOR SELECT
    TO public
    USING (true);

  -- Allow shop owners to manage their shops  
  CREATE POLICY "Shop owners can manage their shops"
    ON shops FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM shop_owners 
        WHERE shop_owners.shop_id = shops.id 
        AND shop_owners.user_id = auth.uid()
      )
    );
END $$;

-- Insert test shop owner user with all required fields
DO $$
BEGIN
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    role,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token,
    aud,
    confirmation_sent_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'shop@elkor.uz',
    crypt('shop123', gen_salt('bf')),
    now(),
    'shop',
    '{"provider":"email","providers":["email"]}',
    '{"name":"Elkor Shop"}',
    now(),
    now(),
    '',
    '',
    '',
    '',
    'authenticated',
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    encrypted_password = EXCLUDED.encrypted_password,
    role = EXCLUDED.role,
    raw_app_meta_data = EXCLUDED.raw_app_meta_data,
    raw_user_meta_data = EXCLUDED.raw_user_meta_data,
    updated_at = now();
END $$;

-- Insert test shop and owner relationship
DO $$
DECLARE
  v_shop_id uuid := '00000000-0000-0000-0000-000000000001';
  v_user_id uuid := '00000000-0000-0000-0000-000000000002';
BEGIN
  -- Insert or update shop
  INSERT INTO shops (
    id,
    name,
    description,
    contact_email,
    contact_phone,
    address
  ) VALUES (
    v_shop_id,
    'Elkor Shop',
    'Your trusted electronics store in Tashkent',
    'shop@elkor.uz',
    '+998 90 123 45 67',
    'Tashkent, Chilanzar district'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone,
    address = EXCLUDED.address;

  -- Insert shop owner relationship
  INSERT INTO shop_owners (shop_id, user_id)
  VALUES (v_shop_id, v_user_id)
  ON CONFLICT (shop_id, user_id) DO NOTHING;
END $$;