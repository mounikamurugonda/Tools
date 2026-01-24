-- Add visits column to snippets table
ALTER TABLE snippets ADD COLUMN IF NOT EXISTS visits INTEGER DEFAULT 0;

-- Create function to increment visits
CREATE OR REPLACE FUNCTION increment_snippet_visits(snippet_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE snippets
  SET visits = COALESCE(visits, 0) + 1
  WHERE id = snippet_id;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION increment_snippet_visits(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_snippet_visits(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_snippet_visits(UUID) TO service_role;
