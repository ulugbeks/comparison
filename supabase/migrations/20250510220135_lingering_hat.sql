/*
  # Add social links and enhance reviews

  1. New Columns
    - Add website_url and telegram_url to shops table
    - Add user_name to shop_reviews table
    
  2. Changes
    - Update existing shop data with social links
    - Enhance review policies
*/

-- Add social links to shops table
ALTER TABLE shops 
ADD COLUMN IF NOT EXISTS website_url text,
ADD COLUMN IF NOT EXISTS telegram_url text;

-- Add user_name to shop_reviews
ALTER TABLE shop_reviews
ADD COLUMN IF NOT EXISTS user_name text;

-- Update existing shop data
UPDATE shops 
SET 
  website_url = 'https://elkor.uz',
  telegram_url = 'https://t.me/elkoruz'
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Enhance review policies
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON shop_reviews;
  DROP POLICY IF EXISTS "Users can create reviews" ON shop_reviews;
  DROP POLICY IF EXISTS "Users can update their own reviews" ON shop_reviews;
  
  -- Create new policies
  CREATE POLICY "Reviews are viewable by everyone"
    ON shop_reviews FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Users can create reviews"
    ON shop_reviews FOR INSERT
    TO authenticated
    WITH CHECK (
      auth.uid() = user_id AND
      NOT EXISTS (
        SELECT 1 FROM shop_reviews
        WHERE shop_id = shop_reviews.shop_id
        AND user_id = auth.uid()
      )
    );

  CREATE POLICY "Users can update their own reviews"
    ON shop_reviews FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can delete their own reviews"
    ON shop_reviews FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
END $$;