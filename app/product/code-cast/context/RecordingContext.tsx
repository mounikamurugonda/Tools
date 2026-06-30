import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { trackCodeCastDownload } from '../../../../lib/analytics';

interface RecordingContextType {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  recordedVideoBlob: Blob | null;
  startRecording: (isMicEnabled: boolean) => Promise<void>;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  downloadRecording: () => void;
  clearRecording: () => void;
}

const RecordingContext = createContext<RecordingContextType | null>(null);

export const useRecording = () => {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }
  return context;
};

export const RecordingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Pause timer effect
  useEffect(() => {
    if (isPaused && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else if (isRecording && !isPaused && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  }, [isPaused, isRecording]);

  const audioContextRef = useRef<AudioContext | null>(null);

  const startRecording = useCallback(async (isMicEnabled: boolean) => {
    try {
      console.log('Starting recording...');
      setRecordedVideoBlob(null);

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'browser',
          width: { ideal: 2560 },
          height: { ideal: 1440 },
          frameRate: { ideal: 60 }
        },
        audio: true,
        preferCurrentTab: true,
      } as any);

      let micStream: MediaStream | null = null;
      if (isMicEnabled) {
        try {
          micStream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true },
          });
        } catch (e) {
          console.warn('Mic permission denied', e);
        }
      }

      // Mix audio streams using Web Audio API
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const destination = audioContext.createMediaStreamDestination();
      let hasAudio = false;

      if (displayStream.getAudioTracks().length > 0) {
        const source1 = audioContext.createMediaStreamSource(displayStream);
        source1.connect(destination);
        hasAudio = true;
      }

      if (micStream && micStream.getAudioTracks().length > 0) {
        const source2 = audioContext.createMediaStreamSource(micStream);
        source2.connect(destination);
        hasAudio = true;
      }

      const tracks = [
        ...displayStream.getVideoTracks(),
        ...(hasAudio ? destination.stream.getAudioTracks() : [])
      ];
      const combinedStream = new MediaStream(tracks);

      // Region Capture (optional polish)
      const track = displayStream.getVideoTracks()[0];
      if ((window as any).CropTarget && (track as any).cropTo) {
        const element = document.getElementById('canvas-stage');
        if (element) {
          try {
            const cropTarget = await (window as any).CropTarget.fromElement(element);
            await (track as any).cropTo(cropTarget);
          } catch (e) {
            console.warn('Crop failed', e);
          }
        }
      }

      // Robust MIME type check
      let mimeType = 'video/webm';
      if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9,opus')) {
        mimeType = 'video/webm; codecs=vp9,opus';
      } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8,opus')) {
        mimeType = 'video/webm; codecs=vp8,opus';
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        mimeType = 'video/webm'; // Fallback
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = 'video/mp4';
      }

      console.log(`Using MIME type: ${mimeType}`);

      const recorder = new MediaRecorder(combinedStream, { mimeType, videoBitsPerSecond: 15000000 });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      // Listen for "Stop sharing" from browser UI
      track.addEventListener('ended', () => {
        console.log('Screen sharing stopped by browser');
        if (recorder.state !== 'inactive') {
          recorder.stop();
        }
      });

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        console.log('Recorder stopped');
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecordedVideoBlob(blob);
        setIsRecording(false);
        setIsPaused(false);

        // Cleanup streams
        combinedStream.getTracks().forEach(t => t.stop());
        if (micStream) micStream.getTracks().forEach(t => t.stop());
        displayStream.getTracks().forEach(t => t.stop());

        // Close AudioContext
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      };

      recorder.start(1000);
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      console.error('Failed to start recording', err);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }, []);

  const downloadRecording = useCallback(() => {
    if (!recordedVideoBlob) return;

    const url = URL.createObjectURL(recordedVideoBlob);
    const a = document.createElement('a');
    a.href = url;
    // Basic timestamp naming
    const ext = recordedVideoBlob.type.includes('mp4') ? 'mp4' : 'webm';
    a.download = `codecast-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Track download
    trackCodeCastDownload(ext, recordingTime, session?.user?.email || undefined);
  }, [recordedVideoBlob, recordingTime, session]);

  const clearRecording = useCallback(() => {
    setRecordedVideoBlob(null);
    setRecordingTime(0);
  }, []);

  const value = {
    isRecording,
    isPaused,
    recordingTime,
    recordedVideoBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    downloadRecording,
    clearRecording,
  };

  return <RecordingContext.Provider value={value}>{children}</RecordingContext.Provider>;
};
