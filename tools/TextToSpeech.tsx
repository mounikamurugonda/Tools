'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import styles from './TextToSpeech.module.css';

type TTSEngine = 'kokoro' | 'edge';

const TextToSpeech: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // For download
  const [loading, setLoading] = useState(false); // Default false for Edge
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [voices, setVoices] = useState<{ value: string; label: string }[]>([]);
  const [selectedVoice, setSelectedVoice] = useState(''); // Default set by engine
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusText, setStatusText] = useState('Speak');

  // Settings
  const [engine, setEngine] = useState<TTSEngine>('edge'); // Default to Edge for quality/speed
  const [useWebGPU, setUseWebGPU] = useState(true); // Kokoro setting

  // Worker ref (Kokoro)
  const workerRef = useRef<Worker | null>(null);

  // Audio Queue Management (Kokoro)
  const audioQueue = useRef<Blob[]>([]);
  const isPlayingRef = useRef(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const isGeneratingRef = useRef(false);
  const fullAudioChunksRef = useRef<Blob[]>([]);

  // Edge TTS Voices (Curated List)
  const edgeVoices = [
    { value: 'en-US-AriaNeural', label: 'Aria (US Female) - High Quality' },
    { value: 'en-US-GuyNeural', label: 'Guy (US Male) - High Quality' },
    { value: 'en-US-JennyNeural', label: 'Jenny (US Female)' },
    { value: 'en-US-ChristopherNeural', label: 'Christopher (US Male)' },
    { value: 'en-GB-SoniaNeural', label: 'Sonia (UK Female)' },
    { value: 'en-GB-RyanNeural', label: 'Ryan (UK Male)' },
    { value: 'es-ES-ElviraNeural', label: 'Elvira (Spanish Female)' },
    { value: 'es-ES-AlvaroNeural', label: 'Alvaro (Spanish Male)' },
    { value: 'fr-FR-DeniseNeural', label: 'Denise (French Female)' },
    { value: 'fr-FR-HenriNeural', label: 'Henri (French Male)' },
    { value: 'ja-JP-NanamiNeural', label: 'Nanami (Japanese Female)' },
    { value: 'ja-JP-KeitaNeural', label: 'Keita (Japanese Male)' },
    { value: 'hi-IN-SwaraNeural', label: 'Swara (Hindi Female)' },
    { value: 'hi-IN-MadhurNeural', label: 'Madhur (Hindi Male)' },
    { value: 'zh-CN-XiaoxiaoNeural', label: 'Xiaoxiao (Chinese Female)' },
    { value: 'zh-CN-YunxiNeural', label: 'Yunxi (Chinese Male)' },
  ];

  // Kokoro Voices (Fallback/Manual)
  const kokoroVoices = [
    { value: 'af_heart', label: 'Heart (US Female)' },
    { value: 'af_bella', label: 'Bella (US Female)' },
    { value: 'af_nicole', label: 'Nicole (US Female)' },
    { value: 'af_sky', label: 'Sky (US Female)' },
    { value: 'am_adam', label: 'Adam (US Male)' },
    { value: 'am_michael', label: 'Michael (US Male)' },
    { value: 'bf_emma', label: 'Emma (UK Female)' },
    { value: 'bm_george', label: 'George (UK Male)' },
  ];

  // Update voices when engine changes
  useEffect(() => {
    if (engine === 'edge') {
      setVoices(edgeVoices);
      setSelectedVoice('en-US-AriaNeural');
      setLoading(false); // Edge is always "ready" (online)
      setDownloading(false);
    } else {
      setVoices(kokoroVoices);
      setSelectedVoice('af_heart');
      // Kokoro needs worker init... handled by other effect
      setLoading(true);
    }
  }, [engine]);

  // Kokoro Worker Logic
  const playNextChunk = useCallback(() => {
    if (audioQueue.current.length === 0) {
      isPlayingRef.current = false;
      if (!isGeneratingRef.current) {
        setIsSpeaking(false);
        setStatusText('Speak');
      }
      return;
    }

    isPlayingRef.current = true;
    const chunk = audioQueue.current.shift();
    if (!chunk) return;

    const url = URL.createObjectURL(chunk);
    const audio = new Audio(url);
    audioPlayerRef.current = audio;

    audio.onended = () => {
      URL.revokeObjectURL(url);
      playNextChunk();
    };

    audio.play().catch(e => {
      console.error("Playback error:", e);
      playNextChunk();
    });
  }, []);

  // Initialize Worker only if engine is Kokoro
  useEffect(() => {
    if (engine !== 'kokoro') {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      return;
    }

    setLoading(true);
    setDownloading(true);
    setProgress(0);

    let worker: Worker;
    try {
      worker = new Worker(new URL('./kokoro-worker.ts', import.meta.url));
      workerRef.current = worker;
    } catch (e) {
      console.error("Failed to create worker:", e);
      setLoading(false);
      return;
    }

    worker.onmessage = (event: MessageEvent) => {
      const { type, payload, buffer, voices: fetchedVoices } = event.data;

      if (type === 'ready') {
        setLoading(false);
        setDownloading(false);
        setProgress(100);
        if (fetchedVoices && fetchedVoices.length > 0) {
          const mapped = fetchedVoices.map((v: any) => ({
            value: v.name,
            label: `${v.name} (${v.language || v.lang || '?'})`
          }));
          setVoices(mapped); // Update with actual loaded voices
        }
      }
      else if (type === 'audio-chunk') {
        if (buffer) {
          const blob = new Blob([buffer], { type: 'audio/wav' });
          audioQueue.current.push(blob);
          fullAudioChunksRef.current.push(blob);
          if (!isPlayingRef.current) playNextChunk();
        }
      }
      else if (type === 'stream-end') {
        isGeneratingRef.current = false;
        if (fullAudioChunksRef.current.length > 0) {
          const fullBlob = new Blob(fullAudioChunksRef.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(fullBlob);
          setAudioUrl(url);
        }
        if (!isPlayingRef.current && audioQueue.current.length === 0) {
          setIsSpeaking(false);
          setStatusText('Speak');
        } else if (isPlayingRef.current) {
          setStatusText('Playing...');
        }
      }
      else if (type === 'error') {
        console.error("Worker error:", payload?.message);
        setLoading(false);
        setDownloading(false);
        setIsSpeaking(false);
        setStatusText('Speak');
        isGeneratingRef.current = false;

        if (useWebGPU) {
          alert(`WebGPU Error: ${payload?.message}. Switching back to CPU (WASM).`);
          setUseWebGPU(false);
        } else {
          alert(`Error: ${payload?.message}`);
        }
      }
    };

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 5;
      });
    }, 100);

    // Initialize the model
    worker.postMessage({
      type: 'init',
      payload: {
        device: useWebGPU ? 'webgpu' : 'wasm',
        dtype: useWebGPU ? 'fp32' : 'q8'
      }
    });

    return () => {
      clearInterval(progressInterval);
      worker.terminate();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, [engine, useWebGPU, playNextChunk]);

  const handleSpeak = useCallback(async () => {
    if (!text) return;

    setIsSpeaking(true);
    setStatusText('Generating...');
    setAudioUrl(null);

    // Stop any previous playback
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }

    if (engine === 'edge') {
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice: selectedVoice })
        });

        if (!res.ok) throw new Error('Failed to generate audio');

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        const audio = new Audio(url);
        audioPlayerRef.current = audio;

        setStatusText('Playing...');
        await audio.play();

        audio.onended = () => {
          setIsSpeaking(false);
          setStatusText('Speak');
        };

      } catch (e: any) {
        console.error(e);
        alert('Error generating speech: ' + e.message);
        setIsSpeaking(false);
        setStatusText('Speak');
      }
    } else {
      // Kokoro Logic
      if (!workerRef.current) return;
      isGeneratingRef.current = true;
      audioQueue.current = [];
      fullAudioChunksRef.current = [];
      isPlayingRef.current = false;

      workerRef.current.postMessage({
        type: 'speak',
        payload: {
          text,
          voice: selectedVoice
        }
      });
    }
  }, [text, selectedVoice, engine]);

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `speech-output-${engine}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolContainer title="Text to Speech" details={details} toolId={toolId}>
      <div className={styles['tts-container']}>
        {downloading && engine === 'kokoro' && (
          <div className="w-full mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Initializing Kokoro AI Model...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {useWebGPU ? 'Using WebGPU.' : 'Using CPU (WASM).'}
            </p>
          </div>
        )}

        <textarea
          className={`${styles['tts-input']} dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading && engine === 'kokoro'}
        ></textarea>

        {/* Engine Selection */}
        <div className="flex flex-col gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">TTS Engine:</label>
            <div className="flex bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
              <button
                onClick={() => setEngine('edge')}
                className={`px-4 py-1.5 text-sm rounded-md transition-all ${engine === 'edge'
                    ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
              >
                Edge TTS (Best Quality)
              </button>
              <button
                onClick={() => setEngine('kokoro')}
                className={`px-4 py-1.5 text-sm rounded-md transition-all ${engine === 'kokoro'
                    ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
              >
                Kokoro (Offline)
              </button>
            </div>
          </div>

          {engine === 'kokoro' && (
            <div className="flex items-center space-x-2 border-t border-gray-200 dark:border-gray-700 pt-3">
              <input
                type="checkbox"
                id="webgpu-toggle"
                checked={useWebGPU}
                onChange={(e) => setUseWebGPU(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                disabled={loading || isSpeaking}
              />
              <label htmlFor="webgpu-toggle" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                Use WebGPU (Experimental)
              </label>
            </div>
          )}
        </div>

        <div className={styles['tts-controls']}>
          <select
            className={`${styles['voice-selector']} dark:bg-gray-800 dark:border-gray-700 dark:text-white border border-gray-300`}
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            disabled={loading && engine === 'kokoro'}
          >
            {voices.map(v => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>

          <button
            className={styles['btn-speak']}
            onClick={handleSpeak}
            disabled={(loading && engine === 'kokoro') || !text || isSpeaking}
            style={{ opacity: ((loading && engine === 'kokoro') || !text || isSpeaking) ? 0.5 : 1, cursor: ((loading && engine === 'kokoro') || !text || isSpeaking) ? 'not-allowed' : 'pointer' }}
          >
            {isSpeaking ? statusText : 'Speak'}
          </button>

          <button
            className={styles['btn-download']}
            onClick={handleDownload}
            disabled={!audioUrl}
            style={{ opacity: (!audioUrl) ? 0.5 : 1, cursor: (!audioUrl) ? 'not-allowed' : 'pointer' }}
          >
            Download
          </button>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TextToSpeech;
