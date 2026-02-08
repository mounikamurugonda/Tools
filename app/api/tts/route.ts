
import { NextResponse } from 'next/server';
import { EdgeTTS } from 'edge-tts-universal';

export async function POST(req: Request) {
    try {
        const { text, voice } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        // Correct usage: text, voice, options
        // voice param in constructor is the voice name string
        const tts = new EdgeTTS(text, voice || 'en-US-AriaNeural', {
            // outputFormat is not directly supported in constructor options based on source,
            // but let's check if it's configurable. 
            // Source says options = { rate, volume, pitch }. 
            // outputFormat seems to be hardcoded in the library's `_stream` method context?
            // Actually line 449 in index.js shows outputFormat hardcoded to "audio-24khz-48kbitrate-mono-mp3".
            // So we can't change it easily via options, but that format is fine.
        });

        // Generate audio
        const result = await tts.synthesize();

        // result.audio is a Blob
        const audioBlob = result.audio;

        if (!audioBlob) {
            throw new Error('Failed to generate audio blob');
        }

        // Convert Blob to Buffer
        const arrayBuffer = await audioBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Return as stream/blob
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': buffer.length.toString(),
            },
        });

    } catch (error: any) {
        console.error('Edge TTS Error Details:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error', details: String(error) },
            { status: 500 }
        );
    }
}
