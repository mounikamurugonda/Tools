import { NextRequest, NextResponse } from 'next/server';
import { DetectionResult, SentenceScore, StatisticalSignals, DetectionVerdict, ConfidenceLevel } from '../../../product/ai-content-detector/types';

const GEMINI_API =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
const MIN_CHARS = 50;
const MAX_CHARS = 10000;

// ─── Layer 1: Statistical / Linguistic Analysis ────────────────────────────

function tokenize(text: string): string[] {
    return text.toLowerCase().match(/\b\w+\b/g) || [];
}

function splitSentences(text: string): string[] {
    return text
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 3);
}

function computeSignals(text: string): StatisticalSignals & { wordCount: number } {
    const sentences = splitSentences(text);
    const words = tokenize(text);
    const wordCount = words.length;

    // Perplexity Proxy: variance in word lengths (short avg = predictable)
    const wordLengths = words.map(w => w.length);
    const avgWordLen = wordLengths.reduce((a, b) => a + b, 0) / (wordLengths.length || 1);
    const perplexityScore = Math.min(100, Math.round(((avgWordLen - 3.5) / 3.5) * 100));

    // Burstiness: std dev of sentence lengths
    const sentLengths = sentences.map(s => tokenize(s).length);
    const avgSentLen = sentLengths.reduce((a, b) => a + b, 0) / (sentLengths.length || 1);
    const variance = sentLengths.reduce((acc, l) => acc + Math.pow(l - avgSentLen, 2), 0) / (sentLengths.length || 1);
    const stdDev = Math.sqrt(variance);
    const burstinenessScore = Math.min(100, Math.round((stdDev / 8) * 100)); // >8 stddev = very bursty (human)

    // Sentence Variance: coefficient of variation
    const cv = avgSentLen > 0 ? stdDev / avgSentLen : 0;
    const sentenceVariance = Math.min(100, Math.round(cv * 150));

    // Vocabulary Richness: Type-Token Ratio (unique / total)
    const unique = new Set(words).size;
    const ttr = wordCount > 0 ? unique / wordCount : 0;
    const vocabularyRichness = Math.min(100, Math.round(ttr * 120));

    // Repetition Index: bigram repeats
    const bigrams: string[] = [];
    for (let i = 0; i < words.length - 1; i++) bigrams.push(`${words[i]} ${words[i + 1]}`);
    const bigramCounts = bigrams.reduce((acc: Record<string, number>, b) => { acc[b] = (acc[b] || 0) + 1; return acc; }, {});
    const repeatedBigrams = Object.values(bigramCounts).filter(c => c > 1).length;
    const repetitionIndex = Math.min(100, Math.round((repeatedBigrams / (bigrams.length || 1)) * 200));

    // AI Phrase Density: count known AI filler / transition words
    const AI_PHRASES = [
        'furthermore', 'moreover', 'additionally', 'notably', 'importantly',
        'it is worth noting', 'it is important to note', 'in conclusion',
        'to summarize', 'in summary', 'overall', 'ultimately', 'significantly',
        'demonstrates', 'demonstrate', 'leveraging', 'leverage', 'utilize',
        'utilizing', 'optimal', 'optimally', 'synergistic', 'synergies',
        'proactive', 'holistic', 'robust', 'comprehensive', 'aforementioned',
        'aforementioned', 'it is clear that', 'clearly', 'undoubtedly',
        'needless to say', 'as mentioned', 'as discussed',
    ];
    const lowerText = text.toLowerCase();
    const phraseHits = AI_PHRASES.filter(p => lowerText.includes(p)).length;
    const aiPhraseDensity = Math.min(100, Math.round((phraseHits / (AI_PHRASES.length * 0.3)) * 100));

    return {
        perplexityScore: Math.max(0, perplexityScore),
        burstinenessScore: Math.max(0, burstinenessScore),
        sentenceVariance: Math.max(0, sentenceVariance),
        vocabularyRichness: Math.max(0, vocabularyRichness),
        avgSentenceLength: Math.round(avgSentLen * 10) / 10,
        repetitionIndex,
        aiPhraseDensity,
        wordCount,
    };
}

function heuristicAIScore(signals: StatisticalSignals): number {
    let score = 0;
    score += (100 - signals.burstinenessScore) * 0.20;  // low burstiness → AI
    score += (100 - signals.sentenceVariance) * 0.15;   // low variance → AI
    score += (100 - signals.vocabularyRichness) * 0.15; // low vocab richness → AI
    score += signals.perplexityScore * 0.15;             // high predictability → AI
    score += signals.repetitionIndex * 0.10;             // high repetition → AI
    score += signals.aiPhraseDensity * 0.25;             // AI filler phrases → strongest signal
    return Math.min(100, Math.max(0, Math.round(score)));
}

// ─── Layer 2: Gemini LLM Judge ─────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a strict AI-text detection expert. Your ONLY job is to determine if text was written by an AI language model (ChatGPT, Claude, Gemini, etc.) or a human.

CRITICAL RULES — read carefully:
1. Domain expertise does NOT make text more human. AI models write expertly about finance, medicine, law, etc.
2. Look for these STRONG AI signals:
   - Transitional phrases: "furthermore", "moreover", "additionally", "notably", "it is worth noting", "in conclusion"
   - Polished hedging: "it is important to note", "as mentioned", "to summarize"
   - Corporate/bureaucratic verbs: "leverage", "utilize", "demonstrate", "optimize", "facilitate"
   - Perfect paragraph structure with no personal asides, typos, or informal phrases
   - Sentences that are uniformly well-formed (no conversational fragments)
   - Conclusions that wrap up too neatly
3. Human signals: personal opinions/emotions, informal language, abrupt topic changes, specific personal memories
4. DO NOT call text "human" just because it contains specific facts or sounds knowledgeable.
5. When in doubt, lean toward AI or UNCERTAIN rather than HUMAN.

Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "verdict": "AI" | "HUMAN" | "UNCERTAIN",
  "aiScore": <number 0-100>,
  "humanScore": <number 0-100, must equal 100 - aiScore>,
  "confidence": "HIGH" | "MEDIUM" | "LOW",
  "reasoning": "<1-2 sentences citing specific phrases or patterns>",
  "sentenceScores": [
    { "text": "<exact sentence>", "aiProbability": <number 0-100> }
  ]
}
Rules: aiScore + humanScore = 100. UNCERTAIN when 40<=aiScore<=60. No markdown.`;

async function callGeminiJudge(text: string, apiKey: string): Promise<{
    verdict: DetectionVerdict;
    aiScore: number;
    humanScore: number;
    confidence: ConfidenceLevel;
    reasoning: string;
    sentenceScores: SentenceScore[];
} | null> {
    try {
        const userMessage = `Analyze this text for AI generation:\n\n${text}`;

        const response = await fetch(GEMINI_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: [{ role: 'user', parts: [{ text: userMessage }] }],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 1500,
                    topP: 1,
                },
            }),
        });

        if (!response.ok) return null;

        const data = await response.json();
        const raw: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Clean and parse JSON (strip any accidental markdown)
        const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        // Validate required fields
        if (
            typeof parsed.aiScore !== 'number' ||
            typeof parsed.humanScore !== 'number' ||
            !['AI', 'HUMAN', 'UNCERTAIN'].includes(parsed.verdict)
        ) {
            return null;
        }

        // Enforce sum = 100
        const aiScore = Math.min(100, Math.max(0, Math.round(parsed.aiScore)));
        const humanScore = 100 - aiScore;

        return {
            verdict: parsed.verdict as DetectionVerdict,
            aiScore,
            humanScore,
            confidence: (['HIGH', 'MEDIUM', 'LOW'].includes(parsed.confidence) ? parsed.confidence : 'MEDIUM') as ConfidenceLevel,
            reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : 'Analysis complete.',
            sentenceScores: Array.isArray(parsed.sentenceScores)
                ? parsed.sentenceScores.map((s: { text: string; aiProbability: number }) => ({
                    text: String(s.text || ''),
                    aiProbability: Math.min(100, Math.max(0, Number(s.aiProbability) || 50)),
                }))
                : [],
        };
    } catch {
        return null;
    }
}

// ─── Fallback sentence scores from heuristics ─────────────────────────────

function heuristicSentenceScores(text: string, overallAI: number): SentenceScore[] {
    const sentences = splitSentences(text).slice(0, 30);
    return sentences.map(s => {
        const words = tokenize(s);
        const len = words.length;
        // Long, even sentences → more AI-like
        const lengthBias = len > 20 ? 15 : len < 8 ? -15 : 0;
        return {
            text: s,
            aiProbability: Math.min(100, Math.max(0, overallAI + lengthBias + (Math.random() * 20 - 10))),
        };
    });
}

function verdictFromScore(aiScore: number): DetectionVerdict {
    if (aiScore >= 60) return 'AI';
    if (aiScore <= 40) return 'HUMAN';
    return 'UNCERTAIN';
}

// ─── POST Handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const text: string = typeof body?.text === 'string' ? body.text.trim() : '';

        if (text.length < MIN_CHARS) {
            return NextResponse.json({ error: `Text too short. Minimum ${MIN_CHARS} characters required.` }, { status: 400 });
        }
        if (text.length > MAX_CHARS) {
            return NextResponse.json({ error: `Text too long. Maximum ${MAX_CHARS} characters allowed.` }, { status: 400 });
        }

        // Layer 1: Statistical
        const { wordCount, ...signals } = computeSignals(text);
        const heuristicScore = heuristicAIScore(signals);

        // Layer 2: Gemini
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
        let llmResult = apiKey ? await callGeminiJudge(text, apiKey) : null;
        const llmUsed = llmResult !== null;

        // Blend scores (LLM 50%, heuristic 50% — prevents LLM from being fooled by domain expertise)
        const finalAI = llmUsed
            ? Math.round(llmResult!.aiScore * 0.5 + heuristicScore * 0.5)
            : heuristicScore;

        const result: DetectionResult = {
            aiScore: finalAI,
            humanScore: 100 - finalAI,
            verdict: llmUsed ? llmResult!.verdict : verdictFromScore(finalAI),
            confidence: llmUsed ? llmResult!.confidence : (Math.abs(finalAI - 50) > 25 ? 'HIGH' : 'MEDIUM'),
            reasoning: llmUsed
                ? llmResult!.reasoning
                : `Statistical analysis found an AI probability of ${finalAI}% based on perplexity, burstiness, and vocabulary patterns.`,
            signals,
            sentenceScores: llmUsed && llmResult!.sentenceScores.length > 0
                ? llmResult!.sentenceScores
                : heuristicSentenceScores(text, finalAI),
            wordCount,
            charCount: text.length,
            analyzedAt: new Date().toISOString(),
            llmUsed,
        };

        return NextResponse.json(result);
    } catch (err) {
        console.error('[truth-scan detect]', err);
        return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
    }
}
