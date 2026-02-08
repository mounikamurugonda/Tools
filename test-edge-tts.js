
const { EdgeTTS } = require('edge-tts-universal');
const fs = require('fs');
const path = require('path');

async function test() {
    console.log("Testing Edge TTS...");
    try {
        // Correct constructor usage: text, voice, options
        const tts = new EdgeTTS('Hello world, this is a test. Is this working?', 'en-US-AriaNeural', {
            rate: '+0%',
            volume: '+0%',
            pitch: '+0Hz'
        });

        console.log("Synthesizing...");
        const result = await tts.synthesize();
        console.log("Synthesis complete.");

        if (result.audio) {
            console.log("Audio blob received:", result.audio.constructor.name);
            console.log("Size:", result.audio.size);

            const arrayBuffer = await result.audio.arrayBuffer();
            fs.writeFileSync(path.join(__dirname, 'test-output.mp3'), Buffer.from(arrayBuffer));
            console.log("Saved to test-output.mp3");
        } else {
            console.error("No audio in result");
        }

    } catch (e) {
        console.error("Test failed:", e);
    }
}

test();
