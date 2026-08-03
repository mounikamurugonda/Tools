export interface SentenceScore {
    text: string;
    aiProbability: number; // 0-100
}

export type DetectionVerdict = 'HUMAN' | 'UNCERTAIN' | 'AI';
export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface StatisticalSignals {
    perplexityScore: number;       // 0-100, higher = more AI-like
    burstinenessScore: number;     // 0-100, higher = more human-like
    sentenceVariance: number;      // 0-100, lower = more AI
    vocabularyRichness: number;    // 0-100, higher = more human
    avgSentenceLength: number;     // words per sentence
    repetitionIndex: number;       // 0-100, higher = more AI
    aiPhraseDensity: number;       // 0-100, higher = more AI (AI filler phrase count)
}


export interface DetectionResult {
    aiScore: number;               // 0-100
    humanScore: number;            // 0-100, aiScore + humanScore = 100
    verdict: DetectionVerdict;
    confidence: ConfidenceLevel;
    reasoning: string;
    signals: StatisticalSignals;
    sentenceScores: SentenceScore[];
    wordCount: number;
    charCount: number;
    analyzedAt: string;            // ISO timestamp
    llmUsed: boolean;              // whether gemini-flash-latest was called
}

export interface DetectionRequest {
    text: string;
}

export interface HistoryEntry {
    id: string;
    text: string;                  // first 120 chars
    result: DetectionResult;
    analyzedAt: string;
}
