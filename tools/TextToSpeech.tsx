'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';

const TextToSpeech: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState(
    'Hello! This is a test of the text to speech system.',
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const vs = window.speechSynthesis.getVoices();
      setVoices(vs);
      if (vs.length > 0 && !selectedVoice) setSelectedVoice(vs[0].name);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <ToolContainer title="Text to Speech" details={details} toolId={toolId}>
      <div className="space-y-6 max-w-2xl mx-auto">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 brand-input"
          placeholder="Type text to speak..."
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Voice</label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="brand-input"
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Speed: {rate}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Pitch: {pitch}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <button
          onClick={speak}
          className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-colors ${isSpeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSpeaking ? 'Stop Speaking' : 'Speak Text'}
        </button>
      </div>
    </ToolContainer>
  );
};

export default TextToSpeech;
