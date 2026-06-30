import { createClient } from '@supabase/supabase-js';

// Use service role key for server-side operations (bypasses RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.tools_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.tools_SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("❌ Supabase URL or Service Role Key is missing! Check your .env.local file.");
}

console.log(`✅ Supabase Server Client Initialized with Service Role Key`);

// Create server-side client with service role (bypasses RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
