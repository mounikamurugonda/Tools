// ─────────────────────────────────────────────────────────────────────────────
// Multi-Model AI utility for CodeCast
// Supports free OpenRouter models + Sarvam as fallback + Local Ollama
// ─────────────────────────────────────────────────────────────────────────────
import { Ollama } from 'ollama/browser';

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface AIModel {
    id: string;
    name: string;
    provider: 'openrouter' | 'sarvam' | 'ollama';
    badge: string;         // Short badge text, e.g. "32B"
    badgeColor: string;    // Tailwind bg class for the badge
    description: string;
}

/** Free models on OpenRouter — verified IDs as of 2026 */
export const AI_MODELS: AIModel[] = [
    {
        id: 'meta-llama/llama-3.3-70b-instruct:free',
        name: 'Llama 3.3 70B',
        provider: 'openrouter',
        badge: '70B',
        badgeColor: 'bg-violet-500',
        description: "Meta's flagship Llama 3.3 model. Excellent for code.",
    },
    {
        id: 'qwen/qwen3-next-80b-a3b-instruct:free',
        name: 'Qwen3 Next 80B',
        provider: 'openrouter',
        badge: '80B',
        badgeColor: 'bg-emerald-500',
        description: 'Powerful Qwen model. Exceptional at HTML/CSS/JS.',
    },
    {
        id: 'google/gemma-3-27b-it:free',
        name: 'Gemma 3 27B',
        provider: 'openrouter',
        badge: '27B',
        badgeColor: 'bg-amber-500',
        description: 'Google model. Strong at styling and CSS animations.',
    },
    {
        id: 'mistralai/mistral-small-3.1-24b-instruct:free',
        name: 'Mistral Small 3.1',
        provider: 'openrouter',
        badge: '24B',
        badgeColor: 'bg-rose-500',
        description: 'Fast and lightweight from Mistral. Great for quick iterations.',
    },
    {
        id: 'nousresearch/hermes-3-llama-3.1-405b:free',
        name: 'Hermes 3 405B',
        provider: 'openrouter',
        badge: '405B',
        badgeColor: 'bg-cyan-500',
        description: 'Massive Llama 3.1 base. Extremely intelligent logic.',
    },
    {
        id: 'local-ollama',
        name: 'Local Ollama',
        provider: 'ollama',
        badge: 'LCL',
        badgeColor: 'bg-orange-500',
        description: 'Run inference locally on your own machine via Ollama.',
    },
    {
        id: 'sarvam-m',
        name: 'Sarvam M',
        provider: 'sarvam',
        badge: 'SM',
        badgeColor: 'bg-indigo-500',
        description: 'Built-in Sarvam model. Fallback option.',
    },
];

export const DEFAULT_MODEL_ID = AI_MODELS[0].id;

// ─────────────────────────────────────────────────────────────────────────────
// Core API Callers
// ─────────────────────────────────────────────────────────────────────────────

const callOpenRouter = async (messages: ChatMessage[], modelId: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error(
            'OpenRouter API key is missing. Add NEXT_PUBLIC_OPENROUTER_API_KEY to your .env.local file.\nGet a free key at https://openrouter.ai'
        );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://codecast.app',
            'X-Title': 'CodeCast AI',
        },
        body: JSON.stringify({
            model: modelId,
            messages,
            temperature: 0.75,
            max_tokens: 4096,
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({ error: { message: response.statusText } }));
        const msg = err?.error?.message || err?.message || response.statusText;
        throw new Error(`OpenRouter Error ${response.status}: ${msg}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('OpenRouter returned an empty response.');
    return content;
};

const callSarvam = async (messages: ChatMessage[]): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_SARVAM_API_KEY;
    if (!apiKey) throw new Error('Sarvam API key is missing. Add NEXT_PUBLIC_SARVAM_API_KEY to your .env.local.');

    // Sarvam strictly requires alternating user/assistant messages starting with user.
    // To bypass this cleanly and reliably, we consolidate the entire conversation and system prompt
    // into a single user message.
    const sarvamPrompt = messages.map(m => `[${m.role.toUpperCase()}]\n${m.content}`).join('\n\n');
    const formattedMessages = [{ role: 'user', content: sarvamPrompt }];

    const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': apiKey,
        },
        body: JSON.stringify({
            model: 'sarvam-m',
            messages: formattedMessages,
            temperature: 0.75,
            max_tokens: 4096,
            top_p: 1,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Sarvam Error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Sarvam returned an empty response.');
    return content;
};

const callOllama = async (
    messages: ChatMessage[],
    url: string = 'http://localhost:11434',
    modelName: string = 'llama3',
    onUpdate?: (partial: string) => void
): Promise<string> => {
    try {
        const ollamaClient = new Ollama({ host: url });

        const stream = await ollamaClient.chat({
            model: modelName,
            messages,
            stream: true,
        });

        let content = '';
        let thinking = '';

        for await (const chunk of stream) {
            if (chunk.message?.thinking) {
                thinking += chunk.message.thinking;
            }
            // Some chunks might just contain content
            if (chunk.message?.content) {
                content += chunk.message.content;
            }

            if (onUpdate) {
                let current = '';
                if (thinking) current += `<think>\n${thinking}\n</think>\n\n`;
                current += content;
                onUpdate(current);
            }
        }

        if (!content && !thinking) {
            throw new Error('Ollama returned an empty response. Check if your model is downloaded and running.');
        }

        // Output formatting: if it thought about it, prepend the `<think>` block so the user can see the reasoning.
        if (thinking) {
            return `<think>\n${thinking}\n</think>\n\n${content}`;
        }

        return content;
    } catch (err: any) {
        throw new Error(`Ollama Error: ${err.message || String(err)}`);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a general chat message to any model.
 * Pass the full conversation history for multi-turn context.
 */
export const sendChatMessage = async (
    messages: ChatMessage[],
    modelId: string,
    ollamaUrl?: string,
    ollamaModelName?: string,
    onUpdate?: (partial: string) => void
): Promise<string> => {
    const model = AI_MODELS.find((m) => m.id === modelId);
    if (!model) throw new Error(`Unknown model: ${modelId}`);

    if (model.provider === 'ollama') {
        return callOllama(messages, ollamaUrl, ollamaModelName, onUpdate);
    }

    return model.provider === 'sarvam'
        ? callSarvam(messages)
        : callOpenRouter(messages, modelId);
};

// ─────────────────────────────────────────────────────────────────────────────
// Code Generation (structured output with delimiters)
// ─────────────────────────────────────────────────────────────────────────────

const CODE_SYSTEM_PROMPT = `You are a world-class creative UI engineer building stunning tutorial demos.
Output code using EXACTLY this format with these delimiter markers — nothing else:
===HTML_START===
(html body content here — elements only, no <html>/<body>/<style>/<script> tags)
===HTML_END===
===CSS_START===
(css here)
===CSS_END===
===JS_START===
(javascript here, or leave blank)
===JS_END===
 `;

export interface CodeGenResult {
    html: string;
    css: string;
    js: string;
    rawResponse: string;
}

/**
 * Generate HTML/CSS/JS code from a user prompt with optional conversation history.
 * The history is used for multi-turn editing ("make the button blue", "add a hover effect", etc.)
 */
export const generateCodeWithModel = async (
    userPrompt: string,
    modelId: string,
    conversationHistory: ChatMessage[] = [],
    ollamaUrl?: string,
    ollamaModelName?: string,
    onUpdate?: (partial: string) => void
): Promise<CodeGenResult> => {
    const systemMessage: ChatMessage = {
        role: 'system',
        content: CODE_SYSTEM_PROMPT,
    };

    // Include conversation history for context-aware generation
    const messages: ChatMessage[] = [
        systemMessage,
        ...conversationHistory,
        {
            role: 'user',
            content: `${userPrompt}`,
        },
    ];

    const response = await sendChatMessage(messages, modelId, ollamaUrl, ollamaModelName, onUpdate);

    const extract = (start: string, end: string): string => {
        const si = response.indexOf(start);
        const ei = response.indexOf(end);
        if (si === -1 || ei === -1 || ei <= si) return '';
        return response.slice(si + start.length, ei).trim();
    };

    let html = extract('===HTML_START===', '===HTML_END===');
    let css = extract('===CSS_START===', '===CSS_END===');
    let js = extract('===JS_START===', '===JS_END===');

    // Fallback parser: Some models (especially local ones) ignore the exact tags and just output markdown codeblocks.
    if (!html && !css && !js) {
        const mdHtml = response.match(/```html\n([\s\S]*?)```/);
        const mdCss = response.match(/```css\n([\s\S]*?)```/);
        const mdJs = response.match(/```(?:javascript|js)\n([\s\S]*?)```/);

        if (mdHtml) html = mdHtml[1].trim();
        if (mdCss) css = mdCss[1].trim();
        if (mdJs) js = mdJs[1].trim();

        // Final fallback: if there's just a generic codeblock and no others, assume it's HTML/mixed
        if (!html && !css && !js) {
            const genericMd = response.match(/```\n([\s\S]*?)```/);
            if (genericMd) html = genericMd[1].trim();
        }
    }

    if (!html && !css && !js) {
        console.error('No code delimiters found. Raw:', response);
        throw new Error('The AI response was not in the expected format. Please try again.');
    }

    return { html, css, js, rawResponse: response };
};
