import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { data, error } = await supabase
            .from('snippets')
            .select('id, title, type, created_at, config, short_id, code_html, code_css, code_js, visits')
            .eq('user_email', session.user.email)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Supabase fetch snippets error:', error);
            throw error;
        }

        return NextResponse.json({
            snippets: data
        });
    } catch (error) {
        console.error('Get snippets error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
