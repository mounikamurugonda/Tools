import NextAuth from "next-auth";
import { supabase } from "@/lib/supabase";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt" as const, // Explicit cast to satisfy type
    },
    callbacks: {
        async signIn({ user }: { user: any }) {
            if (!user.email) {
                console.warn("⚠️ Sign-in user has no email");
                return false; // Reject sign-in if no email
            }

            console.log(`👤 User attempting sign-in: ${user.email}`);

            try {
                const { data, error } = await supabase
                    .from("users")
                    .upsert(
                        {
                            email: user.email,
                            name: user.name || null,
                            image: user.image || null,
                            updated_at: new Date().toISOString(),
                        },
                        {
                            onConflict: "email",
                            ignoreDuplicates: false // Ensure it updates existing users
                        }
                    )
                    .select();

                if (error) {
                    console.error("❌ Supabase user upsert failed:", {
                        code: error.code,
                        message: error.message,
                        details: error.details,
                        hint: error.hint
                    });
                    return false; // Prevent sign-in on error
                }

                console.log("✅ User upserted successfully:", data);
                return true;
            } catch (error) {
                console.error("❌ Unexpected error during user upsert:", error);
                return false; // Prevent sign-in on unexpected error
            }
        },
    },
};

const handler = NextAuth(authOptions);

export { authOptions };

export { handler as GET, handler as POST };
