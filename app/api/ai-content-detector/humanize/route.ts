import { NextRequest, NextResponse } from 'next/server';

const SARVAM_API = 'https://api.sarvam.ai/v1/chat/completions';

const HUMANIZE_SYSTEM_PROMPT = `You are a humanization expert who rewrites AI-generated text to sound authentically human.

For each sentence provided, rewrite it to:
- Remove corporate/AI jargon: "furthermore", "moreover", "leverage", "utilize", "demonstrate", "aforementioned", "synergistic", "holistic", "comprehensive"
- Use natural, conversational phrasing
- Vary sentence structure — mix short punchy sentences with longer ones
- Add mild hedging or personal voice where natural ("honestly", "the truth is", "to be fair", "I think")
- Keep all facts, data, and meaning exactly intact
- Sound like a thoughtful, knowledgeable human writer — not corporate, not stiff

Return ONLY valid JSON (no markdown):
{
  "sentences": [
    { "original": "<exact original sentence>", "humanized": "<rewritten version>" }
  ]
}`;

export interface HumanizeSentence {
    original: string;
    humanized: string;
    aiProbability: number;
}

export interface HumanizeResponse {
    humanizedText: string;
    changes: HumanizeSentence[];
    totalChanged: number;
}

import { SentenceScore } from '../../../product/ai-content-detector/types';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const text: string = typeof body?.text === 'string' ? body.text.trim() : '';
        const sentenceScores: SentenceScore[] = body?.sentenceScores || [];

        if (!text || sentenceScores.length === 0) {
            return NextResponse.json({ error: 'Text and sentence scores are required.' }, { status: 400 });
        }

        const apiKey = process.env.NEXT_PUBLIC_SARVAM_API_KEY || '';
        if (!apiKey) {
            return NextResponse.json({ error: 'AI humanization is not available.' }, { status: 503 });
        }

        // Only humanize sentences with AI probability >= 55%
        const aiSentences = sentenceScores.filter(s => s.aiProbability >= 55);
        if (aiSentences.length === 0) {
            return NextResponse.json({
                humanizedText: text,
                changes: [],
                totalChanged: 0,
            } satisfies HumanizeResponse);
        }

        const userMessage = `Rewrite these AI-detected sentences to sound naturally human. Keep all facts intact.

Sentences to rewrite:
${aiSentences.map((s, i) => `${i + 1}. "${s.text}"`).join('\n')}`;

        const response = await fetch(SARVAM_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-subscription-key': apiKey,
            },
            body: JSON.stringify({
                model: 'sarvam-m',
                messages: [
                    { role: 'system', content: HUMANIZE_SYSTEM_PROMPT },
                    { role: 'user', content: userMessage },
                ],
                temperature: 0.7,   // higher temp = more natural/varied
                max_tokens: 2000,
                top_p: 0.95,
            }),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Humanization failed. Please try again.' }, { status: 502 });
        }

        const data = await response.json();
        const raw: string = data?.choices?.[0]?.message?.content || '';

        // Clean and parse
        const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (!Array.isArray(parsed?.sentences)) {
            throw new Error('Invalid response format');
        }

        // Build a map: original sentence text → humanized version
        const replacements = new Map<string, string>();
        const changes: HumanizeSentence[] = [];

        for (const item of parsed.sentences) {
            if (typeof item.original === 'string' && typeof item.humanized === 'string') {
                const origSentence = sentenceScores.find(s =>
                    s.text.trim().toLowerCase().includes(item.original.trim().toLowerCase().slice(0, 40))
                );
                replacements.set(item.original.trim(), item.humanized.trim());
                changes.push({
                    original: item.original.trim(),
                    humanized: item.humanized.trim(),
                    aiProbability: origSentence?.aiProbability ?? 70,
                });
            }
        }

        // Apply replacements to full text
        let humanizedText = text;
        for (const [orig, rewrite] of replacements) {
            // Fuzzy replace - find substring
            const idx = humanizedText.indexOf(orig);
            if (idx !== -1) {
                humanizedText = humanizedText.slice(0, idx) + rewrite + humanizedText.slice(idx + orig.length);
            }
        }

        return NextResponse.json({
            humanizedText,
            changes,
            totalChanged: changes.length,
        } satisfies HumanizeResponse);

    } catch (err) {
        console.error('[truth-scan humanize]', err);
        return NextResponse.json({ error: 'Humanization failed. Please try again.' }, { status: 500 });
    }
}
