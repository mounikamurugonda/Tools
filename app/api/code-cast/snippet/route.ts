import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { randomBytes } from 'crypto';

const generateShortId = () => {
    // Generate a random 6-character string (base62-ish safe)
    // Using hex is easiest (3 bytes = 6 hex chars)
    return randomBytes(3).toString('hex');
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, title, code, config, is_public } = body;

        // Validate required fields
        if (!type || !code) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('snippets')
            .insert([
                {
                    type,
                    title: title || 'Untitled Snippet',
                    code_html: code.html || '',
                    code_css: code.css || '',
                    code_js: code.js || '',
                    config: config || {},
                    short_id: generateShortId(),
                    is_public: !!is_public,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        return NextResponse.json({ success: true, snippet: data });
    } catch (error) {
        console.error('Save snippet error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save snippet' },
            { status: 500 }
        );
    }
}
