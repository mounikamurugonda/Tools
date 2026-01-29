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
}: UseMultiTabAnimationProps) => {
    // Animation refs
    const animationTimerRef = useRef<number | null>(null);
    const fullBackupRef = useRef(code);
    const typingSpeedRef = useRef(config.typingSpeed);
    const isPlayingRef = useRef(isPlaying);
    const isPausedRef = useRef(isPaused);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const bgAudioRef = useRef<HTMLAudioElement | null>(null);

    // State tracking refs (to support pause/resume)
    const sequenceIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const lastUpdateRef = useRef(0); // For throttling

    // Sync typing speed ref with config
    useEffect(() => {
        typingSpeedRef.current = config.typingSpeed;
    }, [config.typingSpeed]);

    // Initialize audio
    useEffect(() => {
        // Only create audio if we are in browser environment
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

    // Initialize bg audio
    useEffect(() => {
        if (audioFile && typeof window !== 'undefined') {
            const url = URL.createObjectURL(audioFile);
            const audio = new Audio(url);
            // Use config for loop (default true)
            audio.loop = config.audioLoop !== undefined ? config.audioLoop : true;

            // Set initial volume immediately
            audio.volume = config.audioVolume !== undefined ? config.audioVolume : 0.5;

            // Set initial playback rate
            audio.playbackRate = config.audioPlaybackRate !== undefined ? config.audioPlaybackRate : 1.0;
            // Preserves pitch on speed change (optional but usually better for music, set false if you want chipmunk effect)
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
    }, [audioFile]); // Only re-init if file changes. Config updates handled by separate effect.

    // Dynamic Audio Updates (Volume/Speed/Loop) without stopping
    useEffect(() => {
        if (bgAudioRef.current) {
            bgAudioRef.current.volume = config.audioVolume !== undefined ? config.audioVolume : 0.5;
            bgAudioRef.current.playbackRate = config.audioPlaybackRate !== undefined ? config.audioPlaybackRate : 1.0;
            bgAudioRef.current.loop = config.audioLoop !== undefined ? config.audioLoop : true;
        }
    }, [config.audioVolume, config.audioPlaybackRate, config.audioLoop]);

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

                    if (isLastChar || now - lastUpdateRef.current > 100) {
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

    // Robust cleanup on unmount or when stopping
    useEffect(() => {
        return () => {
            // Stop timer
            if (animationTimerRef.current) {
                window.clearTimeout(animationTimerRef.current);
            }

            // Stop audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            if (bgAudioRef.current) {
                bgAudioRef.current.pause();
                bgAudioRef.current.currentTime = 0;
            }

            // If playing on unmount, force stop and restore code to prevent data loss or stuck state
            if (isPlayingRef.current) {
                // If we were just paused, restore anyway on unmount
                setIsPlaying(false);
                const backup = fullBackupRef.current;
                updateCode('html', backup.html);
                updateCode('css', backup.css);
                updateCode('js', backup.js);
            }
        };
    }, [setIsPlaying, updateCode]);

    // Trigger animation when isPlaying or isPaused changes
    useEffect(() => {
        const wasPlaying = isPlayingRef.current;
        const wasPaused = isPausedRef.current;

        isPlayingRef.current = isPlaying;
        isPausedRef.current = isPaused;

        // CASE 1: Start Animation (from stopped state)
        if (!wasPlaying && isPlaying) {
            // Prioritize BG Audio if present
            if (bgAudioRef.current) {
                bgAudioRef.current.currentTime = config.audioStartTime || 0;

                // Handle Fade In
                if (config.audioFadeDuration && config.audioFadeDuration > 0) {
                    bgAudioRef.current.volume = 0;
                    const targetVol = config.audioVolume !== undefined ? config.audioVolume : 0.5;

                    // Simple Fade In
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

                // Apply Playback Rate
                bgAudioRef.current.playbackRate = config.audioPlaybackRate !== undefined ? config.audioPlaybackRate : 1.0;

                bgAudioRef.current.play().catch(e => console.error("BG Audio play failed", e));
                // Do NOT play keyboard sound
            }
            else if (config.soundEnabled && audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            }

            // Capture target state
            // Normalize line endings to \n to prevent issues with \r\n causing double-typing or extra lines
            const target = {
                html: code.html.replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
                css: code.css.replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
                js: code.js.replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
            };
            fullBackupRef.current = target;

            // Clear code (unless we want to support resuming from stopped, but "Stop" usually implies reset)
            // Current requirement: "continue from where it was stopped" -> implies Pause.
            // "Stop" resets. "Pause" holds.

            updateCode('html', '');
            updateCode('css', '');
            updateCode('js', '');

            sequenceIndexRef.current = 0;
            charIndexRef.current = 0;

            startAnimationLoop(target);
        }
        // CASE 2: Resume Animation (from paused state)
        else if (wasPlaying && isPlaying && wasPaused && !isPaused) {
            if (bgAudioRef.current) {
                bgAudioRef.current.play().catch(e => console.error("BG Audio resume failed", e));
            }
            else if (config.soundEnabled && audioRef.current) {
                audioRef.current.play().catch(e => console.error("Audio resume failed", e));
            }
            // Resume loop with existing refs
            startAnimationLoop(fullBackupRef.current);
        }
        // CASE 3: Pause Animation
        else if (isPlaying && isPaused) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (bgAudioRef.current) {
                bgAudioRef.current.pause();
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
            if (bgAudioRef.current) {
                bgAudioRef.current.pause();
                bgAudioRef.current.currentTime = 0;
            }
            // Clear timer logic handled by cleanup/callback usually, but ensure here
            if (animationTimerRef.current) {
                window.clearTimeout(animationTimerRef.current);
                animationTimerRef.current = null;
            }

            // Restore code
            updateCode('html', fullBackupRef.current.html);
            updateCode('css', fullBackupRef.current.css);
            updateCode('js', fullBackupRef.current.js);
        }
    }, [isPlaying, isPaused, config.soundEnabled, stopAnimation, updateCode, setActiveTab, code, startAnimationLoop]); // Added isPaused and startAnimationLoop
    // Actually, 'code' changing *while* playing shouldn't restart. 
    // But we need to capture `code` at the *moment* isPlaying becomes true.
    // The effect runs when isPlaying changes. At that moment, `code` is the valid code.

    // NOTE: If 'code' is in dependencies, any update (e.g. typing) would re-trigger this effect.
    // But we have `if (!wasPlaying && isPlaying)`. 
    // If `isPlaying` is true and `code` updates, `wasPlaying` is true, so it hits the `else if`.
    // `wasPlaying && !isPlaying` would be false (true && false).
    // So standard updates won't trigger restart or stop. Safe.

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
