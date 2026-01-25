import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    try {
        const { data, error } = await supabase
            .from('snippets')
            .select('id, title, type, created_at, config, short_id, code_html, code_css, code_js, visits')
            .eq('is_public', true)
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            console.error('Supabase fetch library error:', error);
            throw error;
        }

        return NextResponse.json({
            snippets: data
        });
    } catch (error) {
        console.error('Get library error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
