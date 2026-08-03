
export enum Role {
    USER = 'user',
    SYSTEM = 'system',
    ASSISTANT = 'assistant',
}

export interface Message {
    role: Role;
    content: string;
}

export interface GeminiPart {
    text: string;
}

export interface GeminiContent {
    role: string;
    parts: GeminiPart[];
}

export interface GeminiRequest {
    system_instruction?: { parts: GeminiPart[] };
    contents: GeminiContent[];
    generationConfig: {
        temperature: number;
        maxOutputTokens: number;
        topP: number;
    };
}

export interface GeminiResponse {
    candidates: {
        content: GeminiContent;
        finishReason: string;
    }[];
}
