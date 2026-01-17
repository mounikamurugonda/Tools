import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.redirect(new URL('/product/code-cast/animate', request.url));
    }

    try {
        const { data, error } = await supabase
            .from('snippets')
            .select('id, type')
            .eq('short_id', id)
            .single();

        if (error || !data) {
            // Fallback: Check if it's a UUID (direct ID access via short link?)
            // or just redirect to home
            return NextResponse.redirect(new URL('/product/code-cast/animate', request.url));
        }

        // Redirect to the actual tool with the full ID
        const url = new URL(`/product/code-cast/${data.type}`, request.url);
        url.searchParams.set('snippet', data.id);
        return NextResponse.redirect(url);

    } catch (error) {
        console.error('Redirect error:', error);
        return NextResponse.redirect(new URL('/product/code-cast/animate', request.url));
    }
}
