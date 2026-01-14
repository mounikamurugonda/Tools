import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabase";
import { authOptions } from "../auth/[...nextauth]/route";

// We need to import the authOptions properly. 
// Looking at route.ts: `const handler = NextAuth({...})`. `export { handler as GET, handler as POST }`.
// Unlike pages router, App router route.ts exports the handler.
// We can't easily extract the options object if it's passed directly to NextAuth().
// Workaround: Use `getServerSession` without options? No, it usually requires them.
// Let's rely on NextAuth to handle session validation or duplicate the minimal config if needed.
// actually getServerSession from "next-auth" generally works if you pass the authOptions object.
// If the user's route.ts doesn't export the options object separately, we might have trouble.
// Let's check route.ts again.
// It exports GET and POST.
// We can modify route.ts to export authOptions if needed.

export async function GET(req: Request) {
    const session = await getServerSession(authOptions); // Try without options first, sometimes works in App Router if NEXTAUTH_SECRET is set

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // 1. Get User ID
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (userError || !user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Get Favorites
    const { data: favorites, error: favError } = await supabase
        .from("favorite_tools")
        .select("tool_id")
        .eq("user_id", user.id);

    if (favError) {
        return NextResponse.json({ error: favError.message }, { status: 500 });
    }

    return NextResponse.json({ favorites: favorites.map((f) => f.tool_id) });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId, action } = await req.json(); // action: 'add' | 'remove'

    if (!toolId || !action) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const email = session.user.email;

    // 1. Get User ID
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (userError || !user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (action === "add") {
        const { error } = await supabase
            .from("favorite_tools")
            .insert({ user_id: user.id, tool_id: toolId });

        // Ignore duplicate key error (already favorited)
        if (error && error.code !== '23505') {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else if (action === "remove") {
        const { error } = await supabase
            .from("favorite_tools")
            .delete()
            .match({ user_id: user.id, tool_id: toolId });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    return NextResponse.json({ success: true });
}
