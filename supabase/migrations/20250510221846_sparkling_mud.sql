-- Create test users first
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
) VALUES 
  (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'sarah@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    'user',
    '{"provider":"email","providers":["email"]}',
    '{"name":"Sarah Johnson"}',
    now(),
    now(),
    '',
    '',
    '',
    '',
    'authenticated',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000000',
    'alex@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    'user',
    '{"provider":"email","providers":["email"]}',
    '{"name":"Alex Chen"}',
    now(),
    now(),
    '',
    '',
    '',
    '',
    'authenticated',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000000',
    'aziz@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    'user',
    '{"provider":"email","providers":["email"]}',
    '{"name":"Aziz Karimov"}',
    now(),
    now(),
    '',
    '',
    '',
    '',
    'authenticated',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000000',
    'maria@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    'user',
    '{"provider":"email","providers":["email"]}',
    '{"name":"Maria Petrova"}',
    now(),
    now(),
    '',
    '',
    '',
    '',
    'authenticated',
    now()
  )
ON CONFLICT (id) DO NOTHING;

-- Add sample reviews
INSERT INTO shop_reviews (
  shop_id,
  user_id,
  rating,
  comment,
  user_name,
  created_at
) VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000003',
    5,
    'Great electronics store with excellent customer service! They helped me find exactly what I needed and offered competitive prices.',
    'Sarah Johnson',
    now() - interval '5 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000004',
    4,
    'Good selection of products and fast delivery. The staff is knowledgeable and friendly.',
    'Alex Chen',
    now() - interval '3 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000005',
    5,
    'Best prices in Tashkent for electronics! I always check here first before buying anywhere else.',
    'Aziz Karimov',
    now() - interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000006',
    4,
    'Very reliable shop with genuine products. The warranty service is also excellent.',
    'Maria Petrova',
    now() - interval '1 day'
  );