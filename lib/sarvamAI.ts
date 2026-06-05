/**
 * Shared Sarvam AI client — usable from any tool/component.
 * The API key is intentionally NEXT_PUBLIC so it can be called
 * from client components (consistent with the code-cast integration).
 */

const API_ENDPOINT = 'https://api.sarvam.ai/v1/chat/completions';

export interface SarvamMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function callSarvam(
  messages: SarvamMessage[],
  temperature = 0.5,
  maxTokens = 1500
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_SARVAM_API_KEY;
  if (!apiKey) throw new Error('Sarvam API key not configured.');

  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-subscription-key': apiKey,
    },
    body: JSON.stringify({
      messages,
      model: 'sarvam-m',
      temperature,
      max_tokens: maxTokens,
      top_p: 1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    let msg = text;
    try {
      const json = JSON.parse(text);
      msg = json.message || json.error?.message || text;
    } catch {}
    throw new Error(`Sarvam API error ${res.status}: ${msg}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('AI returned an empty response.');
  return content;
}

// ── Pre-built AI actions used across multiple tools ──────────────────────────

/** Explain what changed between two code/text versions */
export async function explainDiff(original: string, modified: string): Promise<string> {
  const trim = (s: string) => s.slice(0, 4000);
  return callSarvam(
    [
      {
        role: 'system',
        content:
          'You are a senior code reviewer. The user will provide two versions of code or text. ' +
          'Explain the semantic meaning of the changes in plain English. ' +
          'Be concise — use bullet points, focus on WHAT changed and WHY it might matter. ' +
          'Do not list every whitespace or comment change. Focus on logic, structure, and intent.',
      },
      {
        role: 'user',
        content: `ORIGINAL:\n${trim(original)}\n\nMODIFIED:\n${trim(modified)}\n\nExplain what changed.`,
      },
    ],
    0.3,
    800
  );
}

/** Generate a regex pattern from a plain-English description */
export async function generateRegex(description: string): Promise<string> {
  return callSarvam(
    [
      {
        role: 'system',
        content:
          'You are a regex expert. The user will describe a pattern they want to match. ' +
          'Respond with ONLY the regex pattern (no /slashes/, no flags, no explanation, no markdown). ' +
          'Just the raw pattern string.',
      },
      {
        role: 'user',
        content: description,
      },
    ],
    0.2,
    200
  );
}

/** Explain what a SQL query does in plain English */
export async function explainSQL(sql: string): Promise<string> {
  return callSarvam(
    [
      {
        role: 'system',
        content:
          'You are a database expert. Explain what the given SQL query does in plain English. ' +
          'Start with a one-sentence summary, then list the key operations (joins, filters, aggregations, etc.) as bullet points. ' +
          'Keep it practical — what does running this query actually return?',
      },
      {
        role: 'user',
        content: sql.slice(0, 3000),
      },
    ],
    0.3,
    600
  );
}

/** Improve and refine a prompt */
export async function improvePrompt(prompt: string): Promise<string> {
  return callSarvam(
    [
      {
        role: 'system',
        content:
          'You are a prompt engineering expert. The user will provide a prompt draft. ' +
          'Rewrite it to be clearer, more specific, and more likely to produce high-quality AI output. ' +
          'Preserve the original intent and structure. Output ONLY the improved prompt — no explanations, no "Here is the improved version:", just the prompt itself.',
      },
      {
        role: 'user',
        content: prompt.slice(0, 4000),
      },
    ],
    0.4,
    1200
  );
}

/** Summarize text using AI */
export async function summarizeText(text: string, style: 'brief' | 'detailed' | 'bullets' = 'brief'): Promise<string> {
  const styleInstructions = {
    brief: 'Write a concise 2-3 sentence summary capturing the main idea.',
    detailed: 'Write a thorough paragraph summary covering all key points.',
    bullets: 'Summarize as bullet points — one bullet per key idea (5-8 bullets max).',
  };
  return callSarvam(
    [
      {
        role: 'system',
        content: `You are an expert at summarizing text. ${styleInstructions[style]} Output ONLY the summary.`,
      },
      {
        role: 'user',
        content: text.slice(0, 5000),
      },
    ],
    0.3,
    800
  );
}

/** Explain what a JSON structure represents */
export async function describeJSON(json: string): Promise<string> {
  return callSarvam(
    [
      {
        role: 'system',
        content:
          'You are a senior developer. Describe what the given JSON structure represents. ' +
          'Explain the purpose of each top-level key, the data types, and what system or use-case this might come from. ' +
          'Be concise and practical.',
      },
      {
        role: 'user',
        content: json.slice(0, 3000),
      },
    ],
    0.3,
    600
  );
}
