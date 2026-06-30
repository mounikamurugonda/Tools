
export enum Role {
    USER = 'user',
    SYSTEM = 'system',
    ASSISTANT = 'assistant',
}

export interface Message {
    role: Role;
    content: string;
}

export interface SarvamRequest {
    messages: Message[];
    model: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
}

export interface SarvamResponse {
    id: string;
    choices: {
        index: number;
        message: Message;
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
