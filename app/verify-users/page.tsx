import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function VerifyUsersPage() {
    const { data: users, error } = await supabase.from("users").select("*");

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Supabase Users Verification</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error.message}</span>
                </div>
            )}
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
                <pre>{JSON.stringify(users, null, 2)}</pre>
            </div>
            <p className="mt-4 text-sm text-gray-500">
                Note: If this list is empty, try logging in with Google. If error says "permission denied", ensure RLS policies allow access or `SUPABASE_SERVICE_ROLE_KEY` is set in .env.local and used in `lib/supabase.ts`.
            </p>
        </div>
    );
}
