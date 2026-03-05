import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' });

async function run() {
    try {
        const stream = await ollama.chat({
            model: 'qwen3-vl:4b',
            messages: [{ role: 'user', content: 'hello' }],
            stream: true
        });

        let count = 0;
        for await (const chunk of stream) {
            console.log(chunk.message.content || ('<think>' + chunk.message.thinking));
            count++;
            if (count > 20) break;
        }
    } catch (e) { console.error(e); }
}

run();
