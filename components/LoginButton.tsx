'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import Image from "next/image";

// Reusing the Tooltip Wrapper pattern from CodeCastHeader if possible, 
// or I can export it, but for now I'll just make a simple one or use standard title attribute if I want to keep it simple.
// Or actually, I'll just use the button style.

export default function LoginButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <button
                onClick={() => signOut()}
                className="w-9 h-9 sm:w-auto sm:h-auto flex items-center justify-center gap-2 sm:px-3 sm:py-1.5 rounded-lg font-bold text-xs transition-all bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                title="Sign out"
            >
                {session.user?.image ? (
                    <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={20}
                        height={20}
                        className="rounded-full w-5 h-5 sm:w-4 sm:h-4"
                    />
                ) : (
                    <User size={18} className="sm:w-3.5 sm:h-3.5" />
                )}
                <span className="hidden sm:inline">{session.user?.name?.split(' ')[0] || 'User'}</span>
                {/* Hide Logout icon on mobile since Avatar is the button */}
                <LogOut size={14} className="ml-1 hidden sm:block" />
            </button>
        );
    }

    return (
        <button
            onClick={() => signIn("google")}
            className="w-9 h-9 sm:w-auto sm:h-auto flex items-center justify-center gap-2 sm:px-3 sm:py-1.5 rounded-lg font-bold text-xs transition-all bg-blue-600 hover:bg-blue-700 text-white"
        >
            <LogIn size={18} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Sign In</span>
        </button>
    );
}
