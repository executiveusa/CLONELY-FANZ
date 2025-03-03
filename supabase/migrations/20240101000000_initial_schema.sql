-- Create avatars table
CREATE TABLE IF NOT EXISTS avatars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  niche TEXT NOT NULL,
  is_nsfw BOOLEAN DEFAULT FALSE,
  reddit_automation BOOLEAN DEFAULT FALSE,
  subscriber_count INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view all avatars
CREATE POLICY "Avatars are viewable by everyone" 
  ON avatars FOR SELECT USING (true);

-- Allow authenticated users to create avatars
CREATE POLICY "Users can create their own avatars" 
  ON avatars FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own avatars
CREATE POLICY "Users can update their own avatars" 
  ON avatars FOR UPDATE TO authenticated 
  USING (auth.uid() = user_id);

-- Allow users to delete their own avatars
CREATE POLICY "Users can delete their own avatars" 
  ON avatars FOR DELETE TO authenticated 
  USING (auth.uid() = user_id);

-- Enable realtime subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE avatars;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on avatars
CREATE TRIGGER update_avatars_updated_at
BEFORE UPDATE ON avatars
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
