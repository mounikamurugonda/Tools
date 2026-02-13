import { useRef, useEffect, useCallback } from 'react';
import type { CodeSnippet, AppConfig } from '../types';



interface UseMultiTabAnimationProps {
    code: CodeSnippet;
    updateCode: (tab: 'html' | 'css' | 'js', content: string) => void;
    config: AppConfig;
    activeTab: 'html' | 'css' | 'js' | 'libs';
    setActiveTab: (tab: 'html' | 'css' | 'js' | 'libs') => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    isPaused: boolean;
    setIsPaused: (isPaused: boolean) => void;
    editorRef: React.MutableRefObject<any>;
    audioFile?: File | null;
    isRecording: boolean; // Added isRecording prop
}

export const useMultiTabAnimation = ({
    code,
    updateCode,
    config,
    setActiveTab,
    isPlaying,
    setIsPlaying,
    isPaused,
    setIsPaused,
    editorRef,
    audioFile,
    isRecording, // Destructure isRecording
}: UseMultiTabAnimationProps) => {
    // Animation refs
    const animationTimerRef = useRef<number | null>(null);
    const fullBackupRef = useRef(code);
    const typingSpeedRef = useRef(config.typingSpeed);
    const isPlayingRef = useRef(isPlaying);
    const isPausedRef = useRef(isPaused);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const bgAudioRef = useRef<HTMLAudioElement | null>(null);
    const isRecordingRef = useRef(isRecording);

    // State tracking refs (to support pause/resume)
    const sequenceIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const lastUpdateRef = useRef(0); // For throttling

    // Sync refs
    useEffect(() => {
        typingSpeedRef.current = config.typingSpeed;
        isRecordingRef.current = isRecording;
    }, [config.typingSpeed, isRecording]);

    // Initialize audio (Typing Sound) - Unchanged
    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio('/keyboard-typing.mp3');
            audioRef.current.loop = true;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Initialize bg audio - Unchanged
    useEffect(() => {
        if (audioFile && typeof window !== 'undefined') {
            const url = URL.createObjectURL(audioFile);
            const audio = new Audio(url);
            audio.loop = config.audioLoop !== undefined ? config.audioLoop : true;
            audio.volume = config.audioVolume !== undefined ? config.audioVolume : 0.5;
            audio.playbackRate = config.audioPlaybackRate !== undefined ? config.audioPlaybackRate : 1.0;
            audio.preservesPitch = true;
            bgAudioRef.current = audio;

            return () => {
                audio.pause();
                URL.revokeObjectURL(url);
                bgAudioRef.current = null;
            };
        } else {
            if (bgAudioRef.current) {
                bgAudioRef.current.pause();
                bgAudioRef.current = null;
            }
        }
    }, [audioFile]);

    // Dynamic Audio Updates - Unchanged
    useEffect(() => {
        if (bgAudioRef.current) {
            bgAudioRef.current.volume = config.audioVolume !== undefined ? config.audioVolume : 0.5;
            bgAudioRef.current.playbackRate = config.audioPlaybackRate !== undefined ? config.audioPlaybackRate : 1.0;
            bgAudioRef.current.loop = config.audioLoop !== undefined ? config.audioLoop : true;
        }
    }, [config.audioVolume, config.audioPlaybackRate, config.audioLoop]);

    // NEW: Handle Background Music Playback (Synced with Recording)
    useEffect(() => {
        if (!bgAudioRef.current) return;

        if (isRecording && !isPaused) {
            // START / RESUME Music
            if (bgAudioRef.current.paused) {
                // If starting fresh (currentTime is 0), apply start time and fade
                if (bgAudioRef.current.currentTime === 0 || bgAudioRef.current.currentTime === config.audioStartTime) {
                    bgAudioRef.current.currentTime = config.audioStartTime || 0;

                    // Handle Fade In
                    if (config.audioFadeDuration && config.audioFadeDuration > 0) {
                        bgAudioRef.current.volume = 0;
                        const targetVol = config.audioVolume !== undefined ? config.audioVolume : 0.5;
                        const fadeTime = config.audioFadeDuration * 1000;
                        const steps = 20;
                        const stepTime = fadeTime / steps;
                        const volStep = targetVol / steps;

                        let currentStep = 0;
                        const fadeInterval = setInterval(() => {
                            if (!bgAudioRef.current) {
                                clearInterval(fadeInterval);
                                return;
                            }
                            currentStep++;
                            const newVol = Math.min(volStep * currentStep, targetVol);
                            bgAudioRef.current.volume = newVol;

                            if (currentStep >= steps) {
                                clearInterval(fadeInterval);
                            }
                        }, stepTime);
                    } else {
                        bgAudioRef.current.volume = config.audioVolume !== undefined ? config.audioVolume : 0.5;
                    }
                }

                bgAudioRef.current.play().catch(e => console.error("BG Audio play failed", e));
            }
        } else {
            // PAUSE / STOP Music
            if (!bgAudioRef.current.paused) {
                bgAudioRef.current.pause();
            }
            if (!isRecording) {
                // Reset if recording stopped
                bgAudioRef.current.currentTime = config.audioStartTime || 0;
            }
        }
    }, [isRecording, isPaused, config.audioStartTime, config.audioFadeDuration, config.audioVolume]);

    // Handle Animation Loop & Typing Sound (Synced with isPlaying)
    // Removed BG Audio logic from here
    // Updated Typing Sound logic to be mutually exclusive with BG Audio if desired,
    // BUT User said "if background is uploaded make sure voice over is not playing".
    // "Voice over" likely means TTS. User didn't say "don't play typing sound".
    // However, usually typing sound + music is fine.
    // I will keep typing sound enabled for animation unless configured otherwise.

    const stopAnimation = useCallback(() => {
        if (animationTimerRef.current) {
            window.clearTimeout(animationTimerRef.current);
            animationTimerRef.current = null;
        }
        setIsPlaying(false);
        setIsPaused(false);
        sequenceIndexRef.current = 0;
        charIndexRef.current = 0;
    }, [setIsPlaying, setIsPaused]);

    const startAnimationLoop = useCallback((target: CodeSnippet) => {
        const sequence: ('html' | 'css' | 'js')[] = ['html', 'css', 'js'];

        const runLoop = () => {
            // Find next non-empty tab if needed
            while (sequenceIndexRef.current < sequence.length &&
                (!target[sequence[sequenceIndexRef.current]] || !target[sequence[sequenceIndexRef.current]].trim())) {
                sequenceIndexRef.current++;
                charIndexRef.current = 0; // Reset char index for new tab
            }

            if (sequenceIndexRef.current >= sequence.length) {
                stopAnimation();
                return;
            }

            const currentTabId = sequence[sequenceIndexRef.current];
            setActiveTab(currentTabId);

            const typeChar = () => {
                const fullText = target[currentTabId];

                // If index exceeds length, we are done with this tab
                if (charIndexRef.current >= fullText.length) {
                    // Ensure final state is consistent before moving on
                    updateCode(currentTabId, fullText);

                    sequenceIndexRef.current++;
                    charIndexRef.current = 0;
                    animationTimerRef.current = window.setTimeout(runLoop, 1000);
                    return;
                }

                // If starting fresh on this tab, clear explicit focus once
                if (charIndexRef.current === 0) {
                    editorRef.current?.focus();
                }

                const charToType = fullText[charIndexRef.current];

                if (editorRef.current) {
                    // Use Monaco's native type command for smooth insertion and cursor movement
                    editorRef.current.trigger('keyboard', 'type', { text: charToType });
                    editorRef.current.revealPosition(editorRef.current.getPosition());

                    // Throttled update to prevent React render storms
                    // Only sync store state every 100ms or if it's the last character
                    const now = Date.now();
                    const isLastChar = charIndexRef.current === fullText.length - 1;

                    if (isLastChar || now - lastUpdateRef.current > 250) {
                        updateCode(currentTabId, editorRef.current.getValue());
                        lastUpdateRef.current = now;
                    }
                } else {
                    // Fallback
                    updateCode(currentTabId, fullText.substring(0, charIndexRef.current + 1));
                }

                charIndexRef.current++;
                animationTimerRef.current = window.setTimeout(typeChar, typingSpeedRef.current > 0 ? typingSpeedRef.current : 0);
            };

            // Start typing
            animationTimerRef.current = window.setTimeout(typeChar, typingSpeedRef.current > 0 ? typingSpeedRef.current : 0);
        };

        // Start the loop
        runLoop();
    }, [stopAnimation, setActiveTab, updateCode, editorRef]);

    // Trigger animation when isPlaying or isPaused changes
    useEffect(() => {
        const wasPlaying = isPlayingRef.current;
        const wasPaused = isPausedRef.current;

        isPlayingRef.current = isPlaying;
        isPausedRef.current = isPaused;

        // CASE 1: Start Animation
        if (!wasPlaying && isPlaying) {
            // Typing Sound
            // NEW: Don't play typing sound if background music or voiceover is active
            const isBgMusicActive = isRecording && !!bgAudioRef.current;
            const isSpeaking = typeof window !== 'undefined' && window.speechSynthesis.speaking;

            if (config.soundEnabled && audioRef.current && !isBgMusicActive && !isSpeaking) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            }

            // Capture target state
            const target = {
                html: code.html.replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
                css: code.css.replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
                js: code.js.replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
            };
            fullBackupRef.current = target;

            updateCode('html', '');
            updateCode('css', '');
            updateCode('js', '');

            sequenceIndexRef.current = 0;
            charIndexRef.current = 0;

            startAnimationLoop(target);
        }
        // CASE 2: Resume Animation
        else if (wasPlaying && isPlaying && wasPaused && !isPaused) {
            const isBgMusicActive = isRecording && !!bgAudioRef.current;
            const isSpeaking = typeof window !== 'undefined' && window.speechSynthesis.speaking;

            if (config.soundEnabled && audioRef.current && !isBgMusicActive && !isSpeaking) {
                audioRef.current.play().catch(e => console.error("Audio resume failed", e));
            }
            startAnimationLoop(fullBackupRef.current);
        }
        // CASE 3: Pause Animation
        else if (isPlaying && isPaused) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (animationTimerRef.current) {
                window.clearTimeout(animationTimerRef.current);
                animationTimerRef.current = null;
            }
        }
        // CASE 4: Stop Animation
        else if (wasPlaying && !isPlaying) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            if (animationTimerRef.current) {
                window.clearTimeout(animationTimerRef.current);
                animationTimerRef.current = null;
            }

            // Restore code
            updateCode('html', fullBackupRef.current.html);
            updateCode('css', fullBackupRef.current.css);
            updateCode('js', fullBackupRef.current.js);
        }
    }, [isPlaying, isPaused, config.soundEnabled, stopAnimation, updateCode, setActiveTab, code, startAnimationLoop, isRecording]);


    const handleAnimate = useCallback(() => {
        if (isPlaying) {
            stopAnimation();
            return;
        }
        setIsPlaying(true);
    }, [isPlaying, stopAnimation, setIsPlaying]);

    const handlePauseResume = useCallback(() => {
        if (isPlaying) {
            setIsPaused(!isPaused);
        }
    }, [isPlaying, isPaused, setIsPaused]);

    return {
        handleAnimate,
        stopAnimation,
        handlePauseResume,
    };
};
