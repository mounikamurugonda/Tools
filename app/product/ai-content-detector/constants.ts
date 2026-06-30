export const TRUTH_SCAN_ACCENT = '#06B6D4'; // cyan

export const DETECTION_THRESHOLDS = {
    HUMAN_MAX: 40,      // aiScore <= 40 → Human
    AI_MIN: 60,         // aiScore >= 60 → AI
    // 41–59 → Uncertain
};

export const MIN_TEXT_LENGTH = 50;
export const MAX_TEXT_LENGTH = 10000;

export const SIGNAL_LABELS: Record<string, { label: string; tooltip: string; lowerIsAI: boolean }> = {
    perplexityScore: {
        label: 'Predictability',
        tooltip: 'How predictable word choices are. AI models pick the most probable next word, making text highly predictable.',
        lowerIsAI: false,
    },
    burstinenessScore: {
        label: 'Burstiness',
        tooltip: 'Variation in sentence length. Humans write in bursts — short and long sentences. AI stays uniformly medium.',
        lowerIsAI: true,
    },
    sentenceVariance: {
        label: 'Sentence Variance',
        tooltip: 'Deviation in how complex each sentence is. AI text is consistently structured, humans vary widely.',
        lowerIsAI: true,
    },
    vocabularyRichness: {
        label: 'Vocabulary Richness',
        tooltip: 'Ratio of unique words. Humans tend to repeat domain words; AI diversifies vocabulary artificially.',
        lowerIsAI: false,
    },
    repetitionIndex: {
        label: 'Phrase Repetition',
        tooltip: 'How often phrases repeat across the text. AI models reuse transitional phrases like "Furthermore", "Moreover".',
        lowerIsAI: false,
    },
    aiPhraseDensity: {
        label: 'AI Filler Phrases',
        tooltip: 'Density of AI-typical words: "furthermore", "moreover", "demonstrate", "leverage", "utilize", "comprehensive", etc. This is the strongest single signal for AI detection.',
        lowerIsAI: false,
    },
};


export const FEATURES = [
    {
        icon: '🧠',
        title: 'Dual-Layer Analysis',
        desc: 'Combines statistical linguistics with Sarvam-M AI judgment for accurate results.',
    },
    {
        icon: '📊',
        title: 'Three-Zone Scoring',
        desc: 'Clear Human / Uncertain / AI verdict with percentage scores that sum to 100%.',
    },
    {
        icon: '🔬',
        title: 'Signal Breakdown',
        desc: 'See exactly which signals triggered — perplexity, burstiness, sentence variance and more.',
    },
    {
        icon: '📝',
        title: 'Sentence Heatmap',
        desc: 'Each sentence is highlighted by AI probability so you know exactly where it feels machine-written.',
    },
    {
        icon: '⚡',
        title: 'Instant Results',
        desc: 'Analysis completes in seconds. No file uploads, no account needed.',
    },
    {
        icon: '🔒',
        title: 'Privacy First',
        desc: 'Text is analyzed and discarded. Nothing is stored on our servers.',
    },
];

export const USE_CASES = [
    { icon: '🎓', title: 'Education', desc: 'Verify student assignments and essays for academic integrity.' },
    { icon: '📰', title: 'Publishing', desc: 'Ensure articles and blog posts retain authentic human voice.' },
    { icon: '💼', title: 'Hiring', desc: 'Screen cover letters and work samples during recruitment.' },
    { icon: '⚖️', title: 'Legal', desc: 'Validate authenticity of written statements and declarations.' },
];

export const HOW_IT_WORKS = [
    {
        step: '01',
        title: 'Paste Your Text',
        desc: 'Drop any text — essay, email, article, student work — into the input panel. Minimum 50 words.',
    },
    {
        step: '02',
        title: 'Deep Analysis Runs',
        desc: 'Layer 1 computes linguistic signals (perplexity, burstiness, vocabulary). Layer 2 sends to Sarvam-M AI for judgment.',
    },
    {
        step: '03',
        title: 'Get Your Verdict',
        desc: 'Receive a Human Score, AI Score, sentence-level heatmap, and a plain-English explanation.',
    },
];

export const FAQS = [
    {
        q: 'How accurate is the AI Content Detector?',
        a: 'The AI Content Detector uses two layers — statistical linguistics and Sarvam-M LLM judgment — giving high accuracy on clearly AI or clearly human text. Texts in the 40–60% zone are flagged as "Uncertain" rather than making overconfident calls.',
    },
    {
        q: 'What detection signals do you measure?',
        a: 'We measure perplexity (word predictability), burstiness (sentence length variation), sentence variance, vocabulary richness, average sentence length, and phrase repetition. Each signal is computed on your text locally before the AI step.',
    },
    {
        q: 'Can paraphrasing tools fool the AI Content Detector?',
        a: 'Paraphrasing reduces the signal strength, which is why our Uncertain zone exists. If content has been heavily paraphrased, we\'ll say "Uncertain" rather than a false "Human" verdict.',
    },
    {
        q: 'Is my text stored?',
        a: 'No. Text is sent only to our analysis endpoint and to Sarvam AI for judgment. It is not stored, logged, or retained after the response is sent.',
    },
    {
        q: 'What is the minimum text length?',
        a: 'At least 50 characters (roughly 10+ words). Short phrases do not have enough signal for reliable analysis.',
    },
];
