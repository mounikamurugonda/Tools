'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import CustomSelect from '@/components/ui/CustomSelect';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import Label from '@/components/ui/Label';
import { Volume2, Square, Play } from 'lucide-react';

const TextToSpeech: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('Hello! This is a test of the text to speech system.');
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
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <ToolContainer title="Text to Speech" details={details} toolId={toolId}>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card title="Text Input" className="h-[430px] flex flex-col">
            <TextArea
              value={text}
              onChange={e => setText(e.target.value)}
              className="flex-1 w-full border-none focus:ring-0 rounded-none resize-none p-0"
              placeholder="Type text to speak..."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Voice Settings">
            <div className="space-y-6">
              <div>
                <Label className="mb-2">Select Voice</Label>
                <CustomSelect
                  value={selectedVoice ? { value: selectedVoice, label: selectedVoice } : null}
                  onChange={option => {
                    if (option) setSelectedVoice(option.value as string);
                  }}
                  options={voices.map(v => ({ value: v.name, label: `${v.name} (${v.lang})` }))}
                  placeholder="Select a voice..."
                />
              </div>

              <Slider
                label="Speed"
                min={0.5}
                max={2}
                step={0.1}
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                valueDisplay={`${rate}x`}
              />

              <Slider
                label="Pitch"
                min={0.5}
                max={2}
                step={0.1}
                value={pitch}
                onChange={e => setPitch(Number(e.target.value))}
                valueDisplay={`${pitch}`}
              />
            </div>
          </Card>

          <Button
            onClick={speak}
            variant={isSpeaking ? 'danger' : 'primary'}
            size="lg"
            className="w-full"
          >
            {isSpeaking ? (
              <>
                <Square className="w-5 h-5 mr-2 fill-current" /> Stop Speaking
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 mr-2" /> Speak Text
              </>
            )}
          </Button>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextToSpeech;
