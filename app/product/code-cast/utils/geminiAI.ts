
import { Message, Role, GeminiRequest, GeminiResponse } from '../types/gemini';

const API_ENDPOINT =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

export const sendChatRequest = async (
    messages: Message[],
    temperature: number = 0.5
): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('API Key is missing. Please configure it in the app settings or .env file.');
    }

    // Gemini separates the system prompt from the turn-based `contents`,
    // and labels AI turns 'model' rather than 'assistant'.
    const systemText = messages
        .filter((m) => m.role === Role.SYSTEM)
        .map((m) => m.content)
        .join('\n\n');

    const payload: GeminiRequest = {
        ...(systemText ? { system_instruction: { parts: [{ text: systemText }] } } : {}),
        contents: messages
            .filter((m) => m.role !== Role.SYSTEM)
            .map((m) => ({
                role: m.role === Role.ASSISTANT ? 'model' : 'user',
                parts: [{ text: m.content }],
            })),
        generationConfig: {
            temperature,
            maxOutputTokens: 1000,
            topP: 1,
        },
    };

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorDetails = errorText;
            try {
                const jsonError = JSON.parse(errorText);
                errorDetails = jsonError.error?.message || jsonError.message || JSON.stringify(jsonError);
            } catch (e) {
                // Keep raw text if parsing fails
            }
            throw new Error(`API Error ${response.status}: ${errorDetails}`);
        }

        const data: GeminiResponse = await response.json();

        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!content) {
            throw new Error('API returned no response candidates.');
        }

        return content;
    } catch (error) {
        console.error('Gemini API call failed:', error);
        throw error;
    }
};

export const rephraseText = async (
    text: string,
    tone: string = 'professional'
): Promise<string> => {
    const systemMessage: Message = {
        role: Role.SYSTEM,
        content: `You are an expert English editor and linguist. Your task is to rephrase the user's input text to have a ${tone} tone. Do not add any conversational filler, explanations, or quotes. Output ONLY the rephrased text.`,
    };

    const userMessage: Message = {
        role: Role.USER,
        content: text,
    };

    return sendChatRequest([systemMessage, userMessage], 0.3);
};

export const generateVoiceoverScript = async (
    html: string,
    css: string
): Promise<string> => {
    const systemMessage: Message = {
        role: Role.SYSTEM,
        content: `You are a creative UI/UX designer narrating a coding video.
Your goal is to describe the *user experience* and *visual impact* of the code being written, rather than explaining the syntax line-by-line.
Focus on:
- The design goal (e.g., 'Let's create a stunning social media button').
- The interactive feel (e.g., 'Watch how the hover effect makes it pop', 'This smooth transition adds a premium touch').
- Why this improves the user experience (e.g., 'It makes the interface feel alive', 'This is much better than boring standard buttons').

Rules:
1. DO NOT explain the code syntax (avoid saying 'div', 'border-radius', 'hex code'). Focus on the *visual result* and *interaction*.
2. Keep the tone enthusiastic, modern, and narrative (storytelling style).
3. Use excellent punctuation (commas, periods) for natural text-to-speech pacing.
4. DO NOT include any headers or labels. Output ONLY the spoken text.
5. Keep it concise just a intro for video (under 10 seconds).`,
    };

    const userMessage: Message = {
        role: Role.USER,
        content: `Here is the code:

HTML:
${html}

CSS:
${css}

Generate a voiceover script.`,
    };

    return sendChatRequest([systemMessage, userMessage], 0.7);
};

export interface SEOContent {
    title: string;
    description: string;
    tags: string[];
    hashtags: string[];
}

export const generateSEOMetadata = async (
    html: string,
    css: string
): Promise<SEOContent> => {
    const systemMessage: Message = {
        role: Role.SYSTEM,
        content: `You are an expert Social Media Manager and SEO specialist for coding content.
Your task is to generate metadata for a video showcasing a UI component built with HTML and CSS.

Output must be in valid JSON format with the following keys:
- "title": A catchy, click-worthy title for YouTube/TikTok (under 60 chars).
- "description": A short, engaging description for the post (2-3 sentences).
- "tags": An array of 5-8 relevant SEO keywords (e.g., "css effects", "web design").
- "hashtags": An array of 5-8 relevant hashtags including #CodeCast (e.g., "#webdev", "#css").

Do NOT include any markdown formatting (like \`\`\`json). Output ONLY the raw JSON string.`,
    };

    const userMessage: Message = {
        role: Role.USER,
        content: `Here is the code:

HTML:
${html}

CSS:
${css}

Generate SEO metadata.`,
    };

    const response = await sendChatRequest([systemMessage, userMessage], 0.7);

    try {
        // Clean up response if it contains markdown code blocks despite instructions
        const cleanResponse = response.replace(/```json\n?|\n?```/g, '').trim();
        return JSON.parse(cleanResponse);
    } catch (e) {
        console.error("Failed to parse SEO JSON", e);
        return {
            title: "Amazing CSS UI Component",
            description: "Check out this awesome UI effect created with CodeCast! Perfect for your next project.",
            tags: ["css", "html", "webdesign", "frontend", "uiux"],
            hashtags: ["#codecast", "#webdev", "#css", "#frontend", "#coding"]
        };
    }
};

export interface CodeSnippetResponse {
    html: string;
    css: string;
    js: string;
}

export const generateCodeSnippet = async (
    prompt: string
): Promise<CodeSnippetResponse> => {
    const systemMessage: Message = {
        role: Role.SYSTEM,
        content: `You are a world-class creative UI engineer building stunning tutorial demos. Output code using EXACTLY this format with these delimiter markers - nothing else:
===HTML_START===
(html body content here - elements only, no <html>/<body>/<style>/<script> tags)
===HTML_END===
===CSS_START===
(css here)
===CSS_END===
===JS_START===
(javascript here, or leave blank)
===JS_END===

STYLE RULES - MANDATORY:
- Default dark glassmorphism: dark bg(#0a0a0f), frosted panels(rgba(255,255,255,0.05)), vibrant accents(purple #a855f7, blue #3b82f6, pink #ec4899, cyan #06b6d4)
- Rich @keyframes: at least 4-5 unique named animations (float, shimmer, pulse-glow, morph, spin-gradient etc.)
- CSS custom properties for all colors/sizes. Pseudo-elements ::before/::after for VFX/particles.
- Layered box-shadow with color glow. backdrop-filter blur. transform 3D effects.
- Staggered entrance animations (animation-delay increments). Hover microinteractions on everything clickable.
- Minimum 80+ lines of CSS. Think Dribbble/CodePen award-winning quality.
JS RULES: Use requestAnimationFrame for smooth effects, mouse-tracking for parallax/tilt, particle systems if appropriate. Keep concise but impactful.`,
    };

    const userMessage: Message = {
        role: Role.USER,
        content: `Create an advanced, visually stunning implementation of: ${prompt}. Make it exceptional - rich animations, VFX, and premium feel.`,
    };

    const response = await sendChatRequest([systemMessage, userMessage], 0.8);

    // Delimiter-based extraction - immune to JSON escaping issues
    const extract = (start: string, end: string): string => {
        const si = response.indexOf(start);
        const ei = response.indexOf(end);
        if (si === -1 || ei === -1 || ei <= si) return '';
        return response.slice(si + start.length, ei).trim();
    };

    const html = extract('===HTML_START===', '===HTML_END===');
    const css = extract('===CSS_START===', '===CSS_END===');
    const js = extract('===JS_START===', '===JS_END===');

    if (!html && !css && !js) {
        console.error('No delimiters found in response. Raw:', response);
        throw new Error('The AI response was not in the expected format. Please try again.');
    }

    return { html, css, js };
};

