import type { NextAuthOptions } from "next-auth";
import { supabase } from "@/lib/supabase";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt" as const,
    },
    callbacks: {
        async signIn({ user }: { user: any }) {
            if (!user.email) {
                console.warn("⚠️ Sign-in user has no email");
                return false;
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
                            ignoreDuplicates: false
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
                    return false;
                }

                console.log("✅ User upserted successfully:", data);
                return true;
            } catch (error) {
                console.error("❌ Unexpected error during user upsert:", error);
                return false;
            }
        },
    },
};
