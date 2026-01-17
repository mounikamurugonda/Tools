import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: 'Snippet ID is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('snippets')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Supabase fetch error:', error);
            return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
        }

        return NextResponse.json({
            snippet: {
                id: data.id,
                type: data.type,
                title: data.title,
                code: {
                    html: data.code_html || '',
                    css: data.code_css || '',
                    js: data.code_js || '',
                },
                config: data.config,
                created_at: data.created_at,
            }
        });
    } catch (error) {
        console.error('Get snippet error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
