-- CodeCast: Add user_email to snippets for ownership management
-- Run this in your Supabase SQL Editor

ALTER TABLE snippets ADD COLUMN IF NOT EXISTS user_email TEXT;
